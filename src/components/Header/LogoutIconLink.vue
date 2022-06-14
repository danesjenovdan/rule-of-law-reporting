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
  width: 2.0833334rem;
  height: 2.0833334rem;
  border-radius: 50%;
  background-color: $color-white;
  background-image: url('../../assets/icons/logout.svg');
  background-position: center;
  background-size: 60% 60%;
  background-repeat: no-repeat;
  text-indent: -999999px;
  overflow: hidden;

  @media (min-width: 992px) {
    width: 3.33334rem;
    height: 3.33334rem;
    background-size: 50% 50%;
    background-color: $color-accent-light;
  }

  &:hover {
    background-color: $color-accent;
    background-image: url('../../assets/icons/logout-white.svg');
  }
}
</style>
