<template>
  <div class="bg" style="background-color: #f9f5f2;">
    <navbar></navbar>
    <div class="header">首 页</div>
  </div>
  </template>
      
  <script>
  import navbar from '@/components/navbar.vue';
  import axios from 'axios';

  export default {
  data() {
    return {};
  },
  components:{
    navbar,
  },
  methods: {},
};
  </script>
      
  <style>
* {
  /* 内外边距为0 */
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  /* 各种列表样式为空 */
  text-decoration: none;
  list-style: none;
  /* background-color: #f9f5f2;
  z-index: -1; */
}
.bg{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.header {
  position: fixed;
  z-index: 999;
  top: 5px;
  left: 47vw;
  font-size: 30px;
  color: #f6f5f5;
  text-align: center;
}
  </style>