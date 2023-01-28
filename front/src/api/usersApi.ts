import axios from 'axios';

const baseUrl = 'http://localhost:5210';

export const getUsersLimit = async (limit: number, sortBy: string, page: number) => {
  const { data } = await axios.get(`${baseUrl}/users?_limit=${limit}&_sort=${sortBy}&_page=${page}`);
  return data;
};

export const addUser = async (user: any) => {
  const { data } = await axios.post(`${baseUrl}/users`, user);
  return data;
};

export const deleteUser = async (userId: number) => {
  await axios.post(`${baseUrl}/users/delete?_userId=${userId}`);
};

export const calculateNextEvent = async (limit: number, page: number) => {
  const { data } = await axios.patch(`${baseUrl}/users/next-event?_limit=${limit}&_page=${page}`);
  return data;
};
