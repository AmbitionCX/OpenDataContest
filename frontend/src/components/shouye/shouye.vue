<template>
  <div class="bg" style="background-color: #f9f5f2">
    <!-- <div class="lines">
      <img
        src="@/components/shouye/shouye.svg"
        class="image"
        style="width: 100%; height: 100%"
      />
    </div> -->

    <div class="lines">
      <img
        src="@/components/shouye/background.png"
        class="image"
        style="width: 100vw; height: 100vh"
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

    <div class="juanzhou">
      <img
        src="@/components/shouye/juanzhou.svg"
        class="image"
        style="width: 350px; height: 300px"
      />
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      position: {
        x: 740,
        y: 250,
      },
    };
  },
  mounted() {
    this.moveSquare();
  },
  methods: {
    moveSquare() {
      // 设置方块的移动动画
      setInterval(() => {
        this.position.x = 1000;
        this.position.y = 250;
      }, 1000);
    },
  },
};
</script>
  
  <style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.kaishi {
  position: fixed;
  top: 500px;
  left: 680px;
  z-index: 99;
}
.juanzhou {
  position: fixed;
  z-index: 2;
  top: 250px;
  left: 570px;
}
.square {
  position: fixed;
  z-index: 99;
  width: 300px;
  height: 300px;
  background-color: #f9f5f2;
  transition: transform 1s ease-in-out;
}
.lines{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0px;
  left: 0px;
}
</style>