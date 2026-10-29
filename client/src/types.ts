export type WithChildren<T = {}> = T & { children?: React.ReactNode };

export type WebLink = `http://${string}` | `https://${string}`;

export type User = {
  displayName?: string;
  srcId?: string;
  link?: WebLink;
};

export type LevelTimeRecord = {
  userId: string;
  time: number;
  link: WebLink;
};

export type LevelShiftRecord =
  | {
      userId: string;
      shifts: number;
      link: WebLink;
    }
  | {
      userId: null;
      shifts: number;
      link: null;
    };

export type LevelRecords = {
  time: LevelTimeRecord[];
  shift: LevelShiftRecord;
};

export type LevelDetails = {
  number: number | string;
  levelId: string;
  apiId: string;
  webLink: WebLink;
  title: string;
};

export type ApiResponseRuns = {
  runs: Array<{
    levelId: string;
    userId: string;
    "min(time)": number;
    videoLink: WebLink;
  }>;
  shifts: Array<{
    levelId: string;
    userId: string;
    "min(shifts)": number;
    videoLink: WebLink;
  }>;
};

export type ApiResponseUsers = Array<{
  userId: string;
  userName: string;
  webLink: WebLink;
  color: string | null;
}>;

export type SortedRuns = Record<string, ApiResponseRuns["runs"]>;
export type SortedShifts = Record<string, ApiResponseRuns["shifts"]>;
