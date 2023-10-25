import { createRouter, createWebHistory } from "vue-router";

import Chat from "../pages/chat/Index.vue";
import Register from "../pages/register/Index.vue";
import Auth from "../pages/auth/Index.vue";

const routes = [
  {
    redirect: "/chat",
    path: "/:catchAll(.*)",
  },
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
    component: Auth,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
