import React, { useState } from "react";
import "../../styles/components.css";
import logoSmall from "../../assets/mercor_logo_small.webp";
import logoLarge from "../../assets/mercor_logo.png";
import { useNavigate } from "react-router-dom";
import {
  EXPLORE,
  ROUTE_MAP,
  SIDEBAR_OPTIONS,
} from "../../constants/generalConstants";
import Icon from "../atoms/Icon";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navigate = useNavigate();

  // Event Delegation
  const handleNavigation = (event) => {
    const targetId = event.target.closest("li")?.id || EXPLORE;
    navigate(ROUTE_MAP[targetId]);
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "minimized"}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <img
          src={isExpanded ? logoLarge : logoSmall}
          alt="Logo"
          className={`logo ${isExpanded ? "expanded-logo" : "minimized-logo"}`}
        />
      </div>
      <div className="sidebar-nav">
        <ul onClick={handleNavigation}>
          {SIDEBAR_OPTIONS.map((item) => (
            <li id={item}>
              <Icon name={item} /> {isExpanded && `${item}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
