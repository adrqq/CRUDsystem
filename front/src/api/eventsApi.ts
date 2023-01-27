import axios from 'axios';

const baseUrl = 'http://localhost:5200';

export const getUserEventsLimit = async (userId: number, limit: number, page: number, sortBy: string,) => {
  const { data } = await axios.get(`${baseUrl}/events?userId=${userId}&_limit=${limit}&_sort=${sortBy}&_page=${page}`);
  return data;
}

export const addEvent = async (event: any) => {
  const { data } = await axios.post(`${baseUrl}/events`, event);
  return data;
}