import React from "react";
import CandidateCard from "../molecules/CandidateCard";
import "../../styles/components.css";
import Spinner from "../atoms/Spinner";

const CandidateList = ({
  candidatesToRender,
  loading,
  hasMore,
  loadMoreCandidates,
}) => {
  const isNotEmpty = candidatesToRender.length > 0;
  return (
    <div className="candidates__wrapper">
      {isNotEmpty && <h1>Explore Candidates</h1>}
      <div className="candidates__container">
        {candidatesToRender &&
          candidatesToRender.map((candidate, idx) => (
            <CandidateCard
              key={candidate.userId}
              candidate={candidate}
              index={idx}
            />
          ))}
      </div>
      {loading && <Spinner />}
      {!hasMore && <p>No more candidates to load.</p>}
      {!loading && hasMore && (
        <p>
          <button
            className="secondaryButton"
            onClick={() => loadMoreCandidates()}
          >
            Load more
          </button>
        </p>
      )}
    </div>
  );
};

export default CandidateList;
