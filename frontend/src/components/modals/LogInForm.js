import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import style from "./modals.module.css";
import axios from "axios";
import { LogInModalContext } from "../../contexts/NavContext";
import { ModalsContext } from "../../contexts/ModalsContext";
import { UserContext, ReviewsContext } from "../../contexts/UserContext";

export default function Modal({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [logInModal, setLogInModal] = useContext(LogInModalContext);
  const [isLoggedIn, setIsLoggedIn] = useContext(ModalsContext);
  const [user, setUser] = useContext(UserContext);
  const [reviews, setReviews] = useContext(ReviewsContext);

  if (!logInModal) return null;

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loggedInHandler = async (e) => {
    e.preventDefault();

    let user = undefined;
    let users = await axios.get("http://localhost:8000/api/users/");
    for (let i = 0; i < users.data.length; i++) {
      if (
        (users.data[i].email == email || users.data[i].username == email) &&
        users.data[i].password == password
      ) {
        user = users.data[i];
      }
    }

    if (user === undefined) {
      setValidPass(false);
      setValidEmail(false);
      return;
    }

    setUser(user);

    let reviews = await axios.get("http://localhost:8000/api/reviews/");
    setReviews(reviews.data);

    setEmail("");
    setPassword("");
    setValidEmail(true);
    setValidPass(true);

    setIsLoggedIn(true);
    setLogInModal(false);
  };

  const closeHandler = () => {
    setEmail("");
    setPassword("");
    setValidEmail(true);
    setValidPass(true);

    setLogInModal(false);
  };

  return ReactDom.createPortal(
    <>
      <div className={style.overlay} />
      <div className={style.modal}>
        <form>
          <label className={style.label}>Email/Username</label>
          <input
            type="text"
            className={validEmail ? style.input : style["input-invalid"]}
            onChange={emailHandler}
          ></input>
          <label className={style.label}>Password</label>
          <input
            type="password"
            className={validPass ? style.input : style["input-invalid"]}
            onChange={passwordHandler}
          ></input>
          <button className={style.button} onClick={loggedInHandler}>
            Login
          </button>
        </form>
        <button className={style.closeButton} onClick={closeHandler}>
          X
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
