import type { IModalConfig } from '@/components/page-modal/index'

export const modalConfig: IModalConfig = {
    pageName: 'department',
    title: '新建部门',
    width: '400',
    formItems: [
        {
            field: 'name',
            prop: 'name',
            type: 'input',
            label: '部门名称',
            placeHolder: '请输入部门名称'
        },
        {
            field: 'leader',
            prop: 'leader',
            type: 'input',
            label: '领导名称',
            placeHolder: '请输入领导名称'
        },
        {
            field: 'parentId',
            prop: 'parentId',
            type: 'select',
            label: '上级部门',
            placeHolder: '请选择上级部门',
            options: []
        }
    ],
    colLayout: { span: 24 },
    itemStyle: { padding: 0 }
}
