<template>
  <div class="desktop-header">
    <div class="container">
      <div class="desktop-header-left">
        <DashboardLogoLink />
      </div>
      <div>
        <PillButtonNav />
      </div>
      <div class="desktop-header-right">
        <LogoutIconLink />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardLogoLink from './DashboardLogoLink.vue';
import LogoutIconLink from './LogoutIconLink.vue';
import PillButtonNav from '../PillButtonNav.vue';

export default {
  components: {
    DashboardLogoLink,
    LogoutIconLink,
    PillButtonNav,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.desktop-header {
  background-color: $bg-color;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
