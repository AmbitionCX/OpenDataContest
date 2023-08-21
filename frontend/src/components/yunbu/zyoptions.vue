<template>
  <div class="choose">
    <div class="choose-title"><a>筛选</a></div>

    <div  class="choose-content">
    <div v-for="(option, index) in options" :key="index">
      <div class="option-wrapper">
        <div class="triangle"  @click="toggleSubOptions(index)">
          <span v-if="option.subOptionsOpen">&#9660;</span>
          <span v-else>&#9654;</span>
        </div>
        <label class="custom-checkbox">
          <input type="checkbox" :value="option.value" @change="toggleSubOptions2(index)">
          <span class="checkbox-label">{{ option.label }}</span>
        </label>
      </div>
      <div v-if="option.subOptionsOpen" class="sub-options">
        <label class="custom-checkbox" v-for="(subOption, subIndex) in option.subOptions" :key="subIndex">
          <input type="checkbox" :value="subOption.label" v-model="this.opt[this.optKey[index]]">
          <span class="checkbox-label">{{ subOption.label }}</span>
        </label>
      </div>
    </div>
    </div>

  </div>

  <div class="yunjiao-container">
  <div v-for="(item, index) in yunjiao" :style="getYunbuStyle(index)">
    <div class="shengniu">
      {{ item.shengniu }}&nbsp; &nbsp; &nbsp; 
    <div v-for="(char, charIndex) in item.zitou">
      {{ char }}
    </div>
  </div>
  </div>
</div>


</template>

<script>
import axios from "axios";

export default {
  props: {
    message: String  // 声明props，指定数据类型
  },
  data() {
    return {
      options: [],
      selectedOptions: [],
      optionL1: ['声纽','声调','清浊','四呼'],
      optKey: ['shengniu','shengdiao','qingzhuo','sihu'],
      opt: {},
      test: 0,
      yunjiao: [],
    };
  },
  methods: {
  toggleSubOptions(index){
    this.options[index].subOptionsOpen = !this.options[index].subOptionsOpen;
  },

  toggleSubOptions2(index){
    this.options[index].subOptionsChoose = !this.options[index].subOptionsChoose;
    if (this.options[index].subOptionsChoose) {
      // 选中一级选项时自动选中其所有二级选项
      this.options[index].subOptions.forEach(subOption => {
        if(this.opt[this.optKey[index]].includes(subOption.label)==false){
          this.opt[this.optKey[index]].push(subOption.label);
        }
      });
    } else {
      // 取消选中一级选项时取消选中其所有二级选项
      this.options[index].subOptions.forEach(subOption => {
        const i_del = this.opt[this.optKey[index]].indexOf(subOption.label);
        this.opt[this.optKey[index]].splice(i_del, 1);
      });
    }
  },

  //获取选项列表
  async getOption() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_zhongyuan_search_item";
        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            const options = [];
            
            for(let i = 0; i < this.optionL1.length; i++){
              options.push({ label: this.optionL1[i], value: 'option'+i, subOptionsOpen: false, subOptionsChoose: false});
              this.opt[this.optKey[i]] = [];
              const subOpt = [];
              for(let j = 0; j < res.data[this.optKey[i]].length; j++){
                subOpt.push({ label: res.data[this.optKey[i]][j], value: 'subOption'+i+j })
              }
              options[i]['subOptions'] = subOpt;
            }
            console.log('opt: ',options);
            this.options = options;
            
            resolve(options); // 请求成功后resolve数据
          })
          .catch(function (err) {
            reject(err); // 请求失败后reject错误
          });
      });
    },

    //选择后获取韵脚字
    async getYunjiao(newValue) {
        try {
          console.log('data to backend: ',newValue);
          const zhongyuan_search = {
            shengniu: this.opt['shengniu'],
            qingzhuo: this.opt['qingzhuo'],
            sihu: this.opt['sihu'],
            shengdiao: this.opt['shengdiao'],
          };
          console.log('test: ',zhongyuan_search);
          const response = await axios.post(
            "http://localhost:5000/zhongyuan_search",
            {
              params: {
                yunbu: this.message,
                zhongyuan_search: zhongyuan_search,
              },
            }
          );
          console.log("Backend response:", response.data.data);
            this.yunjiao = response.data.data;
         
        } catch (error) {
          console.error("Error sending clicked word to the backend:", error);
        }
      },

    getYunbuStyle(index) {
        return {
          position: "absolute",
          left: `${index*5}vw`,
          top: `${2}vh`,
        };
      },
  },
  watch: {
    opt: {
      deep: true,
      handler(newValue, oldValue) {
      //console.log('opt has changed:', oldValue, '->', newValue);
      this.getYunjiao(newValue);
    },
    },
  },
  mounted(){
    this.getOption();
    this.getYunjiao();
  }
};
</script>

<style>
/* 这里添加样式来实现竖直排列 */
label {
  display: block;
  margin-bottom: 10px;
}
.choose {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 100px;
  right: 50px;
  width: 180px;
}
.choose-title {
  width: inherit;
  height: 40px;
  background-image: linear-gradient(
    to left,
    rgba(252, 237, 227, 1),
    rgba(193, 165, 48, 1)
  );
  border-radius: 5px;
      display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: left; /* 水平居中文本 */
  padding-left: 40px;
  border: 2px solid #c1a530;
}
.choose-title a {
  color: #000;
  font-size: 20px;
}
.choose-content {
  padding-top: 10px;
  padding-left: 10px;
  width: inherit;
  height: 60vh;
  overflow: auto;
  border: 2px solid #c1a530;
}
.custom-checkbox input[type="checkbox"] {
  /* 隐藏默认的复选框 */
  display: none;
}

.custom-checkbox input[type="checkbox"] + .checkbox-label::before {
  /* 自定义勾选框样式 */
  content: "\2713"; /* Unicode 编码表示勾号 */
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #c1a530; /* 边框颜色 */
  border-radius: 4px;
  text-align: center;
  line-height: 16px;
  color: transparent; /* 勾号颜色 */
  background-color: transparent; /* 背景色 */
  margin-right: 8px;
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-label::before {
  /* 选中状态下的样式 */
  background-color: transparent; /* 勾号背景色 */
  color: #c1a530; /* 勾号颜色 */
  content: "\2713"; /* Unicode 编码表示勾号 */
}

.option-wrapper {
  display: flex;
  align-items: center;
}

.triangle {
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  color: #dab82d; /* 初始颜色为蓝色 */
}

.sub-options {
  margin-left: 20px;
}
.shengniu {
  color: #000;
  font-size: 1rem;
  padding-top: 5px;
  padding-left: 8px;
  padding-right: 8px;
  width: calc(1rem + 16px);
  height: 60vh;
  background-image: linear-gradient(
      rgba(198, 145, 14, 0.7),
      rgba(252, 237, 227, 0.1)
    );
}
.yunjiao-container {
  position: absolute;
  top: 15vh;
  left: 20vw;
  height: 84vh;
  padding-bottom: 20vh;
  width: calc(80vw - 250px);
  overflow: auto;
}
</style>
