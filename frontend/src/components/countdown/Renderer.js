import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const Renderer = ({ days, hours, minutes, seconds }) => {
  var key=0
  if (hours == 0 && minutes == 0 && seconds == 10 ) {
    try {
    
      const { data } = axios.delete("/api/user/remove-deal-of-the-day");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  } 
  return (
    <div className="timer timer-style">
      <div>
        <span className="cdown day">
          {days} <p>Days</p>
        </span>
        <span className="cdown hour">
          {hours} <p>Hours</p>
        </span>
        <span className="cdown minutes">
          {minutes} <p>Minutes</p>
        </span>
        <span>
          {seconds} <p>Secs</p>
        </span>
      </div>
    </div>
  );
};

Renderer.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};

export default Renderer;
