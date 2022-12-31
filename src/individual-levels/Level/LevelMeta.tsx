import { LevelDetails } from "../../types";
import { StyledMeta, LevelId } from "./LevelMeta.style";

type LevelMetaProps = Pick<LevelDetails, "number" | "levelId" | "apiId">;

export default function LevelMeta({ number, levelId, apiId }: LevelMetaProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <StyledMeta>
      <LevelId title="Internal game level ID">{levelId}</LevelId>
      <div>{paddedNumber}</div>
      <LevelId title="Speedrun.com level ID">{apiId}</LevelId>
    </StyledMeta>
  );
}
