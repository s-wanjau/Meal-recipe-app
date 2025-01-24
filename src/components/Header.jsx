import React from "react";
import chef from "../assets/chef.png";

export default function Header() {
  return (
    <div>
      <header className="header">
        <img className="chef-img" src={chef} alt="chef-icon" />
        <span className="title"><marquee>Meal recipe</marquee></span>
      </header>
    </div>
  );
}