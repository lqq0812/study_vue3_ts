<template>
    <div class="menu">
        <!-- 表格 -->
        <PageTable ref="tableRef" :pageName="'123'" :table-config="tableConfig">
        </PageTable>
    </div>
</template>

<script setup lang="ts" name="menu">
// import { computed } from 'vue'

import PageTable from '@/components/page-table/PageTable.vue'
import { tableConfig } from './config/table.config'

// import useMainStore from '@/store/main/main'
// import usePageModal from '@/hooks/useModal'
import useTable from '@/hooks/useTable'

// 对 modalConfig 进行操作。比如下拉框的选项是动态获取的
// const modalConfigRef = computed(() => {
//     const mainStore = useMainStore()
//     const departments = mainStore.entireDepartments.map((item) => {
//         return { label: item.name, value: item.id }
//     })

//     modalConfig.formItems?.forEach((item) => {
//         if (item.prop === 'parentId') {
//             // item.options?.push(...departments)
//             item.options = [...departments]
//         }
//     })

//     return modalConfig
// })

// 查询重置、请求数据
// const tableRef = ref<InstanceType<typeof PageTable>>()
// const handleQuery = (queryInfo: any) => {
//     tableRef.value?.getTableList(queryInfo)
// }
// const handleReset = () => {
//     tableRef.value?.getTableList()
// }
const { tableRef } = useTable()

// 知道是什么类型的操作后，修改相应数据，例如：弹框标题\编辑时不可编辑（隐藏、禁用）
// const modalTitle = ref<string>('新建用户')
// const handleCallback = (flag: boolean) => {
//     modalConfigRef.value.title = flag ? '新建部门' : '编辑部门'
// }

// 编辑、新增打开弹框
// const modalRef = ref<InstanceType<typeof PageModal>>()
// const openModel = (isAdd: boolean, itemData?: any) => {
//     if (handleCallback) handleCallback(isAdd)
//     modalRef.value?.setModalVisible(isAdd, itemData)
// }
// const { modalRef, openModel } = usePageModal(handleCallback)
</script>

<style scoped>
.menu {
    color: #000;
    background-color: #fff;
}
</style>
