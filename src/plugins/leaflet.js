import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);