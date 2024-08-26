import React from 'react';
import { HIRED, HIRING_PROCESS, HIRING_STEP_DESCRIPTIONS, INTERVIEW, SHORTLIST, TIC_MARK } from '../constants/generalConstants';
import PickerItem from './PickerItem';
import bookmarkImg from '../assets/bookmark.png';
import interviewImg from '../assets/interview.jpg';
import hiredImg from '../assets/hired_icon.png';
import { useRecoilValue } from 'recoil';
import { hiredCandidatesState, shortlistedCandidatesState } from '../recoil/atoms';

const getStatusImage = (step) => {
  switch (step) {
    case SHORTLIST:
      return bookmarkImg;
    case INTERVIEW:
      return interviewImg;
    case HIRED:
      return hiredImg;
    default:
      return bookmarkImg;
  }
};

const InterviewStatus = ({ candidate }) => {
  const shortlistedCandidates = useRecoilValue(shortlistedCandidatesState);
  const hiredCandidates = useRecoilValue(hiredCandidatesState);

  const isShortlisted = shortlistedCandidates.some((c) => c.userId === candidate.userId);
  const isHired = hiredCandidates.some((c) => c.userId === candidate.userId);

  return (
    <div className="work-experience">
      <ul>
        {HIRING_PROCESS.map((step, idx) => (
          <PickerItem
            key={idx}
            title={step}
            subtitle={`Step ${idx + 1}`}
            description={HIRING_STEP_DESCRIPTIONS[step]}
            className={isHired || (step === SHORTLIST && isShortlisted) ? 'completed' : ''}
            logo={getStatusImage(step)}
            icon={isHired || (step === SHORTLIST && isShortlisted) ? TIC_MARK : ''}
          />
        ))}
      </ul>
    </div>
  );
};

export default InterviewStatus;
