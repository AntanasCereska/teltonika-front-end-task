import React, { useState } from "react";
import "./header.scss";
import { NavigationMobile } from "../NavigationMobile/NavigationMobile";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { Link } from "react-router-dom";

export const Header = () => {
  const [navigationMobile, setNavigationMobile] = useState(false);

  const handleNavigationMobile = () => {
    setNavigationMobile(!navigationMobile);
  };

  return (
    <div className="header">
      <span className="header__brand">User Managment System</span>
      <NavigationMobile
        isVisible={navigationMobile}
        func={(navigationMobile) => setNavigationMobile(!navigationMobile)}
      />
      <div className="header__buttons">
        <Link to="/settings">
          <ButtonIcon iconType="settings" iconSize="medium" />
        </Link>
        <div className="header__button-menu">
          <ButtonIcon
            iconType="menu"
            iconSize="medium"
            func={handleNavigationMobile}
          />
        </div>
      </div>
    </div>
  );
};
