import Vue from "vue";
import Router from "vue-router";

// import Layout from "@/layout/index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      hidden: true
    }
  ]
});
