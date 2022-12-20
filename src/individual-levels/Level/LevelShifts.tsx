import { LevelShiftDefault, LevelShiftRecord } from "../../types";
import { StyledShifts, StyledEntry } from "./LevelShifts.style";

type LevelShiftsProps = {
  record: LevelShiftRecord | LevelShiftDefault;
};

export default function LevelShifts({ record }: LevelShiftsProps) {
  return (
    <StyledShifts>
      <StyledEntry>
        {"user" in record && <div>{record.user.displayName}</div>}
        {"link" in record && <a href={record.link}>{record.shifts} shifts</a>}
        {!("user" in record) && <span>{record.shifts} shifts</span>}
      </StyledEntry>
    </StyledShifts>
  );
}
