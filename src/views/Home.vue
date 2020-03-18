<template>
  <div class="home">
    <v-container
      class="home-container"
      fluid
    >
      <v-row>
        <v-col
          cols="12"
          sm="12"
        >
          Este es tu mapa con rutas, pueblos y ciudades
        </v-col>
      </v-row>
      <v-row class="home-row">
        <v-col
          v-if="!newMarkerForm"
          cols="12"
          sm="12"
          md="3"
          order="1"
          order-md="0"
        >
          <v-subheader>Tus sitios</v-subheader>
          <v-list
            three-line
          >
            <v-list-item
              v-for="marker in markers"
              :key="marker.id"
              link
              @click="updateCenter(marker)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ marker.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  La posición de este marcador es {{ marker.position }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col
          v-if="newMarkerForm"
          cols="12"
          sm="12"
          md="3"
          order="1"
          order-md="0"
        >
          <v-subheader>Nuevo sitio</v-subheader>
          <v-form
            ref="form"
            v-model="newMarker.valid"
            @submit="saveMarker"
          >
            <v-select
              v-model="newMarker.type"
              :items="[{ text: 'Ruta', value: 'route'}, { text: 'Pueblo', value: 'town' }]"
              :rules="requiredRule"
              label="Tipo"
            />
            <v-text-field
              v-model="newMarker.name"
              :rules="requiredRule"
              label="Nombre"
            />
            <v-text-field
              :value="`${newMarker.position.lat}, ${newMarker.position.lng}`"
              label="Posición"
              readonly
            />
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!newMarker.valid"
                  >
                    Guardar
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    type="button"
                    color="danger"
                    @click="cancelSave"
                  >
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="9"
          order="0"
          order-md="1"
        >
          <Map
            ref="map"
            :markers="markers.concat(tempMarkers)"
            :add-marker="addMarker"
            :delete-marker="deleteMarker"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue';

export default {
  name: 'Home',
  components: {
    Map,
  },
  data() {
    return {
      valid: false,
      markers: [],
      tempMarkers: [],
      newMarkerForm: false,
      requiredRule: [
        (v) => !!v || 'Esto es obligatorio',
      ],
      newMarker: {
        id: '',
        type: '',
        name: '',
        position: '',
      },
    };
  },
  methods: {
    addMarker(e) {
      this.tempMarkers = [];
      this.newMarker = {
        id: this.markers.length,
        type: '',
        name: '',
        valid: false,
        position: e.latlng,
      };
      this.tempMarkers.push(this.newMarker);
      this.newMarkerForm = true;
    },
    saveMarker() {
      this.$refs.form.validate();
      if (!this.newMarker.valid) {
        return false;
      }

      this.markers.push(this.newMarker);
      this.tempMarkers = [];
      this.newMarkerForm = false;

      return true;
    },
    deleteMarker(marker) {
      this.markers = this.markers.filter((m) => m.id !== marker.id);
      if (this.markers.length) {
        this.updateCenter(this.markers[0]);
      }
    },
    cancelSave() {
      this.tempMarkers = [];
      this.newMarkerForm = false;

      return true;
    },
    updateCenter(marker) {
      this.$refs.map.updateCenter(marker.position);
    },
  },
};
</script>

<style lang="scss" scoped>
.home, .home-container {
  height: 100%;
}

.home-row {
  height: 90%;
}
</style>
