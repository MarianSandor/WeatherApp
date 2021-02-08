import React, { useContext } from "react";
import logo from "./logo.png";
import style from "./header.module.css";
import { ModalsContext } from "../../contexts/ModalsContext";

import SearchBar from "./SearchBar";
import Nav from "./Nav";

const Header = ({ setIsHome }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(ModalsContext);

  return (
    <div className={style.header}>
      <img
        className={style.logo}
        src={logo}
        alt="SanWeather"
        onClick={() => setIsHome(true)}
      />
      {isLoggedIn ? <SearchBar setIsHome={setIsHome}></SearchBar> : ""}
      <Nav setIsHome={setIsHome} />
    </div>
  );
};

export default Header;
