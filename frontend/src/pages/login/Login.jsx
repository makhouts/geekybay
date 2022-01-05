import React, { useState } from "react";
import classes from "./login.module.css";
import { PageTransition } from "../../helpers/animations";
import { Link, useNavigate } from "react-router-dom";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { UseInput } from "../../hook/UseInput";
import axios from "axios";

export const Login = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const postLogin = () => {
    axios
      .post(
        "/auth/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/");
      });
  };

  // const postLogin = async () => {
  //   const data = {
  //     username: username,
  //     password: password,
  //   };
  //   try {
  //     const res = await fetch("/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(data),
  //     });
  //     if (!res.ok) {
  //       if(res.status === 401){
  //         console.log('unauth')
  //       }
  //       const resData = await res.json()
  //       throw new Error(resData.message)
  //     }
  //     navigate('/')
  //   } catch (error) {
  //     const e= error
  //     console.log(e)
  //   }
  // };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = UseInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = UseInput((value) => value.trim().length > 6);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <PageTransition>
      <div>
        <div className={classes.boxContainer}>
          <div className={classes.topContainer}>
            <div className={classes.backDrop}></div>
            <div className={classes.headerContainer}>
              <div className={classes.headText}>Login</div>
            </div>
          </div>
          <div className={classes.form}>
            <form onSubmit={formSubmissionHandler}>
              <div className={`${classes.formGroup} ${emailInputHasError === true ? classes.invalid : ""}`}>
                <label htmlFor="email">User Name</label>
                <input
                  type="email"
                  id="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={emailBlurHandler}
                  placeholder="Username"
                />
                {emailInputHasError && <p className={classes.error}>Please enter a valid email</p>}
              </div>
              <div className={`${classes.formGroup} ${passwordInputHasError === true ? classes.invalid : ""}`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={passwordBlurHandler}
                  placeholder="Password"
                />
                {passwordInputHasError && <p className={classes.error}>Please enter a minmum 7 digits password</p>}
              </div>
            </form>
          </div>
          <div className={classes.buttonContainer}>
            <SencondaryButton className={classes.btn} type="submit" onClick={postLogin}>
              Login
            </SencondaryButton>
          </div>
          <div className={classes.linkContainer}>
            <p className={classes.linkText}>Don't have an account?</p>
            <Link className={classes.link} to="/signUp">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// const [enterEmail, setEnterEmail] = useState("");
// const [emailIsValid, setEmailIsValid] = useState();
// const [enterPassword, setEnterPassword] = useState("");
// const [passwordIsValid, setPasswordIsValid] = useState();
// const [formIsValid, setFormIsValid] = useState(false);

// useEffect(() => {
//   const identifier = setTimeout(() => {
//     console.log("checking invalidation");
//     setFormIsValid(
//       enterEmail.includes("@") && enterPassword.trim().length > 6
//     );
//   }, 500);
//   return () => {
//     console.log("effect cleanup");
//     clearTimeout(identifier);
//   };
// }, [enterEmail, enterPassword]);

// const emailChangeHandler = (event) => {
//   setEnterEmail(event.target.value);
// };

// const passwordChangeHandler = (event) => {
//   setEnterPassword(event.target.value);
// };

// const validateEmailHandler = () => {
//   setEmailIsValid(enterEmail.includes("@"));
// };

// const validatePasswordHandler = () => {
//   setPasswordIsValid(enterPassword.trim().length > 6);
// };

// const submitHandler = (event) => {
//   event.preventDefault();
//   loginHandler(enterEmail, enterPassword);
// };

// //After click Login button
// const [isLogin, setIsLogin] = useState(false);
// useEffect(() => {
//   const storeLocal = localStorage.getItem("isLogin");
//   if (storeLocal === "1") {
//     setIsLogin(true);
//   }
// }, []);
// const loginHandler = () => {
//   localStorage.setItem("isLogin", "1");
//   setIsLogin(true);
// };
