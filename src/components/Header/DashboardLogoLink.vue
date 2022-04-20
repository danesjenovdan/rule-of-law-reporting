<template>
  <RouterLink to="/dashboard" class="dashboard-link">
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
  width: 3.33334rem;
  height: 3.33334rem;
  border-radius: 50%;
  overflow: hidden;
}
</style>
