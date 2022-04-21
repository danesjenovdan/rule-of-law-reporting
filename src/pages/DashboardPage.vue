<template>
  <div class="dashboard-page">
    <section class="header">
      <SmallHeader />
      <PillButtonNav />
    </section>
    <section class="main-content">
      <RouterView />
    </section>
  </div>
</template>

<script>
import SmallHeader from '../components/Header/SmallHeader.vue';
import PillButtonNav from '../components/PillButtonNav.vue';
import { me } from '../helpers/api.js';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await me();
          if (response?.data?.isAuthorized) {
            return;
          }
        } catch (error) {
          // fall through to redirect
        }
      }
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.dashboard-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  section.header {
    flex: 0 0 0%;
  }

  section.main-content {
    flex: 1 0 0%;
    margin-left: -$gutter;
    margin-right: -$gutter;
    padding-left: $gutter;
    padding-right: $gutter;
    background: $color-white;
    overflow-y: scroll;
  }
}
</style>
