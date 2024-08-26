import React, { useEffect, useState } from 'react';
import CandidateCard from './CandidateCard';
import { useRecoilValue } from 'recoil';
import { searchTextState, selectedSkillState, shortlistedCandidatesState } from '../recoil/atoms';

const Shortlisted = () => {
  const shortlistedCandidates = useRecoilValue(shortlistedCandidatesState);
  const [candidatesToRender, setCandidatesToRender] = useState(shortlistedCandidates)
  const selectedSkill = useRecoilValue(selectedSkillState);
  const searchText = useRecoilValue(searchTextState);

  useEffect(() => {

    const updatedCandidatesToRender = () =>{
      let candidates = [...shortlistedCandidates];
  
      if (selectedSkill) {
        candidates = candidates.filter(candidate =>
          candidate.skills.some(skill => skill.Skill.skillName === selectedSkill.skillName)
        );
      }
  
      if (searchText) {
        candidates = candidates.filter(candidate =>
          candidate.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
  
      setCandidatesToRender(candidates);
    }

    updatedCandidatesToRender()
  },[selectedSkill, shortlistedCandidates, searchText]) 

  const isNotEmpty = candidatesToRender.length > 0;
  
  return (
    <div className='candidates__wrapper'>
      {isNotEmpty && <h1>Shortlisted Candidates</h1>}
      <div className="candidates__container">
        {candidatesToRender.length === 0 ? (
          <p>No shortlisted candidates.</p>
        ) : (
          candidatesToRender.map((candidate, idx) => (
            <CandidateCard key={candidate.userId} candidate={candidate} index={idx}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Shortlisted;
