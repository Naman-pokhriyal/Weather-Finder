import React from "react";

export default function Card(props) {
  const currentData = props.data;
  return (
    <div className="Cwrapper">
      <div className="CName">{currentData.data.name}</div>
      <img
        className="Cimg"
        src={`http://openweathermap.org/img/wn/${currentData.data.weather[0].icon}.png`}
        alt="🌡️"
      />
      <div className="Ctemp">{currentData.data.main.temp} °C</div>
      <div className="Cdesc">{currentData.data.weather[0].description}</div>
      <div className="Sub">
        <div className="CSub">Humidity: {currentData.data.main.humidity}%</div>
        <div className="CSub">
          Wind: {currentData.data.wind.speed}
          <span>m/s</span>
        </div>
      </div>
    </div>
  );
}
