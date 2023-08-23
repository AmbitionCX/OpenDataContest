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
          <input type="checkbox" :value="subOption.value" v-model="selectedOptions">
          <span class="checkbox-label">{{ subOption.label }}</span>
        </label>
      </div>
    </div>
    </div>

  </div>
 

  <p>已选项: {{ selectedOptions }}</p>
  <p>'  '</p>
  <p>data send to backend: {{ opt }}</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // options: [
      //   { label: '声组', value: 'option1', subOptionsOpen: false, subOptions: [
      //     { label: '子选项1-1', value: 'subOption1' },
      //     { label: '子选项1-2', value: 'subOption2' }
      //   ] },
      //   { label: '声纽', value: 'option2', subOptionsOpen: false, subOptions: [
      //     { label: '子选项2-1', value: 'subOption3' },
      //     { label: '子选项2-2', value: 'subOption4' }
      //   ] },]
      options: [],
      selectedOptions: [],
      optionL1: ['等','呼','摄','声调','声纽','声组'],
      optKey: ['deng','hu','she','shengdiao','shengniu','zu'],
      opt: [],
    };
  },
  methods: {
  toggleSubOptions(index){
    this.options[index].subOptionsOpen = !this.options[index].subOptionsOpen;
  },

  toggleSubOptions2(index){
    this.options[index].subOptionsOpen = !this.options[index].subOptionsOpen;
    if (this.options[index].subOptionsOpen) {
      // 选中一级选项时自动选中其所有二级选项
      this.options[index].subOptions.forEach(subOption => {
        this.selectedOptions.push(subOption.value);
      });
    } else {
      // 取消选中一级选项时取消选中其所有二级选项
      this.options[index].subOptions.forEach(subOption => {
        this.selectedOptions = this.selectedOptions.filter(option => option !== subOption.value);
      });
    }
    //this.updateParentOption(index);
  },

  updateParentOption(optionIndex) {
      const parentOption = this.options[optionIndex];
      const allSubOptionsSelected = parentOption.subOptions.every(subOption => this.selectedOptions.includes(subOption.value));
      
      if (allSubOptionsSelected) {
        this.selectedOptions.push(parentOption.value);
      } else {
        this.selectedOptions = this.selectedOptions.filter(option => option !== parentOption.value);
      }
    },

  //获取选项列表
  async getOption() {
      return new Promise((resolve, reject) => {
        const path = "/get_guangyun_search_item";
         const url = this.$globalUrl + path;

        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            const options = [];
            
            for(let i = 0; i < this.optionL1.length; i++){
              options.push({ label: this.optionL1[i], value: 'option'+i, subOptionsOpen: false});
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
    async getYunjiao() {
      const opt = {};
      for(let i = 0; i < this.optKey.length; i++){
        opt[this.optKey[i]] = ''
      }
      //opt[this.optKey[0]] = '一';
      opt[this.optKey[1]] = '合';
      console.log('data send to backend: ',opt);
        try {
          const response = await axios.post(
            this.$globalUrl + "/guangyun_search",
            {
              params: {
                search_item: opt,
              },
            }
          );
          console.log("Backend response:", response.data.data);
         
        } catch (error) {
          console.error("Error sending clicked word to the backend:", error);
        }
      },
  },
  mounted(){
    this.getOption();
    this.getYunjiao();
  },
  watch: {
    selectedOptions: {
      handler(newValue) {
        this.options.forEach((option, index) => {
          if (option.subOptions.every(subOption => newValue.includes(subOption.value))) {
            if (!newValue.includes(option.value)) {
              this.selectedOptions.push(option.value);
            }
          } else {
            if (newValue.includes(option.value)) {
              this.selectedOptions = this.selectedOptions.filter(value => value !== option.value);
            }
          }
        });
      },
      deep: true
    }
  },
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
  right: 100px;
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
  color: #c1a530; /* 初始颜色为蓝色 */
}

.sub-options {
  margin-left: 20px;
}
</style>
