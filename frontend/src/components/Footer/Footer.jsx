import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
            suscipit officia aperiam mollitia atque enim libero? Recusandae
            cumque veritatis voluptatibus qui. Molestiae ut ipsam repellendus
            nihil dignissimos natus illo? Enim possimus cumque, harum voluptate
            similique culpa placeat neque beatae quia esse maiores nostrum
            voluptas molestias cum rem, dolorum suscipit sunt, officiis
            architecto. Similique modi totam possimus qui? Ullam adipisci
            dolorum ex incidunt quia aliquid totam magnam ea libero, ipsum sint
            assumenda culpa voluptatibus quas suscipit! Incidunt eligendi rem
            pariatur ipsa, obcaecati amet optio, sapiente dolorem vitae minus
            accusantium enim corporis reprehenderit a officia odio fugit ut.
            Ipsam quo excepturi ex?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9155503999</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
