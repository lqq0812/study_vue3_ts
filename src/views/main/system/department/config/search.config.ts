import type { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
    formItems: [
        {
            field: 'name',
            prop: 'name',
            type: 'input',
            label: '部门名称',
            placeHolder: '请输入部门名称',
            rules: []
        },
        {
            field: 'leader',
            prop: 'leader',
            type: 'input',
            label: '部门领导',
            placeHolder: '请输入部门领导',
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
