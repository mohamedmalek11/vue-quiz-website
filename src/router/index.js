import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import testPage from "../views/Test.vue";
import notFound from "../views/NotFound.vue";  

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:pageNum",
    name: "test",
    component: testPage,
  },
  {
    path: "/:pathMatch(.*)",
    name: "notFound",
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
