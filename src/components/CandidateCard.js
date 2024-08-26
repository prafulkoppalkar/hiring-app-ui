import React, { useState } from "react";
import "../styles/components.css"; // Assuming you have styles defined here
import { useNavigate, useLocation } from "react-router-dom";
import {
  getRandomDescription,
  getTotalYearsOfExperience,
} from "../helpers/candidateHelpers";
import { useRecoilState } from "recoil";
import {
  hiredCandidatesState,
  shortlistedCandidatesState,
} from "../recoil/atoms";
import defaultIcon from "../assets/profile_image.png";
import {
  DETAILS,
  EXPLORE,
  FULL_TIME,
  HIRE_NOW,
  HIRED,
  PART_TIME,
  REQUEST_INTR0,
  ROUTE_MAP,
  SHARE,
  SHORTLIST,
  TIC_MARK,
} from "../constants/generalConstants";
import Icon from "./Icon";

const CandidateCard = ({ candidate, index }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const isDetailsRoute = location.pathname.includes(ROUTE_MAP[DETAILS]);

  const isExploreRoute = location.pathname.includes(ROUTE_MAP[EXPLORE]);

  const [shortlistedCandidates, setShortlistedCandidates] = useRecoilState(
    shortlistedCandidatesState
  );
  const [hiredCandidates, setHiredCandidates] =
    useRecoilState(hiredCandidatesState);

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleViewDetails = () => {
    navigate(`/details/${candidate.userId}`);
  };

  const isShorlisted = shortlistedCandidates.some(
    (c) => c.userId === candidate.userId
  );
  const isHired = hiredCandidates.some((c) => c.userId === candidate.userId);

  const handleShortlist = () => {
    setShortlistedCandidates((prev) => {
      const isAlreadyShortlisted = prev.some(
        (c) => c.userId === candidate.userId
      );
      const updatedList = isAlreadyShortlisted
        ? prev.filter((c) => c.userId !== candidate.userId)
        : [...prev, candidate];
      localStorage.setItem(
        "shortlistedCandidates",
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
    setHiredCandidates((prev) => {
      const isAlreadyHired = prev.some((c) => c.userId === candidate.userId);
      const updatedList = isAlreadyHired
        ? prev.filter((c) => c.userId !== candidate.userId)
        : prev;
      localStorage.setItem("hiredCandidates", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleInstantHire = () => {
    setHiredCandidates((prev) => {
      const isAlreadyHired = prev.some((c) => c.userId === candidate.userId);
      const updatedList = isAlreadyHired
        ? prev.filter((c) => c.userId !== candidate.userId)
        : [...prev, candidate];
      localStorage.setItem("hiredCandidates", JSON.stringify(updatedList));
      return updatedList;
    });
    setShortlistedCandidates((prev) => {
      const isAlreadyShortlisted = prev.some(
        (c) => c.userId === candidate.userId
      );
      const updatedList = isAlreadyShortlisted
        ? prev.filter((c) => c.userId !== candidate.userId)
        : prev;
      localStorage.setItem(
        "shortlistedCandidates",
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
  };

  const handleEmail = () => {
    const mailtoLink = `mailto:${candidate?.email}`;
    window.location.href = mailtoLink;
  };

  const handleShare = () => {
    const currentUrl = window.location.origin + location.pathname;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="candidate__card" key={candidate.userId}>
      {/* First Section */}
      <div className="candidate__header">
        <div className="candidate__profile">
          <img src={defaultIcon} alt={`${candidate.name}'s profile`} />
          <p>{candidate.name}</p>
          <p>|</p>
          <p>{getTotalYearsOfExperience(candidate.workExperience)} years</p>
          <p>|</p>
          <p>{candidate.location?.country}</p>
        </div>
        {!isDetailsRoute && (
          <button onClick={handleViewDetails}>View Profile</button>
        )}
      </div>

      {isDetailsRoute && (
        <div className="candidate__primary__actions">
          <button onClick={handleEmail}>
            <Icon name={REQUEST_INTR0} displayName={REQUEST_INTR0} />
          </button>
          <button onClick={handleShortlist} className="secondaryButton">
            <Icon
              name={SHORTLIST}
              className={`${isShorlisted ? "shortlisted" : ""}`}
              displayName={SHORTLIST}
            />
          </button>
          <button onClick={handleShare} className="secondaryButton">
            <Icon name={SHARE} />
          </button>
          {tooltipVisible && <div className="tooltip">copied!</div>}
        </div>
      )}

      {/* Second Section */}
      <div className="candidate__description">
        <p>
          {candidate.summary || getRandomDescription(index)}
        </p>
      </div>

      {/* Third Section */}
      <div className="candidate__footer">
        <div className="candidate__skills">
          <p>Expert in</p>
          <ul>
            {candidate.skills.map((skill) => (
              <li key={skill.Skill.skillId}>{skill.Skill.skillName}</li>
            ))}
          </ul>
        </div>
        {isExploreRoute && (candidate.fullTime || candidate.partTime) && (
          <div className="candidate__commitment">
            <p>Commitment</p>
            <ul>
              {candidate.fullTime && (
                <li key={candidate.fullTime}>{FULL_TIME}</li>
              )}
              {candidate.partTime && (
                <li key={candidate.fullTime}>{PART_TIME}</li>
              )}
            </ul>
          </div>
        )}
        {!isExploreRoute && (
          <div className="candidate__actions">
            {!isHired ? (
              <button onClick={handleInstantHire}>
                {HIRE_NOW} &nbsp; &#x2192;
              </button>
            ) : (
              <div className="hired">
                <Icon name={TIC_MARK} displayName={HIRED} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
