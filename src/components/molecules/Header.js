import React from "react";
import "../../styles/components.css";
import defaultIcon from "../../assets/profile_icon.png";
import SearchBar from "../atoms/SearchBar";
import FilterButton from "../atoms/FilterButton";

const Header = () => {
  return (
    <header className="header">
      <div className="filter_container">
        <SearchBar />
        <FilterButton />
      </div>
      <div className="header__profile">
        <img src={defaultIcon} alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
