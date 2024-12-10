import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue";
import Layout from "../views/Layout.vue";
import Dashboard from "../views/dashboard/index.vue";
import Certification from "../views/certification/index.vue";
import Feedback from "../views/feedback/index.vue";
import Training from "../views/training/index.vue";
import Profile from "../views/profile/index.vue";
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
      name: 'layout',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          showOnSidebar: true

        },
        {
          path: '/training',
          name: 'training',
          component: Training,
          showOnSidebar: true
        },
        {
          path: '/certification',
          name: 'certification',
          component: Certification,
          showOnSidebar: true
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: Feedback,
          showOnSidebar: true
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
          showOnSidebar: false
        }
      ]
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
