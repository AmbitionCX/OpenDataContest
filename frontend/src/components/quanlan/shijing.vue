<template>
    <div class="bg" style="background-color: #f9f5f2">
      <div class="nav1">
        <navbar1></navbar1>
      </div>
      <div class="header">语音全览</div>

  
  
    </div>
  </template>
        
    <script>
  import navbar from "@/components/navbar.vue";
  import navbar1 from "@/components/nav/navbar1.vue";
  import * as d3 from "d3";
  import axios from "axios";
  
  export default {
    data() {
      return {
        sj: false,
      };
    },
    components: {
      navbar,
      navbar1,
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
  }
  .nav1 {
    position: fixed;
    z-index: 99;
  }
  .bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .header {
    position: fixed;
    z-index: 999;
    top: 10px;
    left: 49vw;
    font-size: 20px;
    color: #f6f5f5;
    text-align: center;
  }

  </style>