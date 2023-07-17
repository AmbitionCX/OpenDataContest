<template>
    <navbar></navbar>
    <h1>整体</h1>
  </template>
      
  <script>
  import navbar from '@/components/navbar.vue';
  import axios from 'axios';

  export default {
  data() {
    return {};
  },
  components:{
    navbar
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
  </style>