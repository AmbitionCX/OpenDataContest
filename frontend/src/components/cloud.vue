<template>
  <div>
    <svg ref="svg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import cloud from "d3-cloud";

export default {
  mounted() {
    this.drawWordCloud(['a','b','c','d']);
  },
  methods: {
    drawWordCloud(words) {
  const svg = d3.select(this.$refs.svg)
    .attr("width", 500)
    .attr("height", 500);

  const layout = cloud()
    .size([500, 500])
    .words(words.map(word => ({ text: word, size: 20 }))) // Ignore txtwidth, set size to a constant value
    .padding(5)
    .rotate(() => 0) // 设置旋转角度为0，即不旋转
    .font("Impact")
    .fontSize(d => d.size) // Use the size property for font size
    .on("end", words => this.draw(svg, words)); // Pass the SVG and words to the draw function

  layout.start();
},
draw(svg, words) {
  svg.selectAll("g").remove();

  const g = svg.append("g")
    .attr("transform", "translate(250,250)");

  g.selectAll("text")
    .data(words)
    .enter()
    .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .style("font-size", d => d.size + "px") // Use the size property for font size
      .style("font-family", "Impact")
      .style("fill", "black")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text(d => d.text); // Display the text property of each word
},
  },
};
</script>

<style scoped>
svg {
  background-color: lightgray;
}
</style>