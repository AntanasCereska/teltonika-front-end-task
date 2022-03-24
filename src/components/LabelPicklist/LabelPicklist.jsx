import React from "react";
import "./label-picklist.scss";

export const LabelPicklist = ({ label, options, name, value, func }) => {
  const htmlFor = label.toLowerCase().replace(" ", "-");

  return (
    <div className="label-picklist">
      <label htmlFor={htmlFor} className="label-picklist__label">
        {label}
      </label>
      <select
        onChange={func}
        name={name}
        id={htmlFor}
        className="label-picklist__select"
        value={value}
        disabled={!options || (options.length === 0 && true)}
      >
        <option style={{ display: "none" }}>
          -- select {name.replaceAll("_", " ")} --
        </option>
        {options?.map((option) => (
          <option
            className="label-picklist__option"
            value={option?.title || option}
            key={option?.title || option}
          >
            {option.title || option}
          </option>
        ))}
      </select>
    </div>
  );
};
