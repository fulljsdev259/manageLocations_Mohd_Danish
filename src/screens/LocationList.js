import React, { useState, useEffect } from "react";
import Header from "../components/generic/Header";
import LocationItem from "../components/generic/LocationItem";
import Pagination from "../components/generic/Pagination";
import AddLocation from "./AddLocation";
import nolocationImage from "../assets/images/circle-cropped.png";

export default function LocationList() {
  const [locations, setLocation] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAddLocationModal, setAddLocationModal] = useState(false);
  const [locationToUpdate, setLocationToUpdate] = useState(null);
  const [paginationData, setPagination] = useState({
    currentPage: 1,
    numberOfItem: 5,
    totalLocations: 0,
  });

  //getting locations for the page and handing pagination also
  function handleGetLocation(action, currentPage, numberOfItem) {
    setIsSuccess(false);
    window.db
      .transaction(["locations"], "readonly")
      .objectStore("locations")
      .count().onsuccess = function (event) {
      var totalLocations = event.target.result;
      switch (action) {
        case "pageNext":
          setPagination({
            ...paginationData,
            currentPage: paginationData.currentPage + 1,
            totalLocations,
          });
          return;
          break;
        case "pagePre":
          setPagination({
            ...paginationData,
            currentPage: paginationData.currentPage - 1,
            totalLocations,
          });
          return;
          break;
        case "numOfItem":
          setPagination({
            ...paginationData,
            currentPage: 1,
            totalLocations,
            numberOfItem,
          });
          return;
          break;
        case "delete" || 'add':
          setPagination({
            ...paginationData,
            totalLocations,
          });
          return;
          break;
          case 'add':
          setPagination({
            ...paginationData,
            totalLocations,
            currentPage:1
          });
          return;
          break;
        case "changePage":
          setPagination({
            ...paginationData,
            totalLocations,
            currentPage: paginationData.currentPage - 1,
          });
          return;
          break;
        default:
          setPagination({
            ...paginationData,
            totalLocations,
            numberOfItem,
          });
          return;
          break;
      }
    };
    let data = [];
    var objectStore = window.db
      .transaction(["locations"], "readonly")
      .objectStore("locations")
      .getAll();
    var getAllRequest = objectStore;
    getAllRequest.onsuccess = function () {
      for (let i = 0; i < getAllRequest.result.length; i++) {
        if (i >= currentPage && i < numberOfItem) {
          data.push(getAllRequest.result[i]);
        }
      }
      setLocation(data);
      setLoader(false);
      setIsSuccess(true);
    };
  }

  //calling the function to get locations when page is being loaded initially
  useEffect(() => {
    let timer = setTimeout(() => {
      if ("db" in window) {        
        setLoader(true);
        handleGetLocation(
          "get",
          paginationData.currentPage - 1,
          paginationData.numberOfItem
        );
      }else{
        setIsSuccess(true)
      }
    }, 1);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  //deleting a specific location as per id stores in db
  function handleDeleteLocation(id) {
    var request = (window.db
      .transaction(["locations"], "readwrite")
      .objectStore("locations")
      .delete(id).onsuccess = function (event) {
      console.log("Deleted Successfully.");
      refreshLocation("delete");
    });
  }

  //refreshing data when deleting/adding function runs
  function refreshLocation(cond) {
    let page,
      items,
      action = "delete";
    const { numberOfItem, currentPage } = paginationData;
    switch (cond) {
      case "delete":
        if (locations.length === 1) {
          if (currentPage > 1) {
            action = "changePage";
            page = numberOfItem * (currentPage - 1) - numberOfItem;
            items = numberOfItem * currentPage - numberOfItem;
            handleGetLocation(action, page, items);
          } else {
            page = 0;
            items = numberOfItem;
            handleGetLocation(action, page, items);
          }
        } else {
          page = numberOfItem * (currentPage - 1);
          items = numberOfItem * currentPage;
          handleGetLocation(action, page, items);
        }
        return;
        break;
      case "add":
        action ='add'
        page = 0;
        items = numberOfItem;
        handleGetLocation(action, page, items);
        return;
        break;
      default:
        return;
    }
  }
  //updating any specific location
  function handleUpdateLocation(data) {
    setLocationToUpdate(data);
    handleAddLocationModal();
  }

  //here handling adding location modal 
  function handleAddLocationModal() {
    if (locationToUpdate && isAddLocationModal) {
      setLocationToUpdate(null);
    }
    setAddLocationModal(!isAddLocationModal);
  }

  //handling current and page and number of items per page
  function handlePage(action, event) {
    const { numberOfItem, currentPage } = paginationData;
    switch (action) {
      case "numOfItem":
        handleGetLocation("numOfItem", 0, Number(event.target.value));
        return;
        break;
      case "pageNext":
        if (
          Math.ceil(
            paginationData.totalLocations / paginationData.numberOfItem
          ) > paginationData.currentPage
        ) {
          handleGetLocation(
            "pageNext",
            numberOfItem * currentPage,
            numberOfItem * (currentPage + 1)
          );
        }
        return;
        break;
      case "pagePre":
        if (paginationData.currentPage > 1) {
          handleGetLocation(
            "pagePre",
            numberOfItem * (currentPage - 2),
            numberOfItem * (currentPage - 1)
          );
        }
        return;
        break;
    }
  }

  return (
    <>
      {isAddLocationModal && (
        <div className="add-location-modal-wrapper">
          <AddLocation
            handleAddLocationModal={handleAddLocationModal}
            locationToUpdate={locationToUpdate}
            handleGetLocation={refreshLocation}
          />
        </div>
      )}

      <Header handleAddLocationModal={() => setAddLocationModal(true)} />
      {locations.length > 0 && (
        <div className={`list-header ${!isAddLocationModal ? "mt" : ""}`}>
          <div className={`list-header-wrapper`}>
            <div className="item">
              <span>Location Name</span>
            </div>
            <div className="item">Address</div>
            <div className="item">Phone No.</div>
            <div className="item"></div>
          </div>
          {locations.map((item, index) => (
            <LocationItem
              item={item}
              index={index}
              key={`${item.id}`}
              handleDeleteLocation={handleDeleteLocation}
              handleUpdateLocation={handleUpdateLocation}
              paginationData={paginationData}
            />
          ))}
          <Pagination paginationData={paginationData} handlePage={handlePage} />
        </div>
      )}
      {(isLoader || !locations.length) && (
        <div className="loader-nolocation-continer">
          <div className="no-added-location">
            {!locations.length && isSuccess && (
              <div className="wrapper">
                <img src={nolocationImage} />
                <div className="kindly-add">Kindly Add Your Location First</div>
                <div className="not-added">
                  There is not location added right now
                </div>
              </div>
            )}
            {isLoader && <div className="loader">Loading...</div>}
          </div>
        </div>
      )}
    </>
  );
}
