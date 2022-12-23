import { useEffect, useState } from "react";
import { StyledSubmit, SubmitTitle } from "./Submit.style";
import levels from "../levels.json";

const wingLabelLookup: Record<string, string> = {
  blue: "Blue wing",
  yellow: "Yellow wing",
  red: "Red wing",
  uberids: "Uber IDS",
  desmonddebacle: "Desmond Debacle",
  ikearamba: "Ike-Aramba",
};

const users = {
  Zemanzo: "1xy5nqy8",
  ClashCode: "x7qypev8",
  OmegaFallon: "48g55erj",
  Zypeh: "qjng618m",
  angrychipmunks: "x3m7rlq8",
  Fatal: "18q5gl08",
  szeimartin: "y8d2y9j6",
  Spyman68: "7j40vzv8",
  Leji: "y8dwv09j",
  andzura: "98r51wx1",
};

export default function Submit() {
  const [selectedLevel, setSelectedLevel] = useState<string>(levels[0].apiId);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [predefinedUser, setPredefinedUser] = useState<string>(users.Zemanzo);
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [videoLink, setVideoLink] = useState<string>();
  const [shifts, setShifts] = useState<number>(0);
  const [lagAbuse, setLagAbuse] = useState<number>(0);
  const [submitRequestState, setSubmitRequestState] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitRequestState("");

    if (selectedLevel && selectedUser && password && !isNaN(shifts)) {
      setSubmitRequestState("⏳");
      fetch(`http://localhost:3005/api/submit`, {
        method: "POST",
        body: JSON.stringify({
          levelId: selectedLevel,
          userId: selectedUser,
          password,
          shifts,
          videoLink,
          lagAbuse,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setSubmitRequestState("❌");
          }
        })
        .then((body) => {
          if (body.success) {
            setSubmitRequestState("✅");
          } else {
            setSubmitRequestState("❌");
          }
        })
        .catch(() => {
          setSubmitRequestState("❌");
        });
    }
  };

  useEffect(() => {
    setSelectedUser(predefinedUser);
  }, [predefinedUser]);

  useEffect(() => {
    setUserName("");
    if (selectedUser?.length === 8) {
      setUserName("⏳");
      fetch(`https://www.speedrun.com/api/v1/users/${selectedUser}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setUserName("❌ ID not known on speedrun.com");
          }
        })
        .then((body) => {
          setUserName(body?.data?.names?.international);
        })
        .catch(() => {
          setUserName("❌ ID not known on speedrun.com");
        });
    }
  }, [selectedUser]);

  const isLoading = submitRequestState === "⏳";

  return (
    <StyledSubmit>
      <SubmitTitle>Least shifts</SubmitTitle>
      <form onSubmit={handleSubmit}>
        <div>Level</div>
        <select
          value={selectedLevel}
          onChange={(event) => setSelectedLevel(event.target.value)}
          disabled={isLoading}
        >
          {levels.map((level) => {
            return (
              <option value={level.apiId} key={level.apiId}>
                {wingLabelLookup[level.wing]} - {level.title}
              </option>
            );
          })}
        </select>
        <div>User ID</div>
        <div>
          <select
            value={predefinedUser}
            onChange={(event) => setPredefinedUser(event.target.value)}
            disabled={isLoading}
          >
            {Object.entries(users).map(([name, id]) => {
              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
            disabled={isLoading}
          />
          {userName}
        </div>
        <div>Shifts</div>
        <input
          type="number"
          min="0"
          step="1"
          value={shifts}
          onChange={(event) => setShifts(parseInt(event.target.value))}
          disabled={isLoading}
        />
        <div>Video link</div>
        <input
          type="text"
          value={videoLink}
          onChange={(event) => setVideoLink(event.target.value)}
          disabled={isLoading}
        />
        <div>Lag Abuse</div>
        <select
          value={lagAbuse}
          onChange={(event) => setLagAbuse(parseInt(event.target.value))}
          disabled={isLoading}
          style={{ maxWidth: "7ch" }}
        >
          <option value={0}>NO</option>
          <option value={1}>YES</option>
        </select>
        <div>Password</div>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={
            !Boolean(selectedLevel && selectedUser && videoLink && password)
          }
        >
          Submit
        </button>
        <div>{submitRequestState}</div>
      </form>
    </StyledSubmit>
  );
}
