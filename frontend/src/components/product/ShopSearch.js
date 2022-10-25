import React from "react";
import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";

const ShopSearch = ({ getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input
            type="text"
            onChange={(e) => {
              getSortParams("name",e.target.value);
              setActiveSort(e);
            }}
            placeholder="Search here..."
          />
          {/* <button>
            <i className="pe-7s-search" />
          </button> */}
        </form>
      </div>
    </div>
  );
};
ShopSearch.propTypes = {
  getSortParams: PropTypes.func
};

export default ShopSearch;
