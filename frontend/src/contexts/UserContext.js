import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserModal = (props) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const ReviewsContext = createContext();

export const ReviewsModal = (props) => {
  const [reviews, setReviews] = useState([]);

  return (
    <ReviewsContext.Provider value={[reviews, setReviews]}>
      {props.children}
    </ReviewsContext.Provider>
  );
};
