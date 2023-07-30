<template>
  <div class="app">
    <div class="left-pane">
      <!-- 左边内容 -->
    </div>
    <div class="right-pane">
      <div class="scrollable-content" ref="scrollable">
        <!-- 右边内容 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.addScrollListener();
    this.scrollToBottom(); // 在页面加载后滚动到底部
  },
  methods: {
    addScrollListener() {
      const scrollableDiv = this.$refs.scrollable;
      scrollableDiv.addEventListener("scroll", this.handleScroll);
    },
    handleScroll(event) {
      // 处理滚动事件
      // 在这里你可以获取滚动位置，并执行需要的操作
    },
    scrollToBottom() {
      const scrollableDiv = this.$refs.scrollable;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight; // 将滚动条滚动到底部
    },
  },
};
</script>

<style>
.app {
  display: flex;
}

.left-pane {
  flex: 1;
  /* 左边部分样式 */
}

.right-pane {
  flex: 1;
  overflow: hidden;
}

.scrollable-content {
  overflow: auto;
  /* 右边滚动内容样式 */
  /* 设置合适的高度或最大高度，以便内容超出后可以出现滚动条 */
}
</style>
