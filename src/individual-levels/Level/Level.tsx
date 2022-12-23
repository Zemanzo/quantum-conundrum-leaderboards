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
  const { isLoading, runs, shifts, updateLevelRuns, updateShiftsRuns } =
    useDataContext();
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);

  const timeRecords =
    (!isLoading &&
      runs?.[apiId]?.map<LevelTimeRecord>((run) => ({
        userId: run.userId,
        time: run["min(time)"],
        link: run.videoLink,
      }))) ||
    [];

  const shiftRecords = shifts?.[apiId]
    ? {
        shifts: shifts[apiId][0]["min(shifts)"],
        userId: shifts[apiId][0].userId,
        link: shifts[apiId][0].videoLink,
      }
    : {
        shifts: 0,
        userId: null,
        link: null,
      };

  return (
    <>
      <LevelImage
        levelId={levelId}
        apiId={apiId}
        updateLevelRuns={updateLevelRuns}
        updateLevelShifts={updateShiftsRuns}
        setIsLoadingLevel={setIsLoadingLevel}
      />
      <LevelMeta number={number} levelId={levelId} apiId={apiId} />
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
