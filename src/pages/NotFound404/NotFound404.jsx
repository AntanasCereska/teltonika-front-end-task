import React from "react";
import "./not-found-404.scss";
import travolta_confused from "../../assets/other/travolta_confused.gif";

export const NotFound404 = () => {
  return (
    <div className="not-found-404">
      <span className="not-found-404__text">
        4<span className="not-found-404__text-o">O</span>4
      </span>
      <img
        className="not-found-404__image"
        src={travolta_confused}
        alt="background"
      />
    </div>
  );
};
