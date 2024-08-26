import React from "react";
import "../../styles/components.css";
import icon from "../../assets/office_icon.jpg";
import PickerItem from "../atoms/PickerItem";

const WorkExperience = ({ workExperience }) => {
  return (
    <div className="work-experience">
      <ul>
        {workExperience.map(
          (experience, index) =>
            experience.role && (
              <PickerItem
                key={index}
                title={experience.role}
                subtitle={experience.company}
                description={experience.description}
                period={`${experience.startDate} - ${experience.endDate}`}
                logo={icon}
              />
            )
        )}
      </ul>
    </div>
  );
};

export default WorkExperience;
