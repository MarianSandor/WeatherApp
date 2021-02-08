import React, { useState, createContext } from "react";

export const LogInModalContext = createContext();

export const LogInModal = (props) => {
  const [logInModal, setLogInModal] = useState(false);

  return (
    <LogInModalContext.Provider value={[logInModal, setLogInModal]}>
      {props.children}
    </LogInModalContext.Provider>
  );
};

export const SignUpModalContext = createContext();

export const SignUpModal = (props) => {
  const [signUpModal, setSignUpModal] = useState(false);

  return (
    <SignUpModalContext.Provider value={[signUpModal, setSignUpModal]}>
      {props.children}
    </SignUpModalContext.Provider>
  );
};
