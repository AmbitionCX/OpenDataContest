<template>
  <div>
    <div v-if="yunjiaoRandom.length > 0">
      <div v-for="(item, index) in images" :style="getImageStyle(index)">
      <img
        src="@/components/yunbu/circle2.svg"
        style="width: 250px; height: 250px"
      />
      <span class="text" @click="getYunjiaoRfresh(index)"> {{ yun }}</span>
      <span class="yb" @click="goToNewPage(index)">{{ yb[index] }}</span>
      <!-- <span class="yj">{{ yunjiaoRandom[index].join(' ') }}</span> -->
      <span class="yj0">{{ yunjiaoRandom[index][0] }}</span>
      <span class="yj1">{{ yunjiaoRandom[index][1] }}</span>
      <span class="yj2">{{ yunjiaoRandom[index][2] }}</span>
      <span class="yj3">{{ yunjiaoRandom[index][3] }}</span>
      <span class="yj4">{{ yunjiaoRandom[index][4] }}</span>
      <span class="yj5">{{ yunjiaoRandom[index][5] }}</span>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from 'vuex';

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
      yunjiaoRandom: [],
    };
  },
  computed: {
    images() {
      const totalImages = 29;
      const images = [];
      for (let i = 0; i < totalImages; i++) {
        const row = i % 2;
        const col = Math.round(i / 2);
        const x = col * (this.imageWidth + this.imageSpacingW) - row * 350 + 440;
        const y = row * (this.imageHeight + this.imageSpacingH) + 170;
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

    getRandom(limits) {
      //生成的数字数量
      let num = 7;
      let final = [];
      //获取0-x的数
      for (let i = 0; i < num; i++) {
        let result = parseInt(Math.random() * limits);
        final[i] = result;
        //进行数组去重
        for (let v = 0; v < final.length; v++) {
          for (let j = v + 1; j < final.length; j++) {
            if (final[v] == final[j]) {
              final.splice(j, 1);
              j--; //需要重新比较当前位置,避免相邻位置出现重复数字
              i--; //需要重新生成当前重复位置的随机数
            }
          }
        }
      }
      //输出生成的随机数
      return final;
    },

    //对每个韵部随机抽取7个韵脚
    async getYunjiao() {
      try {
        const result = await this.getShijing(); // 等待getShijing函数的返回值

        for(let Index = 0; Index < this.yb.length; Index++){
          //生成随机数的范围
          const limits = result[Index].length;
          const final = this.getRandom(limits);
          this.yunjiaoRandom[Index] = final.map(index => result[Index][index]);
        }
        
        //输出对应的字
        //console.log(final.map(index => result[Index][index]));
        //return final.map(index => result[Index][index]);

      } catch (error) {
        console.log(error);
      }
    },

    async getYunjiaoRfresh(Index){
      const result = await this.getShijing(); // 等待getShijing函数的返回值
      const limits = result[Index].length;
      const final = this.getRandom(limits);
      this.yunjiaoRandom[Index] = final.map(index => result[Index][index]);
    },

    // 点击图片时导航到新页面，并传递index作为参数
    goToNewPage(index) {
      this.$router.push(`/yunbu/shijing/${index}`);
    },
    
  },

  created() {
    this.getShijing().then(() => {
    this.getYunjiao();})
  },
};
</script>

<style>
.text {
  position: absolute;
  top: 80%;
  left: 15%;
  transform: translate(-50%, -50%);
  color: #070707;
  font-size: 40px;
}
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
.yj0 {
  position: absolute;
  top: 0%;
  left: 110%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #000;
}
.yj1 {
  position: absolute;
  top: 20%;
  left: 110%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #000;
}
.yj2 {
  position: absolute;
  top: 40%;
  left: 110%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #000;
}
.yj3 {
  position: absolute;
  top: 60%;
  left: 110%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #000;
}
.yj4 {
  position: absolute;
  top: 80%;
  left: 110%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #000;
}
.yj5 {
  position: absolute;
  top: 100%;
  left: 110%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #000;
}
</style>