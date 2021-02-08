import "./Search.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

// components
import Header from "../components/header/Header";
import LogInForm from "../components/modals/LogInForm";
import SignUpForm from "../components/modals/SignUpForm";
import Weather from "../components/weather/Weather";
import Review from "../components/review/Review";
import ReviewForm from "../components/review/ReviewForm";
import Webcam from "../components/webcam/Webcam";
import { UserContext, ReviewsContext } from "../contexts/UserContext";
import { LocationInfoContext } from "../contexts/LocationContext";

function Search({ setIsHome }) {
  const [user, setUser] = useContext(UserContext);
  const [reviews, setReviews] = useContext(ReviewsContext);
  const [location, setLocation] = useContext(LocationInfoContext);
  const [isReview, setIsReview] = useState(false);

  useEffect(async () => {
    let reviews = await axios.get("http://localhost:8000/api/reviews/");
    setReviews(reviews.data);
    setIsReview(false);
  }, [isReview]);

  return (
    <>
      <div className="Search">
        <header>
          <Header setIsHome={setIsHome} />
        </header>
        <div className="empty"></div>
        <Weather />
        {user.user_type == "gold" ? <Webcam /> : ""}
        {user.user_type == "gold" &&
        location != "" &&
        user.username != "admin" ? (
          <ReviewForm
            username={user.username}
            location={location}
            setIsReview={setIsReview}
            key={user.username}
          ></ReviewForm>
        ) : (
          ""
        )}
        {reviews
          .filter((review) => review.location == location)
          .map((review) => (
            <Review
              id={review.id}
              username={review.username}
              description={review.description}
              setIsReview={setIsReview}
              user={user}
              key={review.id}
            ></Review>
          ))}
      </div>
      <LogInForm></LogInForm>
      <SignUpForm></SignUpForm>
    </>
  );
}

export default Search;
