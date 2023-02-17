import { defineStore } from 'pinia'

// store数据持久化存储：localStorage/sessionStorage 工具
import { localCache } from '@/utils/cache'
import type { IAccount } from '@/types'
import {
    accountLoginRequest,
    getUserInfoById,
    getUserMenusByRoleId
} from '@/service/login/login'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
    token: string
    userInfo: any
    userMenus: any
    permissions: string[]
}

const useLoginStore = defineStore('login', {
    state: (): ILoginState => ({
        token: '',
        userInfo: {},
        userMenus: [],
        permissions: []
    }),
    actions: {
        async accountLoginAction(account: IAccount) {
            // 1.登录获取用户信息
            const loginRes = await accountLoginRequest(account)
            const id = loginRes.data.id
            this.token = loginRes.data.token
            // 2.token 本地缓存
            localCache.setCache(LOGIN_TOKEN, this.token)

            // 3.获取用户信息
            const infoRes = await getUserInfoById(id)
            this.userInfo = infoRes.data

            // 4.根据用户角色，获取权限（菜单）
            const menusRes = await getUserMenusByRoleId(this.userInfo.role.id)
            this.userMenus = menusRes.data

            // 5.用户信息本地存储
            localCache.setCache('userInfo', this.userInfo)
            localCache.setCache('userMenus', this.userMenus)

            // 请求所有roles/departements数据
            const mainStore = useMainStore()
            mainStore.fetchEntireDataAction()

            // 获取登录用户的所有按钮权限
            const permissions = mapMenusToPermissions(this.userMenus)
            this.permissions = permissions

            // ****动态添加路由
            const routes = mapMenusToRoutes(this.userMenus)
            routes.forEach((route) => router.addRoute('main', route))

            // 5.跳转页面
            router.push('/main')
        },

        loadLocalCacheAction() {
            console.log('刷新')
            //1.用户刷新默认加载数据
            const token = localCache.getCache(LOGIN_TOKEN)
            const userInfo = localCache.getCache('userInfo')
            const userMenus = localCache.getCache('userMenus')

            if (token && userInfo && userMenus) {
                this.token = token
                this.userInfo = userInfo
                this.userMenus = userMenus

                // 请求所有roles/departements数据
                const mainStore = useMainStore()
                mainStore.fetchEntireDataAction()

                // 获取登录用户的所有按钮权限
                const permissions = mapMenusToPermissions(this.userMenus)
                this.permissions = permissions

                //2. ****动态添加路由
                const routes = mapMenusToRoutes(this.userMenus)
                routes.forEach((route) => router.addRoute('main', route))
            }
        }
    }
})

export default useLoginStore
