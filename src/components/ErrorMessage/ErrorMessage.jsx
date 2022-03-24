import React from "react";
import "./error-message.scss";

export const ErrorMessage = ({ text, size }) => {
  return (
    <span className={`error-message ${size && `error-message--${size}`}`}>
      {text}
    </span>
  );
};
