<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
import Form from '@/base-ui/form'
import type { IForm } from '@/base-ui/form'

interface IFormData {
    [key: string]: any
}

const props = defineProps({
    searchConfig: {
        type: Object as PropType<IForm>,
        required: true
    },
    title: {
        type: String,
        default: '高级检索'
    }
})
const emit = defineEmits(['onQuery', 'onReset'])

const originFormData: IFormData = {}
const formItems = props.searchConfig.formItems ?? []
for (const formItem of formItems) {
    originFormData[`${formItem.field}`] = ''
}
const formData = ref<IFormData>({ ...originFormData })

watch(formData, (newValue) => {
    console.log('外层formData', newValue)
})

const handleReset = () => {
    for (const key in originFormData) {
        formData.value[`${key}`] = originFormData[key]
    }
    emit('onReset')
}

const handleQuery = () => {
    emit('onQuery', formData.value)
}
</script>

<template>
    <div>
        <Form v-bind="searchConfig" v-model="formData">
            <template #footer>
                <div class="btns">
                    <el-button size="default" icon="refresh" @click="handleReset"
                        >重置</el-button
                    >
                    <el-button
                        type="primary"
                        size="default"
                        icon="search"
                        @click="handleQuery"
                        >查询</el-button
                    >
                </div>
            </template>
        </Form>
    </div>
</template>

<style scoped>
.title {
    padding-left: 30px;
    text-align: left;
}

.btns {
    text-align: right;
    padding: 0 50px 20px 0;
}
</style>
