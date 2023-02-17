import type { IModalConfig } from '@/components/page-modal/index'

export const modalConfig: IModalConfig = {
    pageName: 'users',
    title: '新建用户',
    width: '400',
    formItems: [
        {
            field: 'name',
            prop: 'name',
            type: 'input',
            label: '用户名',
            placeHolder: '请输入用户名'
        },
        {
            field: 'realname',
            prop: 'realname',
            type: 'input',
            label: '真实姓名',
            placeHolder: '请输入真实姓名',
            rules: [{ required: true }]
        },
        {
            field: 'password',
            prop: 'password',
            type: 'password',
            label: '密码',
            placeHolder: '请输入密码',
            isHidden: false
        },
        {
            field: 'cellphone',
            prop: 'cellphone',
            type: 'input',
            label: '电话号码',
            placeHolder: '请输入电话号码'
        },
        {
            field: 'roleId',
            prop: 'roleId',
            type: 'select',
            label: '选择角色',
            placeHolder: '请选择角色',
            options: []
        },
        {
            field: 'departmentId',
            prop: 'departmentId',
            type: 'select',
            label: '选择部门',
            placeHolder: '请选择部门',
            options: []
        }
    ],
    colLayout: { span: 24 },
    itemStyle: { padding: 0 }
}
