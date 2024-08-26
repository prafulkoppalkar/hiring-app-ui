// src/components/FilterButton.js
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  skillsState,
  selectedSkillState,
  candidateOffsetState,
} from "../recoil/atoms"; // Adjust import path
import { fetchSkills } from "../api/candidateApi"; // Adjust import path
import "../styles/components.css"; // Ensure styles are consistent
import Icon from "./Icon";
import { SLIDER } from "../constants/generalConstants";

const FilterButton = () => {
  const [skills, setSkills] = useRecoilState(skillsState);
  const [skillsToRender, setSkillsToRender] = useState(skills);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSkill, setSelectedSkill] = useRecoilState(selectedSkillState);
  const setOffset = useSetRecoilState(candidateOffsetState);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isDropdownOpen && skills.length === 0) {
      const getSkills = async () => {
        setLoading(true);
        try {
          const fetchedSkills = await fetchSkills();
          setSkills(fetchedSkills);
          setSkillsToRender(fetchedSkills);
        } catch (error) {
          setError("Failed to fetch skills.");
        } finally {
          setLoading(false);
        }
      };
      getSkills();
    }
  }, [isDropdownOpen, skills.length, setSkills]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectSkill = (skillObj) => {
    setSelectedSkill(skillObj);
    setOffset(0);
    setIsDropdownOpen(false);
    setSkillsToRender((prev) => [
      selectedSkill,
      ...prev.filter((skill) => skill?.skillId !== skillObj?.skillId),
    ]);
  };

  const handleClearSelection = () => {
    setSelectedSkill(null);
    setOffset(0);
    setSkillsToRender((prev) => [...prev, selectedSkill]);
  };

  const sortedSkills = [...skillsToRender].sort((a, b) =>
    a?.skillName.localeCompare(b?.skillName)
  );

  return (
    <div className={`filter-button`}>
      {selectedSkill && <div class="blue-dot"></div>}
      <div onClick={handleToggleDropdown} className="filter-button__btn">
        {selectedSkill && <span onClick={handleClearSelection} className="filter-button__item__clear-selection">
          {selectedSkill?.skillName} &#10005;
        </span>}
        <Icon name={SLIDER} className="filter-button__icon"/>
      </div>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="filter-button__dropdown-container">
          {loading && <p className="filter-button__loading">Loading...</p>}
          {error && <p className="filter-button__error">{error}</p>}
          {!loading && !error && skills.length === 0 && (
            <p className="filter-button__no-skills">No skills available</p>
          )}
          <ul className="filter-button__dropdown">
            {/* {selectedSkill && (
              <li
                onClick={handleClearSelection}
                className="filter-button__item__selected"
              >
                <span className="filter-button__item__clear-selection">
                  {selectedSkill?.skillName} &#10005;
                </span>
              </li>
            )} */}
            {sortedSkills &&
              sortedSkills.map((skill) => (
                <li
                  key={skill?.skillId}
                  onClick={() => handleSelectSkill(skill)}
                  className={`filter-button__item`}
                >
                  {skill?.skillName}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
