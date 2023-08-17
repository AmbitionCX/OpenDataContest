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

  <div class="menu">
  </div>

  <div class="menu-text0">
    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="/introduction" class="shu">首页</a>
      </span>
    </el-dropdown>
  </div>

  <div class="menu-text">
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

    <el-dropdown>
      <span class="el-dropdown-link">
        <a href="#" @mouseenter="showSub4=true">数据纵览</a>
      </span>
    </el-dropdown>
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

  <div v-show="showSub4"  @mouseleave="showSub4=false">
    <nav4></nav4>
  </div>
</template>
    
<script lang="ts">
import nav1 from "@/components/nav/nav1.vue";
import nav2 from "@/components/nav/nav2.vue";
import nav3 from "@/components/nav/nav3.vue";
import nav4 from "@/components/nav/nav4.vue";

export default {
  data() {
    return {
      showSub1: false,
      showSub2: false,
      showSub3: false,
      showSub4: false,
    };
  },
  components: {
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
.left1{
  background-color: #f9f5f2;
  height: 8px;
  width: 8px;
  position: fixed;
  top: 20px;
  left: 10px;
}
.left2{
  background-color: #f9f5f2;
  height: 2px;
  width: 20px;
  position: fixed;
  top: 23px;
  left: 23px;
}
.right1{
  background-color: #f9f5f2;
  height: 8px;
  width: 8px;
  position: fixed;
  top: 20px;
  left: 1375px;
}
.right2{
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
.menu {
  background-color: #9b928c;
  display: flex;
  width: 91.5vw;
  height: 100px;
  position: fixed;
  top: 55px;
  left: 60px;
  /* 上|右|下|左 */
  padding: 10px 0 10px 0;
  justify-content: center;
}
.menu-text0{
  display: flex;
  position: fixed;
  top: 70px;
  left: 100px;
  /* 上|右|下|左 */
  padding: 10px 0 10px 0;
  justify-content: center;
  z-index: 99;
}
.menu-text{
  display: flex;
  gap: 15vw;
  width: 91.5vw;
  position: fixed;
  top: 85px;
  left: 100px;
  /* 上|右|下|左 */
  padding: 10px 0 10px 0;
  justify-content: center;
  z-index: 99;
}
.shu {
  writing-mode: vertical-lr;
  letter-spacing: 10px;
  font-size: 20px;
  position: fixed;
  left: 10;
}
/* 导航栏文字去掉选择框 */
.el-dropdown-link {
  outline: none;
  z-index: 99;
}
/* 导航栏文字 */
.el-dropdown-link a {
  color: rgb(248, 248, 247);
  font-size: 20px;
  z-index: 999;
}
</style>
    