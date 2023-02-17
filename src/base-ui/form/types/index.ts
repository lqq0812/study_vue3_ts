interface ISelectOption {
    label: string
    value: any
}

type ItemType = 'input' | 'password' | 'select' | 'datepicker' | 'custom'

export interface IFormItem {
    field?: string
    prop?: string
    type: ItemType
    label?: string
    placeHolder?: string
    rules?: any[]
    options?: ISelectOption[]
    otherOption?: any
    defaultValue?: any
    isHidden?: boolean
    isDisabled?: boolean
    slotName?: string
}

export interface IForm {
    formItems?: IFormItem[]
    itemStyle: any
    colLayout: any
}
