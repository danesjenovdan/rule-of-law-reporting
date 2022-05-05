<template>
  <div class="small-header">
    <div class="small-header-left">
      <DashboardLogoLink />
    </div>
    <div class="small-header-right">
      <ExportContributionsLink />
      <LogoutIconLink />
    </div>
  </div>
</template>

<script>
import DashboardLogoLink from './DashboardLogoLink.vue';
import ExportContributionsLink from './ExportContributionsLink.vue';
import LogoutIconLink from './LogoutIconLink.vue';

export default {
  components: {
    DashboardLogoLink,
    ExportContributionsLink,
    LogoutIconLink,
  },
};
</script>

<style lang="scss" scoped>
.small-header {
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;

  .small-header-left,
  .small-header-right {
    display: flex;
    align-items: center;
  }

  .small-header-right {
    justify-content: flex-end;
    gap: 1rem;
  }
}
</style>
