<template>
  <div class="scrollable-container">
    <div style="color: transparent;">{{ yb }}</div>

    <span class="yb" @click="goToNewPage(message)">{{ yb[message] }}</span>

    <div :style="getYunbuStyle()">
      <img src="@/assets/yunbu/yunbu.svg" style="width: 18vw; height: 22vw" />
      <div v-for="(char, Index) in yunjiao[message]" :key="Index" :style="getTextStyle(Index)">
        <div class="yj">{{ char }}</div>
      </div>
    </div>
  </div>

  <!-- <div class="image2">
      <img src="@/assets/quanlan/arrow.svg" class="image" 
      style="width: 40px; height: 40px; cursor: pointer;" @click="incrementNum()"/>
    </div>

    <div class="image4">
      <img src="@/assets/quanlan/arrow2.svg" class="image" 
      style="width: 40px; height: 40px; cursor: pointer;" @click="decrementNum()"/>
    </div> -->
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    message: Number  // 声明props，指定数据类型
  },
  data() {
    return {
      yun: "韵部",
      yb: [],
      yunjiao: [],
    };
  },

  methods: {
    incrementNum() {
      this.index = this.index + 1;
    },
    decrementNum() {
      this.index = this.index - 1;
    },
    getYunbuStyle() {
      return {
        position: "absolute",
        left: `${20}vw`,
        top: `${20}vh`,
      };
    },

    getShijing() {
      const path = "/get_zhonggu_guangyun";
      const url = this.$globalUrl + path;
      axios
        .get(url)
        .then((res) => {
          const yunbu = [];
          const yunjiao = [];

          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i][2] != "" && res.data[i][2] != 0) {
              yunbu.push(res.data[i][2]);
            }
          }
          const yunbu2 = Array.from(new Set(yunbu));

          for (let i = 0; i < yunbu2.length; i++) {
            yunjiao[i] = [];
          }

          for (let i = 0; i < res.data.length; i++) {
            if (yunbu2.indexOf(res.data[i][2]) != -1) {
              yunjiao[yunbu2.indexOf(res.data[i][2])].push(res.data[i][0]);
            }
          }

          this.yb = yunbu2;
          this.yunjiao = yunjiao;
        });
    },

    getTextStyle(Index) {
      //Index是韵脚字的序号，index是韵部的序号, item是韵脚字列表

      const rowNum = 6;  //每行韵脚字个数
      const space = 2;  //韵脚字间距
      const picWidth = 5;
      const picHeight = 7;
      const col = (Index + 1) % rowNum - 1;
      const row = Math.ceil((Index + 1) / rowNum) - 1;

      var dx = 0; var dy = 0;
      if (row == 0) {
        if (col < 2) {
          dx = -59 + col * (picWidth + space); dy = -53 + picHeight * row;
        } else {
          dx = -59 + col * (picWidth + space) + 9; dy = -53 + picHeight * row;
        }
      } else if (row == 1) {
        if (col < 2) {
          dx = -62.5 + col * (picWidth + space); dy = -53 + picHeight * row;
        } else {
          dx = -62.5 + col * (picWidth + space) + 15; dy = -53 + picHeight * row;
        }
      } else {
        const rowNum2 = 9;
        const col2 = (Index + 1 - 12) % rowNum2 - 1;
        const row2 = Math.ceil((Index + 1) / rowNum2);
        if (row2 % 2 == 0) {
          dx = -59 + col2 * (picWidth + space); dy = -53 + picHeight * row2;
        } else if (row2 % 2 == 1) {
          dx = -62.5 + col2 * (picWidth + space); dy = -53 + picHeight * row2;
        }
      }

      return {
        position: "absolute",
        left: `${dx + 49}vw`, //注意这个left是相对于每个韵脚字而言
        top: `${20 + dy + 33}vw`,
      };
    },

    // 点击图片时导航到新页面，并传递index作为参数
    goToNewPage(index) {
      this.$router.push(`/yunbu/guangyun/${index}`);
    },
  },

  created() {
    this.getShijing();
  },
};
</script>

<style>
.yb {
  position: absolute;
  top: 23vh;
  left: 25vw;
  font-size: 80px;
  color: black;
  z-index: 999;
  writing-mode: vertical-lr;
  cursor: pointer;
}

.yj {
  width: 8vw;
  height: 12vw;
  font-size: 30px;
  color: black;
  background-image: url("@/assets/yunbu/yunjiao.svg");
  background-size: contain;
  background-position: 1.8vw 0;
  background-repeat: no-repeat;
}

.scrollable-container {
  position: relative;
  /* 使用相对定位 */
}
</style>