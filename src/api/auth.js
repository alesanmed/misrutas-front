import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const login = (user) => axios.post('http://localhost:3000/auth/login', { ...user });
