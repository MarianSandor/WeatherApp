import React, { useState, useContext } from "react";
import style from "./review.module.css";
import axios from "axios";

const ReviewForm = ({ location, username, setIsReview }) => {
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let review = {
      username: username,
      location: location,
      description: input,
    };
    axios.post("http://localhost:8000/api/reviews/", review);

    setIsReview(true);
    setInput("");
  };

  return (
    <div className={style["review-container"]}>
      <form>
        <textarea
          className={style.input}
          type="textarea"
          cols="40"
          rows="5"
          placeholder="Share your thoughts..."
          onChange={inputHandler}
          value={input}
        />
        <button className={style.button} type="submit" onClick={submitHandler}>
          Add Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
