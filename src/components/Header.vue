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
  </v-app-bar>
</template>
