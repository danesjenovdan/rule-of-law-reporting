<template>
  <div class="page-container">
    <RouterView />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  provide() {
    return {
      isDesktop: computed(() => {
        return this.windowWidth > 991;
      }),
    };
  },
  mounted() {
    // responsiveness
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
