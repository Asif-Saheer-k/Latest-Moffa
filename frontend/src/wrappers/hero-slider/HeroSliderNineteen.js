import axios from "axios";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";

import HeroSliderNineteenSingle from "../../components/hero-slider/HeroSliderNineteenSingle.js";

const HeroSliderNineteen = () => {
  const [data1,setData1]=useState({})
  const [data2,setData2]=useState({})
  const [data3,setData3]=useState({})

  useEffect(() => {
    (async function () {
      try {
        var { data } = await axios.get("/api/superAdmin/view-all-banner");
         setData1(data[0])
         setData2(data[1])
         setData3(data[2])
      
      } catch (error) {
  
      }
    })();
  },[]);


  const sliderData=[ 
  { 
    "id": '2345678902345678',
    "title": "Enjoy This Offer Today",
    "subtitle": data1?.subtitle,
    "image": data1?.image,
    "url":data1?.url
  },
  {
    "id": '23456789234567890',
    "title": "Enjoy This Offer Today",
    "subtitle": data2?.subtitle,
    "image": data2?.image,
    "url": data2?.url
  },
  {
    "id": '23456789234567890',
    "title": "Enjoy This Offer Today",
    "subtitle": data3?.subtitle,
    "image": data3?.image,
    "url": data3?.url
  }, 
]

  const params = {
    effect: "fade",
    loop: false,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" /> 
      </button>
    )
  }        
  return (  
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...params}> 
          {sliderData &&
            sliderData.map((single,key) => { 
              return (
                <HeroSliderNineteenSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide" 
                />
              )
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderNineteen;
