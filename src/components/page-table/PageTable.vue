<template>
    <div class="page-content">
        <CommonTable
            :dataList="dataList"
            v-bind="tableConfig"
            v-model:page="pageInfo"
            :totalCount="dataTotalCount"
        >
            <template #headerHandler>
                <el-button v-if="isCreate" type="primary" size="" @click="handleAdd">
                    {{ tableConfig.newBtnTitle ?? '新建数据' }}
                </el-button>
            </template>

            <template #status="scope">
                <el-button
                    :type="scope.row.enable ? 'success' : 'danger'"
                    size="small"
                    plain
                >
                    {{ scope.row.enable ? '启用' : '禁用' }}
                </el-button>
            </template>
            <template #create="scope">
                {{ formatUTC(scope.row.createAt) }}
            </template>
            <template #update="scope">
                {{ formatUTC(scope.row.updateAt) }}
            </template>
            <template #handler="scope">
                <div class="handler">
                    <el-button
                        v-if="isUpdate"
                        type="primary"
                        icon="edit"
                        size="small"
                        @click="handleEdit(scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        v-if="isDelete"
                        type="danger"
                        icon="delete"
                        size="small"
                        @click="handleDelete(scope.row.id)"
                    >
                        删除
                    </el-button>
                </div>
            </template>
            <!-- <template v-for="item in otherPropSlots" :key="item.prop" #[item?.slotName]="scope">
                <template v-if="item.slotName">
                    <slot :name="item.slotName" :row="scope.row"></slot>
                </template>
            </template> -->
            <!-- <template #imageSlot="scope">
          <slot name="imageSlot" :row="scope.row"></slot>
        </template> -->
        </CommonTable>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import usePermissions from '@/hooks/usePermissions'

import CommonTable from '@/base-ui/table'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'

const props = defineProps({
    tableConfig: {
        type: Object,
        required: true
    },
    pageName: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['onAdd', 'onEdit'])

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
systemStore.$onAction(({ name, after }) => {
    after(() => {
        if (
            name === 'addDataAction' ||
            name === 'editDataAction' ||
            name === 'deleteDataAction'
        ) {
            currentPage.value = 1
        }
    })
})
// 7.按钮是否显示
const isCreate = usePermissions(`${props.tableConfig.pageName}:create`)
const isDelete = usePermissions(`${props.tableConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.tableConfig.pageName}:update`)
const isQuery = usePermissions(`${props.tableConfig.pageName}:query`)

getTableList()

const { dataList, dataTotalCount } = storeToRefs(systemStore)

function getTableList(formData: any = {}) {
    if (!isQuery) return

    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }

    const params = { ...pageInfo, ...formData }
    systemStore.getDataAction(props.tableConfig.pageName, params)
}

// 1.请求页面数据
// const store = useStore()

// 0.绑定pageInfo
const pageInfo = ref({
    currentPage: 1,
    pageSize: 10
})
watch(pageInfo, () => {
    currentPage.value = pageInfo.value.currentPage
    pageSize.value = pageInfo.value.pageSize
    getTableList()
})

// 6.新建数据
const handleAdd = () => {
    emit('onAdd', true)
}
const handleEdit = (item: any) => {
    emit('onEdit', false, item)
}
const handleDelete = (id: number) => {
    systemStore.deleteDataAction(props.tableConfig.pageName, id)
}
defineExpose({ getTableList })
</script>

<style scoped lang="less">
.page-content {
    border-top: 20px solid #f5f5f5;
    padding: 20px;
}
</style>
