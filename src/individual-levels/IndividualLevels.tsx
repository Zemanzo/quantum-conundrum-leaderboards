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
  WebLink,
} from "../types";
import { DataContext } from "./DataContext";

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

type RunsReducerState = {
  [key: string]: ApiResponseRuns;
};

type RunsReducerAction = {
  level: string;
  runs: ApiResponseRuns;
};

function updatedRunsReducer(
  state: RunsReducerState,
  action: RunsReducerAction
) {
  return { ...state, [action.level]: action.runs };
}

export default function IndividualLevels() {
  const [updatedRunsState, updateLevelRuns] = useReducer(
    updatedRunsReducer,
    {}
  );

  const { isLoading: isLoadingRuns, data: runs } = useFetch<ApiResponseRuns>(
    "http://localhost:3005/api/runs"
  );
  const { isLoading: isLoadingUsers, data: users } = useFetch<ApiResponseUsers>(
    "http://localhost:3005/api/users"
  );

  const sortedRuns = runs?.reduce<Record<string, ApiResponseRuns>>(
    (sorted, run) => {
      if (!sorted[run.levelId]) {
        sorted[run.levelId] = [];
      }
      if (updatedRunsState[run.levelId]) {
        sorted[run.levelId] = updatedRunsState[run.levelId];
      } else {
        sorted[run.levelId].push(run);
      }
      return sorted;
    },
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
    users: usersLookup,
    updateLevelRuns,
  };

  return (
    <StyledLevels>
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
