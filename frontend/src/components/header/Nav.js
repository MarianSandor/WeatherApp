import React, { useContext } from "react";
import LoginSignup from "./LoginSignup";
import LogOut from "./Logout";
import { ModalsContext } from "../../contexts/ModalsContext";

const Nav = ({ setIsHome }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(ModalsContext);

  return (
    <div>
      {!isLoggedIn ? (
        <LoginSignup></LoginSignup>
      ) : (
        <LogOut setIsHome={setIsHome}></LogOut>
      )}
    </div>
  );
};

export default Nav;
