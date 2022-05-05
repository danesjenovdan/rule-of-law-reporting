<template>
  <RouterLink
    :to="{ name: 'export-contributions' }"
    class="export-contribuitions-link"
  >
    Izvozi podatke
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.export-contribuitions-link {
  display: inline-block;
  height: 2.0833334rem;
  padding: 0.6em 0.8em 0.4em 2.6em;
  border: 2px solid $color-white;
  border-radius: 3px;
  font-size: 0.66667rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  background-color: transparent;
  background-image: url('../../assets/icons/download.svg');
  background-repeat: no-repeat;
  background-position: left 0.7em top 0.7em;
  background-size: 1.25em 1.25em;
}
</style>
