import Axios from 'axios';
import { USER_SERVICE } from './config/endpoints.local';

// eslint-disable-next-line import/prefer-default-export
export const getById = (userId) => Axios.get(`${USER_SERVICE}/users/${userId}`);

export const checkUsername = (username) => Axios.head(`${USER_SERVICE}/users/${username}`);

export const signUp = (user) => Axios.post(`${USER_SERVICE}/users`, { user });
