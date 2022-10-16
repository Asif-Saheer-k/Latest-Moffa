import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderNineteen from "../../wrappers/hero-slider/HeroSliderNineteen";
import BannerSixteen from "../../wrappers/banner/BannerSixteen";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import CountDownThree from "../../wrappers/countdown/CountDownThree";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";
import BannerFifteen from "../../wrappers/banner/BannerFifteen";
import TabProductTwelve from "../../wrappers/product/TabProductTwelve";
import axios from "axios";
import rootReducer from "../../redux/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { fetchProducts } from "../../redux/actions/productActions";
import { composeWithDevTools } from "redux-devtools-extension";
import { useState } from "react";

const HomeFurnitureThree = () => {
  const [Deal, setDeal] = useState({});
  const [products, setProducts] = useState([]);
  const store = createStore(
    rootReducer,
    load(),
    composeWithDevTools(applyMiddleware(thunk, save()))
  );
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/superAdmin/view-all-products");
        store.dispatch(fetchProducts(data));
        setProducts(data);
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    const getDeals = async () => {
      try {
        const { data } = await axios.get("/api/user/today-deal-of-the-day");
        setDeal(data);
      } catch (error) {
        console.log(error);
      }
    };
    const today = new Date().toLocaleDateString();
    const dateObj = { date: today };
    getDeals(dateObj);
  }, []);  
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.delete(
          "/api/user/cheack-today-date-remove-deal"
        );
      } catch (error) {}
    })();
  }, []);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var day = currentDate.getDate();
  var monthe = currentDate.getMonth();
  const monthName = month[monthe];
  var year = currentDate.getFullYear();
  const tommorow = monthName + " " + day + "," + " " + year + " " + "00:00:00";
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <Fragment>
      <MetaTags>
        <title>Moffa | Home</title>
        <meta
          name="description"
          content="Furniture home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        <HeroSliderNineteen />

        {/* banner */}
        <BannerFifteen spaceTopClass="pt-10" spaceBottomClass="pb-85" />

        {/* countdown */}
        {Deal.DealImage ? (
          <CountDownThree
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            dateTime={tommorow}
            countDownImage={Deal.DealImage}
            dealDeatails={Deal.PROID}
          />
        ) : (
          <CountDownThree
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            dateTime="Septemper 15, 2022 00:00:00"
            countDownImage={Deal.DealImage}
            dealDeatails={Deal.PROID}
          />
        )}

        {/* feature icon */}
        <FeatureIconFour
          bgImg="/assets/img/bg/shape.png"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50"
          spaceBottomClass="pb-40"
        />

        {/* tab product */}
        <TabProductTwelve
          category="Meternity outfits"
          spaceTopClass="pt-95"
          sectionTitle="Best Products"
          products={products}
        />

        {/* banner */}
        <BannerSixteen spaceTopClass="pt-95" />

        {/* newsletter */}
        {/* <NewsletterThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="dark-red-subscribe"
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFurnitureThree;
