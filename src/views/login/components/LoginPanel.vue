<script lang="ts" setup>
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PanelAccount from './PanelAccount.vue'
import PanelPhone from './PanelPhone.vue'

const accountRef = ref<InstanceType<typeof PanelAccount>>()
const phoneRef = ref<InstanceType<typeof PanelAccount>>()

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
    localCache.setCache('isRemPwd', newValue)
})
const activeName = ref<string>('account')
function handleLogin() {
    if (activeName.value === 'account') {
        accountRef.value?.accountLogin(isRemPwd.value)
    } else {
        console.log(22)
    }
}
</script>

<template>
    <div class="panel-content">
        <h1 class="title">后台管理系统</h1>
        <div class="account-tabs">
            <el-tabs v-model="activeName" type="border-card" stretch>
                <!-- 账号登录 -->
                <el-tab-pane name="account">
                    <template #label>
                        <div class="label">
                            <el-icon><UserFilled /></el-icon>
                            <span class="text">帐号登录</span>
                        </div>
                    </template>
                    <PanelAccount ref="accountRef"></PanelAccount>
                </el-tab-pane>
                <!-- 手机登录 -->
                <el-tab-pane name="phone">
                    <template #label>
                        <div class="label">
                            <el-icon><Iphone /></el-icon>
                            <span class="text">手机登录</span>
                        </div>
                    </template>
                    <PanelPhone ref="phoneRef"></PanelPhone>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="controls">
            <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
            <el-link type="primary">忘记密码</el-link>
        </div>
        <el-button class="login-btn" type="primary" size="large" @click="handleLogin">
            立即登录
        </el-button>
    </div>
</template>

<style lang="less" scoped>
.panel-content {
    width: 330px;
    .title {
        text-align: center;
        margin-bottom: 15px;
    }
    .account-tabs {
        .label {
            display: flex;
            justify-content: center;
            align-items: center;
            .text {
                margin-left: 5px;
            }
        }
    }

    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .login-btn {
        margin-top: 10px;
        width: 100%;
        // --el-button-size: 50px;
    }
}
</style>
