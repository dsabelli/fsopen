import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ searchResults, handleDisplay }) => {
  const [weather, setWeather] = useState();
  const api_key = process.env.REACT_APP_API_KEY;
  const filteredCountries = searchResults.map((country) => (
    <>
      <div>
        <h2>
          {country.name.common}

          <button onClick={() => handleDisplay(country.id)}>
            {country.display ? "hide" : "show"}
          </button>
        </h2>
      </div>
      <div style={country.display ? { display: "block" } : { display: "none" }}>
        <p>captial {country.capital}</p>
        <p>area {country.area}</p>
        <h3>
          <strong>languages:</strong>
        </h3>
        <ul>
          {country.languages
            ? Object.values(country.languages).map((language) => (
                <li>{language}</li>
              ))
            : ""}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      </div>
    </>
  ));
  //   useEffect(() => {
  //     searchResults.map((country) =>
  //       axios
  //         .get(
  //           `https://api.openweathermap.org/data/2.5/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
  //         )
  //         .then((res) => setWeather(res.data), [])
  //     );
  //     console.log(weather);
  //   });
  return <div>{filteredCountries}</div>;
};

export default Country;
