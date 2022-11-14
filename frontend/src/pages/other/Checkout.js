import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  deleteAllFromCart,
  deleteFromCart,
} from "../../redux/actions/cartActions";

const Checkout = ({ location, cartItems, currency, user, deleteFromCart }) => {
  const [addaddress, setAddress] = useState({});
  const [viewDtdc, setViewDtdc] = useState(false);
  const [fromaddress, setFromaddress] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [walletApplyAmount, setWalletApplyAmount] = useState(null);
  const [Amount, setAmount] = useState();
  const [state, setState] = useState();
  const [fromstate, setFromstate] = useState();
  const [produt, setProducts] = useState([]);
  const [deliveryCharge, setDeliveryCharges] = useState(50);
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("paytm");
  const [orderObject, setorderObject] = useState({});
  const [courier, setCourierservice] = useState("Indian Post");
  const [admin, setAdmin] = useState();
  const { pathname } = location;
  const { addToast } = useToasts();
  var toatalQuantity = 0;
  const navigate = useHistory();
  let cartTotalPrice = 0;

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/superAdmin/view-all-products");

        setProducts(data);
      } catch (error) {}
    })();
  }, []);
  var newArray;
  useEffect(() => {
    cartItems.map((item) => {
      let id = item.id;
      newArray = produt.filter(function (items) {
        if (items.id == id) {
          cart.push(items);
        }
      });
    });
    if (cart.length > 0) {
      function userExists(username) {
        return cart.some(function (el) {
          return el.id == username;
        });
      }
      cartItems.map((item, index) => {
        const exist = userExists(item.id);
        if (exist == false) {
          deleteFromCart(item, addToast);
        }
      });
    }
  }, [produt]);

  // useEffect(() => {
  //   if (checked) {
  //     if (state) {
  //       if (
  //         state == "Andhra Pradesh" ||
  //         state == "Karnataka" ||
  //         state == "Tamil Nadu" ||
  //         state == "Telangana" ||
  //         state == "Kerala"
  //       ) {
  //         setDeliveryCharges(70);
  //       } else {
  //         setDeliveryCharges(100);
  //       }
  //     } else {
  //       addToast("Please Select State", {
  //         appearance: "error",
  //         autoDismiss: true,
  //       });
  //       setChecked(false);
  //     }
  //   } else {
  //     setDeliveryCharges(50);
  //   }
  // }, [checked, state]);

  useEffect(() => {
    
    if (
      state == "Kerala" ||
      state == "Karnataka" ||
      state == "Tamil Nadu" ||
      state == "Andhra Pradesh" ||
      state == "Telangana" ||
      state == "Goa" ||
      state == "Delhi" ||
      state == "Mumbai"
    ) {
      setViewDtdc(true);
    } else {
      setViewDtdc(false);
    }
    const grms = toatalQuantity * 300;
    if (courier == "DTDC") {
      if (state == "Kerala") {
        if (grms < 500) {
          setDeliveryCharges(60);
          console.log("45");
        } else if (grms <= 1000 && grms > 500) {
          setDeliveryCharges(70);
          console.log("55");
        } else if (grms > 1000 && grms <= 5000) {
          const kg = (grms / 500 - 2) * 25;
          setDeliveryCharges(70 + kg);
          console.log("25");
        } else {
          const kg = (grms / 1000) * 45;
          setDeliveryCharges(kg + 15);
        }
      } else if (state == "Karnataka" || state == "Tamil Nadu") {
        if (grms < 500) {
          console.log("60");
          setDeliveryCharges(75);
        } else if (grms <= 1000 && grms > 500) {
          console.log("70");
          setDeliveryCharges(85);
        } else if (grms > 1000 && grms <= 5000) {
          const kg = (grms / 500 - 2) * 35;
          console.log(kg);
          setDeliveryCharges(85 + kg);
          console.log("35");
        } else {
          const kg = (grms / 1000) * 60;
          console.log(kg);
          setDeliveryCharges(kg + 15);
        }
      } else if (
        state == "Andhra Pradesh" ||
        state == "Telangana" ||
        state == "Goa"
      ) {
        if (grms < 500) {
          console.log("65");
          setDeliveryCharges(80);
        } else if (grms <= 1000 && grms > 500) {
          console.log("75");
          setDeliveryCharges(90);
        } else if (grms > 1000 && grms <= 5000) {
          const kg = (grms / 500 - 2) * 40;
          console.log(kg);
          setDeliveryCharges(90 + kg);
          console.log("40");
        } else {
          const kg = (grms / 1000) * 65;
          console.log(kg);
          setDeliveryCharges(kg + 15);
        }
      } else if (state == "Delhi" || state == "Mumbai") {
        if (grms < 500) {
          console.log("90");
          setDeliveryCharges(105);
        } else if (grms <= 1000 && grms > 500) {
          console.log("100");
          setDeliveryCharges(115);
        } else if (grms > 1000 && grms <= 5000) {
          const kg = (grms / 500 - 2) * 55;
          console.log(kg);
          setDeliveryCharges(115 + kg);
          console.log("55");
        } else {
          const kg = (grms / 1000) * 85;
          console.log(kg);
          setDeliveryCharges(kg + 15);
        }
      } else {
        setViewDtdc(false);
        setCourierservice("Indian Post");
      }
      if (!state) {
        if (grms < 500) {
          setDeliveryCharges(60);
          console.log("45");
        } else if (grms <= 1000 && grms > 500) {
          setDeliveryCharges(70);
          console.log("55");
        } else if (grms > 1000 && grms <= 5000) {
          const kg = (grms / 5000 - 2) * 25;
          console.log(kg);
          setDeliveryCharges(70 + kg);
          console.log("25");
        } else {
          const kg = (grms / 1000) * 45;
          console.log(kg);
          setDeliveryCharges(kg);
        }
      }
    } else {
      if (toatalQuantity == 1) {
        setDeliveryCharges(50);
      } else if (toatalQuantity == 2) {
        setDeliveryCharges(70);
      } else if (toatalQuantity == 3) {
        setDeliveryCharges(90);
      } else {
        setDeliveryCharges(100);
      }
    }
  }, [toatalQuantity, state, cartItems, courier]);

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
  //change state function
  const changeState = (data) => {
    setState(data);
  };
  //order aplying function
  const onSubmit = async (data) => {
    const razorpaydetails = {
      name: data.Name,
      email: data.Email,
      phone: data.PhoneNumber,
      address: data.StreetAddress,
    };
    setorderObject(razorpaydetails);
    if (user) {
      if (state) {
        var Post;
        if (checked) {
          Post = "Speed Post";
        } else {
          Post = "Normal";
        }
        //remove h then active paytm remove
        if (payment == "paytmh") {
          var users = user;
          if (users.user) {
            const OderProducts = cartItems;
            const totamAmount = cartTotalPrice.toFixed(0);
            const DeliveyCharge = deliveryCharge;
            const DeliveryType = Post;
            const CUST_ID = users.CUST_ID;
            const Name = data.Name;
            const LastName = data.LastName;
            const StreetAddress = data?.StreetAddress;
            const Apartment = data?.Apartment;
            const TownCity = data.TownCity;
            const Postcode = data.Postcode;
            const PhoneNumber = data.PhoneNumber;
            const Email = data.Email;
            const Service = courier;
            const message = data?.message;
            const State = state;
            const user = true;
            const payment_type = "paytm";
            try {
              const config = {
                headers: {
                  "Content-type": "application/json",
                  "auth-token": users.token,
                },
              };
              const { data } = await axios.post(
                "/api/user/payment-methode/paytm",
                {
                  OderProducts,
                  totamAmount,
                  CUST_ID,
                  Name,
                  DeliveyCharge,
                  DeliveryType,
                  LastName,
                  StreetAddress,
                  Apartment,
                  TownCity,
                  Postcode,
                  PhoneNumber,
                  Email,
                  message,
                  State,
                  user,
                  payment_type,
                  Service,
                },
                config
              );
              var details = {
                action: "https://securegw.paytm.in/order/process",
                params: data,
              };
              post(details);
            } catch (error) {
              swal({
                title: "Product Out Of Stock",
                text: "We sincerely apologize for this inconvenience. We've experienced an unusually high number of orders and have run out of inventory",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
            }
          } else {
            if (fromstate) {
              const OderProducts = cartItems;
              const totamAmount = cartTotalPrice.toFixed(0);
              const DeliveyCharge = deliveryCharge;
              const DeliveryType = Post;
              const CUST_ID = users.CUST_ID;
              const Name = data.Name;
              const FromName = data.FromName;
              const LastName = data.LastName;
              const FromLastName = data.FromLastName;
              const StreetAddress = data?.StreetAddress;
              const FromStreetAddress = data?.FromStreetAddress;
              const Apartment = data?.Apartment;
              const TownCity = data.TownCity;
              const FromTownCity = data.FromTownCity;
              const Postcode = data.Postcode;
              const FromPostcode = data.FromPostcode;
              const PhoneNumber = data.PhoneNumber;
              const FromPhoneNumber = data.FromPhoneNumber;
              const Email = data.Email;
              const FromEmail = data.FromEmail;
              const message = data?.message;
              const State = state;
              const FromState = fromstate;
              const Service = courier;
              const user = false;
              const payment_type = "paytm";
              var Applywallet = 0;
              if (walletApplyAmount) {
                Applywallet = walletApplyAmount;
              }
              try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    "auth-token": users.token,
                  },
                };
                const { data } = await axios.post(
                  "/api/user/payment-methode/paytm",
                  {
                    OderProducts,
                    totamAmount,
                    DeliveyCharge,
                    DeliveryType,
                    CUST_ID,
                    Name,
                    FromName,
                    LastName,
                    FromLastName,
                    StreetAddress,
                    FromStreetAddress,
                    Apartment,
                    TownCity,
                    FromTownCity,
                    Postcode,
                    FromPostcode,
                    PhoneNumber,
                    FromPhoneNumber,
                    Email,
                    FromEmail,
                    message,
                    State,
                    FromState,
                    user,
                    Applywallet,
                    payment_type,
                    Service,
                  },
                  config
                );
                var details = {
                  action: "https://securegw.paytm.in/order/process",
                  params: data,
                };
                post(details);
              } catch (error) {
                if (error.response.data == "refresh") {
                  swal({
                    title: "Please Refresh Your Web Page",
                    text: "We sincerely apologize for this inconvenience",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                } else {
                  swal({
                    title: "Product Out Of Stock",
                    text: "We sincerely apologize for this inconvenience. We've experienced an unusually high number of orders and have run out of inventory",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                }
              }
            } else {
              addToast("Please Select State", {
                appearance: "error",
                autoDismiss: true,
              });
            }
          }
        } else {
          const date = new Date().toLocaleDateString();
          var users = user;
          if (users.user) {
            const OderProducts = cartItems;
            const totamAmount = cartTotalPrice.toFixed(0);
            const DeliveyCharge = deliveryCharge;
            const DeliveryType = Post;
            const CUST_ID = users.CUST_ID;
            const Name = data.Name;
            const LastName = data.LastName;
            const StreetAddress = data?.StreetAddress;
            const Apartment = data?.Apartment;
            const TownCity = data.TownCity;
            const Postcode = data.Postcode;
            const PhoneNumber = data.PhoneNumber;
            const Email = data.Email;
            const message = data?.message;
            const Service = courier;
            const State = state;
            const user = true;
            const Date = date;
            const payment_type = "razorpay";
            try {
              const config = {
                headers: {
                  "Content-type": "application/json",
                  "auth-token": users.token,
                },
              };
              const { data } = await axios.post(
                "/api/user/create-order-object",
                {
                  OderProducts,
                  totamAmount,
                  CUST_ID,
                  Name,
                  DeliveyCharge,
                  DeliveryType,
                  LastName,
                  StreetAddress,
                  Apartment,
                  TownCity,
                  Postcode,
                  PhoneNumber,
                  Email,
                  message,
                  State,
                  Service,
                  user,
                  Date,
                  payment_type,
                },
                config
              );
              if (data) {
                try {
                  const config = {
                    headers: {
                      "Content-type": "application/json",
                      "auth-token": users.token,
                    },
                  };
                  const { data } = await axios.post(
                    "/api/user/razorpay",
                    data,
                    config
                  );
                  const { ammount, id: order_id, currency } = data;
                  const options = {
                    key: process.env.SECRET_KEY, // Enter the Key ID generated from the Dashboard
                    amount: ammount,
                    currency: currency,
                    name: "MOFFA CLOTHING.",
                    description: "LIVE Transaction",
                    image: "F",
                    order_id: order_id,
                    handler: async function (response) {
                      const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                      };

                      try {
                        const verification = await axios.post(
                          "/api/user/verify-razorpay-payment",
                          data
                        );

                        try {
                          const result = await axios.post(
                            "api/user/razorpay-payment/success",
                            data
                          );
                          navigate.push("/success");
                        } catch (error) {
                          navigate.push("/error");
                        }
                      } catch (error) {
                        navigate.push("/error");
                      }
                    },
                    prefill: {
                      name: user.name,
                      email: user.email,
                      contact: user.phone,
                    },
                    notes: {
                      address: orderObject.address,
                    },
                    theme: {
                      color: "#FFFFE3",
                    },
                  };
                  const paymentObject = new window.Razorpay(options);
                  paymentObject.open();
                } catch (err) {
                  swal({
                    title: "Please Refresh Your Web Page",
                    text: "We sincerely apologize for this inconvenience",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                }
              }
            } catch (error) {
              swal({
                title: "Product Out Of Stock",
                text: "We sincerely apologize for this inconvenience. We've experienced an unusually high number of orders and have run out of inventory",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
            }
          } else {
            if (fromstate) {
              const OderProducts = cartItems;
              let totamAmount = cartTotalPrice.toFixed(0);
              const DeliveyCharge = deliveryCharge;
              const DeliveryType = Post;
              const CUST_ID = users.CUST_ID;
              const Name = data.Name;
              const FromName = data.FromName;
              const LastName = data.LastName;
              const FromLastName = data.FromLastName;
              const StreetAddress = data?.StreetAddress;
              const FromStreetAddress = data?.FromStreetAddress;
              const Apartment = data?.Apartment;
              const TownCity = data.TownCity;
              const FromTownCity = data.FromTownCity;
              const Postcode = data.Postcode;
              const FromPincode = data.FromPincode;
              const PhoneNumber = data.PhoneNumber;
              const FromPhoneNumber = data.FromPhoneNumber;
              const Email = data.Email;
              const FromEmail = data.FromEmail;
              const message = data?.message;
              const State = state;
              const FromState = fromstate;
              const Service = courier;
              const user = false;
              const Date = date;
              const payment_type = "razorpay";
              var Applywallet = 0;

              if (walletApplyAmount) {
                Applywallet = walletApplyAmount;
              }
              try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    "auth-token": users.token,
                  },
                };
                const { data } = await axios.post(
                  "/api/user/create-order-object",
                  {
                    OderProducts,
                    totamAmount,
                    DeliveyCharge,
                    DeliveryType,
                    CUST_ID,
                    Name,
                    FromName,
                    LastName,
                    FromLastName,
                    StreetAddress,
                    FromStreetAddress,
                    Apartment,
                    TownCity,
                    FromTownCity,
                    Postcode,
                    FromPincode,
                    PhoneNumber,
                    FromPhoneNumber,
                    Email,
                    FromEmail,
                    message,
                    State,
                    FromState,
                    Service,
                    user,
                    Applywallet,
                    Date,
                    payment_type,
                  },
                  config
                );
                if (data) {
                  try {
                    const config = {
                      headers: {
                        "Content-type": "application/json",
                        "auth-token": users.token,
                      },
                    };
                    const { data } = await axios.post(
                      "/api/user/razorpay",
                      data,
                      config
                    );
                    const { ammount, id: order_id, currency } = data;
                    const options = {
                      key: process.env.SECRET_KEY, // Enter the Key ID generated from the Dashboard
                      amount: ammount,
                      currency: currency,
                      name: "MOFFA CLOTHING.",
                      description: "Live Transaction",
                      image: "F",
                      order_id: order_id,
                      handler: async function (response) {
                        const data = {
                          orderCreationId: order_id,
                          razorpayPaymentId: response.razorpay_payment_id,
                          razorpayOrderId: response.razorpay_order_id,
                          razorpaySignature: response.razorpay_signature,
                        };
                        try {
                          const verification = await axios.post(
                            "/api/user/verify-razorpay-payment",
                            data
                          );
                          try {
                            const result = await axios.post(
                              "api/user/razorpay-payment/success",
                              data
                            );
                            console.log(result);
                            navigate.push("/success");
                          } catch (error) {
                            navigate.push("/error");
                          }
                        } catch (error) {
                          navigate.push("/error");
                        }
                      },
                      prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone,
                      },
                      notes: {
                        address: orderObject.address,
                      },
                      theme: {
                        color: "#FFFFE3",
                      },
                    };
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                  } catch (err) {
                    swal({
                      title: "Please Refresh Your Web Page",
                      text: "We sincerely apologize for this inconvenience",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    });
                  }
                }
              } catch (error) {
                if (error.response.data == "refresh") {
                  swal({
                    title: "Please Refresh Your Web Page",
                    text: "We sincerely apologize for this inconvenience",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                } else {
                  swal({
                    title: "Product Out Of Stock",
                    text: "We sincerely apologize for this inconvenience. We've experienced an unusually high number of orders and have run out of inventory",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                }
              }
            } else {
              addToast("Please Select State", {
                appearance: "error",
                autoDismiss: true,
              });
            }
          }

          // // creating a new order
          // const result = await axios.post("/api/user/razorpay");

          // if (!result) {
          //   alert("Server error. Are you online?");
          //   return;
          // }
          // // Getting the order details back
        }
      } else {
        addToast("Please Select State", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else {
      navigate.push("/login-register");
    }
  };
  useEffect(() => {
    if (!user) {
      navigate.push("/login-register");
    }
  }, []);

  //take user Deatails function
  useEffect(async () => {
    if (user) {
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

        const address = data?.Address;
        const FromAddress = data?.FromAddress;
        setFromaddress(FromAddress);
        setWallet(data.wallet);
        setAddress(address);
      } catch (error) {
        addToast("Somthing Went Wrong Pleass Try After Some Time !", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }, [loading]);

  //apply address in input field function
  const AddAddres = (address) => {
    setValue("Name", address.Name);
    setValue("LastName", address.LastName);
    setValue("StreetAddress", address.StreetAddress);
    setValue("TownCity", address.TownCity);
    setValue("Postcode", address.Pincode);
    setValue("PhoneNumber", address.PhoneNumber);
    setValue("Email", address.Email);
    setState(address.State);
  };
  const AddAddresFrom = (details) => {
    setValue("FromName", details.FromName);
    setValue("FromLastName", details.FromLastName);
    setValue("FromStreetAddress", details.FromStreetAddress);
    setValue("FromTownCity", details.FromTownCity);
    setValue("FromPincode", details.FromPincode);
    setValue("FromPhoneNumber", details.FromPhoneNumber);
    setValue("FromEmail", details.FromEmail);
    setFromstate(details.FromState);
  };
  //delete address
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

  //seting total price in function
  var total;
  const setprice = (price) => {
    total = price;
  };
  //apply wallet amount function
  const ApplyWalletAmount = async () => {
    const regex = /^[0-9]+$/;
    if (Amount > 0 && Amount <= wallet && Amount < total) {
      if (Amount.match(regex)) {
        setInvalid(false);
        swal({
          title: "Are you sure?",
          text: `Your Enterd Amount is ₹${Amount}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            setWalletApplyAmount(Amount);
          } else {
            swal("Your Data Is Safe");
          }
        });
      } else {
        setInvalid(true);
      }
    } else {
      setInvalid(true);
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Moffa | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container ">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>TO:</h3>
                      {user && (
                        <>
                          {addaddress.Name && (
                            <Accordion defaultActiveKey="0">
                              <Card className="single-my-account mb-20">
                                <Card.Header className="panel-heading">
                                  <Accordion.Toggle variant="link" eventKey="2">
                                    <h3 className="panel-title">
                                      <span>1 .</span> Modify your address book
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
                                              <a
                                                onClick={() => {
                                                  AddAddres(addaddress);
                                                }}
                                                className="btn edit"
                                              >
                                                ADD
                                              </a>
                                              <a onClick={DelateAddress}>
                                                Delete
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          )}
                        </>
                      )}
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>First Name</label>
                            <input
                              type="text"
                              color="red"
                              {...register("Name", {
                                required: "Name is required",
                                pattern: {
                                  value: /^[a-zA-Z\s]*$/,
                                  message: "Please Enter Valid Name",
                                },
                              })}
                              onKeyUp={() => {
                                trigger("Name");
                              }}
                            />
                            {errors.Name && (
                              <small className="text-danger">
                                {errors.Name.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Last Name</label>
                            <input
                              type="text"
                              {...register("LastName", {
                                required: "Last Name  required",
                                pattern: {
                                  value: /^[a-zA-Z\s]*$/,
                                  message: "Please Enter Valid Name",
                                },
                              })}
                              onKeyUp={() => {
                                trigger("LastName");
                              }}
                            />
                            {errors.LastName && (
                              <small className="text-danger">
                                {errors.LastName.message}
                              </small>
                            )}
                          </div>
                        </div>
                        {/* <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Company Name</label>
                            <input type="text" />
                          </div>
                        </div> */}
                        <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>State</label>
                            <select
                              onChange={(e) => {
                                changeState(e.target.value);
                              }}
                            >
                              {state ? (
                                <option>{state}</option>
                              ) : (
                                <option>Select a State</option>
                              )}
                              <option>Kerala</option>
                              <option>Mumbai</option>
                              <option>Delhi</option>
                              <option>Andhra Pradesh</option>
                              <option>Arunachal Pradesh</option>
                              <option>Assam</option>
                              <option>Bihar</option>
                              <option>Chhattisgarh</option>
                              <option>Goa</option>
                              <option>Gujarat</option>
                              <option>Haryana</option>
                              <option>Himachal Pradesh</option>
                              <option>Jharkhand</option>
                              <option>Karnataka</option>
                              <option>Madhya Pradesh</option>
                              <option>Maharashtra</option>
                              <option>Manipur</option>
                              <option>Meghalaya</option>
                              <option>Mizoram</option>
                              <option>Nagaland</option>
                              <option>Odisha</option>
                              <option>Punjab</option>
                              <option>Rajasthan</option>
                              <option>Sikkim</option>
                              <option>Tamil Nadu</option>
                              <option>Telangana</option>
                              <option>Tripura</option>
                              <option>Uttar Pradesh</option>
                              <option>Uttarakhand</option>
                              <option>West Bengal</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Street Address</label>
                            <input
                              className="billing-address"
                              placeholder="House number and street name"
                              type="text"
                              {...register("StreetAddress", {
                                required: "required",
                              })}
                              onKeyUp={() => {
                                trigger("StreetAddress");
                              }}
                            />
                            {errors.StreetAddress && (
                              <small className="text-danger">
                                {errors.StreetAddress.message}
                              </small>
                            )}
                            {/* <input
                              placeholder="Apartment, suite, unit etc."
                              type="text"
                              {...register("Apartment", {
                          
                              })}
                              onKeyUp={() => {
                                trigger("Apartment");
                              }}
                            /> */}
                            {errors.Apartment && (
                              <small className="text-danger">
                                {errors.Apartment.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Town / City</label>
                            <input
                              type="text"
                              {...register("TownCity", {
                                required: "required",
                              })}
                              onKeyUp={() => {
                                trigger("TownCity");
                              }}
                            />
                            {errors.TownCity && (
                              <small className="text-danger">
                                {errors.TownCity.message}
                              </small>
                            )}
                          </div>
                        </div>
                        {/* <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>State / County</label>
                            <input type="text" />
                          </div>
                        </div> */}
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Postcode / ZIP</label>
                            <input
                              type="text"
                              {...register("Postcode", {
                                required: "*required",
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "Please Enter Valid PIN",
                                },
                              })}
                              onKeyUp={() => {
                                trigger("Postcode");
                              }}
                            />
                            {errors.Postcode && (
                              <small className="text-danger">
                                {errors.Postcode.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Phone</label>
                            <input
                              type="text"
                              {...register("PhoneNumber", {
                                required: "*required",
                                pattern: {
                                  value: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                                  message: "Please Enter Valid Phone Number",
                                },
                              })}
                              onKeyUp={() => {
                                trigger("PhoneNumber");
                              }}
                            />
                            {errors.PhoneNumber && (
                              <small className="text-danger">
                                {errors.PhoneNumber.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email Address</label>
                            <input
                              type="text"
                              {...register("Email", {
                                required: "*required",
                                pattern: {
                                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                  message: "Please Enter Valid Email",
                                },
                              })}
                              onKeyUp={() => {
                                trigger("Email");
                              }}
                            />
                            {errors.Email && (
                              <small className="text-danger">
                                {errors.Email.message}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <label>Order notes</label>
                          <textarea
                            placeholder="Notes about your order, e.g. special notes for delivery. "
                            name="message"
                            defaultValue={""}
                            {...register("message", {})}
                            onKeyUp={() => {
                              trigger("message");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {user?.user ? (
                      ""
                    ) : (
                      <div className="billing-info-wrap mt-4">
                        <h3>FROM:</h3>
                        {user && (
                          <>
                            {fromaddress && (
                              <Accordion defaultActiveKey="0">
                                <Card className="single-my-account mb-20">
                                  <Card.Header className="panel-heading">
                                    <Accordion.Toggle
                                      variant="link"
                                      eventKey="2"
                                    >
                                      <h3 className="panel-title">
                                        <span>1 .</span> Modify From address
                                        book entries{" "}
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
                                                  {fromaddress.FromName},
                                                  {fromaddress.FromLastName}
                                                </p>
                                                <p>
                                                  {
                                                    fromaddress.FromStreetAddress
                                                  }
                                                </p>
                                                <p>
                                                  {fromaddress.FromTownCity},
                                                  {fromaddress.FromState},
                                                  {fromaddress.FromPincode}
                                                </p>
                                                <p>{fromaddress.FromEmail}</p>
                                                <p>
                                                  {fromaddress.FromPhoneNumber}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                              <div className="entries-edit-delete text-center">
                                                <a
                                                  onClick={() => {
                                                    AddAddresFrom(fromaddress);
                                                  }}
                                                  className="btn edit"
                                                >
                                                  ADD
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
                            )}
                          </>
                        )}
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>First Name</label>
                              <input
                                type="text"
                                color="red"
                                {...register("FromName", {
                                  required: "Name is required",
                                  pattern: {
                                    value: /^[a-zA-Z\s]*$/,
                                    message: "Please Enter Valid Name",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("FromName");
                                }}
                              />
                              {errors.FromName && (
                                <small className="text-danger">
                                  {errors.FromName.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Last Name</label>
                              <input
                                type="text"
                                {...register("FromLastName", {
                                  required: "Last Name  required",
                                  pattern: {
                                    value: /^[a-zA-Z\s]*$/,
                                    message: "Please Enter Valid Name",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("FromLastName");
                                }}
                              />
                              {errors.FromLastName && (
                                <small className="text-danger">
                                  {errors.FromLastName.message}
                                </small>
                              )}
                            </div>
                          </div>
                          {/* <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Company Name</label>
                            <input type="text" />
                          </div>
                        </div> */}
                          <div className="col-lg-12">
                            <div className="billing-select mb-20">
                              <label>State</label>
                              <select
                                onChange={(e) => {
                                  setFromstate(e.target.value);
                                }}
                              >
                                {state ? (
                                  <option>{fromstate}</option>
                                ) : (
                                  <option>Select a State</option>
                                )}
                                <option>Kerala</option>
                                <option>Delhi</option>
                                <option>Mumbai</option>
                                <option>Andhra Pradesh</option>
                                <option>Arunachal Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chhattisgarh</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jharkhand</option>
                                <option>Karnataka</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Tamil Nadu</option>
                                <option>Telangana</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                                <option>West Bengal</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Street Address</label>
                              <input
                                className="billing-address"
                                placeholder="House number and street name"
                                type="text"
                                {...register("FromStreetAddress", {
                                  required: "required",
                                })}
                                onKeyUp={() => {
                                  trigger("FromStreetAddress");
                                }}
                              />
                              {errors.FromStreetAddress && (
                                <small className="text-danger">
                                  {errors.FromStreetAddress.message}
                                </small>
                              )}
                              {/* <input
                              placeholder="Apartment, suite, unit etc."
                              type="text"
                              {...register("Apartment", {
                          
                              })}
                              onKeyUp={() => {
                                trigger("Apartment");
                              }}
                            /> */}
                              {/* {errors.Apartment && (
                                <small className="text-danger">
                                  {errors.Apartment.message}
                                </small>
                              )} */}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Town / City</label>
                              <input
                                type="text"
                                {...register("FromTownCity", {
                                  required: "required",
                                })}
                                onKeyUp={() => {
                                  trigger("FromTownCity");
                                }}
                              />
                              {errors.FromTownCity && (
                                <small className="text-danger">
                                  {errors.FromTownCity.message}
                                </small>
                              )}
                            </div>
                          </div>
                          {/* <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>State / County</label>
                            <input type="text" />
                          </div>
                        </div> */}
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Postcode / ZIP</label>
                              <input
                                type="text"
                                {...register("FromPincode", {
                                  required: "*required",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Please Enter Valid PIN",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("FromPincode");
                                }}
                              />
                              {errors.FromPostcode && (
                                <small className="text-danger">
                                  {errors.FromPostcode.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Phone</label>
                              <input
                                type="text"
                                {...register("FromPhoneNumber", {
                                  required: "*required",
                                  pattern: {
                                    value:
                                      /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                                    message: "Please Enter Valid Phone Number",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("FromPhoneNumber");
                                }}
                              />
                              {errors.FromPhoneNumber && (
                                <small className="text-danger">
                                  {errors.FromPhoneNumber.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Email Address</label>
                              <input
                                type="text"
                                {...register("FromEmail", {
                                  required: "*required",
                                  pattern: {
                                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                    message: "Please Enter Valid Email",
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("FromEmail");
                                }}
                              />
                              {errors.FromEmail && (
                                <small className="text-danger">
                                  {errors.FromEmail.message}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      {wallet && (
                        <div className="discount-code-wrapper">
                          <div className="title-wrap">
                            <h4 className="cart-bottom-title section-bg-gray">
                              Wallet Amount : ₹
                              <span className="text-danger ms-1">
                                {walletApplyAmount
                                  ? wallet - walletApplyAmount
                                  : wallet}
                              </span>
                            </h4>
                          </div>
                          <div className="discount-code">
                            <p>Enter Apply Amount</p>
                            <form>
                              <input
                                type="text"
                                required
                                name="name"
                                onChange={(e) => {
                                  setAmount(e.target.value);
                                }}
                              />
                              {invalid && (
                                <p className="text-danger">
                                  Please Enter Valid Number
                                </p>
                              )}
                              <a
                                style={{
                                  backgroundColor: "#A749FF",
                                  borderRadius: 500,
                                  color: "#fff",
                                  padding: "13px 42px 12px",
                                }}
                                className="btn cart-btn-2"
                                onClick={ApplyWalletAmount}
                              >
                                Apply Amount
                              </a>
                            </form>
                          </div>
                        </div>
                      )}
                      <div className="your-order-wrap gray-bg-4 mt-2">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                var offer;

                                const date = new Date().toLocaleDateString();
                                if (cartItem?.Deal) {
                                  cartItem.Deal.map((items) => {
                                    if (items.date == date) {
                                      offer = items.offer;
                                    }
                                  });
                                }
                                if (offer) {
                                  var discountedPrice = getDiscountPrice(
                                    cartItem.price,
                                    offer
                                  );
                                } else {
                                  if (cartItem.discount) {
                                    var discountedPrice = getDiscountPrice(
                                      cartItem.price,
                                      cartItem.discount
                                    );
                                  } else {
                                    var discountedPrice = null;
                                  }
                                }

                                let finalProductPrice;
                                let finalDiscountedPrice;
                                if (user?.user == true || user?.user == null) {
                                  finalProductPrice = cartItem.price;
                                  finalDiscountedPrice = discountedPrice;
                                } else {
                                  finalProductPrice = cartItem.price;
                                  finalDiscountedPrice = cartItem.wholesaler;
                                  discountedPrice = cartItem.price;
                                }

                                discountedPrice != null
                                  ? (cartTotalPrice +=
                                      finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice +=
                                      finalProductPrice * cartItem.quantity);
                                cartTotalPrice += deliveryCharge;
                                setprice(cartTotalPrice);
                                toatalQuantity += cartItem.quantity;
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      {discountedPrice !== null
                                        ? "₹" +
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : currency.currencySymbol +
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>

                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>{"₹" + deliveryCharge.toFixed(2)}</li>
                            </ul>
                          </div>
                          {/* <div className="your-order-bottom mt-4">
                            <ul>
                              <li className="your-order-shipping">
                                Speed Post
                              </li>
                              <li>
                                <Checkbox
                                  checked={checked}
                                  onChange={handleChange}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              </li>
                            </ul>
                          </div> */}
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {walletApplyAmount
                                  ? "₹" +
                                    (
                                      cartTotalPrice - walletApplyAmount
                                    ).toFixed(0)
                                  : "₹" + cartTotalPrice.toFixed(0)}
                              </li>
                            </ul>
                          </div>
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="Indian Post"
                              name="radio-buttons-group"
                            >
                              <div className="discount-code-wrapper mt-2">
                                <div className="title-wrap">
                                  <h4 className="cart-bottom-title section-bg-gray">
                                    Select Courier Service
                                  </h4>
                                </div>

                                <div className="your-order-bottom mt-2">
                                  {viewDtdc && (
                                    <ul>
                                      <li className="your-order-shipping">
                                        DTDC
                                      </li>
                                      <li>
                                        <FormControlLabel
                                          value="DTDC"
                                          control={<Radio />}
                                          onChange={(e) => {
                                            setCourierservice("DTDC");
                                          }}
                                        />
                                      </li>
                                    </ul>
                                  )}
                                  <ul>
                                    <li className="your-order-shipping">
                                      Indian Post
                                    </li>
                                    <li>
                                      <FormControlLabel
                                        value="Indian Post"
                                        control={<Radio />}
                                        onChange={(e) => {
                                          setCourierservice("Indian Post");
                                        }}
                                      />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>

                          {/* <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="paytm"
                              name="radio-buttons-group"
                            > */}
                          {/* <div className="discount-code-wrapper mt-2">
                                <div className="title-wrap">
                                  <h4 className="cart-bottom-title section-bg-gray">
                                    Select Payment Methode
                                  </h4>
                                </div> */}

                          {/* <div className="your-order-bottom mt-2">
                                  <ul>
                                    <li className="your-order-shipping">
                                      Paytm
                                    </li>
                                    <li>
                                      <FormControlLabel
                                        value="paytm"
                                        control={<Radio />}
                                        onChange={(e) => {
                                          setPayment("paytm");
                                        }}
                                      />
                                    </li>
                                  </ul>
                                  <ul>
                                    <li className="your-order-shipping">
                                      Razorpay
                                    </li>
                                    <li>
                                        <FormControlLabel
                                        value=" Razprpay"
                                        control={<Radio />}
                                        onChange={(e) => {
                                          setPayment("Razorpay");
                                        }}
                                      />
                                    </li>
                                  </ul>
                                </div> */}
                          {/* </div>
                            </RadioGroup>
                          </FormControl> */}
                        </div>
                      </div>
                      <div className="place-order mt-25">
                        <button type="submit" className="btn-hover">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    user: state.userData.user,
    deleteFromCart: PropTypes.func,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
