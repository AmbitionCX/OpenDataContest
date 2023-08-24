<template>
  <div class="bg" style="background-color: #f9f5f2">
  <div class="nav1">
    <navbar></navbar>
  </div>

  <div style="position: fixed; top: 23vh; left: 11vw">
    <img
      src="@/assets/fenxi/rect.svg"
      class="image"
      style="width: 13vw"
    />
  </div>

  <div class="yunbu-txt">
    <p>{{ yunbu.source[yunbu.source.length-1] }} 部</p>
  </div>

  <div style="position: fixed; z-index: 999; top: 23vh; left: 6vw; cursor: pointer;"   @click="BackToLastWeb">
    <img
      src="@/assets/fenxi/back.svg"
      class="image"
      style="width: 3.2vw; "
    />
  </div>

  <div style="position: fixed; top: 0; left: 0; z-index: -1;">
    <img
      src="@/assets/fenxi/juanzhou.svg"
      class="image"
      style="width: 100vw; height: 100vh"
    />
  </div>

  <div class="txt1">
    上古 &nbsp; 二十九韵部
  </div>

  <div class="ciyun">
    <svg ref="svg"></svg>
  </div>

</div>
</template>
  
  <script>
import axios from "axios";
import * as d3 from "d3";
import cloud from "d3-cloud";

export default {
  data() {
    return {
      yunbu: this.$route.params,
      yunjiao: [],
    };
  },
  mounted() {
    this.getJuanzhou();
    //this.layout(this.yunjiao);
  },
  methods: {
    layout(yunjiao) {
      const svg = d3
        .select(this.$refs.svg)
        .attr("width", 1200)
        .attr("height", 300)
        .attr("transform", "translate(0,200)");

        const layout = cloud() // You might need to adjust this based on the actual library you're using
      .size([1000, 300])
      .words(yunjiao.map(function(d) {
        return {text: d, size: Math.random() * 60 + 10};
      }))
      .padding(5)
      .rotate(() => 0)
      .font("Impact")
      .fontSize(80) //词云间距
      .on("end", this.draw);

      layout.start();
    },

    draw(yunjiao) {
      const svg = d3.select(this.$refs.svg);
      svg.selectAll("g").remove();
      const g = svg.append("g").attr("transform", "translate(600,150)");

      g.selectAll("text")
        .data(yunjiao)
        .enter()
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .style("font-size", (d) => Math.random() * 50 + 30 + "px")
        .style("font-family", "Impact")
        .style("fill", "#5b574f")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text((d) => d.text);
    },

    async getJuanzhou() {
      try {
        const response = await axios.post(
            this.$globalUrl + "/get_yunjiaozi",
          {
            params: {
              yunbu: this.yunbu,
            },
          }
        );
        console.log("Backend response:", response.data);
        console.log("Backend response list:", response.data.data);
        this.yunjiao = response.data.data;

        this.layout(this.yunjiao);
      } catch (error) {
        console.error("Error sending clicked word to the backend:", error);
      }
    },

    BackToLastWeb(){
      window.location.href = `/fenxi`; 
    },
  },
};
</script>
  
<style>
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.txt1 {
  position: fixed;
  top: 40vh;
  left: 1.5vw;
  font-size: 25px;
  writing-mode: vertical-lr;
  /* background-color: antiquewhite; */
}
.ciyun {
  position: fixed;
  top: 10vh;
  left: 5vw;
  height: 20vh;
  width: 90vw;
}
.yunbu-txt {
  position: fixed; 
  top: 23.5vh; 
  left: 12vw;
  width: 13vw;
  height: 4.5vh;
  /* background-color: bisque; */
  text-align: left;
  font-size: 20px;
  padding-left: 20px;
}
.yunbu-txt p{

}
</style>
  