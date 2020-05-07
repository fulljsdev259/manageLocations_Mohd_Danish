import React, { useState, useEffect } from "react";
import GenericTextInput from "../components/generic/GenericTextInput";
import { usaState } from "../utils/dummyData";
import Dropdown from "../components/generic/Dropdown";
import TimezonePicker from "react-bootstrap-timezone-picker";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
import validator, { phoneFormatter } from "../utils/validator";
import FacilityTimes from "./FacilityTimes";
import { days } from "../utils/dummyData";

export default function AddLocation({
  handleAddLocationModal,
  handleGetLocation,
  locationToUpdate,
}) {
  const [isFacilityTimesModal, setFacilityTimesModal] = useState(false);
  const [facilityTimesData, setFacilityTimes] = useState(days);
  const [state, setState] = useState({
    locationDetails: {
      locationName: "",
      addressLine1: "",
      suiteNo: "",
      addressLine2: "",
      states: "",
      city: "",
      zipCode: "",
      phoneNumber: "",
      timeZone: "",
      facilityTimes: [],
      appointmentPool: "",
    },
    errors: {},
    isDropdown: false,
  });

  //handling facility modal
  function handleFacilityModal(action) {
    if (action === "cancel" && !locationToUpdate) {
      setFacilityTimes(days);
    }
    setFacilityTimesModal(!isFacilityTimesModal);
  }

  //adding locations
  function addLocation() {
      let data = { ...state.locationDetails };
      data.phoneNumber = phoneFormatter(state.locationDetails.phoneNumber);
      data.facilityTimes = facilityTimesData;
      var request = window.db
        .transaction(["locations"], "readwrite")
        .objectStore("locations")
        .add(data);

      request.onsuccess = function (event) {
        handleAddLocationModal();
        handleGetLocation('add');
        console.log("location has added successfully");
      };

      request.onerror = function (event) {
        console.log("Unable to add data is aready exist in your database! ");
      };
  }

  //handling input fields value
  function handleChange(event) {
    let locationDetails = { ...state.locationDetails };
    locationDetails[event.target.name] = event.target.value;
    setState({ ...state, locationDetails });
  }

  //setting up the field if needs to update a location
  useEffect(() => {
    if (locationToUpdate) {
      let data = locationToUpdate
      data.phoneNumber = locationToUpdate.phoneNumber.replace(/[^A-Z0-9]+/ig, "")
      setFacilityTimes(locationToUpdate.facilityTimes)
      setState({ ...state, locationDetails: data });
    }
  }, []);

  //updating location
  function handleUpdateLocation() {
    var objectStore = window.db
      .transaction(["locations"], "readwrite")
      .objectStore("locations");
    var request = objectStore.get(locationToUpdate.id);

    request.onerror = function (event) {
      // Handle errors!
    };
    request.onsuccess = function (event) {
      let data = { ...state.locationDetails };
      data.phoneNumber = phoneFormatter(state.locationDetails.phoneNumber);
      data.facilityTimes = facilityTimesData;
      var requestUpdate = objectStore.put(data);

       requestUpdate.onerror = function(event) {

       };
       requestUpdate.onsuccess = function(event) {
          handleGetLocation('add')
          handleAddLocationModal()
         console.log('Successfully Update!.');
       };
    };
  }

  //handling errors and then allowing function to be executed
  function handleAddOrUpdateLocation(){
    const errors = validator(state.locationDetails);
    setState({ ...state, errors });
    if (!Object.keys(errors).length) {
      if(locationToUpdate){
        handleUpdateLocation()
      }else{
        addLocation()
      }
    }
  }

  //hanlding facility time
  function handleFacilityTimes(action, id, value, from, to) {
    let facilityData = [...facilityTimesData];
    switch (action) {
      case "check":
        facilityData[id].checked = !facilityData[id].checked;
        setFacilityTimes(facilityData);
        return;
        break;
      case "to":
        facilityData[id].to = value;
        setFacilityTimes(facilityData);
        return;
        break;
      case "from":
        facilityData[id].from = value;
        setFacilityTimes(facilityData);
        return;
        break;
      case "applyToAll":
        let data = [];
        facilityData.forEach((list) => {
          let time = { ...list };
          if(list.checked){
            time.from = from;
            time.to = to;
          }
          data.push(time);
        });
        setFacilityTimes(data);
        return;
        break;
      default:
        return null;
    }
  }

  return (
    <>
      {isFacilityTimesModal && (
        <div className="facility-times-modal">
          <FacilityTimes
            days={facilityTimesData}
            handleFacilityTimes={handleFacilityTimes}
            handleFacilityModal={handleFacilityModal}
          />
        </div>
      )}
      <div className="add-locaton">
        {/* <Header/> */}
        <div className="add-location-card">
          <div>Add Location</div>
          <div className="row main">
            <div className="location-name">
              <GenericTextInput
                lable={"Location Name"}
                name="locationName"
                onChange={handleChange}
                value={state.locationDetails.locationName}
                error={state.errors.locationName}
              />
            </div>
          </div>
          <div className="row main">
            <div className="input-wrapper">
              <GenericTextInput
                lable={"Address Line 1"}
                name="addressLine1"
                onChange={handleChange}
                value={state.locationDetails.addressLine1}
                error={state.errors.addressLine1}
              />
            </div>
            <div className="input-wrapper">
              <GenericTextInput
                lable={"Suite No."}
                name="suiteNo"
                onChange={handleChange}
                value={state.locationDetails.suiteNo}
              />
            </div>
          </div>
          <div className="row main">
            <div className="input-wrapper">
              <GenericTextInput
                lable={"Address Line 2"}
                name="addressLine2"
                onChange={handleChange}
                value={state.locationDetails.addressLine2}
              />
            </div>
            <div className="row input-wrapper">
              <div className="input-wrapper">
                <Dropdown
                  isDropdown={state.isDropdown}
                  selectedState={state.locationDetails.states}
                  onClick={(value) => {
                    let states = state;
                    states.locationDetails.states = value;
                    setState({ ...state });
                  }}
                  data={usaState}
                />
              </div>
              <div className="input-wrapper">
                <GenericTextInput
                  lable={"City"}
                  name="city"
                  onChange={handleChange}
                  value={state.locationDetails.city}
                />
              </div>
            </div>
          </div>
          <div className="row main">
            <div className="row input-wrapper">
              <div className="input-wrapper">
                <GenericTextInput
                  lable={"Zip Code"}
                  name="zipCode"
                  onChange={handleChange}
                  value={state.locationDetails.zipCode}
                  maxLength={10}
                />
              </div>
              <div className="input-wrapper">
                <GenericTextInput
                  lable={"Phone Number"}
                  name="phoneNumber"
                  onChange={handleChange}
                  value={state.locationDetails.phoneNumber}
                  error={state.errors.phoneNumber}
                  maxLength={10}
                />
              </div>
            </div>
            <div className="input-wrapper">
              <div className="timer-zone-picker-wrapper">
                <div className="location-lable">Time Zone</div>
                <TimezonePicker
                  absolute={true}
                  // defaultValue="Europe/Moscow"
                  placeholder=""
                  value={state.locationDetails.timeZone}
                  style={{ border: "unset" }}
                  className="location-time-zone-picker"
                  onChange={(value) => {
                    let states = state;
                    states.locationDetails.timeZone = value;
                    setState({ ...state });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row main">
            <div className="input-wrapper">
              <GenericTextInput
                lable={"Facility Times"}
                name="facilityTimes"
                onFocus={handleFacilityModal}
                // value={state.locationDetails.facilityTimes}
              />
            </div>
            <div className="input-wrapper">
              <GenericTextInput
                lable={"Appointment Pool"}
                name="appointmentPool"
                onChange={handleChange}
                value={state.locationDetails.appointmentPool}
              />
            </div>
          </div>
          <div className="buttons-wrapper">
            <div className="buttons">
              <div onClick={handleAddLocationModal} className="cancel-btn btn">
                Cancel
              </div>
              <div onClick={handleAddOrUpdateLocation} className="save-btn btn">
                {locationToUpdate ? 'Update' : 'Save'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
