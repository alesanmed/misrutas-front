<template>
  <div class="profile">
    <v-card
      outlined
      class="mx-auto mt-10"
      max-width="700"
    >
      <div class="d-flex flex-nowrap justify-center">
        <div class="card-col-1">
          <v-avatar
            color="grey lighten-2"
            class="mt-3"
            size="128"
            left
          >
            <span class="display-3">{{ avatar }}</span>
          </v-avatar>
        </div>
        <div class="card-col-2">
          <v-card-title>{{ user.name }}</v-card-title>
          <div class="text-left">
            <v-card-text>
              <p class="text--primary subtitle-1">
                {{ user.username }}
              </p>
              <p class="text--primary subtitle-2">
                {{ user.email }}
              </p>
            </v-card-text>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER_REQUEST } from '../store/actions/user';
import EMOJIS from '../assets/emojis';

export default {
  name: 'Profile',
  data() {
    return {
      user: {
        username: '',
        name: '',
        email: '',
      },
    };
  },
  computed: {
    avatar() {
      return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    },
  },
  created() {
    if (!this.$store.getters.profileLoaded) {
      this[USER_REQUEST]().then(() => {
        this.user = this.$store.getters.userProfile;
        this.loading = false;
      });
    } else {
      this.user = this.$store.getters.userProfile;
      this.loading = false;
    }
  },
  methods: {
    ...mapActions([USER_REQUEST]),
  },
};
</script>

<style lang="scss" scoped>
.card-col-1 {
  flex-grow: 2;
}

.card-col-2 {
  flex-grow: 1;
}
</style>
