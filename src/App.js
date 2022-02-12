import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Card";
import favImg from "./Image/fav.png";
import favedImg from "./Image/faved.png";

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [list, setList] = useState([]);
  const [listData, setListData] = useState([]);

  const URL = "http://api.openweathermap.org/data/2.5/weather";
  const APIkey = "47a816dc539cc44aae5d87dd8963478c";

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchCurrent);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const fetchCurrent = async (position) => {
    return await axios
      .get(URL, {
        params: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          appid: APIkey,
          units: "metric",
        },
      })
      .then((res) => {
        setCurrentData(res);
      })
      .catch((e) => {
        console.log("error: " + e);
      });
  };

  function fetchFavourite() {
    list.forEach(async (place) => {
      await axios
        .get(URL, {
          params: {
            q: place,
            appid: APIkey,
            units: "metric",
          },
        })
        .then((res) => {
          setListData((list) => [...list, res]);
        })
        .catch((e) => {
          console.log("error: " + e);
        });
    });
  }

  const fetchWeather = async () => {
    return await axios
      .get(URL, {
        params: {
          q: query,
          appid: APIkey,
          units: "metric",
        },
      })
      .then((res) => {
        setData(res);
        setQuery("");
      })
      .catch((e) => {
        console.log("error: " + e);
      });
  };

  useEffect(() => {
    getLocation();
    fetchFavourite();
  }, [list]);

  const AddFav = (place) => {
    let check = checkLoaction(place);
    let arr = list;
    if (check !== -1) {
      arr.splice(check, 1);
      setList(arr);
    } else {
      setList([...list, place]);
    }
    console.log(list);
  };

  const checkLoaction = (place) => {
    return list.indexOf(place);
  };

  return (
    <main id="wrapper">
      <div className="current">
        {currentData && (
          <div>
            <div className="Cwrapper">
              <div className="CName">{currentData.data.name}</div>
              <img
                className="Cimg"
                src={`http://openweathermap.org/img/wn/${currentData.data.weather[0].icon}.png`}
                alt="🌡️"
              />
              <div className="Ctemp">{currentData.data.main.temp} °C</div>
              <div className="Cdesc">
                {currentData.data.weather[0].description}
              </div>
              <div className="Sub">
                <div className="CSub">
                  Humidity: {currentData.data.main.humidity}%
                </div>
                <div className="CSub">
                  Wind: {currentData.data.wind.speed}
                  <span>m/s</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {listData.map((item, index) => (
          <div>
            <Card key={index} data={item} />
          </div>
        ))}
      </div>

      <div className="Search">
        <div className="topInput">
          <input
            className="PInput"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn" onClick={fetchWeather}>
            Search
          </button>
        </div>
        {data && (
          <div className="Pwrapper">
            <div className="PName">{data.data.name}</div>
            <img
              className="Pimg"
              src={`http://openweathermap.org/img/wn/${data.data.weather[0].icon}.png`}
              alt="🌡️"
            />
            <div className="Ptemp">{data.data.main.temp} °C</div>
            <div className="Pdesc">{data.data.weather[0].description}</div>
            <div className="Sub">
              <div className="PSub">Humidity: {data.data.main.humidity}%</div>
              <div className="PSub">
                Wind: {data.data.wind.speed}
                <span>m/s</span>
              </div>
            </div>
            <img
              className="fav"
              onClick={() => AddFav(data.data.name)}
              src={checkLoaction(data.data.name) === -1 ? favImg : favedImg}
              alt="+"
            />
          </div>
        )}
      </div>
    </main>
  );
}
