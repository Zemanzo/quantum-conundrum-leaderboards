import { ThemeProvider } from "styled-components";
import { LevelDetails } from "../types";
import Level from "./Level/Level";
import SectionHeader from "./SectionHeader";

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
          <Level levelDetails={levelDetails} key={levelDetails.apiId} />
        ))}
      </ThemeProvider>
    </>
  );
}
