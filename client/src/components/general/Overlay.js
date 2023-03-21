import React from "react";

const Overlay = ({ color, opacity }) => {
  return (
    <div
      className="overlay"
      style={{
        background: `${color}`,
        opacity: `${opacity}`,
        position: "inherit",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      }}
    ></div>
  );
};

export default Overlay;
