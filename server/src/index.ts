import path from "node:path";
import Database from "./database/Database";
import { initialize, updateAllRuns, updateAllUsers } from "./run";
import WebServer from "./webserver/WebServer";

const FULL_UPDATE_INTERVAL = 1000 * 60 * 60 * 24;

console.log("Started Quantum Conundrum Leaderboards Server");

const db = new Database(
  process.env.DATABASE_PATH ?? path.resolve("qcls-data.db3"),
);
let webServer: WebServer | undefined;

initialize(db)
  .catch((err) => {
    // Still serve whatever is in the database when speedrun.com is down.
    console.error("Could not initialize data", err);
  })
  .then(() => {
    // Create webserver after db has been initialized.
    webServer = new WebServer(db, {
      host: process.env.HOST ?? "127.0.0.1",
      port: Number(process.env.PORT ?? 3006),
      staticDir: process.env.STATIC_DIR,
    });
  });

setInterval(fullUpdate, FULL_UPDATE_INTERVAL);
async function fullUpdate() {
  try {
    await updateAllRuns(db);
    await updateAllUsers(db);
  } catch (err) {
    console.error("Full update failed", err);
  }
}

async function shutdown() {
  await webServer?.close();
  db.close();
  process.exit(0);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
