<template>
  <div class="signin primary">
    <v-container class="signin-container">
      <v-row
        align="center"
        class="signin-row"
      >
        <v-col
          cols="4"
          offset="4"
        >
          <v-card outlined>
            <v-card-text>
              <v-form
                ref="form"
                v-model="user.valid"
                @submit.prevent="signin"
              >
                <v-text-field
                  v-model="user.username"
                  :rules="requiredRule"
                  prepend-inner-icon="person"
                  label="Usuario"
                />
                <v-text-field
                  v-model="user.password"
                  :rules="requiredRule"
                  prepend-inner-icon="lock"
                  label="Constraseña"
                  type="password"
                />
                <v-btn
                  type="submit"
                  :disabled="!user.valid"
                >
                  Login
                </v-btn>
              </v-form>
              <span>¿No tienes cuenta? <router-link
                to="/signup"
              >Regístrate</router-link>
              </span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { AUTH_REQUEST } from '../store/actions/auth';

export default {
  name: 'Signin',
  data() {
    return {
      requiredRule: [
        (v) => !!v || 'Esto es obligatorio',
      ],
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async signin() {
      await this.$store.dispatch(AUTH_REQUEST, this.user);

      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.signin, .signin-container {
  height: 100%;
}

.signin-row {
  height: 90%;
}
</style>
