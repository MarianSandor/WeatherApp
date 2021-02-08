import React, { useState, createContext } from "react";

export const QueryContext = createContext();

export const QueryInput = (props) => {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={[query, setQuery]}>
      {props.children}
    </QueryContext.Provider>
  );
};
