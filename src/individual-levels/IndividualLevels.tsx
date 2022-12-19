import { StyledLevels } from "./IndividualLevels.style";
import LEVELS from "../levels.json";
import WINGS from "../wings.json";
import Section from "./Section";
import { LevelDetails, WebLink } from "../types";

const groupedLevels = groupArrayByProperty(LEVELS, "wing");

export default function IndividualLevels() {
  const sections = Object.entries(groupedLevels).map(([sectionId, levels]) => {
    const sectionWing = WINGS.find((wing) => sectionId === wing.id);
    const sectionLevels: LevelDetails[] = levels.map((level) => ({
      number: level.id + 1,
      levelId: level.wingId,
      webLink: level.speedruncomLink as WebLink,
      title: level.title,
      records: {
        time: [],
        shift: { shifts: 0 },
      },
    }));

    return sectionWing ? (
      <Section
        title={sectionWing.title}
        theme={sectionWing.theme}
        levels={sectionLevels}
      />
    ) : (
      <></>
    );
  });
  return <StyledLevels>{sections}</StyledLevels>;
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
