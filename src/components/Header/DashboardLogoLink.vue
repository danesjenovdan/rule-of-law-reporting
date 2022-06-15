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
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;

  @media (min-width: 992px) {
    width: 4.166667rem;
    height: 4.166667rem;
  }
}
</style>
