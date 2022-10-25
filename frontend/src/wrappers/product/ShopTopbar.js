import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ShopSearch from "../../components/product/ShopSearch";
import ShopTopAction from "../../components/product/ShopTopAction";


const ShopTopbar = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
  getSortParams
}) => {
  return (
    <Fragment>
      {/* shop top action */}
      <ShopTopAction
        getLayout={getLayout}
        getFilterSortParams={getFilterSortParams}
        productCount={productCount}
        sortedProductCount={sortedProductCount}
        getSortParams={getSortParams}
      />
    </Fragment>
  );
};

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  getSortParams: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
 
};

export default ShopTopbar;
