<template>
  <v-app>
    <Header />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Axios from 'axios';
import Header from './components/Header.vue';
import { AUTH_LOGOUT } from './store/actions/auth';

export default {
  name: 'App',
  components: {
    Header,
  },
  created: () => {
    Axios.interceptors.response.use(undefined, (err) => {
      if (err.status === 401 && !err.config?.__isRetryRequest) {
        this.$store.dispatch(AUTH_LOGOUT);
        this.$router.push('/login');
      }

      throw err;
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
