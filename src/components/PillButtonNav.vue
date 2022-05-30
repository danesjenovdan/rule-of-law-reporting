<template>
  <div class="container">
    <div class="pill-button-nav">
      <PillButton :to="{ name: 'contributions' }">Prispevki</PillButton>
      <PillButton :to="{ name: 'reports' }">Poročila</PillButton>
      <PillButton :to="{ name: 'about-reporting' }">O poročanju</PillButton>
    </div>
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
  margin: 1.5rem 0;
  display: flex;
  gap: 0.5rem;
}
</style>
