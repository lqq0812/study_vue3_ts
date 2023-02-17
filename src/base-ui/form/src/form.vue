<script lang="ts" setup>
import { watch, ref } from 'vue'
import type { PropType } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'
import type { IFormItem } from '../types'

const props = defineProps({
    modelValue: {
        type: Object
    },
    labelWidth: {
        type: String,
        default: () => '80px'
    },
    formItems: {
        type: Array as PropType<IFormItem[]>,
        default: () => []
    },
    itemStyle: {
        type: Object,
        default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
        type: Object,
        default: () => ({
            xl: 6,
            lg: 8,
            md: 12,
            sm: 24,
            xs: 24
        })
    }
})
const emit = defineEmits(['update:modelValue'])
const formData = ref({ ...props.modelValue })
console.log('formData', formData.value)

watch(
    formData,
    (newValue) => {
        emit('update:modelValue', newValue)
    },
    { deep: true }
)

const formRef = ref<InstanceType<typeof ElForm>>()

function validForm() {
    return new Promise((resolve, reject) => {
        formRef.value?.validate((valid) => {
            if (valid) {
                resolve(valid)
            } else {
                ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
                reject(valid)
            }
        })
    })
}
defineExpose({ validForm })
</script>

<template>
    <div class="common-form">
        <div class="header">
            <slot name="header"></slot>
        </div>

        <el-form :label-width="labelWidth" ref="formRef" :model="formData">
            <el-row>
                <template v-for="(item, index) in formItems" :key="index">
                    <el-col v-bind="colLayout">
                        <el-form-item
                            v-if="!item.isHidden"
                            class="form-item"
                            :label="item.label"
                            :rules="item.rules"
                            :style="itemStyle"
                            :prop="item.field"
                        >
                            <template
                                v-if="item.type === 'input' || item.type === 'password'"
                            >
                                <el-input
                                    v-model="formData[`${item.field}`]"
                                    :placeholder="item.placeHolder"
                                    :show-password="item.type === 'password'"
                                >
                                </el-input>
                            </template>
                            <template v-else-if="item.type === 'select'">
                                <el-select
                                    v-model="formData[`${item.field}`]"
                                    :placeholder="item.placeHolder"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.value"
                                        :value="option.value"
                                        :label="option.label"
                                    ></el-option>
                                </el-select>
                            </template>
                            <template v-else-if="item.type === 'datepicker'">
                                <el-date-picker
                                    v-model="formData[`${item.field}`]"
                                    v-bind="item.otherOption"
                                    style="width: 100%"
                                >
                                </el-date-picker>
                            </template>
                            <template v-else-if="item.type === 'custom'">
                                <slot name="custom" :item="item"></slot>
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.common-form {
    padding: 20px 20px 0;
}
</style>
