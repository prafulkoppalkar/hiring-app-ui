import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Shortlisted from "./organisms/ShortListed";
import Hired from "./organisms/Hired";
import CandidateDetails from "./organisms/CandidateDetails";
import CandidateListWrapper from "./CandidateListWrapper";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/explore" element={<CandidateListWrapper />} />
      <Route path="/shortlisted" element={<Shortlisted />} />
      <Route path="/hired" element={<Hired />} />
      <Route path="/details/:id" element={<CandidateDetails />} />
      <Route path="/" element={<Navigate to="/explore" />} />
    </Routes>
  );
};

export default RoutesComponent;
