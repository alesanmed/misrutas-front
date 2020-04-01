import Axios from 'axios';
import { AUTH_SERVICE } from './config/endpoints.local';

// eslint-disable-next-line import/prefer-default-export
export const signin = (user) => Axios.post(`${AUTH_SERVICE}/auth`, { ...user });
