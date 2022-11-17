import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MyOrders = ({ location, user }) => {
  const { addToast } = useToasts();
  const { pathname } = location;
  const [Myorders, setMyorders] = useState([]);
  const [Products, setProducts] = useState([]);
  const userId = user?.CUST_ID;
  const history = useHistory();

  // useEffect(() => {
  //   if (!user) {
  //     history.push("/");
  //   }
  // }, []);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`/api/user/get-my-orders/${userId}`);
        setMyorders(data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/user/view-my-orders-products");
        setProducts(data);
      } catch (error) {
        addToast("Somthing Went Wrong", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    })();
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Thepaaki | MyOrders</title>
        <meta
          name="description"
          content="Myorders page of thepaaki website"
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        MyOrders
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {Myorders && Myorders.length >= 1 && Products.length >= 1 ? (
              <Fragment>
                {Myorders.map((items, index) => {
                  return (
                    <>
                      <p className="cart-page-title mt-4" key={index}>
                        ORDER DATE:{items.Date}
                        <br />
                        ORDER ID:{items.Id}
                        <br />
                        {items.wallet ? (
                          <>
                            AMOUNT :
                            {parseInt(items?.Total) + parseInt(items.wallet)}
                          </>
                        ) : (
                          <>AMOUNT:{items.Total}</>
                        )}
                        {items?.wallet && (
                          <p>WALLET APPLY AMOUNT:{items.wallet}</p>
                        )}
                      </p>
                      <div className="row">
                        <div className="col-12">
                          <div className="table-content table-responsive cart-table-content">
                            <table>
                              <thead>
                                <tr>
                                  <th>Image</th>
                                  <th>Product Name</th>
                                  <th>QTY</th>
                                  <th>AMOUNT</th>
                                  <th>TOTAL</th>
                                  <th>STATUS</th>
                                  {/* <th>action</th> */}
                                </tr>
                              </thead>
                              {items?.Product.map((single, index) => {
                                const result = Products.find(
                                  (item) => item.id === single.ProductID
                                );
                                console.log(result, "DDCCC");
                                var finalProductPrice;
                                var finalDiscountedPrice;
                                if (user.user == true) {
                                  if (single?.offer) {
                                    const discountedPrice =
                                      (result?.price * single?.offer) / 100;
                                    finalProductPrice = result?.price;
                                    finalDiscountedPrice =
                                      result?.price - discountedPrice;
                                  } else if (result?.discount) {
                                    const discountPrice =
                                      (result?.price * result?.discount) / 100;
                                    finalProductPrice = result?.price;
                                    finalDiscountedPrice =
                                      result?.price - discountPrice;
                                  } else {
                                    console.log("nodicvoutnn");
                                    console.log(result.price);
                                    finalDiscountedPrice = result?.price;
                                  }
                                } else {
                                  finalProductPrice = result?.price;
                                  finalDiscountedPrice = result?.wholesaler;
                                }

                                return (
                                  <tbody>
                                    <tr>
                                      <td className="product-thumbnail">
                                        <img
                                          style={{
                                            height: "150px",
                                            width: "120px",
                                          }}
                                          className="img-fluid"
                                          src={result?.image[0].url}
                                          alt=""
                                        />
                                      </td>

                                      <td className="product-name">
                                        {result?.name}

                                        <div className="cart-item-variation">
                                          <span>Color: {single?.color}</span>
                                          <span>Size: {single?.size}</span>
                                        </div>
                                      </td>
                                      <td className="product-price-cart">
                                        <input
                                          className="cart-plus-minus-box"
                                          type="text"
                                          value={single?.quantity}
                                          readOnly
                                        />
                                      </td>

                                      <td className="product-price-cart">
                                        <Fragment>
                                         
                                              {" "}
                                              {finalProductPrice&&<span className="amount old">
                                                {"₹" + finalProductPrice}
                                              </span>}
                                              <span className="amount">
                                                {"₹" + finalDiscountedPrice}
                                              </span>
                                            
                                        
                                        </Fragment>
                                      </td>  

                                      <td className="product-quantity">
                                        <span className="amount">
                                          {"₹" +
                                            single.quantity *
                                              finalDiscountedPrice}
                                        </span>
                                      </td>
                                      {items.status == "Pending" ? (
                                        <td>
                                          <a className="text-danger">
                                            {items.status}
                                          </a>
                                        </td>
                                      ) : (
                                        <td>
                                          <a className="text-success">
                                            {items.status}
                                          </a>
                                        </td>
                                      )}
                                      {/* <td>
                                        <a className="text-danger">Cancell</a>
                                      </td> */}
                                    </tr>
                                  </tbody>
                                );
                              })}
                              <div
                                className="row"
                                style={{ marginLeft: "1rem" }}
                              >
                                <div className="col-6">
                                  <b>TO:</b>
                                  <br />
                                  <p>
                                    {items.Address?.Name +
                                      "," +
                                      items.Address?.LastName}
                                    ,<br />
                                    {items.Address?.StreetAddress},
                                    {items.Address.State},
                                    {items.Address?.TownCity},
                                    {items.Address?.Pincode},<br />
                                    {items.Address?.Email},<br />
                                    {items.Address?.PhoneNumber},<br />
                                    {items.Address?.message && (
                                      <b>{items.Address?.message}</b>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* <div className="row">
                        <div className="col-lg-12">
                          <div className="cart-shiping-update-wrapper">
                            <div className="cart-shiping-update">
                              <Link
                                to={
                                  process.env.PUBLIC_URL + "/shop-grid-standard"
                                }
                              >
                                Continue Shopping
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </>
                  );
                })}
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyOrders.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    user: state.userData.user,
  };
};

export default connect(mapStateToProps)(MyOrders);
