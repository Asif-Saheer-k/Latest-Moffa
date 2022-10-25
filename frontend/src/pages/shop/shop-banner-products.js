import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import rootReducer from "../../redux/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { fetchProducts } from "../../redux/actions/productActions";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom";
import ShopSearch from "../../components/product/ShopSearch";

const ShopGridStandard = ({ location, product, user }) => {
  const [layout, setLayout] = useState("grid two-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { addToast } = useToasts();
  const pageLimit = 15;
  const { pathname } = location;
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const item = useParams();
  const itemId = item.id;

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/superAdmin/view-all-products");
        const store = createStore(
          rootReducer,
          load(),
          composeWithDevTools(applyMiddleware(thunk, save()))
        );
        console.log(itemId, "FSDFCC");
        if (itemId == "new" || itemId == "best") {
          const result = getSortedProducts(data, itemId, true);
          setProducts(result);
        } else {
          const result = getSortedProducts(data, "category", itemId);
          setProducts(result);
        }

        store.dispatch(fetchProducts(data));
      } catch (error) {
        addToast("Somthing Went Wrong", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    })();
  }, []);

  useEffect(() => {}, [items]);

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Fragment>
      <MetaTags>
        <title>Moffa | Shop Page</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                />
              </div>

              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
           
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                  getSortParams={getSortParams}
                />

                {/* shop page content default */}
                <ShopProducts
                  layout={layout}
                  products={currentData}
                  user={user}
                />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state, ownProps, product) => {
  const itemId = ownProps.match.params.id;
  // if (itemId === "new") {
  //   return {
  //     products: getSortedProducts(state.productData.products, itemId, true),
  //   };
  // }
  // if (itemId === "best") {
  //   return {
  //     products: getSortedProducts(state.productData.products, itemId, true),
  //   };
  // }
  // if (itemId == "featured") {
  //   return {
  //     products: getSortedProducts(state.productData.products, itemId, true),
  //   };
  // }
};

export default connect(mapStateToProps)(ShopGridStandard);
