import { createRouter, createWebHashHistory } from 'vue-router';
import { getVerifyVerification, getMainVerification } from '@/lib/utils';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/Verify.vue")
    },
    {
      path: '/app-auth',
      name: 'app-auth',
      component: () => import("../views/Auth.vue"),
    },
    {
      path: "/front-page",
      name: "front-page",
      component: () => import("../views/home.vue"),
      meta: {
        requiresAuth: true,
        admin: false
      }
    },
    {
      path: "/send-request",
      name: "send-request",
      component: () => import("../views/sendRequest.vue"),
      meta: {
        requiresAuth: true,
        admin: false
      }
    },
    {
      path: "/edit-file",
      name: "edit-file",
      component: () => import("../views/editFile.vue"),
      meta: {
        requiresAuth: true,
        admin: false
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  try {
    const verified = from.name === 'home' ? await getVerifyVerification() : await getMainVerification();

    if (verified) {
      console.log("from verified")
      if (to.name === 'home') {
        console.log("from home")
        next({
          name: 'app-auth',
        });
      }
      else {
        console.log("from true")
        next(true);
      }
    } else {

      if (to.name !== 'home') {
        next({
          name: 'home',
        });
      } else {
        next();
      }
    }
  } catch (error) {
    console.error('Error during verification:', error);
    next(false); // Prevent navigation in case of an error
  }
});


export default router
