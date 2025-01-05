import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue";
import Layout from "../views/Layout.vue";
import Dashboard from "../views/dashboard/index.vue";
import Certification from "../views/certification/index.vue";
import Feedback from "../views/feedback/index.vue";
import Course from "../views/course/index.vue";
import MyCourse from "../views/course/employee/myCourse.vue";
import DetailMyCourse from "../views/course/employee/detail.vue";
import CreateCourse from "../views/course/admin/create.vue";
import DetailCourse from "../views/course/admin/detail.vue";
import Profile from "../views/profile/index.vue";
import Submission from "../views/submission/index.vue";
import NotFound from "../views/not-found/index.vue";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useProfileStore } from '@/stores/profile';
import checkRolePermission from '@/misc/CheckRolePermission';

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
          permission: 'admin'
        },
        {
          path: '/course/detail/:id',
          name: 'detail-course',
          showOnSidebar: false,
          component: DetailCourse,
          permission: 'admin'
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
        {
          path: '/submission',
          name: 'submission',
          showOnSidebar: true,
          component: Submission,
          permission: 'admin'
        },
        {
          path: '/not-found',
          name: 'not-found',
          showOnSidebar: false,
          component: NotFound,
          permission: 'all_enable'
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
  // role permission check, check if using feature flag permission, else check using role permission (old)

  try {
    const filterRoute = to.matched[0].children.filter((key) => key.name === to.name)
    let checkRole = false;
    if (filterRoute.length && filterRoute[0]) {
      checkRole = checkRolePermission(filterRoute[0]?.permission)
      if (!checkRole) {
        next("/not-found");
        return;
      }
    }
  } catch (error) {
    if (!checkRole) {
      next("/not-found");
      return;
    }
  }


  // try {

  //   if (to.meta.permission.forEach((item) => {
  //     let checkPermission = false;
  //     checkPermission = typeof item === 'string'

  //   }))
  //     if (Array.isArray(to.meta.permission)) {
  //       let checkPermission = false;
  //       to.meta.permission.forEach((item: any) => {
  //         if (typeof item === "string") {
  //           checkPermission = checkRolePermission(item) || checkPermission;
  //         } else {
  //           checkPermission = item.isEnabled() || checkPermission;
  //         }
  //       });
  //       if (!checkPermission) {
  //         next("/not-found");
  //         return;
  //       }
  //     }
  // } catch {
  //   if (!checkRolePermission(to.meta.permission)) {
  //     next("/not-found");
  //     return;
  //   }
  // }
}
);

export default router
