import React, { useState, createContext } from "react";

export const LocationInfoContext = createContext();

export const LocationInfo = (props) => {
  const [location, setLocation] = useState("");

  return (
    <LocationInfoContext.Provider value={[location, setLocation]}>
      {props.children}
    </LocationInfoContext.Provider>
  );
};
