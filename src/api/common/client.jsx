import axios from 'axios';
import { requestHandler } from './utils';

export const client = axios.create({
  baseURL: process.env.BASE_URL,
});

client.interceptors.request.use(requestHandler);

client.interceptors.response.use(response => {
  return response.data;
});