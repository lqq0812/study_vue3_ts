import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('@/views/login/login.vue')
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/views/main/main.vue')
        },
        {
            path: '/:pathMacth(.*)',
            component: () => import('@/views/not-found/NotFound.vue')
        }
    ]
})

router.beforeEach((to) => {
    const token = localCache.getCache(LOGIN_TOKEN)
    if (to.path.startsWith('/main') && !token) {
        return '/login'
    }

    if (to.path === '/main') {
        return firstMenu?.url
    }
})

export default router
