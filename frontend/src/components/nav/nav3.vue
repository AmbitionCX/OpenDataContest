<template>
    <div class="menu1">
      <div class="menu1l"></div>
      <div class="menu1r"></div>
    </div>

      <div class="sui">
      <img src="@/components/nav/sui2.svg" class="image" />
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
    left: 56vw;
    height: 120px;
    width: 200px;
    background-color: #9caf31;
    display: flex;
    z-index: 1;
  }
  .menu1l{
  position: fixed;
    top: 0;
    left: 59vw;
    height: 50px;
    width: 5px;
    background-color:#bccc5c;
  }
  .menu1r{
  position: fixed;
    top: 0;
    left: 60vw;
    height: 50px;
    width: 5px;
    background-color: #bccc5c;
  }
  .image{
    width: 8%;
  }
  .sui{
    position: fixed;
    top: 180px;
    left: 52.5vw;
  }
  </style>
      