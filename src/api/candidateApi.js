import axios from 'axios';
import { BASE_URL } from '../constants/apiConstants';
import { LIMIT } from '../constants/queryConstants';

export const fetchCandidates = async (limit=LIMIT, offset=0) => {
  try {
    const response = await axios.get(`${BASE_URL}/candidates`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
};

export const fetchCandidateDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/candidates/${id}`);
    console.log("DETAILS",response);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate details:', error);
    throw error;
  }
};

export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/skills`);
    console.log("SKILLS",response);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate details:', error);
    throw error;
  }
};

export const fetchCandidatesBySkill = async (skillName, searchText, limit, offset) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        skillName,
        searchText,
        limit,
        offset,
      },
    });
    console.log("SKILLS Candidates",response);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate details:', error);
    throw error;
  }
};