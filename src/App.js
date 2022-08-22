import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_ID}&units=metric`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          type="text"
          onKeyDown={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h3>{data.name}</h3>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>
          <div className="description">
            <span style={{ paddingLeft: "25px" }} className="bold">
              {data.weather && <h4>{data.weather[0].main}</h4>}
            </span>
          </div>
        </div>

        {data.name ? (
          <div className="bottom">
            <div className="feels">
              {data.main && (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              )}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className="winds">
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              )}
              <p>Winds</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
