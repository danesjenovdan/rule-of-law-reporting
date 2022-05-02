<template>
  <header>
    <SmallHeader />
    <PillButtonNav />
  </header>
  <main></main>
  <footer></footer>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
  },
};
</script>
