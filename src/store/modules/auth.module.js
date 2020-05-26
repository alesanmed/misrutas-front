import Axios from 'axios';
import {
  AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT,
} from '../actions/auth';
import { USER_SAVE_ID, USER_CLEAN } from '../actions/user';
import { signin } from '../../api/auth';

const initialState = {
  token: localStorage.getItem('user-token') || '',
  status: '',
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const actions = {
  [AUTH_REQUEST]: async ({ commit }, user) => {
    try {
      commit(AUTH_REQUEST);

      const res = await signin(user);

      const token = res.data.accessToken;
      const { userId } = res.data;

      localStorage.setItem('user-token', token);
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      commit(AUTH_SUCCESS, token);

      commit(USER_SAVE_ID, userId);

      return res;
    } catch (e) {
      commit(AUTH_ERROR);
      localStorage.removeItem('user-token');
      commit(USER_CLEAN);
      throw e;
    }
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem('user-token');
    delete Axios.defaults.headers.common.Authorization;
    commit(USER_CLEAN);
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
  state: initialState,
  getters,
  actions,
  mutations,
};
