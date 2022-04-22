<template>
  <RouterLink
    :to="{ name: 'login', query: { logout: true } }"
    class="logout-icon-link"
  >
    Odjavi se
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.logout-icon-link {
  position: relative;
  width: 3.33334rem;
  height: 3.33334rem;
  border-radius: 50%;
  background-color: $color-accent-light;
  background-image: url('../../assets/icons/logout.svg');
  background-position: center;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  text-indent: -999999px;
  overflow: hidden;
}
</style>
