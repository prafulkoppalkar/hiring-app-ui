import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { hiredCandidatesState, searchTextState, selectedSkillState } from '../recoil/atoms';
import CandidateCard from './CandidateCard';

const Hired = () => {
  const hiredCandidates = useRecoilValue(hiredCandidatesState);
  const [candidatesToRender, setCandidatesToRender] = useState(hiredCandidates)
  const selectedSkill = useRecoilValue(selectedSkillState);
  const searchText = useRecoilValue(searchTextState);

  useEffect(() => {

    const updatedCandidatesToRender = () =>{
      let candidates = [...hiredCandidates];
  
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
  },[selectedSkill, hiredCandidates, searchText]) 

  const isNotEmpty = candidatesToRender.length > 0;

  return (
    <div className='candidates__wrapper'>
      {isNotEmpty && <h1>Hired Candidates</h1>}
      <div className="candidates__container">
        {candidatesToRender.length === 0 ? (
          <p>No hired candidates.</p>
        ) : (
          candidatesToRender.map((candidate, idx) => (
            <CandidateCard key={candidate.userId} candidate={candidate} index={idx} />
          ))
        )}
      </div>
    </div>
  );
};

export default Hired;
