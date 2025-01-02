import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from "../views/register.vue";
import Layout from "../views/layout.vue";
import Dashboard from "../views/dashboard/index.vue";
import Certification from "../views/certification/index.vue";
import Feedback from "../views/feedback/index.vue";
import Course from "../views/course/index.vue";
import MyCourse from "../views/course/employee/myCourse.vue";
import DetailMyCourse from "../views/course/employee/detail.vue";
import CreateCourse from "../views/course/admin/create.vue";
import DetailCourse from "../views/course/admin/detail.vue";
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
          showOnSidebar: true,
          permission: 'employee'
        },
        {
          path: '/course',
          name: 'course',
          component: Course,
          showOnSidebar: true,
          permission: 'all_enable',
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: Feedback,
          showOnSidebar: true,
          permission: 'all_enable'
        },
        {
          path: '/certification',
          name: 'certification',
          component: Certification,
          showOnSidebar: true,
          permission: 'all_enable'
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
          showOnSidebar: false,
          permission: 'all_enable'
        },
        {
          path: '/course/create',
          name: 'create-course',
          showOnSidebar: false,
          component: CreateCourse,
          permission: 'all_enable'
        },
        {
          path: '/course/detail/:id',
          name: 'detail-course',
          showOnSidebar: false,
          component: DetailCourse,
          permission: 'all_enable'
        },
        {
          path: '/course/my-course',
          name: 'my-course',
          showOnSidebar: false,
          component: MyCourse,
          permission: 'employee'
        },
        {
          path: '/course/my-course/detail/:id',
          name: 'detail-my-course',
          showOnSidebar: false,
          component: DetailMyCourse,
          permission: 'employee'
        },
      ]
    },
    // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue'),
    // }
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
