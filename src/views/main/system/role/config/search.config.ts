import type { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
    formItems: [
        {
            field: 'name',
            prop: 'name',
            type: 'input',
            label: '角色名称',
            placeHolder: '请输入角色名称',
            rules: []
        },
        {
            field: 'leader',
            prop: 'leader',
            type: 'input',
            label: '权限介绍',
            placeHolder: '请输入权限介绍',
            rules: []
        },
        {
            field: 'createAt',
            prop: 'createAt',
            type: 'datepicker',
            label: '创建时间',
            rules: [],
            otherOption: {
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                type: 'daterange'
            }
        }
    ],
    itemStyle: { padding: '10px 30px' },
    colLayout: { span: 8 }
}
