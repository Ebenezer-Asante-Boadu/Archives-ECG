import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "auth",
            component: () => import("../views/Auth.vue")
        },
    ]
});

export default router;
