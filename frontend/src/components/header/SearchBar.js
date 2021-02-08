import React, { useState, useContext } from "react";

import style from "./header.module.css";
import { QueryContext } from "../../contexts/SearchContext";

const SearchBar = ({ setIsHome }) => {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useContext(QueryContext);

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    const re = /^([\w\s-]+(, ))+\w+$/;
    if (!re.test(String(searchInput).toLowerCase())) {
      setSearchInput("Wrong format!");
      return;
    }
    setQuery(searchInput);
    setSearchInput("");
    setIsHome(false);
  };

  return (
    <form onSubmit={getSearch}>
      <input
        className={style.searchBar}
        type="text"
        value={searchInput}
        onChange={updateSearch}
        placeholder='Search location (e.g. "London, GB")'
      />
      <button className={style.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
