import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import rootReducer from "../../redux/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import { save, load } from "redux-localstorage-simple";
import { fetchUser } from "../../redux/actions/userAction";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCart } from "../../redux/actions/cartActions";

const LoginRegister = ({ location, user, addToCart }) => {
  // const userInfo = useSelector((state) => state.user.value);
  const [cartProduts, setCartProduts] = useState([]);
  const [userd, setUser] = useState({});
  const [cart, setCart] = useState(false);
  const { pathname } = location;
  const { addToast } = useToasts();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      console.log(user);

      user.cartItems.map((items) => {
        addToCart(
          items.product,
          null,
          items.quantity,
          items.selectedcolor,
          items.selectedsize
        );
      });

      history.push("/");
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data, "D");
    const phone = data.phone;
    const password = data.password;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          phone,
          password,
        },
        config
      );
      const store = createStore(
        rootReducer,
        load(),
        composeWithDevTools(applyMiddleware(thunk, save()))
      );
      store.dispatch(fetchUser(data));
      addToast("logged in successfully", {
        appearance: "success",
        autoDismiss: true,
      });

      window.location.reload(false);
    } catch (error) {
      addToast(error.response.data, { appearance: "error", autoDismiss: true });
    }
  };
  // useEffect(() => {
  //   if (userd.CUST_ID) {
  //     const userId = userd.CUST_ID;
  //     (async function () {
  //       try {
  //         const { data } = await axios.get(
  //           `/api/user/view-cart-produts/${userId}`
  //         );
  //         console.log(data);
  //         setCartProduts(data);
  //         setCart(false);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();

  //     if (cartProduts[0]) {
  //       cartProduts.map((items) => {
  //         addToCart(
  //           items.product,
  //           addToast,
  //           items.quantity,
  //           items.selectedcolor,
  //           items.selectedsize
  //         );
  //       });

  //     }
  //     window.location.reload(false);
  //   }
  // }, [userd, cart]);

  return (
    <ToastProvider>
      <Fragment>
        <MetaTags>
          <title>Thepaaki | Login</title>
          <meta
            name="description"
            content="Login page of thepaaki website"
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
          Home
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Login-Register
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="login">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="login">
                            <Link to="/login-reagister">
                              <h4>Login</h4>
                            </Link>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="register">
                            <Link to="/register">
                              <h4>Register</h4>
                            </Link>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <useGoogleOneTapLogin />
                        <Tab.Pane eventKey="login">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form
                                onSubmit={handleSubmit(onSubmit)}
                                class="p-3 mt-3"
                              >
                                <input
                                  type="text"
                                  placeholder="Phone"
                                  {...register("phone", {
                                    required: "Phone is required",
                                    pattern: {
                                      value:
                                        /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/,
                                      message: "invalid phone number",
                                    },
                                  })}
                                  onKeyUp={() => {
                                    trigger("phone");
                                  }}
                                />
                                {errors.phone && (
                                  <small className="text-danger">
                                    {errors.phone.message}
                                  </small>
                                )}

                                <input
                                  autoComplete="off"
                                  type="password"
                                  name="user-password"
                                  placeholder="Password"
                                  {...register("password", {
                                    required: "password is required",
                                    pattern: {
                                      value: /^[a-zA-Z]{8,22}$/,
                                      message: "invalid password address",
                                    },
                                  })}
                                  onKeyUp={() => {
                                    trigger("password");
                                  }}
                                />
                                {errors.password && (
                                  <small className="text-danger">
                                    {errors.password.message}
                                  </small>
                                )}

                                <div className="button-box">
                           
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div>
                                      <button type="submit">
                                        <span>Login</span>
                                      </button>
                                    </div>
                                    <div>
                                      <button >
                                        <Link
                                          to={
                                            process.env.PUBLIC_URL +
                                            "/otp-login"
                                          }
                                        >
                                         OTP LOGIN
                                        </Link>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
    </ToastProvider>
  );
};

LoginRegister.propTypes = {
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
  location: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
