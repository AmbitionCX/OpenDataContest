<template>
  <div class="menu1">
    <div class="ll">
      <img src="@/assets/navbar/pic31.svg" class="image"  style="width: 1.5vw;"/>
    </div>
  </div>

    <div class="sui">
    <img src="@/assets/navbar/pic32.svg" class="image" />
  </div>

  <div class="xing">
    <img src="@/assets/navbar/pic33.svg" class="image" 
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
  left: 73vw;
  height: 50px;
  width: 23vw;
  background-color: #9CAF31;
  display: flex;
  z-index: 1;
}
.ll {
position: fixed;
  top: 0;
  left: 83vw;
}
.image{
  width: 8%;
}
.sui{
  position: fixed;
  top: calc(5vh + 80px);
  left: 73vw;
}
.xing{
  position: fixed;
  top: 5vh;
  left: 40.5vw;
}
</style>
    