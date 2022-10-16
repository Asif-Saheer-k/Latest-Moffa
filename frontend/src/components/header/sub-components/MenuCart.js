import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import { addToCart } from "../../../redux/actions/cartActions";
import { connect } from "react-redux";
import { addToWishlist } from "../../../redux/actions/wishlistActions";

const MenuCart = ({
  cartData,
  deleteFromCart,
  user,
  addToCart,

}) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const [cartProduts, setCartProduts] = useState([]);
  useEffect(() => {
    cartData.map((product) => {
      if (product.hidden == true) {
        deleteFromCart(product, addToast);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     const userId = user.CUST_ID;
  //     (async function () {
  //       try {
  //         const { data } = await axios.get(
  //           `/api/user/view-cart-produts/${userId}`
  //         );
  //         setCartProduts(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }
  // }, []);


  const CartItemDelete = async (cartItem, addToast) => {
    deleteFromCart(cartItem, addToast);
    if (user) {
      const userID = user.CUST_ID;
      const Product = cartItem.id;
      try {
        const { data } = await axios.post("/api/user/dlete-cart-produts", {
          userID,
          Product,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // useEffect(() => {
  //   if (user && cartProduts[0]) {
  //     cartProduts.map((items) => {
  //       addToCart(
  //         items.product,
  //         null,
  //         items.quantity,
  //         items.selectedcolor,
  //         items.selectedsize
  //       );
  //     });
  //   }
  // }, [cartProduts]);

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const date = new Date().toLocaleDateString();
              var offer;
              if (single?.Deal) {
                single.Deal.map((items) => {
                  if (items.date == date) {
                    offer = items.offer;
                  }
                  if (items.data < date) {
                    deleteFromCart(single, addToast);
                    
                  }
                });
              }
              var finalProductPrice;
              var finalDiscountedPrice;
              var discountedPrice = null;
              var wholesaler = false;
              if (user?.user == true || user == null) {
                if (offer) {
                  discountedPrice = getDiscountPrice(
                    single.price,
                    offer
                  ).toFixed(0);
                } else if (single.discount) {
                  discountedPrice = getDiscountPrice(
                    single.price,
                    single.discount
                  ).toFixed(0);
                } else {
                  discountedPrice = null;
                }
                finalProductPrice = single.price;
                finalDiscountedPrice = discountedPrice;
              } else {
                wholesaler = true;
                finalProductPrice = single.price;
                finalDiscountedPrice = single.wholesaler;
                discountedPrice = single.price;
              }

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.id}>
                      <img
                        alt=""
                        src={single.image[0].url}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={"/product/" + single.id}> {single.name} </Link>
                    </h4>
                    <h6>Qty: {single.quantity}</h6>
                    <span>
                      ₹
                      {discountedPrice !== null
                        ? finalDiscountedPrice
                        : finalProductPrice}
                    </span>
                    {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single.selectedProductColor}</span>
                        <span>Size: {single.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={(e) => CartItemDelete(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button> 
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">₹{cartTotalPrice.toFixed(2)}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};



MenuCart.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
  user: PropTypes.object,
  cartData: PropTypes.array,
  deleteFromCart: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCart);
