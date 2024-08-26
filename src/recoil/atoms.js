import { atom } from 'recoil';

export const candidateListState = atom({
  key: 'candidateListState',
  default: [],
});

export const candidateOffsetState = atom({
    key: 'candidateQueryState',
    default: 0,
}); 

export const skillsState = atom({
  key: 'skillsState',
  default: [],
});

export const selectedSkillState = atom({
  key: 'selectedSkillState',
  default: null,
});

export const shortlistedCandidatesState = atom({
  key: 'shortlistedCandidatesState',
  default: JSON.parse(localStorage.getItem('shortlistedCandidates')) || [],
});

export const hiredCandidatesState = atom({
  key: 'hiredCandidatesState',
  default: JSON.parse(localStorage.getItem('hiredCandidates')) || [],
});

export const groupedCandidatesState = atom({
  key: 'groupedCandidatesState',
  default: new Map(),
});

export const searchTextState = atom({
  key: 'searchTextState',
  default: '',
});
