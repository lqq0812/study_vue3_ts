<template>
    <div class="user">
        <!-- 查询 -->
        <PageSearch
            :search-config="searchFormConfig"
            @on-query="handleQuery"
            @on-reset="handleReset"
        />
        <!-- 表格 -->
        <PageTable
            ref="tableRef"
            :pageName="'123'"
            :table-config="tableConfig"
            @on-add="openModel"
            @on-edit="openModel"
        >
        </PageTable>
        <!-- 新增、编辑弹框 -->
        <PageModal ref="modalRef" :modal-config="modalConfigRef" :width="400"></PageModal>
    </div>
</template>

<script setup lang="ts" name="user">
import { computed } from 'vue'

import PageSearch from '@/components/page-search/PageSearch.vue'
import PageTable from '@/components/page-table/PageTable.vue'
import PageModal from '@/components/page-modal/PageModal.vue'

import { searchFormConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { modalConfig } from './config/modal.config'

import useMainStore from '@/store/main/main'
import usePageModal from '@/hooks/useModal'
import useTable from '@/hooks/useTable'

// 对 modalConfig 进行操作。比如下拉框的选项是动态获取的
const modalConfigRef = computed(() => {
    const mainStore = useMainStore()
    const departments = mainStore.entireDepartments.map((item) => {
        return { label: item.name, value: item.id }
    })
    const roles = mainStore.entireRoles.map((item) => {
        return { label: item.name, value: item.id }
    })

    modalConfig.formItems?.forEach((item) => {
        if (item.prop === 'departmentId') {
            item.options?.push(...departments)
        } else if (item.prop === 'roleId') {
            item.options?.push(...roles)
        }
    })

    return modalConfig
})

// 查询重置、请求数据
// const tableRef = ref<InstanceType<typeof PageTable>>()
// const handleQuery = (queryInfo: any) => {
//     tableRef.value?.getTableList(queryInfo)
// }
// const handleReset = () => {
//     tableRef.value?.getTableList()
// }
const { tableRef, handleQuery, handleReset } = useTable()

// 知道是什么类型的操作后，修改相应数据，例如：弹框标题
// const modalTitle = ref<string>('新建用户')
const handleCallback = (flag: boolean) => {
    modalConfigRef.value.title = flag ? '新建用户' : '编辑用户'
    const passwordItem = modalConfigRef.value.formItems?.find(
        (item) => item.field === 'password'
    )
    passwordItem!.isHidden = !flag
}

// 编辑、新增打开弹框
// const modalRef = ref<InstanceType<typeof PageModal>>()
// const openModel = (isAdd: boolean, itemData?: any) => {
//     if (handleCallback) handleCallback(isAdd)
//     modalRef.value?.setModalVisible(isAdd, itemData)
// }
const { modalRef, openModel } = usePageModal(handleCallback)
</script>

<style scoped>
.user {
    color: #000;
    background-color: #fff;
}
</style>
