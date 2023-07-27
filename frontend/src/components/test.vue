<template>
  <div id="app">
    <div class="circle-container">
      <div
        class="circle-text"
        v-for="(char, index) in text"
        :key="index"
        :style="getTextStyle(index)"
      >
        {{ char }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789aaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccc", // Add more characters as needed
      radius: 100, // Radius of the central circle
      gap: 8, // Gap between characters
      anglePerCharacter: 8, // Adjust the angle per character to control the spiral density
    };
  },
  methods: {
    getTextStyle(index) {
      const angle = this.degreesToRadians(index * this.anglePerCharacter);
          const revolutions = Math.floor(index / (360 / this.anglePerCharacter));
          const x = (this.radius + revolutions * this.anglePerCharacter) * Math.cos(angle);
          const y = (this.radius + revolutions * this.anglePerCharacter) * Math.sin(angle);
          return {
            transform: `translate(${x}px, ${y}px) rotate(${angle}rad)`,
          };
    },
    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    },
  },
};
</script>

<style scoped>
/* Style for the circle container */
.circle-container {
  width: 400px;
  height: 400px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style for the text inside the circle */
.circle-text {
  position: absolute;
  font-size: 12px;
  white-space: nowrap;
}
</style>