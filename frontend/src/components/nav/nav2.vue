<template>
    <div class="menu1">
      <div class="ll">
        <img src="@/assets/navbar/pic21.svg" class="image" style="width: 1.5vw;"/>
      </div>
    </div>

    <ul class="sublist">
        <li><a href="/yunbu">《诗经》二十九部</a></li>
        <li><a href="/yunbu2/14">《广韵》六十一部</a></li>
        <li><a href="/yunbu3/14">《中原音韵》十九部</a></li>
      </ul>

      <div class="sui">
        <img src="@/assets/navbar/pic22.svg" class="image" />
    </div>

    <div class="xing">
      <img src="@/assets/navbar/pic23.svg" class="image" 
      style="width: 20vw;"/>
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
    top: calc(5vh + 10px);
    left: 50vw;
    height: 190px;
    width: 23vw;
    background-color: #C1A530;
    display: flex;
    z-index: 1;
  }
  .ll {
  position: fixed;
    top: 0;
    left: 60vw;
}
  .sublist{
    position: fixed;
    top: calc(5vh + 50px);
    left: 54.5vw;
    text-align: center;
    z-index: 99;
  }
  .sublist a {
    color: black;
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
    top: calc(5vh + 220px);
    left: 50vw;
  }
  .xing{
    position: fixed;
    top: 5vh;
    left: 40.5vw;
  }
  </style>
      