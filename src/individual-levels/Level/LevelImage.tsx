import { ApiResponseRuns, LevelDetails } from "../../types";
import { RunsReducerAction } from "../runsReducer";
import { ShiftsReducerAction } from "../shiftsReducer";
import { StyledImage } from "./LevelImage.style";

type LevelMetaProps = Pick<LevelDetails, "levelId" | "apiId"> & {
  updateLevelRuns: (action: RunsReducerAction) => void;
  updateLevelShifts: (action: ShiftsReducerAction) => void;
  setIsLoadingLevel: (isLoading: boolean) => void;
};

export default function LevelImage({
  levelId,
  apiId,
  updateLevelRuns,
  updateLevelShifts,
  setIsLoadingLevel,
}: LevelMetaProps) {
  const fetchNewRuns = async () => {
    setIsLoadingLevel(true);
    try {
      const response = await fetch(
        `http://localhost:3005/api/updateLevel/${apiId}`
      );
      if (response.ok) {
        const updatedResponse: ApiResponseRuns = await response.json();
        updateLevelRuns({ level: apiId, runs: updatedResponse.runs });
        updateLevelShifts({ level: apiId, shifts: updatedResponse.shifts });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingLevel(false);
    }
  };

  return (
    <StyledImage>
      <picture>
        <source srcSet={`http://qc.zemanzo.nl/265pThumbnails/${levelId}.jpg`} />
        <img
          src={`http://qc.zemanzo.nl/265pThumbnails/${levelId}.jpg`}
          alt="LevelImage"
        />
      </picture>
      <div onClick={fetchNewRuns}>&#10227;</div>
    </StyledImage>
  );
}
