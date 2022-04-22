<template>
  <div class="pill-button-nav">
    <PillButton :to="{ name: 'contributions' }">Prispevki</PillButton>
    <PillButton :to="{ name: 'reports' }">Poročila</PillButton>
    <PillButton :to="{ name: 'about-reporting' }">O poročanju</PillButton>
  </div>
</template>

<script>
import PillButton from './PillButton.vue';

export default {
  components: {
    PillButton,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.pill-button-nav {
  // nicer overscroll
  margin-left: -$gutter;
  margin-right: -$gutter;
  padding-left: $gutter;
  padding-right: $gutter;
  // scrollbar spacing
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;
}
</style>
