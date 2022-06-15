<template>
  <div class="desktop-toolbar container">
    <ToolsBar
      @open-filters="$emit('open-filters')"
      @search="$emit('search', $event)"
    />
    <div class="tools-right">
      <ExportContributionsLink />
      <FormKit
        type="button"
        @click="$router.push({ name: 'new-contribution' })"
      >
        Želim dodati nov prispevek
      </FormKit>
    </div>
  </div>
</template>

<script>
import ToolsBar from './ToolsBar.vue';
import ExportContributionsLink from './ExportContributionsLink.vue';

export default {
  components: {
    ToolsBar,
    ExportContributionsLink,
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
