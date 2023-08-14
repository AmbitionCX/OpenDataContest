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

      <el-select v-model="selectedOption" class="choose" 
      placeholder="请选择上古韵部" @change="handleOptionChange">
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
  import navbar3 from '@/components/nav/navbar3.vue';
  import axios from 'axios';
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
  components:{
    navbar3
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
        this.getData('上古：'+this.selectedOption);
      }
    },
    async getYunbu() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_shanggu_shijing";
        axios
          .get(url)
          .then((res) => {
            const yunbu = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i][1] != "" && res.data[i][1] != 0) {
                yunbu.push(res.data[i][1]);
              }
            }
            const yunbu2 = Array.from(new Set(yunbu)); //去重

            const yunbu3 = [];
            for(let i = 0; i < yunbu2.length; i++){
              yunbu3.push({value:yunbu2[i], label:yunbu2[i]});
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
        //this.sankeyData = response.data.data;
        
        //console.log("Backend response:", response.data);
        this.drawChart(response.data.data);
       // console.log("Backend response links:", response.data.data.links);
      } catch (error) {
        console.error("Error sending word to the backend:", error);
      }
    },

    drawChart(sankeyData) {
      d3.select(this.$refs.svgContainer).html('');  //清空画布
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
        .attr("cursor", "pointer")
        .on('click', (event, d) => {
          // Mouseover event handler
          this.getJuanzhou(d);
        })
        .on('mouseover', function() {
          d3.select(this).attr('stroke', 'green');
          svg.node().dispatchEvent(new Event('input'));
          console.log(this); // 鼠标悬浮时改变链接颜色为绿色
        })
        .on('mouseout', function() {
          d3.select(this).attr('stroke', "#dedede"); // 鼠标离开时恢复链接颜色为黑色
        });

        // 颜色比例尺
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      svg
        .selectAll(".node")
        .data(sankeyNodes)
        .enter()
        .append("rect")
        .attr("class", "node")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        //.style('fill', d => colorScale(d.name)) // 设置节点颜色
        .style('fill', '#bccc5c')
        //.style("stroke", "gray") // 设置节点边框颜色为灰色
        .style("stroke-width", 1); // 设置节点边框宽度

        svg.append('g')
        .selectAll('.text')
        .data(sankeyNodes)
        .enter().append('text')
        .attr('class', 'text')
        .attr('x', d => (d.x0 + d.x1) / 2 + 50)
        .attr('y', d => (d.y0 + d.y1) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .text(d => d.name);
    },

    //跳转到新的页面，展开卷轴
    getJuanzhou(node) {
      const queryObject = {source: node.source.name, target: node.target.name};
      const yunbu = 1;
      console.log(queryObject);
      this.$router.push({
        name: 'juanzhou',
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
