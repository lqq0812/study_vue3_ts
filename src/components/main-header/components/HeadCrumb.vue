<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const route = useRoute()
const breadcrumbs = computed(() => {
    return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<template>
    <div class="crumb-content">
        <el-breadcrumb separator-icon="CaretRight">
            <template v-for="crumb in breadcrumbs" :key="crumb.name">
                <el-breadcrumb-item :to="crumb.path">{{ crumb.name }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<style lang="less" scoped>
.crumb-content {
    color: red;
}
</style>
