import { ref } from 'vue'
import type PageTable from '@/components/page-table/PageTable.vue'

function useTable() {
    const tableRef = ref<InstanceType<typeof PageTable>>()
    function handleQuery(queryInfo: any) {
        tableRef.value?.getTableList(queryInfo)
    }
    function handleReset() {
        tableRef.value?.getTableList()
    }

    return {
        tableRef,
        handleQuery,
        handleReset
    }
}

export default useTable
