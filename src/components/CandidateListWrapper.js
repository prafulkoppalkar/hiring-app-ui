import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  candidateListState,
  candidateOffsetState,
  selectedSkillState,
  groupedCandidatesState,
  searchTextState,
} from "../recoil/atoms";
import { fetchCandidates, fetchCandidatesBySkill } from "../api/candidateApi";
import { LIMIT } from "../constants/queryConstants";
import {
  filterCandidatesBySearchText,
  groupCandidatesBySkill,
} from "../helpers/candidateHelpers";
import CandidateList from "./organisms/CandidateList"; // Import the rendering component

const CandidateListWrapper = () => {
  const [candidates, setCandidates] = useRecoilState(candidateListState);
  const selectedSkill = useRecoilValue(selectedSkillState);
  const [offset, setOffset] = useRecoilState(candidateOffsetState);
  const [groupedCandidates, setGroupedCandidates] = useRecoilState(
    groupedCandidatesState
  );
  const searchText = useRecoilValue(searchTextState);

  const [candidatesToRender, setCandidatesToRender] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreCandidates = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      let newCandidates;
      if (selectedSkill || searchText) {
        newCandidates = await fetchCandidatesBySkill(
          selectedSkill?.skillName,
          searchText,
          LIMIT,
          offset
        );
      } else {
        newCandidates = await fetchCandidates(LIMIT, offset);
      }

      setCandidates((prev) => {
        // Create a map to check for duplicates based on userId
        const existingCandidateIds = new Set(
          prev.map((candidate) => candidate.userId)
        );
        // Filter new candidates to remove duplicates
        const uniqueNewCandidates = newCandidates?.filter(
          (candidate) => !existingCandidateIds.has(candidate.userId)
        );
        // Append unique new candidates to the previous list
        return [...prev, ...uniqueNewCandidates];
      });

      if (newCandidates.length < LIMIT) {
        setHasMore(false);
      }

      // Update grouped candidates based on the new candidates
      setGroupedCandidates((prev) => {
        const updatedGroupedCandidates = groupCandidatesBySkill(
          newCandidates,
          prev
        );
        return updatedGroupedCandidates;
      });

      // Use functional update to ensure the offset is updated correctly
      setOffset((prev) => {
        const newOffset = prev + LIMIT;
        return newOffset;
      });
    } catch (error) {
      console.error("Error loading more candidates:", error);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    hasMore,
    offset,
    selectedSkill,
    searchText,
    setCandidates,
    setGroupedCandidates,
    setOffset,
  ]);

  useEffect(() => {
    if (candidatesToRender.length === 0) loadMoreCandidates();
  }, [candidatesToRender]);

  // for infinite scroll without loadmore button
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
  //       loadMoreCandidates();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [loading]);

  useEffect(() => {
    const candidatesToRender =
      // set candidateToRender render based on filters
      selectedSkill && searchText
        ? filterCandidatesBySearchText(
            groupedCandidates.get(selectedSkill?.skillName),
            searchText
          )
        : selectedSkill
        ? groupedCandidates.get(selectedSkill?.skillName) || []
        : searchText
        ? filterCandidatesBySearchText(candidates, searchText)
        : candidates;

    setCandidatesToRender(candidatesToRender);
  }, [selectedSkill, groupedCandidates, candidates, searchText]);

  useEffect(() => {
    setHasMore(true);
  }, [selectedSkill, searchText]);

  return (
    <CandidateList
      candidatesToRender={candidatesToRender}
      loading={loading}
      hasMore={hasMore}
      loadMoreCandidates={loadMoreCandidates}
    />
  );
};

export default CandidateListWrapper;
