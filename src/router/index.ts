import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/form-generate",
    },
    {
      path: "/form-generate",
      name: "form-generate",
      component: () => import("@/views/form-generate/index.vue"),
    },
  ],
});

export default router;
