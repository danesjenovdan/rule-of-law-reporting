<template>
  <div :class="['circle-logo', `circle-logo--${size}`]">
    <div class="text">ROLR LOGO</div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'large',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.circle-logo {
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: $color-white;

  .text {
    position: absolute;
    inset: 0;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &.circle-logo--small {
    width: 3.33334rem;
    height: 3.33334rem;

    .text {
      padding: 0.5rem;
      font-size: 0.666rem;
    }
  }
}
</style>
