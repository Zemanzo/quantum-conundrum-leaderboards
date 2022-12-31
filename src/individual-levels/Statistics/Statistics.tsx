import { useReducer } from "react";
import { ApiResponseUsers, SortedRuns, SortedShifts } from "../../types";
import CircleGraph from "./CircleGraph";
import {
  StyledStatistics,
  StyledWingEntry,
  StyledWings,
  GraphsContainer,
} from "./Statistics.style";
import WINGS from "../../wings.json";
import LEVELS from "../../levels.json";

type StatisticsProps = {
  runs?: SortedRuns;
  shifts?: SortedShifts;
  users?: Record<string, ApiResponseUsers[number]>;
};

type Wings = typeof WINGS;

export function selectedSectionsReducer(
  state: Record<Wings[number]["id"], boolean>,
  action: { wing: string; isEnabled: boolean }
) {
  return { ...state, [action.wing]: action.isEnabled };
}

export default function Statistics({ runs, shifts, users }: StatisticsProps) {
  const [enabledSections, toggleSection] = useReducer(selectedSectionsReducer, {
    blue: true,
    yellow: true,
    red: true,
    uberids: true,
    desmonddebacle: false,
    ikearamba: false,
  });
  if (!runs || !shifts || !users) {
    return <StyledStatistics>Loading...</StyledStatistics>;
  }
  const filteredLevels = LEVELS.filter((level) => enabledSections[level.wing]);
  const runsData = filteredLevels.map((level) => {
    return {
      amount: runs[level.apiId]?.[0]?.["min(time)"] ?? 0,
      color: getWingColor(level.wing),
      additionalInfo: {
        unit: "second",
        Level: level.title,
        scrollTo: level.apiId,
      },
    };
  });
  const shiftsData = filteredLevels.map((level) => {
    return {
      amount: shifts[level.apiId]?.[0]?.["min(shifts)"] ?? 0,
      color: getWingColor(level.wing),
      additionalInfo: {
        unit: "shift",
        Level: level.title,
        scrollTo: level.apiId,
      },
    };
  });
  const runWrsData = getRunWrsData(runs, enabledSections, users);
  const runsWrLeader = runWrsData[runWrsData.length - 1].additionalInfo.User;
  const onlyOneEnabledSection = Boolean(
    Object.values(enabledSections).reduce<number>(
      (acc, isEnabled, index, arr) => {
        if (isEnabled) {
          acc++;
        }
        if (index === arr.length - 1) {
          return acc === 1 ? 1 : 0;
        }
        return acc;
      },
      0
    )
  );

  return (
    <StyledStatistics>
      <StyledWings>
        <h3>Toggle sections</h3>
        {WINGS.map((wing) => (
          <StyledWingEntry textColor={wing.theme.accentColor} key={wing.id}>
            <input
              type="checkbox"
              id={`checkbox-${wing.id}`}
              checked={enabledSections[wing.id]}
              disabled={onlyOneEnabledSection && enabledSections[wing.id]}
              onChange={(event) =>
                toggleSection({
                  wing: wing.id,
                  isEnabled: event.target.checked,
                })
              }
            />
            <label htmlFor={`checkbox-${wing.id}`}>{wing.title}</label>
          </StyledWingEntry>
        ))}
      </StyledWings>
      <GraphsContainer>
        <CircleGraph
          values={runsData}
          mainText={formatRunsSum}
          subText={"Total time"}
        />
        <CircleGraph
          values={shiftsData}
          mainText={formatShiftsSum}
          subText={"Total shifts"}
        />
        <CircleGraph
          values={runWrsData}
          mainText={runsWrLeader}
          subText={"has most time WRs"}
        />
      </GraphsContainer>
    </StyledStatistics>
  );
}

function getWingColor(wingId: string) {
  const wing = WINGS.find((wing) => wingId === wing.id);
  if (wing) {
    return wing.theme.accentColor;
  }
  return "#666";
}

function formatRunsSum(sum: number) {
  const minutes = Math.floor(sum / 60);
  const seconds = sum - minutes * 60;
  return `${minutes.toFixed(0).padStart(2, "0")}:${seconds
    .toFixed(2)
    .padStart(5, "0")}`;
}

function formatShiftsSum(sum: number) {
  return sum.toFixed(0);
}

function getRunWrsData(
  runs: SortedRuns,
  enabledSections: Record<string, boolean>,
  users: Record<string, ApiResponseUsers[number]>
) {
  const userIndex: Record<string, number> = {};
  let i = 0;
  return Object.values(runs)
    .reduce<
      Array<{
        amount: number;
        color: string;
        additionalInfo: {
          User: string;
          [key: string]: any;
        };
      }>
    >((acc, run) => {
      const wing = getWingForLevel(run[0]?.levelId);
      if (wing && !enabledSections[wing]) {
        return acc;
      }
      const user = run[0]?.userId;
      if (isNaN(userIndex[user])) {
        userIndex[user] = i++;
      }
      if (!acc[userIndex[user]]) {
        acc[userIndex[user]] = {
          amount: 0,
          color: users[user].color ?? "var(--theme-purple)",
          additionalInfo: {
            User: users[user].userName,
            unit: "world record",
          },
        };
      }
      acc[userIndex[user]].amount++;
      return acc;
    }, [])
    .sort((a, b) => a.amount - b.amount);
}

function getWingForLevel(levelId: string) {
  return LEVELS.find((level) => level.apiId === levelId)?.wing;
}
