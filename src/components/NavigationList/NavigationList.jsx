import React, { useState } from "react";
import "./navigation-list.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { deleteCategory } from "../../redux/categorySlice";
import { deleteSubCategory } from "../../redux/categorySlice";
import { exportDataToJsonFile } from "../../utils/exportDataToJson";

export const NavigationList = ({ data, func }) => {
  const dispatch = useDispatch();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleDeleteCategory = (category_title) => {
    // eslint-disable-next-line no-restricted-globals
    confirm(
      `Do you want to delete "${category_title}" category with its sub-categories and sub-sub-categories?`
    ) && dispatch(deleteCategory({ category_title }));
  };

  const handleDeleteSubCategory = (category_title, subcategory_title) => {
    // eslint-disable-next-line no-restricted-globals
    confirm(
      `Do you want to delete "${subcategory_title}" from "${category_title}" category with its sub-sub-categories?`
    ) && dispatch(deleteSubCategory({ category_title, subcategory_title }));
  };

  const handleToggleDropdown = (func) => {
    setToggleDropdown(!toggleDropdown);
  };

  if (!data || data.length === 0) return null;
  /*   console.log(data);
   */ return (
    <div className="expandable-list">
      <div className="expandable-list__list-wrapper">
        <span className="expandable-list__item">
          <a
            href={() => false}
            onClick={handleToggleDropdown}
            className="expandable-list__item-title"
          >
            {data.subcategories.length !== 0 ? (
              <span>{toggleDropdown ? "►" : "▼"}</span>
            ) : (
              "⊘ "
            )}
            {data.title}
          </a>
          <span className="expandable-list__action-buttons">
            <ButtonIcon
              iconType="trash"
              iconSize="medium"
              func={() => handleDeleteCategory(data.title)}
              backgroundColor
            />
            <ButtonIcon
              iconType="downlaod"
              iconSize="medium"
              func={() => exportDataToJsonFile(data, data.title)}
              backgroundColor
            />
          </span>
        </span>
        {data.subcategories.map((subitem) => (
          <span
            /* //!key can dublicate with other category's subcategory key */
            /* //!either change the key or dont let to create multiple categories with same title */
            key={subitem.title}
            className={`expandable-list__sub-item ${
              toggleDropdown && "expandable-list__sub-item--hidden"
            }`}
          >
            <NavLink
              to={
                "/categories/" +
                data?.title.replaceAll(" ", "_") +
                "/" +
                subitem?.title.replaceAll(" ", "_")
              }
              className="expandable-list__sub-item-title"
              onClick={func}
            >
              {subitem.title}
            </NavLink>
            <span className="expandable-list__action-buttons">
              <ButtonIcon
                iconType="trash"
                iconSize="small"
                func={() => handleDeleteSubCategory(data.title, subitem.title)}
                backgroundColor
              />
              <ButtonIcon
                iconType="downlaod"
                iconSize="small"
                func={() => exportDataToJsonFile(subitem, subitem.title)}
                backgroundColor
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
