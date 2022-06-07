import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Article from "../views/Article.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import Profile from "../views/Profile.vue";
import getAllVar from "../demo";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/article",
      name: "article",
      component: Article,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true,
  
    },
  }
  ],
});



router.beforeEach((to, from, next) => {
  console.log("Logout",getAllVar.loggedIn);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAllVar.loggedIn) {
      next()
    } else {
      next('/signin')
    }
  } else {
    next()
  }
})



export default router;
