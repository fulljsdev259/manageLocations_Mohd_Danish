import React, { useState } from "react";
import CheckBox from "./CheckBox";
import * as Datetime from "react-datetime";
import moment from "moment";

export default function FacilityTime({ day, handleFacilityTimes }) {

  function handleFacilities(action, id, value, from, to) {
    handleFacilityTimes(action, id, value, from, to);
  }

  return (
    <div className="days-row common">
      <div className="common main">
        <CheckBox
          onClick={() => handleFacilities("check", day.id)}
          checked={day.checked}
        />
        <div className="day-name">{day.day}</div>
      </div>
      <div className="seperator" />
      <div className="common main">
        <div className="time-container">
          <Datetime
            className="date-picker date"
            inputProps={{ placeholder: "HH:MM", disabled: !day.checked }}
            dateFormat={false}
            timeFormat={"HH:mm"}
            value={
              moment(day.from, "hh:mm A").format("hh:mm A") !== "Invalid date"
                ? moment(day.from, "hh:mm A").format("HH:mm")
                : ""
            }
            onChange={(value) =>
              value.format &&
              handleFacilities("from", day.id, value.format("hh:mm A"))
            }
          />
        </div>
        <div className="common">
          <div
            className={`meridiem-btn from-am ${
              day.from.includes("AM") ? "active-btn" : ""
            }`}
          >
            AM
          </div>
          <div
            className={`meridiem-btn from-pm ${
              day.from /*  */
                .includes("PM")
                ? "active-btn"
                : ""
            }`}
          >
            PM
          </div>
        </div>
      </div>
      <div className="seperator" />
      <div className="common main">
        <div className="time-container">
          <Datetime
            className="date-picker date"
            inputProps={{ placeholder: "HH:MM", disabled: !day.checked }}
            dateFormat={false}
            timeFormat={"HH:mm"}
            value={
              moment(day.to, "hh:mm A").format("hh:mm A") !== "Invalid date"
                ? moment(day.to, "hh:mm A").format("HH:mm")
                : ""
            }
            onChange={(value) =>
              value.format &&
              handleFacilities("to", day.id, value.format("hh:mm A"))
            }
          />
        </div>
        <div className="common">
          <div
            className={`meridiem-btn to-am ${
              day.to.includes("AM") ? "active-btn" : ""
            }`}
          >
            AM
          </div>
          <div
            className={`meridiem-btn to-pm ${
              day.to.includes("PM") ? "active-btn" : ""
            }`}
          >
            PM
          </div>
        </div>
      </div>
      <div className="seperator" />
      <button
        className={`main apl-btn ${day.checked  && (day.from && day.to) ? "active" : "disable"}`}
        disabled={!day.checked || (!day.from && !day.to)}
        onClick={()=>handleFacilities('applyToAll', day.id, '', day.from, day.to)}
      >
        Apply to All Checked
      </button>
    </div>
  );
}
