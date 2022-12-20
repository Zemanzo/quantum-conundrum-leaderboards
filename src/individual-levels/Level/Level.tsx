import { LevelDetails, LevelTimeRecord } from "../../types";
import { useDataContext } from "../DataContext";
import LevelImage from "./LevelImage";
import LevelMeta from "./LevelMeta";
import LevelShifts from "./LevelShifts";
import LevelTimes from "./LevelTimes";
import LevelTitle from "./LevelTitle";
import LevelLoader from "./LevelLoader";

type LevelProps = {
  levelDetails: LevelDetails;
};

export default function Level({ levelDetails }: LevelProps) {
  const { number, levelId, apiId, webLink, title } = levelDetails;
  const { isLoading, runs } = useDataContext();

  const timeRecords =
    (!isLoading &&
      runs?.[apiId]?.map<LevelTimeRecord>((run) => ({
        userId: run.userId,
        time: run["min(time)"],
        link: "https://",
      }))) ||
    [];

  const shiftRecords = {
    shifts: 0,
  };

  return (
    <>
      <LevelImage levelId={levelId} />
      <LevelMeta number={number} levelId={levelId} />
      <LevelTitle webLink={webLink}>{title}</LevelTitle>
      {isLoading ? (
        <LevelLoader />
      ) : (
        <>
          <LevelTimes records={timeRecords} />
          <LevelShifts record={shiftRecords} />
        </>
      )}
      {/* <div class="image">
      <img src="http://qc.zemanzo.nl/265pThumbnails/{{wingId}}.jpg"/>
    </div>
    <div class="title">
      {{#weblink}}<a href="{{weblink}}">{{/weblink}}{{title}}{{#weblink}}</a>{{/weblink}}
    </div>
    <div class="time">
      {{#records.time}}
        <div class="entry">
          <div>{{user.name}}</div>
          <div>{{time}}</div>
        </div>
      {{/records.time}}
    </div>
    <div class="shift">
      <div class="entry{{#records.shift.unset}} unset{{/records.shift.unset}}">
        <div>{{records.shift.amount}}</div>
        {{^records.shift.unset}}
          <div>{{records.shift.user.name}}</div>
        {{/records.shift.unset}}
      </div>
    </div> */}
    </>
  );
}
