// Education.jsx
import React from "react";
import "../styles/components.css";
import PickerItem from "./PickerItem";
import logo from "../assets/books_iconnew.png";

const Education = ({ education }) => {
  return (
    <div className="work-experience">
      <ul>
        {education.map(
          (edu, idx) =>
            edu.degree && (
              <PickerItem
                key={idx}
                title={`${edu.degree}`}
                subtitle={edu.school}
                description={edu.grade}
                period={`${edu.startDate} - ${edu.endDate}`}
                logo={logo}
              />
            )
        )}
      </ul>
    </div>
  );
};

export default Education;
