<script lang="ts" setup>
import LoginPanel from './components/LoginPanel.vue'
</script>

<template>
    <div class="login-content">
        <LoginPanel></LoginPanel>
    </div>
</template>

<style lang="less" scoped>
.login-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../../assets/img/login-bg.svg);
}
</style>
