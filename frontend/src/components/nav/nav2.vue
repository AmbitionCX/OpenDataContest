<template>
    <div class="menu1">
      <div class="menu1l"></div>
      <div class="menu1r"></div>
    </div>

    <ul class="sublist">
        <li><a href="/yunbu">《诗经》二十九部</a></li>
        <li><a href="/yunbu2">《广韵》六十一部</a></li>
        <li><a href="/yunbu3">《中原音韵》十九部</a></li>
      </ul>

      <div class="sui">
      <img src="@/components/nav/sui1.svg" class="image" />
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
    left: 500px;
    height: 230px;
    width: 200px;
    background-color: #c1a530;
    display: flex;
    z-index: 1;
  }
  .menu1l{
  position: fixed;
    top: 0;
    left: 540px;
    height: 50px;
    width: 5px;
    background-color:#ddbb2f;
  }
  .menu1r{
  position: fixed;
    top: 0;
    left: 550px;
    height: 50px;
    width: 5px;
    background-color: #ddbb2f;
  }
  .sublist{
    position: fixed;
    top: 130px;
    left: 510px;
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
    left: 450px;
  }
  </style>
      