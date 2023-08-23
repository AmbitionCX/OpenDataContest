<template>
  <div class="scrollable-container">
    <div v-for="(item, index) in yunjiao" :style="getYunbuStyle(index)">
      <img
        src="@/assets/yunbu/yunbu.svg"
        style="width: 18vw; height: 22vw"
      />
      <!-- <span class="text" @click="getYunjiaoRfresh(index)"> {{ yun }}</span> -->
      <span class="yb" @click="goToNewPage(index)">{{ yb[index] }}</span>
      <div
        v-for="(char, Index) in item"
        :key="Index"
        :style="getTextStyle(Index, item, index)"
      >
        <div class="yj">{{ char }}</div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      yun: "韵部",
      yb: [],
      yunjiao: [],
    };
  },
  computed: {
    images() {
      const totalImages = 29;
      const images = [];
      for (let i = 0; i < totalImages; i++) {
        // const row = i % 2;
        // const col = Math.round(i / 2);
        const x = i* 90 + 20;
        const y = 20;
        images.push({ x, y });
      }
      return images;
    },
  },
  methods: {
    getYunbuStyle(index) {
      const image = this.images[index];
      return {
        position: "absolute",
        left: `${image.x}vw`,
        top: `${image.y}vh`,
      };
    },

    async getShijing() {
      return new Promise((resolve, reject) => {
        const path = "/get_shanggu_shijing";
         const url = this.$globalUrl + path;
        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            const yunbu = [];
            const yunjiao = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i][1] != "" && res.data[i][1] != 0) {
                yunbu.push(res.data[i][1]);
              }
            }
            const yunbu2 = Array.from(new Set(yunbu));

            for (let i = 0; i < yunbu2.length; i++) {
              yunjiao[i] = [];
            }

            for (let i = 0; i < res.data.length; i++) {
              if (yunbu2.indexOf(res.data[i][1]) != -1) {
                yunjiao[yunbu2.indexOf(res.data[i][1])].push(res.data[i][0]);
              }
            }

            this.yb = yunbu2;
            this.yunjiao = yunjiao;
            resolve(yunjiao); // 请求成功后resolve数据
          })
          .catch(function (err) {
            reject(err); // 请求失败后reject错误
          });
      });
    },

    getTextStyle(Index, item, index) {
      //Index是韵脚字的序号，index是韵部的序号, item是韵脚字列表
      const image = this.images[index];

      const rowNum = 6;  //每行韵脚字个数
      const space = 2;  //韵脚字间距
      const picWidth = 5;
      const picHeight = 7;
      const col = (Index+1) % rowNum - 1;
      const row = Math.ceil((Index+1) / rowNum) - 1;

      var dx = 0; var dy = 0;
      if(row==0){
        if(col<2){
          dx = -59+col*(picWidth+space); dy = -53 + picHeight*row;
        }else{
          dx = -59+col*(picWidth+space) + 9; dy = -53 + picHeight*row;
        }
      }else if(row==1){
        if(col<2){
          dx = -62.5+col*(picWidth+space); dy = -53 + picHeight*row;
        }else{
          dx = -62.5+col*(picWidth+space) + 15; dy = -53 + picHeight*row;
        }
      }else {
        const rowNum2 = 9;
        const col2 = (Index+1-12) % rowNum2 - 1;
        const row2 = Math.ceil((Index+1) / rowNum2);
        if(row2 % 2 == 0){
        dx = -59+col2*(picWidth+space); dy = -53 + picHeight*row2;
        } else if(row2 % 2 == 1){
        dx = -62.5+col2*(picWidth+space); dy = -53 + picHeight*row2;
        }
      }      

      return {
        position: "absolute",
        left: `${dx + 49}vw`, //注意这个left是相对于每个韵脚字而言
        top: `${image.y + dy + 33}vw`,
      };

      // return {
      //   // transform: `translate(${x}px, ${y}px) rotate(${90 + angle}deg)`,
      //   position: "absolute",
      //   left: `${rx + x - 610}px`,
      //   top: `${ry + y - 300}px`,
      //   color: `rgba(193, 165, 48, ${alpha})`,
      // };
    },

    // 点击图片时导航到新页面，并传递index作为参数
    goToNewPage(index) {
      this.$router.push(`/yunbu/shijing/${index}`);
    },
  },

  created() {
    this.getShijing();
  },
};
</script>

<style>
.yb {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-110%, -340%);
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
  position: relative; /* 使用相对定位 */
}
</style>