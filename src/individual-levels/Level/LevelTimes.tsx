import { LevelDetails } from "../../types";
import { StyledEntry, StyledTimes } from "./LevelTimes.style";

type LevelTimesProps = {
  records: LevelDetails["records"]["time"];
};

export default function LevelTimes({ records }: LevelTimesProps) {
  return (
    <StyledTimes>
      {records.map(({ user, time, link }, i) => {
        let timeDiff;
        if (i > 0) {
          timeDiff = `(+${(time - records[i - 1].time).toFixed(2)})`;
        }
        return (
          <StyledEntry key={user.displayName}>
            <div>{user.displayName}</div>
            <a href={link}>
              {time}
              {timeDiff && <span> {timeDiff}</span>}
            </a>
          </StyledEntry>
        );
      })}
    </StyledTimes>
  );
}
