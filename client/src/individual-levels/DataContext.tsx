import { createContext, useContext } from "react";
import { ApiResponseRuns, ApiResponseUsers } from "../types";
import { RunsReducerAction } from "./runsReducer";
import { ShiftsReducerAction } from "./shiftsReducer";

export interface PageContextType {
  isLoading: boolean;
  runs?: Record<string, ApiResponseRuns["runs"]>;
  shifts?: Record<string, ApiResponseRuns["shifts"]>;
  users?: Record<string, ApiResponseUsers[number]>;
  updateLevelRuns: (action: RunsReducerAction) => void;
  updateShiftsRuns: (action: ShiftsReducerAction) => void;
}

export const DataContext = createContext<PageContextType>(
  {} as PageContextType
);

export function useDataContext() {
  const context = useContext(DataContext);
  if (context !== undefined) {
    return context;
  }
  throw new Error(
    "The usePageContext hook must be used within a PageContext.Provider"
  );
}
