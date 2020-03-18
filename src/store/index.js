import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import AuthModule from './modules/auth.module';
import UserModule from './modules/user.module';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    AuthModule,
    UserModule,
  },
  getters: {},
  mutations: {},
  actions: {},
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
