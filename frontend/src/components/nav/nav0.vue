<template>
    <div class="menu1">
      <div class="ll">
        <img src="@/assets/navbar/pic01.svg" class="image" />
      </div>
    </div>

      <div class="sui">
      <img src="@/assets/navbar/pic02.svg" class="image" />
    </div>

    <div class="xing">
      <img src="@/assets/navbar/pic03.svg" class="image" 
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
    top: 7vh;
    left: 4vw;
    height: 100px;
    width: 23vw;
    background-color: #C6910E;
    display: flex;
    z-index: 1;
  }
.ll {
  position: fixed;
    top: 0;
    left: 4vw;
}
  .image{
    width: 8%;
  }
  .sui{
    position: fixed;
    top: calc(7vh + 110px);
    left: 4vw;
  }
  .xing{
    position: fixed;
    top: 5vh;
    left: 40.5vw;
  }
  </style>
      