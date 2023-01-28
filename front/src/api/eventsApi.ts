import axios from 'axios';

const baseUrl = 'http://localhost:5210';

export const getUserEventsLimit = async (userId: number, limit: number, page: number, sortBy: string,) => {
  const { data } = await axios.get(`${baseUrl}/events?userId=${userId}&_limit=${limit}&_sort=${sortBy}&_page=${page}`);
  return data;
}

export const addEvent = async (event: any) => {
  const { data } = await axios.post(`${baseUrl}/events`, event);
  return data;
}

export const deleteEvent = async (eventId: number) => {
  await axios.post(`${baseUrl}/events/delete?_eventId=${eventId}`)
}