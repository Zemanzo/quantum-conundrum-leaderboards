import { useReducer } from "react";
import useFetch from "react-fetch-hook";
import { StyledLevels } from "./IndividualLevels.style";
import LEVELS from "../levels.json";
import WINGS from "../wings.json";
import Section from "./Section";
import {
  ApiResponseRuns,
  ApiResponseUsers,
  LevelDetails,
  SortedRuns,
  SortedShifts,
  WebLink,
} from "../types";
import { DataContext } from "./DataContext";
import { updatedShiftsReducer } from "./shiftsReducer";
import { updatedRunsReducer } from "./runsReducer";
import ErrorBanner from "./ErrorBanner";
import { API_ROOT_URL } from "../constants";
import Statistics from "./Statistics/Statistics";

const groupedLevels = groupArrayByProperty(LEVELS, "wing");

const sections = Object.entries(groupedLevels).map(([sectionId, levels]) => {
  const sectionWing = WINGS.find((wing) => sectionId === wing.id);
  const sectionLevels: LevelDetails[] = levels.map((level) => ({
    number: level.id + 1,
    levelId: level.wingId,
    apiId: level.apiId,
    webLink: level.speedruncomLink as WebLink,
    title: level.title,
  }));

  return sectionWing ? (
    <Section
      title={sectionWing.title}
      theme={sectionWing.theme}
      levels={sectionLevels}
      key={sectionId}
    />
  ) : null;
});

export default function IndividualLevels() {
  const [updatedRunsState, updateLevelRuns] = useReducer(
    updatedRunsReducer,
    {}
  );
  const [updatedShiftsState, updateShiftsRuns] = useReducer(
    updatedShiftsReducer,
    {}
  );

  const {
    isLoading: isLoadingRuns,
    data: runsResponse,
    error,
  } = useFetch<ApiResponseRuns>(`${API_ROOT_URL}/api/runs`);
  const { isLoading: isLoadingUsers, data: users } = useFetch<ApiResponseUsers>(
    `${API_ROOT_URL}/api/users`
  );

  const sortedRuns = runsResponse?.runs?.reduce<SortedRuns>(
    getRunSortReducer<"runs">(updatedRunsState),
    {}
  );

  const sortedShifts = runsResponse?.shifts?.reduce<SortedShifts>(
    getRunSortReducer<"shifts">(updatedShiftsState),
    {}
  );

  const usersLookup = users?.reduce<Record<string, ApiResponseUsers[number]>>(
    (lookup, user) => {
      lookup[user.userId] = user;
      return lookup;
    },
    {}
  );

  const dataContext = {
    isLoading: isLoadingRuns && isLoadingUsers,
    runs: sortedRuns,
    shifts: sortedShifts,
    users: usersLookup,
    updateLevelRuns,
    updateShiftsRuns,
  };

  return (
    <StyledLevels>
      {error && (
        <ErrorBanner>
          <h2>⚠️ Could not fetch data...</h2>
          <div>
            The backend is probably down, go send angry messages at Zemanzo
            until it is fixed.
          </div>
        </ErrorBanner>
      )}
      <Statistics runs={sortedRuns} shifts={sortedShifts} users={usersLookup} />
      <DataContext.Provider value={dataContext}>
        {sections}
      </DataContext.Provider>
    </StyledLevels>
  );
}

function groupArrayByProperty<T extends any[], P extends keyof T[number]>(
  arr: T,
  property: P
): { [propertyValue: string]: T } {
  return arr.reduce((accumulator, entry) => {
    accumulator[entry[property]] = [
      ...(accumulator[entry[property]] || []),
      entry,
    ];
    return accumulator;
  }, {});
}

function getRunSortReducer<T extends keyof ApiResponseRuns>(updatedState: {
  [key: string]: ApiResponseRuns[T];
}) {
  return function (
    sorted: Record<string, ApiResponseRuns[T]>,
    run: ApiResponseRuns[T][number]
  ) {
    if (!sorted[run.levelId]) {
      sorted[run.levelId] = [];
    }
    if (updatedState[run.levelId]) {
      sorted[run.levelId] = updatedState[run.levelId];
    } else {
      //@ts-expect-error run is always correct type.
      sorted[run.levelId].push(run);
    }
    return sorted;
  };
}
