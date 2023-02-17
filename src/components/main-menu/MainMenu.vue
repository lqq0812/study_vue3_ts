<script lang="ts" setup>
import { computed } from 'vue'
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/map-menus'
import { useRoute } from 'vue-router'

defineProps({
    isFold: {
        type: Boolean,
        default: false
    }
})

// 1.获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 2.监听菜单点击
function handleMenuClick(item: any) {
    const url = item.url
    router.push(url)
}

// 3.高亮默认选中菜单
const route = useRoute()

const defaultActive = computed(() => {
    const pathMenu = mapPathToMenu(route.path, userMenus)
    return pathMenu.id + ''
})
</script>

<template>
    <div class="menu-content">
        <div class="logo">
            <img src="@/assets/img/logo.svg" alt="" class="img" />
            <h2 v-show="!isFold" class="title">qq-后台管理系统</h2>
        </div>
        <div class="menu">
            <el-menu
                :default-active="defaultActive"
                :collapse="isFold"
                text-color="#b7bdc3"
                active-text-color="#fff"
                background-color="#001529"
            >
                <template v-for="menu in userMenus" :key="menu.id">
                    <el-sub-menu :index="menu.id + ''">
                        <template #title>
                            <el-icon>
                                <component :is="menu.icon.split('-icon-')[1]" />
                            </el-icon>
                            <span>{{ menu.name }}</span>
                        </template>
                        <template v-for="subMenu in menu.children" :key="subMenu.id">
                            <el-menu-item :index="subMenu.id + ''" @click="handleMenuClick(subMenu)">
                                {{ subMenu.name }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<style lang="less" scoped>
.menu-content {
    height: 100%;
    background-color: #001529;
    .logo {
        height: 28px;
        padding: 12px 10px 8px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
            height: 100%;
        }
        .title {
            font-size: 16px;
            font-weight: 700;
            color: white;
            white-space: nowrap;
        }
    }
}
.el-menu {
    border-right: none;
    user-select: none;
}

.el-sub-menu {
    .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135;
    }

    .el-menu-item:hover {
        color: #fff;
    }

    .el-menu-item.is-active {
        background-color: #0a60bd;
    }
}
</style>
