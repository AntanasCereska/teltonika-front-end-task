import React from "react";
import "./navigation-desktop.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavigationList } from "../NavigationList/NavigationList";
import { Button } from "../Button/Button";
import { exportDataToJsonFile } from "../../utils/exportDataToJson";

//!move 'actionLinks' to NavgationList.jsx
const actionLinks = [
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
  const navigationdata = useSelector((state) => state.categories);

  return (
    <aside className="navigation-desktop">
      <nav className="navigation-desktop__wrapper">
        {actionLinks.map((actionLink) => (
          <NavLink
            key={actionLink.title}
            to={actionLink.url}
            className="navigation-desktop__list-item"
          >
            {actionLink.title}
          </NavLink>
        ))}
        {navigationdata.map((item) => (
          <NavigationList data={item} key={item.title} />
        ))}
      </nav>
      <Button
        func={() => exportDataToJsonFile(navigationdata, "All")}
        text="Export all data"
      />
    </aside>
  );
};
