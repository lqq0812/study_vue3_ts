import {
    addData,
    deleteDataById,
    editData,
    getTableList
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
    state: () => {
        return {
            dataList: [],
            dataTotalCount: 0
        }
    },
    actions: {
        async getDataAction(pageName: string, params: any) {
            const res = await getTableList(pageName, params)
            const { totalCount, list } = res.data
            this.dataList = list
            this.dataTotalCount = totalCount
        },
        async addDataAction(pageName: string, params: any) {
            const res = await addData(pageName, params)
            console.log(res)
            this.getDataAction(pageName, { offset: 0, size: 10 })

            const mainStore = useMainStore()
            mainStore.fetchEntireDataAction()
        },
        async deleteDataAction(pageName: string, id: number) {
            const res = await deleteDataById(pageName, id)
            console.log(res)
            this.getDataAction(pageName, { offset: 0, size: 10 })

            const mainStore = useMainStore()
            mainStore.fetchEntireDataAction()
        },
        async editDataAction(pageName: string, id: number, params: any) {
            const res = await editData(pageName, id, params)
            console.log(res)
            this.getDataAction(pageName, { offset: 0, size: 10 })

            const mainStore = useMainStore()
            mainStore.fetchEntireDataAction()
        }
    }
})

export default useSystemStore
