import React from "react";
import "./navigation-mobile.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { exportDataToJsonFile } from "../../utils/exportDataToJson";
import { NavigationList } from "../NavigationList/NavigationList";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { Button } from "../Button/Button";

//!move 'navigationLinks' to NavgationList.jsx
const navigationLinks = [
  {
    title: "New user",
    url: "/new-user",
  },
  {
    title: "Create category",
    url: "/create-category",
  },
  {
    title: "Create sub-category",
    url: "/create-sub-category",
  },
  {
    title: "Create sub-sub-category",
    url: "/create-sub-sub-category",
  },
];

export const NavigationMobile = ({ isVisible, func }) => {
  const navigationCategories = useSelector((state) => state.categories);

  return (
    <div
      className={`navigation-mobile ${
        isVisible && "navigation-mobile--visible"
      }`}
    >
      <span className="navigation-mobile__icon-close">
        <ButtonIcon
          iconType="close"
          iconSize="medium"
          func={func}
          className="navigation-mobile__icon-close"
        />
      </span>
      <nav className="navigation-mobile__wrapper">
        {navigationLinks.map((navigationLink) => (
          <NavLink
            key={navigationLink.title}
            to={navigationLink.url}
            className="navigation-mobile__list-item"
            onClick={func}
          >
            {navigationLink.title}
          </NavLink>
        ))}
        {navigationCategories.map((item) => (
          <NavigationList data={item} func={func} key={item.title} />
        ))}
      </nav>
      <Button
        text="Export all data"
        type="button"
        func={() => exportDataToJsonFile(navigationCategories, "All")}
      />
    </div>
  );
};
