<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="nav1">
      <navbar3></navbar3>
    </div>

    <div class="header">综合分析</div>

    <div class="intro">
      <div class="intro1">文字简介:</div>
      <div class="rect1">
        <p>本韵部流变系统通过探究上古、中古、近代三个历史时期的汉语语音信息，可视化再现汉语语音传承与发展的历史图景。点击韵部，可以探寻古汉语在三个时代的流变关系。</p>
      </div>
    </div>

    <!-- <el-select v-model="selectedOption" class="choose" placeholder="请选择上古韵部" @change="handleOptionChange">
      <el-option v-for="item in yunbu" :key="item.value" :label="item.label" :value="item.value" />
    </el-select> -->

    <div class="choose">
      <div class="choose-title"><a>请选择上古韵部</a></div>
      <ul class="choose-content">
        <li v-for="item in yunbu" class="hover-item"
        @click="handleOptionChange(item.value)">&nbsp; &nbsp; {{ item.label }}</li>
      </ul>
    </div>

    <div class="sankey-chart">
      <div class="scrollable-content" ref="scrollable">
        <svg :width="width" :height="height" ref="svgContainer"></svg>
      </div>
    </div>
  </div>
</template>

<script>
import navbar3 from "@/components/nav/navbar3.vue";
import axios from "axios";
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";

function mapNodes(links, nodes) {
  const nodeMap = new Map(nodes.map((d, i) => [d.name, i]));
  return links.map((link) => ({
    source: nodeMap.get(link.source),
    target: nodeMap.get(link.target),
    value: link.value,
  }));
}

export default {
  name: "SankeyChart",
  data() {
    return {
      width: 850,
      height: 700,
      sankeyData: {},
      selectedOption: null,
      yunbu: [],
      yunjiao: [],
    };
  },
  components: {
    navbar3,
  },
  mounted() {
    this.getYunbu();
    this.getData("上古：東");
  },
  methods: {
    // handleOptionChange() {
    //   // 调用您的函数，并将选中的选项作为参数传递
    //   if (this.selectedOption) {
    //     console.log(this.selectedOption);
    //     this.getData("上古：" + this.selectedOption);
    //   }
    // },

    handleOptionChange(item) {
        this.getData("上古：" + item);
    },

    async getYunbu() {
      return new Promise((resolve, reject) => {
        const path = "/get_shanggu_shijing";
        const url = this.$globalUrl + path;
        //const url = "http://localhost:5000/get_shanggu_shijing";
        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            const yunbu = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i][1] != "" && res.data[i][1] != 0) {
                yunbu.push(res.data[i][1]);
              }
            }
            const yunbu2 = Array.from(new Set(yunbu)); //去重

            const yunbu3 = [];
            for (let i = 0; i < yunbu2.length; i++) {
              yunbu3.push({ value: yunbu2[i], label: yunbu2[i] });
            }

            this.yunbu = yunbu3;
            console.log("yunbu: ", this.yunbu);
          })
          .catch(function (err) {
            reject(err); // 请求失败后reject错误
          });
      });
    },

    async getData(yunbu) {
      console.log(yunbu);
      try {
        const response = await axios.post(
          this.$globalUrl + "/yunbu_sankey_data",
          {
            params: {
              yunbu: yunbu,
            },
          }
        );
        this.drawChart(response.data.data);
        // console.log("Backend response links:", response.data.data.links);
      } catch (error) {
        console.error("Error sending word to the backend:", error);
      }
    },

    drawTxt(pathData, source, target, svg) {
      var textData = "";

      this.getTxt(target, source).then(function (txtlist) {
        if (Array.isArray(txtlist)) {
          textData = txtlist.join("");

          svg.selectAll("textPath").remove();
          d3.select("#my-path-id").remove();

          const path = svg
            .append("path")
            .attr("d", pathData)
            .attr("stroke", "none")
            .attr("stroke-width", 1)
            .attr("fill", "none")
            .attr("id", "my-path-id"); // Add a unique ID to the path element

          const text = svg
            .append("text")
            .attr("text-anchor", "middle") // Center-align text
            .attr("alignment-baseline", "middle") // Vertically center-align text
            .style("white-space", "pre-line"); // Enable line breaks

          const pathElement = path.node();
          const pathLength = pathElement.getTotalLength();

          // Split text into lines
          function splitTextIntoChunks(text, chunkSize) {
            const chunks = [];
            for (let i = 0; i < text.length; i += chunkSize) {
              chunks.push(text.substr(i, chunkSize));
            }
            return chunks;
          }

          const chunkSize = Math.floor(pathLength / 15);
          const lines = splitTextIntoChunks(textData, chunkSize);

          // Append each line as a tspan element
          lines.forEach((line, index) => {
            text
              .append("textPath")
              .attr("href", "#my-path-id") // Reference the path by its ID
              .attr("startOffset", "50%") // Start text at the middle of the path
              .append("tspan")
              .attr("dy", `${index * 20 - 5}px`) // Adjust vertical positioning
              .text(line)
              .style("fill", "#5b574f");
          });
        } else {
          console.log("txtlist 不是一个数组");
        }
      });
    },

    async getTxt(target, source) {
      const url = this.$globalUrl + "/get_yunjiaozi";
      try {
        const response = await axios.post(
          url,
          {
            params: {
              yunbu: { source: source, target: target },
            },
          }
        );
        //console.log("Backend response list:", response.data.data);
        return response.data.data;
      } catch (error) {
        console.error("Error sending clicked word to the backend:", error);
      }
    },

    drawChart(sankeyData) {
      let vm = this;
      d3.select(this.$refs.svgContainer).html(""); //清空画布
      //console.log('success:', this.sankeyData);
      const { nodes, links } = sankeyData;

      // Convert links' source and target from names to corresponding node objects
      const convertedLinks = mapNodes(links, nodes);

      const svg = d3.select(this.$refs.svgContainer);

      svg.style("transform", "translateY(50px)");

      const sankey = d3Sankey
        .sankey()
        .nodeWidth(20)
        .nodePadding(10)
        .size([this.width - 100, this.height - 50]);

      const { nodes: sankeyNodes, links: sankeyLinks } = sankey({
        nodes,
        links: convertedLinks,
      });

      // 创建颜色渐变
      const gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgba(188, 204, 92, 1)");

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgba(222, 222, 222, 1)");

      svg
        .selectAll(".link")
        .data(sankeyLinks)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3Sankey.sankeyLinkHorizontal())
        .style("stroke-width", (d) => Math.max(1, d.width))
        .style("stroke", "#dedede") // 设置连线颜色为灰色
        .style("fill", "none")
        .style("stroke-opacity", 0.8)
        .attr("cursor", "pointer")
        .on("click", (event, d) => {
          this.getJuanzhou(d);
        })
        .on("mouseover", function (d, i) {
          const PathData = this.getAttribute("d");
          vm.drawTxt(PathData, i.source.name, i.target.name, svg);

          d3.select(this).style("stroke", "url(#gradient)");
        })
        .on("mouseout", function () {
          d3.select(this).style("stroke", "#dedede"); // 鼠标离开时恢复链接颜色为黑色
          svg.selectAll("textPath").remove();
        });
        
      const yunbu_data = ["上古：東", "上古：歌", "上古：陽", "上古：文", "上古：侯", "上古：緝", "上古：覺", "上古：侵", "上古：談", "上古：微", "上古：耕", "上古：屋", "上古：物", "上古：錫", "上古：宵", "上古：藥", "上古：葉", "上古：幽", "上古：魚", "上古：元", "上古：月", "上古：真", "上古：蒸", "上古：之", "上古：支", "上古：脂", "上古：職", "上古：質", "上古：鐸", "中古：登", "中古：冬", "中古：東", "中古：廢", "中古：凡", "中古：歌", "中古：庚", "中古：耕", "中古：夬", "中古：咍", "中古：寒", "中古：豪", "中古：痕", "中古：侯", "中古：灰", "中古：魂", "中古：祭A", "中古：祭B", "中古：佳", "中古：江", "中古：皆", "中古：麻", "中古：模", "中古：齊", "中古：侵A", "中古：侵B", "中古：青", "中古：清A", "中古：清B", "中古：山", "中古：刪", "中古：泰", "中古：覃", "中古：談", "中古：唐", "中古：添", "中古：微", "中古：文", "中古：仙A", "中古：仙B", "中古：先", "中古：咸", "中古：銜", "中古：宵A", "中古：宵B", "中古：蕭", "中古：欣", "中古：嚴", "中古：鹽A", "中古：鹽B", "中古：陽", "中古：肴", "中古：幽", "中古：尤", "中古：魚", "中古：虞", "中古：元", "中古：真A", "中古：真B", "中古：臻", "中古：蒸", "中古：之", "中古：支A", "中古：支B", "中古：脂A", "中古：脂B", "中古：鍾", "近代：東鍾", "近代：歌戈", "近代：江陽", "近代：真文", "近代：尤侯", "近代：家麻", "近代：侵尋", "近代：監咸", "近代：齊微", "近代：庚青", "近代：皆來", "近代：蕭豪", "近代：廉纖", "近代：車遮", "近代：魚模", "近代：先天", "近代：寒山", "近代：桓歡", "近代：支思"];
      const color_data = ["B23434", "D14E34", "E5901F", "D8BA27", "D6DB0E", "A6CE51", "81AF45", "4B9B35", "3DA568", "2E9387", "1FA0AA", "13B6E2", "1E96E0", "1F76DD", "345AC6", "6767DB", "8B71D3", "9E6AC6", "9A46AF", "C679B8", "AA3992", "CC1772", "93526D", "7B517C", "583E8C", "4E6B93", "508182", "3E6D4C", "9B7A26", "CE7C7C", "E97E6B", "B23434", "F9D4A7", "F0DA76", "D14E34", "EFEF7D", "1FA0AA", "DEFF8F", "C1E38C", "66BF49", "345AC6", "4FA038", "D6DB0E", "4FBEAF", "57BEC4", "BFD7DD", "5DC4E0", "A0CDF9", "92B1F4", "ACACFC", "B6A5EB", "BBA1D1", "D18EE1", "F9BBF0", "DB93CF", "1F76DD", "B35AA1", "AE4798", "C193A7", "D090D3", "B4A2DD", "7EB8F2", "3DA568", "AED6D6", "77A483", "2E9387", "D8BA27", "C7AC6C", "AE8F44", "A1CACA", "74A9DF", "587AA6", "9A85C6", "725AA3", "B48096", "DB4E96", "B0509C", "8B71D3", "9780DA", "E5901F", "C17AD3", "9E6AC6", "B493CE", "9A46AF", "A38EE1", "C679B8", "CC1772", "D8438F", "78A5A6", "93526D", "7B517C", "583E8C", "75B0F0", "4E6B93", "618AB9", "C35F5F", "B23434", "D14E34", "E5901F", "D8BA27", "D6DB0E", "81AF45", "4B9B35", "3DA568", "2E9387", "1FA0AA", "1F76DD", "345AC6", "6767DB", "8B71D3", "9A46AF", "C679B8", "AA3992", "CC1772", "7B517C"]
      const colorScale = d3.scaleOrdinal().domain(yunbu_data).range(color_data);

      const node = svg.append('g')
        .selectAll('.node')
        .data(sankeyNodes)
        .enter()
        .append("rect")
        .attr("class", "node")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .style("fill", (d) => "#" + colorScale(d.name)) // 设置节点颜色
        //.style("fill", "#bccc5c")
        //.style("stroke", "gray") // 设置节点边框颜色为灰色
        .style("stroke-width", 1); // 设置节点边框宽度

      // 添加节点标签
      svg.append('g')
        .selectAll('.text')
        .data(sankeyNodes)
        .enter().append('text')
        .attr('class', 'text')
        .attr('x', d => (d.x0 + d.x1) / 2)
        .attr('y', d => (d.y0 + d.y1) / 2)
        .attr('dy', '0.35em')
        // .attr('dx', '10px')
        .style('fill', 'black')
        .attr('text-anchor', 'middle')
        .text(function (d) {
          //console.log(d);
          return d.name.substring(3);
        });

        // 添加节点标签
      svg.append('g')
        .selectAll('.text')
        .data(sankeyNodes)
        .enter().append('text')
        .attr('class', 'text')
        .attr('x', d => (d.x0 + d.x1) / 2)
        .attr('y', 0)
        .attr('dy', '0.35em')
        // .attr('dx', '10px')
        .style('fill', 'black')
        .attr('text-anchor', 'middle')
        .text(function (d) {
          //console.log(d);
          return d.name.substring(0, 3);
        });
    },
    
    //跳转到新的页面，展开卷轴
    getJuanzhou(node) {
      const queryObject = {
        source: node.source.name,
        target: node.target.name,
      };
      const yunbu = 1;
      console.log(queryObject);
      this.$router.push({
        name: "juanzhou",
        params: {
          source: node.source.name,
          target: node.target.name,
        },
      });
    },
  },
};
</script>

<style>
* {
  /* 内外边距为0 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 各种列表样式为空 */
  text-decoration: none;
  list-style: none;
}

.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.header {
  position: fixed;
  z-index: 999;
  top: 4px;
  left: 47vw;
  font-size: 25px;
  color: #f6f5f5;
  text-align: center;
}

.nav1 {
  position: fixed;
  z-index: 99;
}

.intro {
  position: fixed;
  top: 120px;
  left: 50px;
}

.intro1 {
  font-size: 20px;
  color: rgb(109, 110, 110);
}

.rect1 {
  position: fixed;
  top: 160px;
  left: 50px;
  height: 200px;
  width: 320px;
  background-color: #dedede;
  border-radius: 10px;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: left; /* 水平居中文本 */
  padding-left: 10px;
  padding-right: 10px;
}
.rect1 p {
  text-align: left;
}
.sankey-chart {
  display: flex;
  position: fixed;
  top: 13vh;
  left: 50vh;
  justify-content: center;
  align-items: center;
  height: 85vh;
  width: 70vw;
  overflow: auto;
  /* background-color: antiquewhite; */
}

.scrollable-content {
  display: flex;
  position: fixed;
  top: 13vh;
  left: 50vh;
  justify-content: center;
  align-items: center;
  height: 85vh;
  width: 70vw;
  overflow: auto;
}
.choose {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50vh;
  left: 50px;
}
.choose-title {
  width: 320px;
  height: 45px;
  background-image: linear-gradient(
    to left,
    rgba(252, 237, 227, 1),
    rgba(193, 165, 48, 1)
  );
  border-radius: 5px;
      display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: left; /* 水平居中文本 */
  padding-left: 20px;
}
.choose-title a {
  color: #000;
  font-size: 20px;
}
.choose-content {
  border: 2px solid #c1a530;
  background-color: #f9f5f2;
  width: inherit;
  height: 40vh;
  overflow: auto;
  text-align: left;
}
.hover-item {
  cursor: pointer; /* 将鼠标指针设置为手指形状 */
}
.hover-item:hover {
  background-color: rgba(193, 165, 48, 0.3); /* 设置悬浮时的背景颜色 */
}
</style>
