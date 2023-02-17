import type { IForm } from '@/base-ui/form'

export interface IModalConfig extends IForm {
    title?: string
    pageName: string
    width: string
}
