import { ThemeProvider } from "styled-components";
import { LevelDetails, User } from "../types";
import Level from "./Level/Level";
import SectionHeader from "./SectionHeader";

const userZemanzo: User = {
  displayName: "Zemanzo",
};
const userFatal: User = {
  displayName: "Fatal",
};

const testDetails: LevelDetails = {
  number: 2,
  levelId: "WingA01",
  webLink: "https://",
  title: "Kaladiophobia",
  records: {
    time: [
      {
        user: userFatal,
        time: 11.01,
        link: "https://",
      },
      {
        user: userZemanzo,
        time: 11.23,
        link: "https://",
      },
    ],
    // shift: {
    //   user: userZemanzo,
    //   shifts: 2,
    //   link: "https://",
    // },
    shift: {
      shifts: 2,
    },
  },
};

const fallBackTheme = {
  accentColor: "#eee",
  accentColorDark: "#444",
  textColor: "#222222",
};

type SectionTheme = {
  accentColor: string;
  accentColorDark: string;
  textColor: string;
};

type SectionProps = {
  title: string;
  theme?: SectionTheme;
  levels: LevelDetails[];
};

export default function Section({
  title,
  theme = fallBackTheme,
  levels,
}: SectionProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SectionHeader title={title} />
        {levels.map((levelDetails) => (
          <Level levelDetails={levelDetails} />
        ))}
      </ThemeProvider>
    </>
  );
}
