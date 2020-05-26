import Axios from 'axios';
import BACKEND from './config/endpoints';

export const getById = (userId) => Axios.get(`${BACKEND}/users/${userId}`);

export const checkUsername = (username) => Axios.head(`${BACKEND}/users/${username}`);

export const signUp = (user) => Axios.post(`${BACKEND}/users`, { user });
