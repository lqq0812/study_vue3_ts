import hyRequest from '../../index'

// 获取用户列表
export function getTableList(pageName: string, queryInfo: any) {
    return hyRequest.post({
        url: `/${pageName}/list`,
        data: queryInfo
    })
}

export function deleteDataById(pageName: string, id: number) {
    return hyRequest.delete({
        url: `/${pageName}/${id}`
    })
}

export function addData(pageName: string, userInfo: any) {
    return hyRequest.post({
        url: `/${pageName}`,
        data: userInfo
    })
}

export function editData(pageName: string, id: number, userInfo: any) {
    return hyRequest.patch({
        url: `/${pageName}/${id}`,
        data: userInfo
    })
}
