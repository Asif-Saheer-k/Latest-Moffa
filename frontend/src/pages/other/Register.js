import PropTypes from "prop-types";   
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import {Link,useHistory} from "react-router-dom"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import axios from "axios";

const LoginRegister = ({ location }) => {
    const { addToast } = useToasts();
    const { pathname } = location;
    const history=useHistory();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },   
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const phone=data.phoneNumber;
    const name=data.username
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/register",
        {
          email,
          password,
          phone,
          name
        },
        config
      );
   
      addToast(data, { appearance: 'success',autoDismiss: true  });
      history.push('/Otp-verification')
    } catch (error) {
        addToast(error.response.data, { appearance: 'error',autoDismiss: true  });
    
    }
  };

  return (
    <ToastProvider>
    <Fragment>
      <MetaTags>
        <title>Thepaaki | Register</title>
        <meta
          name="description"
          content="Register page of thepaaki website"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login-Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link  eventKey="login">
                            <Link to='/login-register'>
                          <h4>Login</h4>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                        <Link to='/register'>     
                          <h4>Register</h4>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <input
                              autoComplete="off"
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                
                                {...register("username", {
                                  required: "username is required",
                                  pattern: {
                                    value:  /^[a-zA-Z\s]*$/,
                                    message: "invalid username address",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("username");
                                }} 
                              />
                              {errors.username && (
                                <small className="text-danger">
                                  {errors.username.message}
                                </small>
                              )}
                              <input
                                type="email"
                                autoComplete="off"
                                placeholder="Email"
                                {...register("email")}
                                onKeyUp={() => {
                                  trigger("email");
                                }}
                              />
                              {errors.email && (
                                <small className="text-danger">
                                  {errors.email.message}
                                </small>
                              )}
                              <input
                              autoComplete="off"
                                type="phoneNumber"
                                placeholder="enter yout phone number"
                                maxLength="10"
                                {...register("phoneNumber", {
                                  required: "phoneNumber is required",
                                  pattern: {
                                    value:
                                      /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/,
                                    message: "invalid phoneNumber",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("phoneNumber");
                                }}
                              />
                              {errors.phoneNumber && (
                                <small className="text-danger">
                                  {errors.phoneNumber.message}
                                </small>
                              )}
                              <input
                              autoComplete="off"
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                  required: "password is required",
                                  pattern: {
                                    value:/^[a-zA-Z]{1,10}$/,
                                    message: "Invalid password(only letters)",
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
                                <button type="submit">
                                  <span>Register</span>
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
