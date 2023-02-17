import { ref } from 'vue'
import type PageModal from '@/components/page-modal/PageModal.vue'

type CallbackFnType = (data?: boolean, itemData?: any) => void

function usePageModal(handleCallback?: CallbackFnType) {
    const modalRef = ref<InstanceType<typeof PageModal>>()

    const openModel = (isAdd: boolean, itemData?: any) => {
        modalRef.value?.setModalVisible(isAdd, itemData)
        if (handleCallback) handleCallback(isAdd, itemData)
    }

    return { modalRef, openModel }
}

export default usePageModal
