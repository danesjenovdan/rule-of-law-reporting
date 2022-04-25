<template>
  <div class="small-header">
    <DashboardLogoLink />
    <LogoutIconLink />
  </div>
</template>

<script>
import DashboardLogoLink from './DashboardLogoLink.vue';
import LogoutIconLink from './LogoutIconLink.vue';

export default {
  components: {
    DashboardLogoLink,
    LogoutIconLink,
  },
};
</script>

<style lang="scss" scoped>
.small-header {
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
}
</style>
