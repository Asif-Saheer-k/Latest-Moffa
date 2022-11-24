import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastProvider, useToasts } from "react-toast-notifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import swal from "sweetalert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "../../assets/img/logo/MOFFA.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const MyAccount = ({ location, user }) => {
  const [loading, setLoading] = useState(false);
  const [addaddress, setAddress] = useState({});
  const [open, setOpen] = React.useState(false);
  const [Amount, setAmount] = useState(null);
  const { pathname } = location;
  const { addToast } = useToasts();
  const history = useHistory();
  const [EditDeatails, setEditDeatails] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    mode: "onBlur",
  });
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(async () => {
    if (!user) {
      history.push("/login-register");
    } else {
      const users = user.user;
      const id = user.CUST_ID;

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": user.token,
          },
        };
        const { data } = await axios.post(
          "/api/user/user-deatails-get",
          { users, id },
          config
        );
        setAddress(data?.Address);
        setEditDeatails(data);
        setValue("username", data.name);
        setValue("email", data.email);
        setValue("phoneNumber", data.phone);
      } catch (error) {
        addToast("Somthing Went Wrong Pleass Try After Some Time !", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }, [loading]);
  //edit submit function
  const onSubmit = async (data) => {
    const email = data.email;
    const phone = data.phoneNumber;
    const name = data.username;
    const originalPhone = user.phone;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": user.token,
        },
      };

      const { data } = await axios.post(
        "/api/user/edit-user-deatails",
        {
          email,
          phone,
          name,
          originalPhone,
        },
        config
      );
      addToast("Succes", { appearance: "success", autoDismiss: true });
      history.push("/");
    } catch (error) {
      addToast(error.response.data, { appearance: "error", autoDismiss: true });
    }
  };

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);
    // form.setAttribute('target', target)

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }
  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  //address taking function

  const onSubmitpassword = async (data) => {
    const Oldpassword = data.Oldpassword;
    const NewPassword = data.password;
    const users = user.user;
    const phones = user.phone;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": user.token,
        },
      };
      const { data } = await axios.put(
        "/api/user/edit-user-password",
        {
          Oldpassword,
          NewPassword,
          users,
          phones,
        },
        config
      );
      history.push("/");
      addToast("Successfully Changed", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast(error.response.data, { appearance: "error", autoDismiss: true });
    }
  };

  //delete address function
  const DelateAddress = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log(user);
        console.log(user.CUST_ID);
        const userId = user.CUST_ID;
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              "auth-token": user.token,
            },
          };
          const { data } = await axios.post(
            "/api/user/delete-user-addres",
            { userId },
            config
          );
          setLoading(true);
          setLoading(false);
          swal("Successfully Deleted!", {
            icon: "success",
          });
        } catch (error) {
          swal("Somthing Went Wrong!", {
            icon: "error",
          });
        }
      } else {
        swal("Your Data Is Safe");
      }
    });
  };
  //add amount through paytm
  // const AddAmountWallet = async () => {
  //   if (Amount <= 20000 && Amount >= 100) {
  //     const ID = user.CUST_ID;
  //     const phone = user.phone;
  //     const email = user.email;
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //           "auth-token": user.token,
  //         },
  //       };
  //       const { data } = await axios.post(
  //         "/api/user/add-amount-wallet",
  //         { Amount, ID, phone, email },
  //         config
  //       );

  //       var details = {
  //         action: "https://securegw.paytm.in/order/process",
  //         params: data,
  //       };
  //       post(details);
  //     } catch (error) {
  //       addToast("Somthing Went Wrong", {
  //         appearance: "error",
  //         autoDismiss: true,
  //       });
  //     }
  //   } else {
  //     addToast("Please Enter Valid Amount", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //   }
  // };

  //add amount through razorpay
  const AddAmountWallet = async () => {
    if (Amount >= 100 && Amount <= 20000) {
      const id = user.CUST_ID;
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": user.token,
          },
        };
        const { data } = await axios.post(
          "/api/user/add-amount-razorpay",
          { Amount },
          config
        );
        const { ammount, id: order_id, currency } = data;
        const options = {
          key: process.env.SECRET_KEY, // Enter the Key ID generated from the Dashboard
          amount: ammount,
          currency: currency,
          name: "MOFFA CLOTHING.",
          description: "Transaction",
          image: image,
          order_id: order_id,
          handler: async function (response) {
            const datas = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            try {
              const { data } = await axios.post(
                "/api/user/verify-razorpay-payment",
                datas
              );
              try {
                const result = await axios.post(
                  "/api/user/add-amount-to-wallet",
                  {
                    Amount,
                    id,
                    datas,
                  }
                );
                setLoading(true);
                setLoading(false);
                handleClose();
                history.push("/my-account");
              } catch (error) {
                history.push("/error");
              }
            } catch (error) {
              history.push("/error");
            }
          },
          prefill: {
            name: user.name,
            email: "thepaaki.aws@gmail.com",
            contact: user.phone,
          },
          notes: {
            address: "fsf",
          },
          theme: {
            color: "#FFFFE3",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.log(error);
      }
    } else {
      addToast("Please Enter Valid Amount", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <ToastProvider>
      <Fragment>
        <MetaTags>
          <title>Thepaaki | My Account</title>
          <meta
            name="description"
            content="Myaccount page of thepaaki website"
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
          Home
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          My Account
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="myaccount-area pb-80 pt-100">
            <div className="container mt-5">
              <div className="row">
                <div className="ml-auto mr-auto col-lg-9">
                  <div className="myaccount-wrapper">
                    <Accordion defaultActiveKey="0">
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="0">
                            <h3 className="panel-title">
                              <span>1 .</span> Edit your account information{" "}
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <form key={1} onSubmit={handleSubmit(onSubmit)}>
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>My Account Information</h4>
                                  <h5>Your Personal Details</h5>
                                </div>
                                <div className="row">
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>First Name</label>
                                      <input
                                        type="text"
                                        {...register("username", {
                                          required: "username is required",
                                          pattern: {
                                            value: /^[a-zA-Z\s]*$/,
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
                                    </div>
                                  </div>
                                  {/* <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input type="text" />
                                </div>
                              </div> */}
                                  <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>Email Address</label>
                                      <input
                                        type="email"
                                        {...register("email", {
                                          required: "email is required",
                                          pattern: {
                                            value:
                                              /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "invalid email address",
                                          },
                                        })}
                                        onKeyUp={() => {
                                          trigger("email");
                                        }}
                                      />
                                      {errors.email && (
                                        <small className="text-danger">
                                          {errors.email.message}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>Telephone</label>
                                      <input
                                        type="text"
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
                                    </div>
                                  </div>
                                  {/* <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Fax</label>
                                  <input type="text" />
                                </div>
                              </div> */}
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <button type="submit">Continue</button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="1">
                            <h3 className="panel-title">
                              <span>2 .</span> Change your password
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            <form
                              key={2}
                              onSubmit={handleSubmit2(onSubmitpassword)}
                            >
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>Change Password</h4>
                                  <h5>Your Password</h5>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>Password</label>
                                      <input
                                        type="password"
                                        {...register2("Oldpassword", {
                                          required: "password is required",
                                          pattern: {
                                            value: /^[a-zA-Z]{8,22}$/,
                                            message: "invalid password",
                                          },
                                        })}
                                        onKeyUp={() => {
                                          trigger("Oldpassword");
                                        }}
                                      />

                                      {errors2.Oldpassword && (
                                        <small className="text-danger">
                                          {errors2.Oldpassword.message}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>Enter New Password</label>
                                      <input
                                        type="password"
                                        {...register2("password", {
                                          required: "password is required",
                                          pattern: {
                                            value: /^[a-zA-Z]{8,22}$/,
                                            message: "invalid password",
                                          },
                                        })}
                                        onKeyUp={() => {
                                          trigger("password");
                                        }}
                                      />

                                      {errors2.password && (
                                        <small className="text-danger">
                                          {errors2.password.message}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <button type="submit">Continue</button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      {addaddress && (
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="2">
                              <h3 className="panel-title">
                                <span>3 .</span> Modify your address book
                                entries{" "}
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="2">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>Address Book Entries</h4>
                                </div>
                                <div className="entries-wrapper">
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                      <div className="entries-info text-center">
                                        <p>
                                          {addaddress.Name},
                                          {addaddress.LastName}
                                        </p>
                                        <p>{addaddress.StreetAddress}</p>
                                        <p>
                                          {addaddress.TownCity},
                                          {addaddress.State},
                                          {addaddress.Pincode}
                                        </p>
                                        <p>{addaddress.Email}</p>
                                        <p>{addaddress.PhoneNumber}</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                      <div className="entries-edit-delete text-center">
                                        <button onClick={DelateAddress}>
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    {/* <button type="submit">Continue</button> */}
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      )}
                      {!user?.user && (
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="3">
                              <h3 className="panel-title">
                                <span>4 .</span> Wallet Information
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="3">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>Wallet Amount Details</h4>
                                </div>
                                <div className="entries-wrapper">
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                      <div className="entries-info text-center">
                                        <p>
                                          <AccountBalanceWalletIcon
                                            style={{
                                              fontSize: "35px",
                                              color: "red",
                                            }}
                                          />
                                          :{" "}
                                          <span
                                            style={{
                                              fontSize: "20px",
                                              color: "green",
                                            }}
                                          >
                                            {" "}
                                            ₹{EditDeatails.wallet}{" "}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    {/* <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                      <div className="entries-edit-delete text-center">
                                        <button className="edit">Edit</button>
                                        <button>Delete</button>
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <Button onClick={handleOpen}>
                                      ADD AMOUNT
                                    </Button>
                                    <Modal
                                      aria-labelledby="transition-modal-title"
                                      aria-describedby="transition-modal-description"
                                      open={open}
                                      onClose={handleClose}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500,
                                      }}
                                    >
                                      <Fade in={open}>
                                        <Box sx={style}>
                                          <Typography
                                            id="transition-modal-title"
                                            variant="h6"
                                            component="h2"
                                          >
                                            Please Enter Amount(between
                                            100-20000)
                                          </Typography>
                                          <Typography
                                            id="transition-modal-description"
                                            sx={{ mt: 2 }}
                                          >
                                            <from>
                                              <input
                                                className="form-control"
                                                onChange={(e) => {
                                                  setAmount(e.target.value);
                                                }}
                                                type="text"
                                              ></input>
                                              <button
                                                onClick={AddAmountWallet}
                                                className="btn btn-primary mt-3"
                                                type="text"
                                              >
                                                ADD
                                              </button>
                                            </from>
                                          </Typography>
                                        </Box>
                                      </Fade>
                                    </Modal>
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      )}
                    </Accordion>
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

MyAccount.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
  };
};

export default connect(mapStateToProps)(MyAccount);
