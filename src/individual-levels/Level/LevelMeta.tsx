import { LevelDetails } from "../../types";
import { StyledMeta, LevelNumber, LevelId } from "./LevelMeta.style";

type LevelMetaProps = Pick<LevelDetails, "number" | "levelId">;

export default function LevelMeta({ number, levelId }: LevelMetaProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <StyledMeta>
      <LevelNumber>{paddedNumber}</LevelNumber>
      <LevelId>{levelId}</LevelId>
    </StyledMeta>
  );
}
