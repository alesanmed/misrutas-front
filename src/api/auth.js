import Axios from 'axios';
import { AUTH_SERVICE } from './config/endpoints.local';

// eslint-disable-next-line import/prefer-default-export
export const login = (user) => Axios.post(`${AUTH_SERVICE}/auth/login`, { ...user });
