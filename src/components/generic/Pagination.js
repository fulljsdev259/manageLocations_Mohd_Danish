import React from "react";

export default function Pagination({
  paginationData,
  handlePage,
}) {
  return (
    <div className="pagination-wrapper">
      <div className="item-per-page-wrapper main-item">
        <div>Items per page: </div>
        <div className="select-pages-wrapper">
          <select
            value={paginationData.numberOfItem}
            onChange={(event) => handlePage("numOfItem", event)}
            className="select-pages"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
          </select>
        </div>
      </div>
      <div className="main-item">
        {paginationData.currentPage} of{" "}
        {Math.ceil(
          paginationData.totalLocations / paginationData.numberOfItem
        )}
      </div>
      <div className="main-item arrow-keys-wrapper">
        <div onClick={()=>handlePage('pagePre')}>
          |<i className="fa fa-angle-left" />
        </div>
        <div onClick={()=>handlePage('pagePre')}>
          <i className="fa fa-angle-left" />
        </div>
        <div onClick={()=>handlePage('pageNext')}>
          <i className="fa fa-angle-right" />
        </div>
        <div onClick={()=>handlePage('pageNext')}>
          <i className="fa fa-angle-right" />|
        </div>
      </div>
    </div>
  );
}
