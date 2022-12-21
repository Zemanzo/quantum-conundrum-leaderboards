import { createContext, useContext } from "react";
import { ApiResponseRuns, ApiResponseUsers } from "../types";

export interface PageContextType {
  isLoading: boolean;
  runs?: Record<string, ApiResponseRuns>;
  users?: Record<string, ApiResponseUsers[number]>;
  updateLevelRuns: (action: { level: string; runs: ApiResponseRuns }) => void;
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
