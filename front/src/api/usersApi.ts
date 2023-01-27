import axios from 'axios';

const baseUrl = 'http://localhost:5200';

export const getUsersLimit = async (limit: number, sortBy: string, page: number) => {
  const { data } = await axios.get(`${baseUrl}/users?_limit=${limit}&_sort=${sortBy}&_page=${page}`);
  return data;
}

export const addUser = async (user: any) => {
  const { data } = await axios.post(`${baseUrl}/users`, user);
  return data;
}
