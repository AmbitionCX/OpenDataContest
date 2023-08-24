<template>
  <div class="navbar">
    <img src="@/assets/navbar/top1.png" class="image" style="width: 100vw; height: 5vh" />
  </div>

  <div class="menu">
  </div>

  <!-- <div class="menu-text0">
    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/introduction" class="shu">首页</a>
      </span>
    </el-dropdown>
  </div> -->

  <div class="menu-text">
    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/introduction" @mouseenter="showSub0=true">首页</a>
      </span>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/quanlan" @mouseenter="showSub1=true">语音全览</a>
      </span>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/yunbu" @mouseenter="showSub2=true">韵部系联</a>
      </span>
    </el-dropdown>

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/fenxi" @mouseenter="showSub3=true">综合分析</a>
      </span>
    </el-dropdown>

  </div>

  <div v-show="showSub0"  @mouseleave="showSub0=false">
    <nav0></nav0>
  </div>

  <div v-show="showSub1"  @mouseleave="showSub1=false">
    <nav1></nav1>
  </div>

  <div v-show="showSub2"  @mouseleave="showSub2=false">
    <nav2></nav2>
  </div>

  <div v-show="showSub3"  @mouseleave="showSub3=false">
    <nav3></nav3>
  </div>

</template>
    
<script lang="ts">
import nav0 from "@/components/nav/nav0.vue";
import nav1 from "@/components/nav/nav1.vue";
import nav2 from "@/components/nav/nav2.vue";
import nav3 from "@/components/nav/nav3.vue";
import nav4 from "@/components/nav/nav4.vue";

export default {
  data() {
    return {
      showSub0: false,
      showSub1: false,
      showSub2: false,
      showSub3: false,
      showSub4: false,
    };
  },
  components: {
    nav0,
    nav1,
    nav2,
    nav3,
    nav4,
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
.menu {
  background-image: 
  linear-gradient(rgba(198, 145, 14, 1),
      rgba(249, 245, 242, 1));
  display: flex;
  width: 92vw;
  height: 50px;
  position: fixed;
  top: calc(5vh + 10px);
  left: 4vw;
  justify-content: center;
  opacity: 0.2;
}
.menu-text{
  display: flex;
  gap: 18vw;
  width: 100vw;
  position: fixed;
  top: calc(5vh + 20px);
  font-size: 20px;
  /* left: 100px; */
  /* 上|右|下|左 */
  padding: 5px 0 5px 0;
  justify-content: center;
  z-index: 99;
}
/* 导航栏文字去掉选择框 */
.el-dropdown-link {
  outline: none;
  z-index: 99;
}
/* 导航栏文字 */
.el-dropdown-link a {
  color: black;
  font-size: 20px;
  z-index: 999;
}
</style>
    