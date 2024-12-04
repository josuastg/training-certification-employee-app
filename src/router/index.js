import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (to.meta.requiresAuth) {
        next({ name: "login" });
        return;
      }
      signOut(auth);
      next();
      return;
    } else {
      if (to.name === "login") {
        next("dashboard");
        return;
      }
    }
    next();
  });
});

export default router
