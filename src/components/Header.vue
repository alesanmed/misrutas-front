<template>
  <v-app-bar
    app
    color="primary"
    dark
    flat
  >
    <div class="d-flex align-center">
      <router-link
        to="/"
        class="display-2"
        tag="button"
      >
        Mis Rutas
      </router-link>
    </div>

    <v-spacer />


    <router-link
      to="/profile"
      tag="span"
    >
      <v-btn
        href=""
        target="_blank"
        icon
      >
        <v-icon>person</v-icon>
      </v-btn>
    </router-link>
    <v-btn
      v-if="isAuthenticated()"
      icon
      @click="logout()"
    >
      <v-icon>power_settings_new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import { AUTH_LOGOUT } from '../store/actions/auth';

export default {
  methods: {
    ...mapGetters([
      'isAuthenticated',
    ]),
    async logout() {
      await this.$store.dispatch(AUTH_LOGOUT);
      this.$router.push('/signin');
    },
  },
};
</script>
