import React, { useContext, useEffect } from "react";
import style from "./header.module.css";
import { ModalsContext } from "../../contexts/ModalsContext";
import { UserContext } from "../../contexts/UserContext";

const Logout = ({ setIsHome }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(ModalsContext);
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <label className={style.label}>Hi, {user.username}</label>
      <button
        className={style.button}
        onClick={() => {
          setIsLoggedIn(false);
          setIsHome(true);
        }}
      >
        LogOut
      </button>
    </div>
  );
};

export default Logout;
