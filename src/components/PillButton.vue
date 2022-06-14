<template>
  <RouterLink :to="to" class="pill-button">
    <slot />
  </RouterLink>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.pill-button {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 5em;
  background: $color-accent-light;
  font-weight: 600;
  color: $color-black;
  text-decoration: none;
  flex-shrink: 0;

  &.router-link-exact-active {
    background: $color-accent;
    color: $color-white;
  }

  &:hover {
    background: $color-accent;
    color: $color-white;
  }
}
</style>
