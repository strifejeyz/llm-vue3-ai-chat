/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import Axios from "axios";
import App from './App.vue';
import {createApp} from 'vue';
import '@/styles/globals.scss';
import Store from "./state/store";
import "animator-css/animator.css";
import {registerPlugins} from '@/plugins';

const app = createApp(App);
app.config.globalProperties.$axios = Axios;
registerPlugins(app);
app.use(Store);
app.mount('#app');
