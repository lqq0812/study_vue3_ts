<script lang="ts" setup>
import { ref } from 'vue'
import Form from '@/base-ui/form'
import type { IFormItem } from '@/base-ui/form'
import useSystemStore from '@/store/main/system/system'

interface IFormData {
    [key: string]: any
}

interface IModalProps {
    modalConfig: {
        pageName: string
        title?: string
        width: string
        formItems?: IFormItem[]
        colLayout: any
        itemStyle: any
    }
    otherInfo?: any
}

const props = defineProps<IModalProps>()
// const props = defineProps(['modalConfig'])

const originFormData: IFormData = {}
const formItems = props.modalConfig?.formItems ?? []
for (const formItem of formItems) {
    if (formItem.type !== 'custom') {
        originFormData[`${formItem.field}`] = ''
    }
}
const formData = ref<IFormData>({ ...originFormData })

const dialogVisible = ref(false)
const FormRef = ref<InstanceType<typeof Form>>()

const isAddHandle = ref(true)
const editData = ref()

// 2.定义设置dialogVisible方法
function setModalVisible(isAdd: boolean = true, itemData?: any) {
    dialogVisible.value = true
    isAddHandle.value = isAdd
    if (!isAdd && itemData) {
        // 编辑数据

        for (const key in formData.value) {
            formData.value[key] = itemData[key]
        }
        editData.value = itemData
    } else {
        // 新建数据
        for (const key in formData.value) {
            formData.value[key] = ''
        }
        editData.value = null
    }
}

const systemStore = useSystemStore()

const onConformClick = async () => {
    let isValid: any = false
    try {
        isValid = await FormRef.value?.validForm()
        if (isValid) {
            dialogVisible.value = false
            let infoData = formData.value
            if (props.otherInfo) {
                const menuList = [...props.otherInfo.menuList]
                infoData = { ...infoData, menuList }
            }

            if (!isAddHandle.value && editData.value) {
                // 编辑
                systemStore.editDataAction(
                    props.modalConfig.pageName,
                    editData.value.id,
                    infoData
                )
            } else {
                // 新增
                systemStore.addDataAction(props.modalConfig.pageName, infoData)
            }
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
    }
}

defineExpose({ setModalVisible })
</script>

<template>
    <div class="form-modal">
        <el-dialog
            v-model="dialogVisible"
            :title="modalConfig.title"
            :width="modalConfig.width"
            destroy-on-close
        >
            <Form v-bind="modalConfig" v-model="formData" ref="FormRef">
                <template #custom="{ item }">
                    <slot :name="item.slotName"></slot>
                </template>
            </Form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onConformClick"> 确定 </el-button>
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
