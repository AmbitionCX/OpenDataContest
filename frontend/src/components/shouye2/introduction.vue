<template>
  <div class="bg" style="background-color: #f9f5f2;">
    <div class="nav1">
      <navbar></navbar>
    </div>

    <div class="header">首 页</div>

    <div class="container">
      <intro1></intro1>
      
      <div class="juanzhou"></div>

      <intro2></intro2>
      <intro3></intro3>

      <div  class="quanlan"><intro4 class="quanlan-content"></intro4></div>

      <div class="txt10-container"></div>
  <div class="txt11">
    <p>&nbsp; &nbsp; &nbsp; 党的二十大报告强调：“增强中华文明传播力、影响力。坚守中华文化立场，提炼展示中华文明的精神标识和文化精髓，加快构建中国话语和中国叙事体系，讲好中国故事、传播好中国声音，展现可信、可爱、可敬的中国形象。”</p>
    <p>&nbsp; &nbsp; &nbsp; 本项目“文藻声韵—古汉语典籍韵部流变系统”，打破音韵学为“口耳之学”的局限性，调动视觉感受，让汉语语音的发展与传承过程鲜活灵动起来，探索汉语历史发展的魅力。本项目旨在通过语音流变系统链汇古今，探索古籍的内在文化价值。以中国古籍为依托，致力于“讲好中国故事”。</p>
  </div>

  <div class="txt12">
    <p>数据来源：</p>
    <p>上海图书馆古籍库</p>
    <p>搜韵网-诗词数据、古籍图片</p>
    <p>古音小镜-《诗经》韵部数据</p>
    <p>韵典网-汉语音韵地位</p>
    <p>Artlib世界艺术鉴赏库-部分图片</p>
    <br><p>参考资料：</p>
    <p>王力《汉语史稿》《诗经韵读》《汉语语音史》</p>
  </div>

  <div class="bottom1">
    <img src="@/assets/introduction/bottom1.svg" class="image" />
  </div>

  <div class="bottom2">
    <img src="@/assets/introduction/bottom2.svg" class="image" />
  </div>

  <div class="bottom-txt">
    <div><a href="introduction">首页</a>
      <ul class="sublist">
        <li><a>古汉语的语音发展</a></li>
      </ul>
    </div>

    <div><a href="/quanlan">语音全览</a>
      <ul class="sublist">
        <li><a href="/quanlan/shijing">《诗经》</a></li>
        <li><a href="/quanlan/guangyun">《广韵》</a></li>
        <li><a href="/quanlan/zhongyuan">《中原音韵》</a></li>
      </ul>
    </div>

    <div><a href="/yunbu">韵部系联</a>
      <ul class="sublist">
        <li><a href="/yunbu">《诗经》二十九部</a></li>
        <li><a href="/yunbu2/14">《广韵》六十一部</a></li>
        <li><a href="/yunbu3/14">《中原音韵》十九部</a></li>
      </ul>
    </div>

    <div><a href="/fenxi">综合分析</a>
      <ul class="sublist">
        <li><a>韵部流变可视化</a></li>
      </ul>
    </div>
  </div>

    </div>
  </div>
  </template>
      
  <script>
import navbar from "@/components/navbar.vue";
import navbar0 from "@/components/nav/navbar0.vue";
import intro1 from "@/components/shouye2/intro1.vue";
import intro2 from "@/components/shouye2/intro2.vue";
import intro3 from "@/components/shouye2/intro3.vue";
import intro4 from "@/components/shouye2/intro4.vue";
import axios from 'axios';

  export default {
  data() {
    return {};
  },
  components:{
    navbar,
    navbar0,
    intro1,
    intro2,
    intro3,
    intro4,
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
/* .test {
  position: relative;
  top: 90vh;
} */
.bg{
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
}
.nav1 {
  position: fixed;
  z-index: 99;
}
.header {
  position: fixed;
  z-index: 9999;
  top: 4px;
  left: 48vw;
  font-size: 25px;
  color: #f6f5f5;
  text-align: center;
}
.container {
  position: fixed;
  top: 6vh;
  left: 0;
  width: 100vw;
  height: 94vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.juanzhou {
  position: absolute;
  top: 80vh;
  left: 5vw;
  width: 90vw;
  height: 630vh;
  background-color: white;
}
.quanlan {
  position: absolute;
  top: 540vh;
  left: 5vw;
  z-index: 9999999;
  width: 90vw;
  height: 100vh;
}
.txt11 {
    position: absolute;
  z-index: 999999;
  top: 650vh;
  left: 15vw;
 width: 70vw;
  height: 50vh;
  text-align: left;
}
.txt12 {
  position: absolute;
  z-index: 999999;
  top: 670vh;
  left: 15vw;
 width: 70vw;
  height: 50vh;
  text-align: left;
  opacity: 0.6;
}
.bottom1 {
  position: absolute;
  z-index: 99;
  top: 680vh;
  left: 5vw;
  width: 90vw;
}
.bottom2 {
  position: absolute;
  z-index: 99;
  top: 705vh;
  left: 0vw;
  width: 100vw;
}
.bottom-txt {
  position: absolute;
  z-index: 99999;
  top: 725vh;
  left: 0vw;
  width: 100vw;
  display: flex;
  gap: 12vw;
  justify-content: center;
  font-size: 1.5rem;
}
.bottom-txt a {
  color: #000;
}
.sublist a {
  color: #000;
  }
.sublist li {
    padding-top: 20px;
    text-align: center;
    font-size: 1rem;
  }
  </style>