import React from "react";
import { Card } from "../Card";
import useFetch from "../../common/Hooks/useFetch";
import { apiKey } from "../../environment";
export const WeatherHandler = ({ cityLatLong }) => {
  const { lat, lon } = cityLatLong;

  const payloadForTenDays = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    {},
    [lat, lon]
  );
  const payloadForCurrentTime = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    {},
    [lat, lon]
  );

  return (
    <div className="weather-container">
      {!!payloadForCurrentTime.value &&
        !!payloadForTenDays.value &&
        !payloadForTenDays.error &&
        !payloadForTenDays.error && (
          <div className="item">
            <Card
              valueTenDays={payloadForTenDays.value}
              valueNow={payloadForCurrentTime.value}
            />
          </div>
        )}
      {payloadForTenDays.error ||
        (payloadForCurrentTime.error &&
          "There was error from openweathermap API, please retry later")}
      {payloadForTenDays.loading ||
        (payloadForCurrentTime.loading && (
          <div className="item">
            <div
              className="card  backgroundLight"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2.3rem",
              }}
            >
              satellites moving..!
            </div>
          </div>
        ))}
    </div>
  );
};
