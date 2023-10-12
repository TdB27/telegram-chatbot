import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import { createApp } from "vue";
import App from "./App.vue";

import store from "./config/store";

import "./assets/css/style.css";

createApp(App).use(store).mount("#app");
