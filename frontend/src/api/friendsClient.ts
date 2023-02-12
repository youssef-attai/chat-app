import axios from "axios";

export default (accessToken: string) => axios.create({
  baseURL: `${import.meta.env.VITE_ERGHI_API_URL}/friends`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
});