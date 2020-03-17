import Axios from 'axios';

const token = localStorage.getItem('user-token');

if (token) {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
