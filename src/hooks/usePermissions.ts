import useLoginStore from '@/store/login/login'

function usePermissioons(type: string) {
    const loginStore = useLoginStore()
    const { permissions } = loginStore

    return !!permissions.find((item) => item.includes(type))
}

export default usePermissioons
