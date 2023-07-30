<template>
  <div class="bg" style="background-color: #f9f5f2">
      <div class="nav1">
        <navbar2></navbar2>
      </div>

      <div>
        <sjL3></sjL3>
      </div>

      <div class="pic">
        <img
          src="@/components/yunbu/circle2.svg"
          style="width: 250px; height: 250px"
        />
        <span class="yunbu">{{ yb[index] }}</span>
        <span class="txt" @click="getYunjiaoRfresh(index)"> {{ yun }}</span>
      </div>

  </div>
</template>
        
    <script>
import navbar from "@/components/navbar.vue";
import navbar2 from "@/components/nav/navbar2.vue";
import sjL3 from "./sjL3.vue";
import * as d3 from "d3";
import axios from "axios";

export default {
  data() {
    return {
      index: this.$route.params.index,
      yun: "韵部",
      yb: [],
      yunjiao: [],
      yunjiaoRandom: [],
    };
  },
  components: {
    navbar,
    navbar2,
    sjL3,
  },
  methods: {
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

        for (let Index = 0; Index < this.yb.length; Index++) {
          //生成随机数的范围
          const limits = result[Index].length;
          const final = this.getRandom(limits);
          this.yunjiaoRandom[Index] = final.map(
            (index) => result[Index][index]
          );
        }

        //输出对应的字
        //console.log(final.map(index => result[Index][index]));
        //return final.map(index => result[Index][index]);
      } catch (error) {
        console.log(error);
      }
    },

    async getYunjiaoRfresh(Index) {
      const result = await this.getShijing(); // 等待getShijing函数的返回值
      const limits = result[Index].length;
      const final = this.getRandom(limits);
      this.yunjiaoRandom[Index] = final.map((index) => result[Index][index]);
    },
  },

  created() {
    this.getShijing().then(() => {
      this.getYunjiao();
    });
  },
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
.nav1 {
  position: fixed;
  z-index: 99;
}
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.pic {
  position: fixed;
  top: 250px;
  left: 150px;
}
.yunbu {
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
.txt {
  position: absolute;
  top: 80%;
  left: 15%;
  transform: translate(-50%, -50%);
  color: #070707;
  font-size: 40px;
}
</style>