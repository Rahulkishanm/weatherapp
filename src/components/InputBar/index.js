import React from "react";
import useFetch from "../../common/Hooks/useFetch";
import { appId, apiKeyAlgolia } from "../../environment";
export const InputBar = ({ setCityLatLong }) => {
  const ref = React.useRef();
  const [cityName, setCityName] = React.useState("");
  const [showDropDown, setShowDropDown] = React.useState(false);

  React.useEffect(() => {
    ref.current.focus();
  });
  let payloadForAlgoliaSearch = {
    aroundLatLngViaIP: false,
    query: cityName,
    language: "en",
  };

  const { loading, error, value } = useFetch(
    `https://places-dsn.algolia.net/1/places/query?x-algolia-application-id=${appId}&x-algolia-api-key=${apiKeyAlgolia}`,
    { method: "POST", body: JSON.stringify(payloadForAlgoliaSearch) },
    [cityName]
  );
  const canDropDownBeShown = cityName.length > 1 && !loading;

  let listOfCites = transformListOfcities(value);

  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <input
          ref={ref}
          type="text"
          name="city"
          id="city"
          value={cityName}
          placeholder="Type a city here !!"
          onChange={(e) => {
            setCityName(e.target.value);
            setShowDropDown(true);
          }}
        />

        <div className="city-dropdown-container">
          {canDropDownBeShown &&
            showDropDown &&
            [...listOfCites].map((item, idx) => (
              <div
                key={item.label}
                className="city-dropdown"
                onClick={() => {
                  setShowDropDown(false);
                  setCityName(item.label);
                  setCityLatLong({
                    lat: item.lat,
                    lon: item.lon,
                  });
                }}
              >
                {item.label}
              </div>
            ))}
        </div>
        {error &&
          "There was a error from algolia server, please retry after sometime"}
      </div>
    </div>
  );
};
function transformListOfcities(value) {
  if (value?.hits.length > 0) {
    let listOfCites = value?.hits
      .filter((item) => item.importance > 10)
      .map((item) => {
        if (item?.administrative?.length > 0) {
          return {
            label: item.administrative[item.administrative.length - 1],
            lat: item._geoloc.lat,
            lon: item._geoloc.lng,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
    listOfCites = listOfCites.filter(
      (arr, index, self) =>
        index === self.findIndex((t) => t.label === arr.label)
    );
    return listOfCites;
  }
  return [];
}
