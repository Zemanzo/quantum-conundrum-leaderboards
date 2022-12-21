import { useState } from "react";
import { LevelDetails, LevelTimeRecord } from "../../types";
import { useDataContext } from "../DataContext";
import LevelImage from "./LevelImage";
import LevelMeta from "./LevelMeta";
import LevelShifts from "./LevelShifts";
import LevelTimes from "./LevelTimes";
import LevelTitle from "./LevelTitle";
import LevelLoader from "./LevelLoader";

type LevelProps = {
  levelDetails: LevelDetails;
};

export default function Level({ levelDetails }: LevelProps) {
  const { number, levelId, apiId, webLink, title } = levelDetails;
  const { isLoading, runs, updateLevelRuns } = useDataContext();
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);

  const timeRecords =
    (!isLoading &&
      runs?.[apiId]?.map<LevelTimeRecord>((run) => ({
        userId: run.userId,
        time: run["min(time)"],
        link: run.videoLink,
      }))) ||
    [];

  const shiftRecords = {
    shifts: 0,
  };

  return (
    <>
      <LevelImage
        levelId={levelId}
        apiId={apiId}
        updateLevelRuns={updateLevelRuns}
        setIsLoadingLevel={setIsLoadingLevel}
      />
      <LevelMeta number={number} levelId={apiId} />
      <LevelTitle webLink={webLink}>{title}</LevelTitle>
      {isLoading || isLoadingLevel ? (
        <LevelLoader />
      ) : (
        <>
          <LevelTimes records={timeRecords} />
          <LevelShifts record={shiftRecords} />
        </>
      )}
    </>
  );
}
