<script lang="ts" setup>
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/MainMenu.vue'
import MainHeader from '@/components/main-header/MainHeader.vue'

const isFold = ref(false)
function handleFoldChange(flag: boolean) {
    isFold.value = flag
}
</script>

<template>
    <div class="main-content">
        <el-container class="content">
            <el-aside :width="isFold ? '60px' : '210px'">
                <MainMenu :is-fold="isFold"></MainMenu>
            </el-aside>
            <el-container>
                <el-header height="50px">
                    <MainHeader @fold-change="handleFoldChange"></MainHeader>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
.main-content {
    height: 100%;
    .content {
        height: 100%;
        .el-aside {
            overflow-x: hidden;
            overflow-y: auto;
            line-height: 200px;
            text-align: left;
            cursor: pointer;
            background-color: #001529;
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */

            // transition: width 0.2s ease;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .el-main {
            background-color: #f6f7f9;
        }
    }
}
</style>
