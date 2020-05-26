import {
  USER_SAVE_ID, USER_REQUEST, USER_SUCCESS, USER_ERROR, USER_CLEAN,
} from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';
import { getById } from '../../api/user';

const initialState = {
  userId: localStorage.getItem('userId') || '',
  status: '',
  user: undefined,
};

const getters = {
  userProfile: (state) => state.user,
  userId: (state) => state.userId,
  status: (state) => state.status,
  profileLoaded: (state) => !!state.user,
};

const actions = {
  [USER_REQUEST]: async ({ commit, dispatch, state }) => {
    try {
      commit(USER_REQUEST);

      const res = await getById(state.userId);

      commit(USER_SUCCESS, res.data.user);
    } catch (e) {
      commit(USER_ERROR);

      dispatch(AUTH_LOGOUT);
    }
  },
};

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [USER_SUCCESS]: (state, user) => {
    state.status = 'loaded';
    state.user = user;
  },
  [USER_ERROR]: (state) => {
    state.status = 'error';
  },
  [USER_SAVE_ID]: (state, userId) => {
    localStorage.setItem('userId', userId);
    state.userId = userId;
  },
  [USER_CLEAN]: (state) => {
    localStorage.removeItem('userId');
    state.userId = '';
    state.status = '';
    state.user = '';
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
