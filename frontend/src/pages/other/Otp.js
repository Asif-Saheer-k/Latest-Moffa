import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory, useParams } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Timer from "otp-timer";
import { connect } from "react-redux";
import axios from "axios";
import rootReducer from "../../redux/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { fetchUser } from "../../redux/actions/userAction";
import { composeWithDevTools } from "redux-devtools-extension";

const LoginRegister = ({ location, user }) => {
  const { phone } = useParams();
  const { addToast } = useToasts();
  const { pathname } = location;
  const history = useHistory();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });
  const handleClick = async () => {
    if (!phone) {
      try {
        const { data } = await axios.get("/api/user/resent-otp");

        addToast("Successfuly Sent", {
          appearance: "success",
          autoDismiss: true,
        });
      } catch (error) {
        addToast("Somthing Went Wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else {
      try {
        const { data } = await axios.post("/api/user/otpLogin", { phone });
        addToast("Successfuly Sent", {
          appearance: "success",
          autoDismiss: true,
        });
      } catch (error) {
        addToast("Somthing Went Wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  const onSubmit = async (data) => {
    const otp = data.OTP;
    if (phone) {
      try {
        const { data } = await axios.post(`/api/user/otpLogin/${otp}`);
        const store = createStore(
          rootReducer,
          load(),
          composeWithDevTools(applyMiddleware(thunk, save()))
        );
        store.dispatch(fetchUser(data));
        window.location.reload(false);
        addToast("logged in successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      } catch (error) {
        addToast(error.response.data, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else {
      try {
        const { data } = await axios.post(`/api/user/register/${otp}`);
        addToast(data, { appearance: "success", autoDismiss: true });
        history.push("/login-register");
      } catch (error) {
        addToast(error.response.data, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  return (
    <ToastProvider>
      <Fragment>
        <MetaTags>
          <title>Thepaaki | OTP</title>
          <meta
            name="description"
            content="OTP page of thepaaki website"
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
          Home
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          OTP
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="otp">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="otp">
                            <h4>OTP-VERIFICATION</h4>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="otp">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                  autoComplete="off"
                                  type="phoneNumber"
                                  placeholder="Enter 6 Digits OTP "
                                  maxLength="6"
                                  {...register("OTP", {
                                    required: "Please Enter OTP",
                                    pattern: {
                                      value: /^[0-9]{1,6}$/,
                                      message: "Invalid OTP",
                                    },
                                  })}
                                  onKeyUp={() => {
                                    trigger("OTP");
                                  }}
                                />
                                {errors.OTP && (
                                  <small className="text-danger">
                                    {errors.OTP.message}
                                  </small>
                                )}

                                <div className="button-box">
                                  <div className="login-toggle-btn">
                                    {/* <input type="checkbox" />
                                    <label className="ml-10">Remember me</label> */}
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                      <Timer
                                        seconds={30}
                                        minutes={0}
                                        resend={handleClick}
                                      />
                                    </Link>
                                  </div>
                                  <button type="submit">
                                    <span>Login</span>
                                  </button>
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
  location: PropTypes.object,
  user: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
  };
};

export default connect(mapStateToProps)(LoginRegister);
