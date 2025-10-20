import React from "react";
import "./JellyButton.css";

const JellyButton = ({ children = "Jelly Button", onClick, className = "", ...props }) => {
  return (
    <button className={`Btn ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default JellyButton;
