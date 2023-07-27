<template>
    <div class="navbar">
      <div class="navbar-left">
        <div class="left1"></div>
        <div class="left2"></div>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-right">
        <div class="right1"></div>
        <div class="right2"></div>
      </div>
    </div>
  
    <div class="menu1">
      <div class="menu1l"></div>
      <div class="menu1r"></div>
    </div>
  
    <div class="sui">
      <img src="@/components/nav/sui1.svg" class="image" 
      @click="showNav=true"/>
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
    display: flex;
    gap: 30px;
    width: 100vw;
    height: 30px;
    position: fixed;
    top: 0;
    left: 0;
    /* 上|右|下|左 */
    padding: 10px 0 10px 0;
    justify-content: center;
  }
  .left1 {
    background-color: #f9f5f2;
    height: 8px;
    width: 8px;
    position: fixed;
    top: 20px;
    left: 10px;
  }
  .left2 {
    background-color: #f9f5f2;
    height: 2px;
    width: 20px;
    position: fixed;
    top: 23px;
    left: 23px;
  }
  .right1 {
    background-color: #f9f5f2;
    height: 8px;
    width: 8px;
    position: fixed;
    top: 20px;
    left: 1375px;
  }
  .right2 {
    background-color: #f9f5f2;
    height: 2px;
    width: 20px;
    position: fixed;
    top: 23px;
    left: 1350px;
  }
  .navbar-left {
    background-color: #c6910e;
    height: 50px;
    width: 53px;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 0 10px 0;
  }
  .navbar-right {
    background-color: #c6910e;
    height: 50px;
    width: 53px;
    position: fixed;
    top: 0;
    right: 0;
    padding: 10px 0 10px 0;
  }
  .navbar-center {
    background-color: #484440;
    height: 50px;
    width: 91.5vw;
    position: fixed;
    top: 0;
    padding: 10px 0 10px 0;
    justify-content: center;
  }
  .menu1l {
    position: fixed;
    top: 0;
    left: 550px;
    height: 50px;
    width: 5px;
    background-color: #ddbb2f;
  }
  .menu1r {
    position: fixed;
    top: 0;
    left: 565px;
    height: 50px;
    width: 5px;
    background-color: #ddbb2f;
  }
  .image {
    width: 10%;
  }
  .sui {
    position: fixed;
    top: 60px;
    left: 410px;
  }
  </style>
        