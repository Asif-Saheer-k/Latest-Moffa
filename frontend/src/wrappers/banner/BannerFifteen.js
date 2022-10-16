import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import bannerData from "../../data/banner/banner-fifteen.json";
import BannerFifteenSingle from "../../components/banner/BannerFifteenSingle.js";
import axios from "axios";
import swal from "sweetalert";

const BannerFifteen = ({ spaceTopClass, spaceBottomClass }) => {
  const [data,setData]=useState([])
useEffect(() => {
  (async function () {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        "/api/user/view-all-bottom-banner",
        config
      );
      setData(data);
    } catch (error) {
      swal("OOPS!", "Somthing Went Wrong!", "error");
    }
  })();
}, []);
  return (
    <div
      className={`banner-area banner-area-2 ${
        spaceTopClass ? spaceTopClass : ""
      } ${spaceBottomClass ? spaceBottomClass : ""}`}
    >        
      <div className="container-fluid">   
        <div className="custom-row-2">
          {data&&
            data.map((single, key) => {
              return (
                <BannerFifteenSingle
                  spaceBottomClass="mb-10"
                  data={single}
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

BannerFifteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerFifteen;
