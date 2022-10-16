import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import "react-alert-confirm/dist/index.css";
import rootReducer from "../../redux/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { fetchUser } from "../../redux/actions/userAction";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const IconGroup = ({
  currency,
  cartData,  
  wishlistData,
  user,
  deleteFromCart,
  iconWhiteClass,
}) => {

  const { addToast } = useToasts();
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };


  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const Logout = () => {
    const store = createStore(
      rootReducer,
      load(),
      composeWithDevTools(applyMiddleware(thunk, save()))
    );
    store.dispatch(fetchUser(null));
      window.location.reload(false);
    addToast("Successfuly Logouted", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  return (
    <div 
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active">
          <i className="pe-7s-search" />
        </button> 
        {/* <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" /> 
            </button> 
          </form>
        </div> */}
      </div>
      <div className="same-style header-compare">
        {user ? (
          <div className="same-style account-setting  d-lg-block">
            <button
              className="account-setting-active"
              onClick={(e) => handleClick(e)}
            >
              <i className="pe-7s-user-female" style={{ color: "green" }} />
            </button>
            <div className="account-dropdown">
              <ul>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-orders"}>
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    my account
                  </Link>
                </li>

                <li onClick={Logout}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="same-style account-setting  d-lg-block">
            <button
              className="account-setting-active"
              onClick={(e) => handleClick(e)}
            >
              <i className="pe-7s-user-female" />
            </button>
            <div className="account-dropdown">
              <ul>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Login
                  </Link> 
                </li> 
                <li>  
                  <Link to={process.env.PUBLIC_URL + "/register"}>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style" style={{backgroundColor:"#313131"}}>
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style" style={{backgroundColor:"#313131"}}>
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
          user={user}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag"/>
          <span className="count-style " style={{backgroundColor:"#313131"}} >
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" style={{Color:"#313131"}} />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  user:PropTypes.object,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
    user: state.userData.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
