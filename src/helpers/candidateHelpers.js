import { candidateDescriptions, FULL_TIME, PART_TIME } from "../constants/generalConstants";

export const groupCandidatesBySkill = (candidates, skillMap = new Map()) => {
  const newSkillMap = new Map(skillMap);

  candidates.forEach((candidate) => {
    candidate.skills.forEach(({ Skill }) => {
      if (!newSkillMap.has(Skill.skillName)) {
        newSkillMap.set(Skill.skillName, []);
      }
      // Get the skill-specific candidate array
      const skillCandidates = newSkillMap.get(Skill.skillName);

      // Check for duplicates
      if (!skillCandidates.some(existingCandidate => existingCandidate.userId === candidate.userId)) {
        newSkillMap.get(Skill.skillName).push(candidate);
      }
      
    });
  });

  return newSkillMap;
};

export const filterCandidatesBySearchText = (candidates, searchText) => {
  const normalizedSearchText = searchText.toLowerCase();

  return candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(normalizedSearchText)
  ) || [];
};


export const getTotalYearsOfExperience = (workExperience) => {
  return workExperience.reduce((totalYears, experience) => {
    const startYear = parseInt(experience.startDate, 10) || 0;
    const endYear = parseInt(experience.endDate, 10) || 0;
    return totalYears + (endYear - startYear);
  }, 0);
}

export const sortFunction = (items) => {
  console.log(items.sort((a, b) => {
    if (a.skillName < b.skillName) return -1;
    if (a.skillName > b.skillName) return 1;
    return 0
  }))
  return items.sort((a, b) => {
    if (a.skillName < b.skillName) return -1;
    if (a.skillName > b.skillName) return 1;
    return 0
  })
}

export function getRandomDescription(idx) {
  const index = idx % candidateDescriptions.length;
  return candidateDescriptions[index];
}

export function getFullTimeSalaryText(candidate){
  return `${candidate.fullTimeSalary} / month ${candidate.fullTimeSalaryCurrency}`
}

export function getPartTimeSalaryText(candidate){
  return `${candidate.partTimeSalary} / month ${candidate.partTimeSalaryCurrency}`
}

export const SALARY_FUNCTION_MAP = {
  [FULL_TIME]: getFullTimeSalaryText,
  [PART_TIME]: getPartTimeSalaryText
}
