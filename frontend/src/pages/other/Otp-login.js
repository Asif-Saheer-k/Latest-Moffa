import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";
import axios from "axios";
import Loading from "./spinner";

const LoginRegister = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const { pathname } = location;
  const history = useHistory();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const phone = data.Phone;
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/otpLogin",
        { phone },
        config
      );
      setLoading(false);
      addToast(data, { appearance: "success" , autoDismiss: true,});
      history.push(`/Otp-login-verification/${phone}`);
    } catch (error) {
      setLoading(false);
      addToast(error.response.data, { appearance: "error" , autoDismiss: true,});
    }
  };

  return (
    <ToastProvider>
      <Fragment>
        <MetaTags>
          <title>Thepaaki| OTP-Login</title>
          <meta
            name="description"
            content="Otp Login page of thepaaki website"
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
          Home
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          OTP-LOGIN
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="login-register-area pt-100 pb-100">
            <div className="container mt-5">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="otp">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="otp">
                            <h4>OTP-LOGIN</h4>
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
                                  placeholder="Enter Your Registed Phone Number "
                                  maxLength="10"
                                  {...register("Phone", {
                                    required: "Please Enter Phone Number",
                                    pattern: {
                                      value:
                                        /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/,
                                      message: "Invalid Phone Number",
                                    },
                                  })}
                                  onKeyUp={() => {
                                    trigger("Phone");
                                  }}
                                />
                                {errors.OTP && (
                                  <small className="text-danger">
                                    {errors.OTP.message}
                                  </small>
                                )}

                                <div className="button-box">
                                  <div className="login-toggle-btn"></div>
                                  <button type="submit">
                                    <span>
                                      {" "}
                                      {loading ? <Loading /> : "Login"}
                                    </span>
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
};

export default LoginRegister;
