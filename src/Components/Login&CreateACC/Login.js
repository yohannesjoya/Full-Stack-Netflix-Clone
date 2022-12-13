import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Log&Create.css";
import jologo from "../../Assets/images/mylogo.png";
import axios from "axios";
import { useGlobalState } from "../../GlobalStateProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grant, setGrant] = useState(null);
  const [{ user }, dispatch] = useGlobalState();
  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    async function checkAccess() {
      const responseX = await fetch(
        `http://localhost:7000/loginaccess?emailpass=${email + "~" + password}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.VALID === "ACC_N_EXIST") {
            setGrant("Such Account Does not exist");
          } else if (data.VALID === "INCORRECT") {
            setGrant("Incorrect Password");
          } else if (data.VALID === "CORRECT") {
            // setGrant("Correct");
            dispatch({
              type: "USER_LOGIN",
              user: data.user,
            });
            Navigate("/");
          } else {
            Navigate("/loginerr");
          }
        });
    }
    if (
      email === null ||
      email === "" ||
      password === null ||
      password === ""
    ) {
      setGrant("Please fill out the fields correctly");
    } else {
      checkAccess();
    }
  };

  return (
    <div className="Main-wrapper">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <img className="my-logo" src={jologo} alt="mylogo" />
          <h2 className="Sign-up-header">Log In</h2>

          <div className="Field">
            <label>Email address</label>
            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="Field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* {password.isTouched && !validPassword() ? (
              <PasswordErrorMessage message={message} />
            ) : null} */}
          </div>
          <button
            className="CreateAcc-btn"
            type="submit"
            // disabled={!getIsFormValid()}
          >
            Log In
          </button>
          <p>{grant}</p>
        </fieldset>
      </form>
    </div>
  );
}
