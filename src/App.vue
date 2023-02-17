<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
    <el-config-provider :locale="zhCn">
        <div class="app">
            <router-view></router-view>
        </div>
    </el-config-provider>
</template>

<style scoped>
.app {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
}
</style>
