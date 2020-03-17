import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const login = (user) => axios.post('auth/login', { ...user });
