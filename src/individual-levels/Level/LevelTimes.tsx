import { LevelTimeRecord } from "../../types";
import { useDataContext } from "../DataContext";
import { StyledEntry, StyledTimes } from "./LevelTimes.style";

type LevelTimesProps = {
  records: LevelTimeRecord[];
};

export default function LevelTimes({ records }: LevelTimesProps) {
  const { users } = useDataContext();

  return (
    <StyledTimes>
      {records.map(({ userId, time, link }, i) => {
        let timeDiff;

        const user = users?.[userId] ?? {
          userName: userId,
          webLink: `https://www.speedrun.com/user/${userId}`,
        };

        if (i > 0) {
          timeDiff = `(+${(time - records[i - 1].time).toFixed(2)})`;
        }
        return (
          <StyledEntry key={userId}>
            <a href={user.webLink}>{user.userName}</a>
            <a href={link}>
              {time.toFixed(2)}
              {timeDiff && <span> {timeDiff}</span>}
            </a>
          </StyledEntry>
        );
      })}
    </StyledTimes>
  );
}
