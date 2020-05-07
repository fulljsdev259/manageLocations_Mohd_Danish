import React from "react";

export default function LocationItem({
  item,
  paginationData,
  index,
  handleUpdateLocation,
  handleDeleteLocation,
}) {
  function handleIndex() {
    return (
      index + (paginationData.currentPage - 1) * paginationData.numberOfItem + 1
    );
  }
  return (
    <div className="location-list-item">
      <div className="number-div item">
        <div className="number-of-wrapper ">
          <span className="number-of">
            {handleIndex()}
          </span>
        </div>
        <span>{item.name}</span>
      </div>
      <div className="item ">{item.locationName}</div>
      <div className="item">{item.phoneNumber}</div>
      <div className="item">
        <i
          onClick={() => handleUpdateLocation(item)}
          className="fa fa-pencil"
        />
        <i
          onClick={() => handleDeleteLocation(item.id)}
          className="fa fa-trash"
        />
      </div>
    </div>
  );
}
