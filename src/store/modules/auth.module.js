import Axios from 'axios';
import {
  AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT,
} from '../actions/auth';
import { USER_REQUEST } from '../actions/user';
import { login } from '../../api/auth';

const initialState = {
  token: localStorage.getItem('user-token') || '',
  status: '',
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const actions = {
  [AUTH_REQUEST]: async ({ commit, dispatch }, user) => {
    try {
      commit(AUTH_REQUEST);

      const res = await login(user);

      const token = res.data.accessToken;

      localStorage.setItem('user-token', token);
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      commit(AUTH_SUCCESS, token);

      dispatch(USER_REQUEST);

      return res;
    } catch (e) {
      console.log(e);
      commit(AUTH_ERROR);
      localStorage.removeItem('user-token');
      throw e;
    }
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem('user-token');
    delete Axios.defaults.headers.common.Authorization;
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = '';
    state.token = '';
  },
};

export default {
  initialState,
  getters,
  actions,
  mutations,
};
