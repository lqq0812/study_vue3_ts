<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import Form from '@/base-ui/form'
import type { IForm } from '@/base-ui/form'

interface IFormData {
    [key: string]: any
}

const props = defineProps({
    title: {
        type: String
    },
    width: {
        type: [String, Number],
        default: '50%'
    },
    modalConfig: {
        type: Object as PropType<IForm>
    }
})
const emit = defineEmits(['onConfirm'])

const originFormData: IFormData = {}
const formItems = props.modalConfig?.formItems ?? []
for (const formItem of formItems) {
    originFormData[`${formItem.field}`] = ''
}

const formData = ref<IFormData>({ ...originFormData })

const dialogVisible = ref(false)
const FormRef = ref<InstanceType<typeof Form>>()

function onConformClick() {
    const isValid = FormRef.value?.validForm()
    if (isValid) {
        emit('onConfirm', formData.value)
    } else {
        return false
    }
}
</script>

<template>
    <div class="form-modal">
        <el-dialog v-model="dialogVisible" :title="title" :width="width">
            <Form v-bind="modalConfig" v-model="formData"></Form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="onConformClick"> Confirm </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
.form-modal {
    color: red;
}
</style>
