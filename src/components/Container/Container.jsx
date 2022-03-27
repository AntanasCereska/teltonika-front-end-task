import React from "react";
import "./container.scss";

export const Container = ({ children, background, boxShadow }) => {
  return (
    <div
      className={`container ${background && "container--background"} ${
        boxShadow && "container--shadow"
      }`}
    >
      {children}
    </div>
  );
};
