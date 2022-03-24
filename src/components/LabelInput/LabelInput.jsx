import React, { useState } from "react";
import "./label-input.scss";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

export const Labelnput = ({
  label,
  placeholder,
  value,
  type,
  min,
  max,
  name,
  func,
}) => {
  const htmlFor = label.toLowerCase().replaceAll(" ", "-");

  const [showPassword, setShowPassword] = useState(type);

  const handleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  return (
    <div className="label-input">
      <label htmlFor={htmlFor} className="label-input__label">
        {label}
      </label>
      <span className="label-input__label-icon-wrapper">
        <input
          type={showPassword}
          id={htmlFor}
          placeholder={placeholder}
          className="label-input__input"
          min={min}
          max={max}
          onChange={func}
          name={name}
          value={value}
        />
        {type === "password" && (
          <i className="label-input__icon">
            <ButtonIcon
              iconType={showPassword === "password" ? "eye" : "eye-off"}
              iconSize="small"
              func={handleShowPassword}
            />
          </i>
        )}
      </span>
    </div>
  );
};
