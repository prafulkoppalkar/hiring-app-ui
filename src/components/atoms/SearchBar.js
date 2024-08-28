import React from "react";
import "../../styles/components.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchTextState, candidateOffsetState } from "../../recoil/atoms";

const SearchBar = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setOffset = useSetRecoilState(candidateOffsetState);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setOffset(0);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search candidates..."
      />
    </div>
  );
};

export default SearchBar;
