import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import Filter from "./Filter";
import Country from "./Country";
import "./index.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleFilter = (e) => {
    console.log(countries[0].capitalInfo.latlng[0]);
    let filterValue = e.target.value.toLowerCase();
    if (filterValue.length === 0) filterValue = "p";
    else {
      setSearchResults(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(filterValue)
        )
      );
      setSearchResults((prevResults) =>
        prevResults.map((result) => ({
          ...result,
          display: false,
          id: nanoid(),
        }))
      );
    }
  };

  const handleDisplay = (id) => {
    setSearchResults((prevResults) =>
      prevResults.map((result) =>
        result.id === id
          ? {
              ...result,
              display: !result.display,
            }
          : result
      )
    );
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Filter handleFilter={handleFilter} />
      <Country
        key={nanoid}
        searchResults={searchResults}
        handleDisplay={handleDisplay}
      />
    </div>
  );
}

export default App;
