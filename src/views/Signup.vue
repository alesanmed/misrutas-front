<template>
  <div class="signup primary">
    <v-container class="signup-container">
      <v-row
        align="center"
        class="signup-row"
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
                @submit.prevent="signup"
              >
                <v-text-field
                  v-model="user.username.value"
                  :rules="usernameRules"
                  :error-messages="user.username.errors"
                  label="Nombre de usuario"
                  @keyup="checkUsername"
                />
                <v-text-field
                  v-model="user.name.value"
                  :rules="requiredRule"
                  :error-messages="user.name.errors"
                  label="Tu nombre"
                />
                <v-text-field
                  v-model="user.email.value"
                  :rules="emailRules"
                  :error-messages="user.email.errors"
                  label="Email"
                />
                <v-text-field
                  v-model="user.password.value"
                  :rules="passwordRules"
                  :error-messages="user.password.errors"
                  label="Constraseña"
                  type="password"
                  @keyup="checkPasswords"
                />
                <v-text-field
                  v-model="passwordRepeat.value"
                  :rules="passwordRules"
                  :error-messages="passwordRepeat.errors"
                  label="Repite la contraseña"
                  type="password"
                  @keyup="checkPasswords"
                />
                <div v-if="genericError">
                  <p>
                    <span class="error--text">Ocurrió un error con el registro</span>
                  </p>
                </div>
                <div v-if="signupSucceed">
                  <p>
                    <span class="success--text">Registro completo :)</span>
                  </p>
                </div>
                <v-btn
                  type="submit"
                  :disabled="!user.valid"
                >
                  Registrarse
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
import { debounce } from 'lodash';
import { AUTH_REQUEST } from '../store/actions/auth';
import { checkUsername, signUp } from '../api/user';
import Errors from '../errors';

const emailPattern = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/m;

export default {
  name: 'Signup',
  data() {
    return {
      requiredRule: [
        this.required,
      ],
      passwordRules: [
        this.required,
        (v) => v.length >= 8 || 'La longitud mínima son 8 caracteres',
      ],
      usernameRules: [
        this.required,
      ],
      emailRules: [
        this.required,
        (v) => (v.length > 0 && emailPattern.test(v)) || 'El email no es válido',
      ],
      user: {
        username: {
          value: '',
          errors: [],
        },
        name: {
          value: '',
          errors: [],
        },
        email: {
          value: '',
          errors: [],
        },
        password: {
          value: '',
          errors: [],
        },
      },
      passwordRepeat: {
        value: '',
        errors: [],
      },
      usernameAvailable: true,
      genericError: false,
      signupSucceed: false,
    };
  },
  methods: {
    required: (v) => !!v || 'Esto es obligatorio',
    checkUsername: debounce(async function checkName() {
      const error = 'El nombre de usuario no está disponible';
      const index = this.user.username.errors.indexOf(error);

      try {
        await checkUsername(this.user.username.value);
        if (index < 0) {
          this.user.username.errors.push(error);
        }
      } catch (e) {
        if (index > -1) {
          this.user.username.errors.splice(index, 1);
        }
      }
    }, 200),
    checkPasswords() {
      const error = 'Las contraseñas no coinciden';
      const index = this.passwordRepeat.errors.indexOf(error);

      if (this.passwordRepeat.value && this.user.password.value) {
        if ((this.passwordRepeat.value === this.user.password.value) && index > -1) {
          this.passwordRepeat.errors.splice(index, 1);
        } else if (index < 0) {
          this.passwordRepeat.errors.push(error);
        }
      }
    },
    async signup() {
      try {
        await signUp(this.user);

        const newUser = {
          username: this.user.username.value,
          password: this.user.password.value,
        };

        await this.$store.dispatch(AUTH_REQUEST, newUser);

        this.genericError = false;
        this.signupSucceed = true;

        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      } catch (e) {
        const { response } = e;
        if (response.status === 422 && response.data.code === Errors.USER_WITH_ERRORS) {
          this.user = response.data.data;
        } else {
          this.genericError = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signup, .signup-container {
  height: 100%;
}

.signup-row {
  height: 90%;
}
</style>
