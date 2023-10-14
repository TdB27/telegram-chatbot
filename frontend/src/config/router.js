import { createRouter, createWebHistory } from "vue-router";

import Chat from "../pages/chat/Index.vue";
import Register from "../pages/register/Index.vue";

const routes = [
  {
    name: "chat",
    path: "/chat",
    component: Chat,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "auth",
    path: "/auth",
    component: Chat,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
