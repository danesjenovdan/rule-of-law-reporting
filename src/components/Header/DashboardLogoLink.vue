<template>
  <RouterLink :to="{ name: 'dashboard' }" class="dashboard-link">
    <CircleLogo size="small" />
  </RouterLink>
</template>

<script>
import CircleLogo from './CircleLogo.vue';

export default {
  components: {
    CircleLogo,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.dashboard-link {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
}
</style>
