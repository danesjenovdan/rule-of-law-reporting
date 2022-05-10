<template>
  <div class="desktop-toolbar container">
    <ToolsBar @close="$emit('close')" />
  </div>
</template>

<script>
import ToolsBar from './ToolsBar.vue';

export default {
  emits: ['close'],
  components: {
    ToolsBar,
  },
};
</script>

<style lang="scss" scoped>
.desktop-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;

  .tools-right {
    display: flex;
    align-items: center;
  }
}
.desktop-toolbar:deep(.tools) {
  width: 500px;
}
</style>
