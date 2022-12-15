import axios from 'axios';

const baseUrl = 'http://localhost:4001';

export const getUsersLimit = async (limit: number) => {
  const { data } = await axios.get(`${baseUrl}/users?_limit=${limit}`);
  return data;
}
