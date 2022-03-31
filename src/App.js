import React from "react";

import "./styles.css";

import { InputBar } from "./components/InputBar";
import { WeatherHandler } from "./components/WeatherHandler";

export default function App() {
  let keyToRefreshEveryHour = 0;
  const [cityLatLong, setCityLatLong] = React.useState({
    lat: null,
    lon: null,
  });
  setInterval(() => {
    keyToRefreshEveryHour = keyToRefreshEveryHour + 1;
  }, 60 * 1000);
  const isFreshSession = cityLatLong.lat === null;
  return (
    <div className="App">
      <InputBar setCityLatLong={setCityLatLong} />
      {!isFreshSession && (
        <WeatherHandler cityLatLong={cityLatLong} key={keyToRefreshEveryHour} />
      )}
      {isFreshSession && (
        <div className="introTitle">Welcome to World Wide Weather ⛱️</div>
      )}
    </div>
  );
}
