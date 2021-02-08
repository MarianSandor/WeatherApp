import React, { useState, useContext, useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import style from "./modals.module.css";
import { SignUpModalContext } from "../../contexts/NavContext";
import { ModalsContext } from "../../contexts/ModalsContext";
import { UserContext, ReviewsContext } from "../../contexts/UserContext";

export default function Modal({ children }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [type, setType] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [validType, setValidType] = useState(true);
  const [signUpModal, setSignUpModal] = useContext(SignUpModalContext);
  const [isLoggedIn, setIsLoggedIn] = useContext(ModalsContext);
  const [user, setUser] = useContext(UserContext);
  const [reviews, setReviews] = useContext(ReviewsContext);

  if (!signUpModal) return null;

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confPasswordHandler = (e) => {
    setConfPassword(e.target.value);
  };

  const typeHandler = (e) => {
    setType(e.target.value);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (username.length === 0) {
      setValidUsername(false);
      return;
    } else {
      setValidUsername(true);
    }

    if (!re.test(String(email).toLowerCase())) {
      setValidEmail(false);
      return;
    } else {
      setValidEmail(true);
    }

    if (password !== confPassword || password.length === 0) {
      setValidPass(false);
      return;
    } else {
      setValidPass(true);
    }

    if (type === "") {
      setValidType(false);
      return;
    } else {
      setValidType(true);
    }

    let user = {
      username: username,
      email: email,
      password: password,
      user_type: type,
    };

    let users = await axios.get("http://localhost:8000/api/users/");

    for (let i = 0; i < users.data.length; i++) {
      if (users.data[i].email == email) {
        setEmail("There is already an account with this email!");
        return;
      }
      if (users.data[i].username == username) {
        setUsername("There is already an account with this username!");
        return;
      }
    }

    axios.post("http://localhost:8000/api/users/", user);

    users = await axios.get("http://localhost:8000/api/users/");
    user.id = users.data[users.data.length - 1].id;

    setUser(user);

    let reviews = await axios.get("http://localhost:8000/api/reviews/");
    setReviews(reviews.data);

    setUsername("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setType("");

    setIsLoggedIn(true);
    setSignUpModal(false);
  };

  const closeHandler = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setType("");
    setValidUsername(true);
    setValidType(true);
    setValidEmail(true);
    setValidPass(true);

    setSignUpModal(false);
  };

  return ReactDom.createPortal(
    <>
      <div className={style.overlay} />
      <div className={style.modal}>
        <form>
          <label className={style.label}>Username</label>
          <input
            type="text"
            className={validUsername ? style.input : style["input-invalid"]}
            value={username}
            onChange={usernameHandler}
          ></input>
          <label className={style.label}>Email</label>
          <input
            type="text"
            className={validEmail ? style.input : style["input-invalid"]}
            value={email}
            onChange={emailHandler}
          ></input>
          <label className={style.label}>Password</label>
          <input
            type="password"
            className={validPass ? style.input : style["input-invalid"]}
            value={password}
            onChange={passwordHandler}
          ></input>
          <label className={style.label}>Confirm Password</label>
          <input
            type="password"
            className={validPass ? style.input : style["input-invalid"]}
            value={confPassword}
            onChange={confPasswordHandler}
          ></input>
          <label className={validType ? style.label : style["label-invalid"]}>
            <input
              type="radio"
              value="silver"
              name="user-type"
              onClick={typeHandler}
            />
            Silver
          </label>
          <label className={validType ? style.label : style["label-invalid"]}>
            <input
              type="radio"
              value="gold"
              name="user-type"
              onClick={typeHandler}
            />
            Gold
          </label>
          <button className={style.button} onClick={signUpHandler}>
            SignUp
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
