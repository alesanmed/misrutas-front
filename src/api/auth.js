import Axios from 'axios';
import BACKEND from './config/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const signin = (user) => Axios.post(`${BACKEND}/auth`, { ...user });
