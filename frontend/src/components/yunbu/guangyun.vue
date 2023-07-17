<template>
  <navbar></navbar>
  <h1>广韵</h1>
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

  methods: {
   getGuangyun() {
    const url='http://localhost:5000/get_zhonggu_guangyun';
    axios.get(url).then((res) => {
      console.log("get");
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
   }
  },
  
  created() {
    this.getGuangyun();
  }
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