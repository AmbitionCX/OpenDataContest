<template>
    <div class="navbar">
    <img src="@/assets/navbar/top1.png" class="image" style="width: 100vw; height: 5vh" />
  </div>
  
    <div class="menu1" v-show="!showNav">
      <div class="ll">
        <img src="@/assets/navbar/pic31.svg" class="image" />
      </div>
    </div>
  
    <div class="sui" v-show="!showNav">
        <img src="@/assets/navbar/pic32.svg" class="image" @click="showNav=true"/>
    </div>
  
    <div v-show="showNav">
      <navbar></navbar>
    </div>
  </template>
        
    <script lang="ts">
  import navbar from "@/components/navbar.vue";
  
  export default {
    data() {
      return {
          showNav: false,
      };
    },
    components: {
      navbar,
    },
    methods: {},
  };
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
  position: fixed;
  top: 0;
  left: 0;
}
.ll {
  position: fixed;
    top: 0;
    left: 73vw;
}
  .image {
    width: 8%;
  }
  .sui{
    position: fixed;
    top: calc(7vh + 10px);
    left: 73vw;
    cursor: pointer;
  }
  </style>
        