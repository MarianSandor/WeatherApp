import React, { useState, createContext } from "react";

export const ModalsContext = createContext();

export const LoggedId = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ModalsContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </ModalsContext.Provider>
  );
};
