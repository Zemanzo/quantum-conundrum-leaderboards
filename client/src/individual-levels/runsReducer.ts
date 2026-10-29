import { ApiResponseRuns } from "../types";

export type RunsReducerState = {
  [key: string]: ApiResponseRuns["runs"];
};

export type RunsReducerAction = {
  level: string;
  runs: ApiResponseRuns["runs"];
};

export function updatedRunsReducer(
  state: RunsReducerState,
  action: RunsReducerAction
) {
  return { ...state, [action.level]: action.runs };
}
