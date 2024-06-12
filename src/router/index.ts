import { createRouter, createWebHashHistory } from 'vue-router';
import { getVerifyVerification, getMainVerification } from '@/lib/utils';
// import { storeToRefs } from 'pinia';
// import { useAppDetails } from '@/stores/appDetails';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/Verify.vue"),
      meta: {
        backArrow: false,
        admin: false,
        requiresAuth: false
      }
    },
    {
      path: '/app-auth',
      name: 'app-auth',
      component: () => import("../views/Auth.vue"),
      meta: {
        backArrow: false,
        admin: false,
        requiresAuth: false
      }
    },
    {
      path: "/front-page",
      name: "front-page",
      component: () => import("../views/home.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/send-request",
      name: "send-request",
      component: () => import("../views/sendRequest.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/edit-file",
      name: "edit-file",
      // component: () => import("../views/editFile.vue"),
      component: () => import("../views/cloud_files.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/notifications",
      name: "notifications",
      component: () => import("../views/notifications.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/cloud-files",
      name: "cloud-files",
      component: () => import("../views/cloud_files.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/settings.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/scan",
      name: "scan",
      component: () => import("../views/scan_code.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/faker",
      name: "faker",
      component: () => import("../views/test.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: false
      }
    },
    {
      path: "/gallery-details",
      name: "gallery-details",
      component: () => import("../views/gallery_details.vue"),
      meta: {
        requiresAuth: true,
        admin: false,
        backArrow: true
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  try {
    // const store = useAppDetails();
    // const {setShouldShowBackArrow} = store;
    const verified = from.name === 'home' ? await getVerifyVerification() : await getMainVerification();

    // console.log(to.meta && to.meta.backArrow); 
    // if(to.meta.backArrow){
    //   setShouldShowBackArrow(true);
    // }else{
    //   setShouldShowBackArrow(false);
    // }

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
