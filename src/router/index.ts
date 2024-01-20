import { createRouter, createWebHashHistory} from 'vue-router';
import { getVerifyVerification, getMainVerification } from '@/lib/utils';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import("../views/Verify.vue")
    },
    {
      path: '/app-auth',
      name: 'app-auth',
      component: ()=>import("../views/Auth.vue"),
    },
    {
      path: "/front-page",
      name: "front-page",
      component: ()=> import("../views/home.vue"),
      meta: {
        requiresAuth: true,
        admin:false
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const verified = from.name === "home" ? await getVerifyVerification(): await getMainVerification();
  console.log(typeof verified, verified)

  if (verified) {
    // console.log(to.name, from.name)
    // Check if the destination route is not the 'home' route
    if (to.name === 'home') {
      next({
        name: 'app-auth',
      });
    } else {
      next(); // Avoid infinite loop if already on the 'home' route
    }
  } else {
    // console.log(verified)
    // Check if the destination route is not the 'home' route
    if (to.name !== 'home') {
      next({
        name: 'home',
      });
    } else {
      next(); // Avoid infinite loop if already on the 'home' route
    }
  }
});


export default router
