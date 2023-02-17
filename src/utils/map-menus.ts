import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
    // 动态获取所有的路由对象，放到数组中
    // 路由对象都在独立的文件中，
    // 从文件中将所有路由对象先读取到数组中
    const localRoutes: RouteRecordRaw[] = []

    // 读取router/main所有的ts文件
    const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
        eager: true
    })

    // 将加载的对象放到localRoutes
    for (const key in files) {
        const module = files[key]
        localRoutes.push(module.default)
    }

    return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
    // 1.加载本地路由
    const localRoutes = loadLocalRoutes()

    // 2.根据菜单去匹配正确的路由
    const routes: RouteRecordRaw[] = []
    for (const menu of userMenus) {
        for (const submenu of menu.children) {
            const route = localRoutes.find((item) => item.path === submenu.url)
            if (route) {
                // 1.给route的顶层菜单增加重定向功能
                if (!routes.find((item) => item.path === menu.url)) {
                    routes.push({ path: menu.url, redirect: route.path })
                }

                // 2.将二级菜单对应的路径
                routes.push(route)
            }
            // 记录第一个被匹配的菜单
            if (!firstMenu && route) {
                firstMenu = submenu
            }
        }
    }
    return routes
}

/**
 * 根据路径匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 * @returns 需要显示的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
    for (const menu of userMenus) {
        for (const submenu of menu.children) {
            if (submenu.url === path) {
                return submenu
            }
        }
    }
}

interface IBreadcrumbs {
    name: string
    path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
    // 1.定义面包屑
    const breadcrumbs: IBreadcrumbs[] = []

    // 2.遍历获取面包屑层级
    for (const menu of userMenus) {
        for (const submenu of menu.children) {
            if (submenu.url === path) {
                // 顶层菜单
                breadcrumbs.push({ name: menu.name, path: menu.url })

                // 匹配菜单
                breadcrumbs.push({ name: submenu.name, path: submenu.url })
            }
        }
    }

    return breadcrumbs
}

export function mapMenusToPermissions(menuList: any[]) {
    const permissions: string[] = []

    function recursePermission(menus: any[]) {
        for (const item of menus) {
            if (item.type === 3) {
                permissions.push(item.permission)
            } else {
                recursePermission(item.children ?? [])
            }
        }
    }
    recursePermission(menuList)

    return permissions
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
    const ids: number[] = []

    function recurseGetId(menus: any[]) {
        for (const item of menus) {
            if (item.children) {
                recurseGetId(item.children)
            } else {
                ids.push(item.id)
            }
        }
    }
    recurseGetId(menuList)

    return ids
}
