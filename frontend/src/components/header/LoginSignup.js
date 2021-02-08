import React, { useContext } from "react";
import style from "./header.module.css";
import {
  LogInModalContext,
  SignUpModalContext,
} from "../../contexts/NavContext";

const LoginSignup = () => {
  const [logInModal, setLogInModal] = useContext(LogInModalContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpModalContext);

  return (
    <div>
      <button className={style.button} onClick={() => setLogInModal(true)}>
        LogIn
      </button>
      <button className={style.button} onClick={() => setSignUpModal(true)}>
        SignUp
      </button>
    </div>
  );
};

export default LoginSignup;
