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

export type LevelShiftRecord = {
  user: User;
  shifts: number;
  link: WebLink;
};
export type LevelShiftDefault = {
  shifts: number;
};

export type LevelRecords = {
  time: LevelTimeRecord[];
  shift: LevelShiftRecord | LevelShiftDefault;
};

export type LevelDetails = {
  number: number | string;
  levelId: string;
  apiId: string;
  webLink: WebLink;
  title: string;
};

export type ApiResponseRuns = Array<{
  levelId: string;
  userId: string;
  "min(time)": number;
  videoLink: WebLink;
}>;

export type ApiResponseUsers = Array<{
  userId: string;
  userName: string;
  webLink: WebLink;
}>;
