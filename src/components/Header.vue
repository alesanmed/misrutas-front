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

    <v-btn
      href=""
      target="_blank"
      icon
    >
      <router-link
        to="/about"
        tag="span"
      >
        <v-icon>person</v-icon>
      </router-link>
    </v-btn>
  </v-app-bar>
</template>
