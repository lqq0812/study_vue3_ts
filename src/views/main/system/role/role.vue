<template>
    <div class="role">
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
        <PageModal
            ref="modalRef"
            :modal-config="modalConfigRef"
            :width="400"
            :other-info="otherInfo"
        >
            <template #menulist>
                <el-tree
                    ref="treeRef"
                    :data="entireMenus"
                    show-checkbox
                    node-key="id"
                    :props="{ children: 'children', label: 'name' }"
                    @check="handleElTreeCheck"
                />
            </template>
        </PageModal>
    </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick, computed } from 'vue'
import type { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search/PageSearch.vue'
import PageTable from '@/components/page-table/PageTable.vue'
import PageModal from '@/components/page-modal/PageModal.vue'

import { searchFormConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { modalConfig } from './config/modal.config'

import useMainStore from '@/store/main/main'
import usePageModal from '@/hooks/useModal'
import useTable from '@/hooks/useTable'
import { storeToRefs } from 'pinia'
import { mapMenuListToIds } from '@/utils/map-menus'

// 对 modalConfig 进行操作。比如下拉框的选项是动态获取的
const modalConfigRef = computed(() => {
    return modalConfig
})

// 查询重置、请求数据
const { tableRef, handleQuery, handleReset } = useTable()

// 编辑、新增打开弹框
// const modalRef = ref<InstanceType<typeof PageModal>>()
// const openModel = (isAdd: boolean, itemData?: any) => {
//     if (handleCallback) handleCallback(isAdd)
//     modalRef.value?.setModalVisible(isAdd, itemData)
// }

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})

function handleElTreeCheck(data1: any, data2: any) {
    const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
    console.log(data2.checkedKeys)
    otherInfo.value = { menuList }
}

// 知道是什么类型的操作后，修改相应数据，例如：弹框标题\编辑时不可编辑（隐藏、禁用）
// const modalTitle = ref<string>('新建用户')
const treeRef = ref<InstanceType<typeof ElTree>>()
const handleCallback = (flag?: boolean, itemData?: any) => {
    modalConfigRef.value.title = flag ? '新建角色' : '编辑角色'

    if (flag) {
        nextTick(() => {
            treeRef.value?.setCheckedKeys([])
        })
    } else {
        nextTick(() => {
            const menuIds = mapMenuListToIds(itemData.menuList)
            treeRef.value?.setCheckedKeys(menuIds)
        })
    }
}
const { modalRef, openModel } = usePageModal(handleCallback)
</script>

<style scoped>
.role {
    color: #000;
    background-color: #fff;
}
</style>
