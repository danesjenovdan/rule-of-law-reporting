<template>
  <div class="desktop-toolbar container">
    <ToolsBar
      @open-filters="$emit('open-filters')"
      @search="$emit('search', $event)"
    />
  </div>
</template>

<script>
import ToolsBar from './ToolsBar.vue';

export default {
  components: {
    ToolsBar,
  },
  emits: ['open-filters', 'search'],
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
