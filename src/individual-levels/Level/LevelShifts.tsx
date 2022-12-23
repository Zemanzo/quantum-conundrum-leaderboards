import { LevelShiftRecord } from "../../types";
import { useDataContext } from "../DataContext";
import { StyledShifts, StyledEntry, StyledNoRecord } from "./LevelShifts.style";

type LevelShiftsProps = {
  record: LevelShiftRecord;
};

export default function LevelShifts({ record }: LevelShiftsProps) {
  const { users } = useDataContext();

  const user =
    record.userId !== null && users?.[record.userId]
      ? {
          userName: users?.[record.userId].userName,
          link: users?.[record.userId].webLink,
        }
      : null;

  return (
    <StyledShifts>
      {record.userId !== null ? (
        <StyledEntry>
          {user && user.link ? (
            <a href={user.link}>{user.userName}</a>
          ) : (
            <div>{user?.userName ?? record.userId}</div>
          )}
          {
            <a href={record.link}>
              {record.shifts} shift{record.shifts !== 1 && "s"}
            </a>
          }
        </StyledEntry>
      ) : (
        <StyledNoRecord>
          {record.shifts === -1
            ? null
            : `${record.shifts} shift${record.shifts !== 1 && "s"}`}
        </StyledNoRecord>
      )}
    </StyledShifts>
  );
}
