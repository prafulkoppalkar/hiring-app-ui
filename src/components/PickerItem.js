import "../styles/components.css";
import React from "react";
import Icon from "./Icon";

const PickerItem = ({ title, subtitle, description, period, logo, icon, className }) => {
  return (
    <div className={`personal-details-item ${className}`}>
      <div className="personal-details-logo">
        <img src={logo} alt={`logo`} />
      </div>
      <div className="personal-details">
        <h3>{title} {icon && <Icon name={icon} />}</h3>
        <h4>{subtitle}</h4>
        <p>{description}</p>
      </div>
      <div className="personal-details-duration">
        <p>{period}</p>
      </div>
    </div>
  );
};

export default PickerItem;
