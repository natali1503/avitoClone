import axios from 'axios';
const BASE_URL = '/api';
const REQUEST_TIMEOUT = 5000;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
