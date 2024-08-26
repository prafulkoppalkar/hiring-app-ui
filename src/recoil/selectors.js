// src/recoil/selectors.js
import { selectorFamily } from 'recoil';
import { candidateListState } from './atoms'; // Adjust the import based on your file structure

export const getCandidateById = selectorFamily({
  key: 'getCandidateById',
  get: (id) => ({ get }) => {
    const candidates = get(candidateListState);
    return candidates.find(candidate => candidate.userId === id);
  },
});
