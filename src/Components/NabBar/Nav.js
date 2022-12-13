import React, { useState, useEffect } from "react";
import "./Nav.css";
import myLogo from "../../Assets/images/mylogo.png";
import netflixLogo from "../../Assets/images/netflixlogo.png";
import { useGlobalState } from "../../GlobalStateProvider";
import { useNavigate } from "react-router-dom";
export default function Nav() {
  const [show, handleShow] = useState(false);
  const [{ user }, dispatch] = useGlobalState();
  const Navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    // return () => window.removeEventListener("scroll");
  }, []);
  const HandleSignOut = () => {
    if (user) {
      dispatch({
        type: "USER_LOGOUT",
      });
    } else {
      Navigate("/login");
    }
  };
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={netflixLogo} alt="netflix logo" />
      <div className="nav__right-wrapper">
        <div className="nav__profile">
          <div>
            <h4>{user ? user?.first_name+user?.last_name : "Guest"}</h4>
            <h6>{user && user?.email}</h6>
          </div>
          <div onClick={HandleSignOut}>
            <b>X</b>
          </div>
        </div>
        <img className="nav__avatar" src={myLogo} alt="joya logo here" />
      </div>
    </div>
  );
}
