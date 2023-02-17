import type { IModalConfig } from '@/components/page-modal/index'

export const modalConfig: IModalConfig = {
    pageName: 'role',
    title: '新建角色',
    width: '400',
    formItems: [
        {
            field: 'name',
            prop: 'name',
            type: 'input',
            label: '角色名称',
            placeHolder: '请输入角色名称'
        },
        {
            field: 'intro',
            prop: 'intro',
            type: 'input',
            label: '权限介绍',
            placeHolder: '请输入权限介绍'
        },
        {
            // field: 'menuList',
            // prop: 'menuList',
            type: 'custom',
            // label: '权限选择',
            // placeHolder: '请输入角色名称',
            slotName: 'menulist'
        }
        // {
        //     field: 'haha',
        //     prop: 'haha',
        //     type: 'custom',
        //     label: 'haha',
        //     placeHolder: '请输入角色名称',
        //     slotName: 'haha'
        // }
    ],
    colLayout: { span: 24 },
    itemStyle: { padding: 0 }
}
