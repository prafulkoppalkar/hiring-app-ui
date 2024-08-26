// AvailabilityCards.jsx
import React from "react";
import "../styles/components.css";
import { AVAILABILITY_TEXT, CHECKERCARDS } from "../constants/generalConstants";
import CheckerCard from "./CheckerCard";
import { SALARY_FUNCTION_MAP } from "../helpers/candidateHelpers";

const AvailabilityCards = ({ candidate }) => {
  return (
    <div className="availability-cards">
      {CHECKERCARDS.map((card) => (
        <CheckerCard
          title={card}
          description={AVAILABILITY_TEXT[card]}
          footerText={SALARY_FUNCTION_MAP[card](candidate)}
        />
      ))}
    </div>
  );
};

export default AvailabilityCards;
