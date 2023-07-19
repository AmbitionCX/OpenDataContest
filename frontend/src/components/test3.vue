<template>
    <div class="bg" style="background-color: #f9f5f2">
      <div class="pic">
        <img
          src="@/components/shouye/juanzhou.svg"
          class="image"
          style="width: 350px; height: 300px"
        />
      </div>
  
      <div class="lines">
        <img
          src="@/components/shouye/shouye.svg"
          class="image"
          style="width: 2400px; height: 1800px"
        />
      </div>
  
      <div class="kaishi">
        <img
          src="@/components/shouye/button.svg"
          class="image"
          @click="this.$router.push('/introduction')"
          style="width: 130px; height: 80px"
        />
      </div>
    </div>
  </template>
    
    <script>
  </script>
    
    <style scoped>
    .bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .lines{
    position: fixed;
    z-index: 1;
    top: -270px;
    left: -560px;
  }
  .kaishi {
    position: fixed;
    top: 500px;
    left: 660px;
    z-index: 99;
  }
  .pic {
    position: fixed;
    z-index: 99;
    top: 250px;
    left: 570px;
    transition: all 0.5s;
  }
  
  .pic:hover {
    transform: scaleX(3);
  }
  </style>