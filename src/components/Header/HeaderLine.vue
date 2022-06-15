<template>
  <div class="container">
    <div v-if="contributionsNo != null || chosenNo != null" class="info">
      <span v-if="contributionsNo != null"
        >Število prispevkov: {{ contributionsNo }}</span
      >
      <span v-if="chosenNo != null">Število izbranih: {{ chosenNo }}</span>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    contributionsNo: {
      type: Number,
      default: null,
    },
    chosenNo: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.info {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 20px;
  span {
    font-size: 10px;
    font-style: italic;
    padding-bottom: 4px;
  }
}
hr {
  margin: 0;
  background-color: #d2c8ee;
  opacity: 1;
}
</style>
