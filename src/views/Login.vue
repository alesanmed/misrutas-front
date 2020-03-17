<template>
  <div class="login primary">
    <v-container class="login-container">
      <v-row
        align="center"
        class="login-row"
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
                @submit.prevent="login"
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
  name: 'Login',
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
    login: async () => {
      await this.$store.dispatch(AUTH_REQUEST);
    },
  },
};
</script>

<style lang="scss" scoped>
.login, .login-container {
  height: 100%;
}

.login-row {
  height: 90%;
}
</style>
