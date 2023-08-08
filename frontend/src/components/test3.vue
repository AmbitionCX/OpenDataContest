<template>
  <div class="scrollable-container">
    <div v-for="(item, index) in yunjiao" :style="getImageStyle(index)">
      <!-- <img
        src="@/components/yunbu/circle2.svg"
        style="width: 250px; height: 250px"
      /> -->
      <!-- <span class="text" @click="getYunjiaoRfresh(index)"> {{ yun }}</span> -->
      <span class="yb" @click="goToNewPage(index)">{{ yb[index] }}</span>
      <div
        v-for="(char, Index) in item"
        :key="Index"
        :style="getTextStyle(Index, item, index)"
      >
        <span class="yj">{{ char }}</span>
      </div>
      <!-- <span class="yj">{{ yunjiaoRandom[index].join(' ') }}</span> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      imageWidth: 100, // 图片宽度
      imageHeight: 100, // 图片高度
      imageSpacingW: 550, // 图片横向间隔
      imageSpacingH: 200, //图片纵向间隔
      yun: "韵部",
      yb: [],
      yunjiao: [],
      radius: 100,
      gap: 8,
      anglePerCharacter: 8, 
    };
  },
  computed: {
    images() {
      const totalImages = 29;
      const images = [];
      for (let i = 0; i < totalImages; i++) {
        const row = i % 2;
        const col = Math.round(i / 2);
        const x =
          col * (this.imageWidth + this.imageSpacingW) - row * 350 + 600;
        const y = row * (this.imageHeight + this.imageSpacingH) + 300;
        images.push({ x, y });
      }
      return images;
    },
  },
  methods: {
    getImageStyle(index) {
      const image = this.images[index];
      return {
        position: "absolute",
        left: `${image.x}px`,
        top: `${image.y}px`,
      };
    },

    async getShijing() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_shanggu_shijing";
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
                yunjiao[yunbu2.indexOf(res.data[i][2])].push(res.data[i][1]);
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
      const totalCharacters = item.length;
      const angle = this.degreesToRadians(Index * this.anglePerCharacter);
      const distanceFromCenter = Index/2 + 60; //圆圈间隔+圆圈内径
      const x = distanceFromCenter * Math.cos(angle);
      const y = distanceFromCenter * Math.sin(angle);
      const alpha = 1 - (Index / totalCharacters);
      //   const angle = (this.gap * index * this.anglePerCharacter * Math.PI / 180) % (2 * Math.PI);
      //   const x = (this.radius + revolutions * this.gap) * Math.cos(angle);
      // const y = (this.radius + revolutions * this.gap) * Math.sin(angle);

      
      const row = index % 2;
      const col = Math.round(index / 2);
      const spaceWidth = 100;
      const sapceHeight = 100;
      const rx = col * (this.imageWidth - spaceWidth) - row * 1 + 610;
      const ry = row * (this.imageHeight - sapceHeight) + 300;

      return {
        // transform: `translate(${x}px, ${y}px) rotate(${90 + angle}deg)`,
        position: "absolute",
        left: `${rx + x - 610}px`,
        top: `${ry + y - 300}px`,
        color: `rgba(193, 165, 48, ${alpha})`,
      };
    },

    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  background-image: linear-gradient(
    to right,
    rgba(252, 237, 227, 1),
    rgba(193, 165, 48, 1)
  );
  color: transparent;
  -webkit-background-clip: text;
}
.yj {
  position: absolute;
  transform-origin: center;
  font-size: 12px;
  white-space: nowrap;
}
.scrollable-container {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px;
  width: 100%;
}
</style>