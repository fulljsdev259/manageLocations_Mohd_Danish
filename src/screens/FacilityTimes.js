import React from "react";
import FacilityTime from "../components/generic/FacilityTime";

export default function FacilityTimes({handleFacilityModal, handleFacilityTimes, days}) {

  return (
    <div className="facility-time-modal">
      <div className="facility-time-card">
        <div className="title">Facility Times</div>
        <div className="fecility-header">
          <div>From</div>
          <div>To</div>
        </div>
        {days.map((day) => (
          <div className="facility-wrapper" key={`${day.id}`}>
            <FacilityTime handleFacilityTimes={handleFacilityTimes} day={day} />
          </div>
        ))}
        <div className="buttons-wrapper">
          <div className="buttons">
            <div
                onClick={()=>handleFacilityModal('cancel')}
              className="cancel-btn btn"
            >
              Cancel
            </div>
            <div onClick={()=>handleFacilityModal('save')} className="save-btn btn">
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
