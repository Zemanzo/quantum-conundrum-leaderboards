import { ApiResponseRuns } from "../types";

export type ShiftsReducerState = {
  [key: string]: ApiResponseRuns["shifts"];
};

export type ShiftsReducerAction = {
  level: string;
  shifts: ApiResponseRuns["shifts"];
};

export function updatedShiftsReducer(
  state: ShiftsReducerState,
  action: ShiftsReducerAction
) {
  return { ...state, [action.level]: action.shifts };
}
