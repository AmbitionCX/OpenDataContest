<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="nav1">
      <navbar3></navbar3>
    </div>

    <div class="header">综合分析</div>

    <div class="intro">
      <div class="intro1">文字简介:</div>
      <div class="rect1"></div>
    </div>

    <el-select
      v-model="selectedOption"
      class="choose"
      placeholder="请选择上古韵部"
      @change="handleOptionChange"
    >
      <el-option
        v-for="item in yunbu"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

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
      height: 650,
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
    //this.getData('上古：歌');
    //this.sendData();
  },
  methods: {
    handleOptionChange() {
      // 调用您的函数，并将选中的选项作为参数传递
      if (this.selectedOption) {
        console.log(this.selectedOption);
        this.getData("上古：" + this.selectedOption);
      }
    },
    async getYunbu() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_shanggu_shijing";
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
          "http://localhost:5000/yunbu_sankey_data",
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

    drawChart(sankeyData) {
      d3.select(this.$refs.svgContainer).html(""); //清空画布
      //console.log('success:', this.sankeyData);
      const { nodes, links } = sankeyData;

      // Convert links' source and target from names to corresponding node objects
      const convertedLinks = mapNodes(links, nodes);

      const svg = d3.select(this.$refs.svgContainer);

      const sankey = d3Sankey
        .sankey()
        .nodeWidth(20)
        .nodePadding(10)
        .size([this.width - 100, this.height]);

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
          //console.log(i.source.name, i.target.name);
          drawTxt(PathData, i.source.name, i.target.name);

          d3.select(this).style("stroke", "url(#gradient)");
        })
        .on("mouseout", function () {
          d3.select(this).style("stroke", "#dedede"); // 鼠标离开时恢复链接颜色为黑色
          svg.selectAll("textPath").remove();
        });

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      /////////////////////////////////////////////////////////
      // const textData = "这是我用来测试的一段话，如果你看到他正确显示在应有的位置上那就说明我的代码非常正确，否则我就要继续修改";

      function drawTxt(pathData, source, target) {
        //test();
        var textData = "";

        const txtlistpromise = getTxt(target, source).then(function (txtlist) {
          if (Array.isArray(txtlist)) {
            textData = txtlist.join("");
            //console.log("txtdata:", textData);

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
      }

      async function getTxt(target, source) {
        try {
          const response = await axios.post(
            "http://localhost:5000/get_yunjiaozi",
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
      }

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
        .style("fill", (d) => colorScale(d.name)) // 设置节点颜色
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
        .attr('dx', '50px')
        .attr('text-anchor', 'middle')
        .text(function(d){
          //console.log(d);
          return d.name;
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
  top: 5px;
  left: 47vw;
  font-size: 30px;
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
}
.sankey-chart {
  display: flex;
  position: fixed;
  top: 13vh;
  left: 50vh;
  justify-content: center;
  align-items: center;
  height: 85vh;
  overflow: auto;
  /* background-color: antiquewhite; */
}
.choose {
  display: flex;
  position: fixed;
  top: 50vh;
  left: 50px;
}
</style>
