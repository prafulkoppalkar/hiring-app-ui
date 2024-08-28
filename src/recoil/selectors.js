import { selectorFamily } from 'recoil';
import { candidateListState } from './atoms';

export const getCandidateById = selectorFamily({
  key: 'getCandidateById',
  get: (id) => ({ get }) => {
    const candidates = get(candidateListState);
    return candidates.find(candidate => candidate.userId === id);
  },
});
