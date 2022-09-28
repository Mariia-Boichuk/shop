import React from "react";
import logo from "../../assets/images/logo-light.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Footer;
