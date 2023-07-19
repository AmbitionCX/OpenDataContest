<template>
  <div class="navbar">
    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/introduction">首页</a>
      </span>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a>语音概览</a>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <ul class="navlist">
          <li><a href="/quanmao">全貌</a></li>
          <li><a href="/fenduan">分段</a></li>
        </ul>
      </template>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a>韵部系联</a>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <ul class="navlist">
          <li><a href="/shijing">《诗经》</a></li>
          <li><a href="/guangyun">《广韵》</a></li>
          <li><a href="/zhongyuan">《中原音韵》</a></li>
        </ul>
      </template>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a>综合分析</a>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <ul class="navlist">
          <li><a href="/zhengti">整体分析</a></li>
          <li><a href="/danzi">单字查询</a></li>
        </ul>
      </template>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/datasource">数据来源与参考资料</a>
      </span>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<style scoped>
* {
    /* 内外边距为0 */
    margin: 0;
    padding: 0;
    /* 各种列表样式为空 */
    text-decoration: none;
    list-style: none;
  }
  /* 消除白边：top0, left0 */
.navbar {
  background-color:#e7ead9;
  display: flex;
  gap: 30px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  /* 上|右|下|左 */
  padding: 10px 0 10px 0;
  justify-content: center;
}
/* 导航栏文字去掉选择框 */
.el-dropdown-link {
  outline: none;
}
/* 导航栏文字 */
.el-dropdown-link a{
  color: rgb(113, 113, 108);
  font-size: 20px;
}
/* 悬浮变色 */
.el-dropdown-link a:hover{
  background: #e7ead9;;
}
/* 下拉菜单 */
.navlist {
  font-size: 15px;
  background-color: #e7ead9;
  color: rgb(113, 113, 108);
}
/* 下拉菜单文字 */
.navlist a {
  color: rgb(113, 113, 108);
}
/* 下拉菜单内边距 */
.navlist li{
  padding: 10px;
}

</style>
