import React from "react";
import "./button.scss";

export const Button = ({ text, type, form, value, func }) => {
  return (
    <button
      className="button"
      type={type}
      form={form}
      value={value}
      onClick={func}
    >
      {text}
    </button>
  );
};
