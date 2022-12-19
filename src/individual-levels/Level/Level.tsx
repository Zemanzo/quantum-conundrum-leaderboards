import { LevelDetails } from "../../types";
import LevelImage from "./LevelImage";
import LevelMeta from "./LevelMeta";
import LevelShifts from "./LevelShifts";
import LevelTimes from "./LevelTimes";
import LevelTitle from "./LevelTitle";

type LevelProps = {
  levelDetails: LevelDetails;
};

export default function Level({ levelDetails }: LevelProps) {
  const { number, levelId, webLink, title, records } = levelDetails;

  return (
    <>
      <LevelImage levelId={levelId} />
      <LevelMeta number={number} levelId={levelId} />
      <LevelTitle>{title}</LevelTitle>
      <LevelTimes records={records.time} />
      <LevelShifts record={records.shift} />
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
