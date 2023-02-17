<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types/index'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
    name: localCache.getCache(CACHE_NAME) ?? '',
    password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
const accountRules: FormRules = {
    name: [
        { required: true, message: '请输入帐号', trigger: 'blur' },
        {
            pattern: /^[a-z0-9]{6,20}$/,
            message: '必须是6~20数字或字母组成~',
            trigger: 'blur'
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^[a-z0-9]{3,}$/,
            message: '必须是3位以上数字或字母组成',
            trigger: 'blur'
        }
    ]
}
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function accountLogin(isRemPwd: boolean) {
    formRef.value?.validate((valid) => {
        if (valid) {
            const name = account.name
            const password = account.password

            loginStore.accountLoginAction({ name, password }).then(() => {
                if (isRemPwd) {
                    localCache.setCache(CACHE_NAME, name)
                    localCache.setCache(CACHE_PASSWORD, password)
                } else {
                    localCache.removeCache(CACHE_NAME)
                    localCache.removeCache(CACHE_PASSWORD)
                }
            })
        } else {
            ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
        }
    })
}
defineExpose({ accountLogin })
</script>

<template>
    <div class="account-content">
        <el-form
            ref="formRef"
            :model="account"
            :rules="accountRules"
            label-width="60px"
            size="large"
        >
            <el-form-item label="帐号" prop="name">
                <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="account.password" show-password />
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="less" scoped>
.account-content {
    color: red;
}
</style>
