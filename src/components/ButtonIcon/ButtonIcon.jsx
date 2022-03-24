import React from "react";
import "./button-icon.scss";
import { ReactComponent as IconDownload } from "./../../assets/download.svg";
import { ReactComponent as IconSearch } from "./../../assets/search.svg";
import { ReactComponent as IconSettings } from "./../../assets/settings.svg";
import { ReactComponent as IconSun } from "./../../assets/sun.svg";
import { ReactComponent as IconMoon } from "./../../assets/moon.svg";
import { ReactComponent as IconTrash } from "./../../assets/trash.svg";
import { ReactComponent as IconEye } from "./../../assets/eye.svg";
import { ReactComponent as IconEyeOff } from "./../../assets/eye-off.svg";
import { ReactComponent as IconMenu } from "./../../assets/menu.svg";
import { ReactComponent as IconClose } from "./../../assets/close.svg";

export const ButtonIcon = ({ iconType, iconSize, func, backgroundColor }) => {
  let Icon;

  switch (iconType) {
    case "downlaod":
      Icon = IconDownload;
      break;
    case "search":
      Icon = IconSearch;
      break;
    case "settings":
      Icon = IconSettings;
      break;
    case "sun":
      Icon = IconSun;
      break;
    case "moon":
      Icon = IconMoon;
      break;
    case "trash":
      Icon = IconTrash;
      break;
    case "eye":
      Icon = IconEye;
      break;
    case "eye-off":
      Icon = IconEyeOff;
      break;
    case "menu":
      Icon = IconMenu;
      break;
    case "close":
      Icon = IconClose;
      break;
    default:
      Icon = null;
  }

  return (
    <button
      type="button"
      className={`button-icon  ${
        backgroundColor && `button-icon--background-color`
      }`}
      onClick={func}
    >
      {Icon && (
        <Icon
          className={`button-icon__icon  ${
            iconSize && `button-icon__icon--${iconSize}`
          }`}
        />
      )}
      ;
    </button>
  );
};
