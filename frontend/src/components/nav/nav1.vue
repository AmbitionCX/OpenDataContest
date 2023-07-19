<template>
    <div class="menu1">
      <div class="menu1l"></div>
      <div class="menu1r"></div>
    </div>

    <ul class="sublist">
        <li><a href="/shijing">《诗经》</a></li>
        <li><a href="/guangyun">《广韵》</a></li>
        <li><a href="/zhongyuan">《中原音韵》</a></li>
      </ul>

      <div class="sui">
      <img src="@/components/nav/sui4.svg" class="image" />
    </div>
  </template>
      
      <script lang="ts" setup>
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
  /* 方框 */
  .menu1 {
    position: fixed;
    top: 50px;
    left: 220px;
    height: 230px;
    width: 200px;
    background-color: #c1653d;
    display: flex;
    z-index: 1;
  }
  .menu1l{
  position: fixed;
    top: 0;
    left: 250px;
    height: 50px;
    width: 5px;
    background-color:#e88149;
  }
  .menu1r{
  position: fixed;
    top: 0;
    left: 260px;
    height: 50px;
    width: 5px;
    background-color: #e88149;
  }
  .sublist{
    position: fixed;
    top: 130px;
    left: 255px;
    text-align: center;
    z-index: 99;
  }
  .sublist a {
    color: #fbf6f6;
  }
  .sublist li {
    padding: 10px;
    text-align: center;
  }
  .image{
    width: 8%;
  }
  .sui{
    position: fixed;
    top: 290px;
    left: 160px;
  }
  </style>
      