<template>
  <l-map
    :zoom="zoom"
    :center.sync="center"
    :options="mapOptions"
    :style="{ height: '100%', 'z-index': 0 }"
    @click="addMarker"
    ref="mapElement"
  >
    <l-tile-layer :url="url" :attribution="attribution" />
    <v-geosearch :options="geosearchOptions"></v-geosearch>
    <l-marker
      v-for="marker in markers"
      v-bind:key="marker.id"
      :lat-lng="marker.position"
      :icon="icon"
    >
      <l-popup>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-subheader>{{TYPES[marker.type]}}</v-subheader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span class="body-2">{{marker.name}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn @click="deleteMarker(marker)">Borrar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    VGeosearch
  },
  props: {
    markers: Array,
    addMarker: Function,
    deleteMarker: Function
  },
  data() {
    return {
      zoom: 13,
      center: this.markers[0]?.position || latLng(40.416775, -3.70379),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      icon: icon({
        iconUrl: require("../assets/map/marker.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      TYPES: {
        route: 'Ruta',
        town: 'Pueblo'
      },
      showMap: true,
      geosearchOptions: {
        provider: new OpenStreetMapProvider()
      }
    };
  },
  methods: {
    updateCenter(latlng) {
      this.center = latlng;
    }
  }
};
</script>
