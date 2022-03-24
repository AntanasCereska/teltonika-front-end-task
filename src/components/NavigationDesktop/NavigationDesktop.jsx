import React from "react";
import "./navigation-desktop.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavigationList } from "../NavigationList/NavigationList";
import { Button } from "../Button/Button";
import { exportDataToJsonFile } from "../../utils/exportDataToJson";

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

export const NavigationDesktop = () => {
  const navigationCategories = useSelector((state) => state.categories);

  return (
    <aside className="navigation-desktop">
      <nav className="navigation-desktop__wrapper">
        {navigationLinks.map((navigationLink) => (
          <NavLink
            key={navigationLink.title}
            to={navigationLink.url}
            className="navigation-desktop__list-item"
          >
            {navigationLink.title}
          </NavLink>
        ))}
        {navigationCategories.map((item) => (
          <NavigationList data={item} key={item.title} />
        ))}
      </nav>
      <Button
        func={() => exportDataToJsonFile(navigationCategories, "All")}
        text="Export all data"
      />
    </aside>
  );
};
