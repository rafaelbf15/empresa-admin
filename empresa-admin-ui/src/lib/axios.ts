import { NEXT_API_URL, NEXT_PUBLIC_API_URL } from '@/utils/constants';
import axios from 'axios';


export default axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const axiosAuth = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const axiosInternalApi = axios.create({
  baseURL: NEXT_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});