<template>
  <div class="container">
    <RouterLink :to="to" class="back-arrow">
      <i class="icon" />
      <span class="text">{{ text }} </span>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    to: {
      type: [String, Object],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.back-arrow {
  padding: 0.3em 0.25em 0.25em 0.05em;
  margin: 0 0 0.75em -0.05em;
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;

  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-image: url('../../assets/icons/arrow-right.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    transform: scaleX(-1);
    margin-right: 0.25em;
    margin-top: -0.04em;
  }

  .text {
    font-size: 0.833334em;
  }
}

@media (min-width: 992px) {
  .container {
    margin-top: 2rem;
  }
}
</style>
