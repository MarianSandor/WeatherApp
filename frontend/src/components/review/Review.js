import React from "react";
import style from "./review.module.css";
import axios from "axios";

const Review = ({ id, username, description, setIsReview, user }) => {
  const deleteHandler = () => {
    axios.delete(`http://localhost:8000/api/reviews/${id}`);
    setIsReview(true);
  };

  return (
    <div className={style["review-container"]}>
      <h1>{username}</h1>
      <p className={style.description}>{description}</p>
      <button className={style.deleteButton} onClick={deleteHandler}>
        {user.username == username || user.username == "admin" ? "X" : ""}
      </button>
    </div>
  );
};

export default Review;
