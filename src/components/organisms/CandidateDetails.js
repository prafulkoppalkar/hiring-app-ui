import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCandidateDetails } from "../../api/candidateApi";
import { getCandidateById } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";
import "../../styles/components.css";
import CandidateCard from "../molecules/CandidateCard";
import Spinner from "../atoms/Spinner";
import AvailabilityCards from "../molecules/AvailabilityCards";
import Tabs from "../molecules/Tabs";

const CandidateDetails = () => {
  const { id } = useParams();
  const initialCandidate = useRecoilValue(getCandidateById(id));
  const [candidate, setCandidate] = useState(initialCandidate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCandidateDetails = async () => {
      setLoading(true);
      try {
        const additionalDetails = await fetchCandidateDetails(id);
        setCandidate((prev) => ({
          ...prev,
          ...additionalDetails,
        }));
      } catch (error) {
        console.error("Failed to fetch candidate details:", error);
      }
      setLoading(false);
    };

    getCandidateDetails();
  }, [id]);

  if (loading)
    return (
      <div style={{ marginTop: "20px" }}>
        <Spinner />
      </div>
    );

  return (
    <div className="candidate-details">
      <h1>Candidates details</h1>
      <CandidateCard key={candidate.userId} candidate={candidate} />
      <AvailabilityCards candidate={candidate} />
      <Tabs candidate={candidate} />
    </div>
  );
};

export default CandidateDetails;
