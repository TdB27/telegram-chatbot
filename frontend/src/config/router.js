import { createRouter, createWebHistory } from "vue-router";

import Chat from "../pages/chat/Index.vue";

const routes = [
  {
    name: "chat",
    path: "/chat",
    component: Chat,
  },
  {
    name: "register",
    path: "/register",
    component: Chat,
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
