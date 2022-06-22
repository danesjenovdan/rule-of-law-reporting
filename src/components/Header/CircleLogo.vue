<template>
  <div :class="['circle-logo', `circle-logo--${size}`]">
    <div class="text">ROLR</div>
    <img src="/rolr-logo.svg" alt="ROLR logo" />
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 10rem;

  .text {
    position: absolute;
    width: 1px;
    height: 1px;
    font-size: 10px;
    text-indent: -999999px;
  }

  img {
    width: 100%;
  }

  &.circle-logo--small {
    width: 4rem;
    height: 3rem;

    @media (min-width: 992px) {
      width: 5.55rem;
      height: 4.166667rem;
    }
  }
}
</style>
