import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    {
      path: "/code-preview",
      name: "code-preview",
      component: () => import("@/views/code-preview/index.vue"),
    },
  ],
});

export default router;
