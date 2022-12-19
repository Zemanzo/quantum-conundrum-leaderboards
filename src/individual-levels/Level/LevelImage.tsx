import { LevelDetails } from "../../types";
import { StyledImage } from "./LevelImage.style";

type LevelMetaProps = Pick<LevelDetails, "levelId">;

export default function LevelImage({ levelId }: LevelMetaProps) {
  return (
    <StyledImage>
      <picture>
        <source srcSet={`http://qc.zemanzo.nl/265pThumbnails/${levelId}.jpg`} />
        <img
          src={`http://qc.zemanzo.nl/265pThumbnails/${levelId}.jpg`}
          alt="LevelImage"
        />
      </picture>
    </StyledImage>
  );
}
