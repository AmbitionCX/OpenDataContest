<template>
  <div class="navbar">
    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/introduction">项目介绍</a>
      </span>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/show">总体展示</a>
      </span>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/transition">汉语传承与变迁</a>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <ul class="navlist">
          <li><a href="#">书与书对比</a></li>
          <li><a href="#">音部节点展示</a></li>
        </ul>
      </template>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/research">宏观分析</a>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <ul class="navlist">
          <li><a href="#">整体分析</a></li>
          <li><a href="#">趣味查询</a></li>
        </ul>
      </template>
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
