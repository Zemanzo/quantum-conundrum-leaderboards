import { createHash, timingSafeEqual } from "node:crypto";
import { FastifyInstance } from "fastify";
import { addLevelRunsToDatabase } from "../../run";
import { toWebLink } from "../../util";

/**
 * Cooldown in milliseconds until a level can be updated.
 */
const UPDATE_COOLDOWN = 1000 * 60;
/**
 * Cooldown in milliseconds until a new attempt at submitting a record can be done.
 */
const SUBMIT_COOLDOWN = 1000 * 60 * 15;
const MAX_FAILED_SUBMIT_ATTEMPTS = 5;

type SubmitBody = {
  levelId: string;
  userId: string;
  shifts: number;
  videoLink: string;
  lagAbuse: 0 | 1;
  password: string;
};

const submitBodySchema = {
  type: "object",
  required: ["levelId", "userId", "shifts", "videoLink", "lagAbuse", "password"],
  additionalProperties: false,
  properties: {
    levelId: { type: "string", maxLength: 32 },
    userId: { type: "string", pattern: "^[a-z0-9]{1,32}$" },
    shifts: { type: "integer", minimum: 0, maximum: 100000 },
    videoLink: { type: "string", maxLength: 500 },
    lagAbuse: { type: "integer", enum: [0, 1] },
    password: { type: "string", maxLength: 1000 },
  },
} as const;

async function routes(fastify: FastifyInstance) {
  fastify.get("/api/runs", async (req, res) => {
    const runs = fastify.db.preparedStatements.select.allFastestRuns
      .all(0)
      .reduce(getRemoveObsoletedRunsReducer(3), []);
    const shifts = fastify.db.preparedStatements.select.allBestShifts
      .all(0)
      .reduce(getRemoveObsoletedRunsReducer(1), []);
    res.code(200).send({ runs, shifts });
  });

  fastify.get("/api/users", async (req, res) => {
    const users = fastify.db.preparedStatements.select.allUsers.all();
    res.code(200).send(users);
  });

  /**
   * Update level
   */
  const lastUpdate: { [key: string]: number } = {};
  fastify.get<{
    Params: {
      id: string;
    };
  }>("/api/updateLevel/:id", async (req, res) => {
    const levelId = req.params.id;
    // Only known levels, so the ID can't be used to make arbitrary requests
    // to speedrun.com or to fill the database with runs from other games.
    if (!fastify.db.preparedStatements.select.level.get(levelId)) {
      return res.code(404).send({ error: "Unknown level" });
    }

    const shifts = fastify.db.preparedStatements.select.levelShiftsNoAbuse.all(
      levelId,
    );
    if (lastUpdate[levelId] > Date.now() - UPDATE_COOLDOWN) {
      const runs =
        fastify.db.preparedStatements.select.levelFastestRunsNoAbuse.all(
          levelId,
        );
      return res.code(200).send({ runs, shifts });
    }

    // Set before fetching, so concurrent requests don't all hit speedrun.com.
    lastUpdate[levelId] = Date.now();
    let runs;
    try {
      runs = await addLevelRunsToDatabase(levelId, fastify.db);
    } catch (err) {
      console.error(err);
      return res.code(502).send({ error: "Could not reach speedrun.com" });
    }
    const filteredRuns = runs
      .sort((a, b) => a["min(time)"] - b["min(time)"])
      .reduce<typeof runs>((accumulator, run) => {
        if (
          run.lagAbuse === 0 &&
          run.userId &&
          accumulator.length < 3 &&
          accumulator.findIndex(
            (filteredRun) => filteredRun.userId === run.userId,
          ) === -1
        ) {
          accumulator.push(run);
        }
        return accumulator;
      }, []);
    res.code(200).send({ runs: filteredRuns, shifts });
  });

  // Shared between all clients, so brute forcing the password is not
  // feasible. The downside is that it can also lock out the admin.
  let failedSubmitAttempts = 0;
  let lastFailedDate = 0;
  fastify.post<{ Body: SubmitBody }>(
    "/api/submit",
    { schema: { body: submitBodySchema } },
    async (req, res) => {
      if (failedSubmitAttempts >= MAX_FAILED_SUBMIT_ATTEMPTS) {
        if (lastFailedDate > Date.now() - SUBMIT_COOLDOWN) {
          return res.code(429).send({ error: "Too many incorrect attempts." });
        }
        failedSubmitAttempts = 0;
      }

      const body = req.body;
      if (!isPasswordValid(body.password)) {
        failedSubmitAttempts++;
        lastFailedDate = Date.now();
        return res.code(403).send({ error: "Incorrect password" });
      }

      const videoLink = toWebLink(body.videoLink);
      if (
        !videoLink ||
        !fastify.db.preparedStatements.select.level.get(body.levelId)
      ) {
        return res.code(400).send({ error: "Request is malformed" });
      }

      try {
        fastify.db.preparedStatements.insert.shift.run(
          body.levelId,
          body.userId,
          body.lagAbuse,
          body.shifts,
          Date.now(),
          videoLink,
        );
        res.code(200).send({ success: true });
      } catch (err) {
        console.error(err);
        res.code(500).send({ error: "Internal server error" });
      }
    },
  );
}

/**
 * Submitting is disabled when no SUBMIT_PASSWORD is set.
 */
function isPasswordValid(password: string) {
  const expected = process.env.SUBMIT_PASSWORD;
  if (!expected) {
    return false;
  }
  // Hash both, so they are the same length for timingSafeEqual.
  return timingSafeEqual(sha256(password), sha256(expected));
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

function getRemoveObsoletedRunsReducer(maxRuns: number) {
  const levels: Record<string, number> = {};
  return function removeObsoletedRuns(filteredRuns: any[], run: any) {
    if ((levels?.[run.levelId] ?? 0) < maxRuns) {
      filteredRuns.push(run);
      if (levels[run.levelId]) {
        levels[run.levelId]++;
      } else {
        levels[run.levelId] = 1;
      }
    }
    return filteredRuns;
  };
}

export default routes;
