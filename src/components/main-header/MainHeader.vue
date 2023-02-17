<script lang="ts" setup>
import { ref } from 'vue'
import HeadCrumb from './components/HeadCrumb.vue'
import HeadInfo from './components/HeadInfo.vue'

const isFold = ref(false)
const emit = defineEmits(['fold-change'])

function handleIconClick() {
    isFold.value = !isFold.value
    emit('fold-change', isFold.value)
}
</script>

<template>
    <div class="header-content">
        <div class="menuIcon">
            <el-icon size="28" @click="handleIconClick">
                <component :is="isFold ? 'Expand' : 'Fold'" />
            </el-icon>
        </div>
        <div class="content">
            <HeadCrumb></HeadCrumb>
            <HeadInfo></HeadInfo>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header-content {
    // width: calc(100% - 210px);
    height: 100%;
    display: flex;
    align-items: center;
    // .menuIcon {
    //     width: 40px;
    // }
    .content {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 18px;
    }
}
</style>
