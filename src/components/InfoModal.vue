<template>
  <div class="info-modal-bg">
    <div class="info-modal">
      <button class="close-button" @click="$emit('close')">×</button>
      <div class="container">
        <h4>Ime področja</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          reiciendis facere labore aut fugit aperiam id architecto molestias at
          rem, harum voluptatem commodi quo quibusdam quis necessitatibus
          mollitia deserunt tempore?
        </p>
        <h4>Ime področja</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          reiciendis facere labore aut fugit aperiam id architecto molestias at
          rem, harum voluptatem commodi quo quibusdam quis necessitatibus
          mollitia deserunt tempore?
        </p>
        <h4>Ime področja</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          reiciendis facere labore aut fugit aperiam id architecto molestias at
          rem, harum voluptatem commodi quo quibusdam quis necessitatibus
          mollitia deserunt tempore?
        </p>
        <h4>Ime področja</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          reiciendis facere labore aut fugit aperiam id architecto molestias at
          rem, harum voluptatem commodi quo quibusdam quis necessitatibus
          mollitia deserunt tempore?
        </p>
        <h4>Ime področja</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          reiciendis facere labore aut fugit aperiam id architecto molestias at
          rem, harum voluptatem commodi quo quibusdam quis necessitatibus
          mollitia deserunt tempore?
        </p>
        <h4>Ime področja</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          reiciendis facere labore aut fugit aperiam id architecto molestias at
          rem, harum voluptatem commodi quo quibusdam quis necessitatibus
          mollitia deserunt tempore?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  mounted() {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = '';
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.info-modal-bg {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999999;

  .info-modal {
    position: relative;
    max-width: 600px;
    max-height: 100%;
    overflow-y: auto;
    background: $bg-color;

    @media (min-width: 992px) {
      margin: 0 auto;
      max-height: 90vh;
      box-shadow: 0 0 4px 1px $color-accent-light;
    }

    .close-button {
      position: absolute;
      top: 0.75rem;
      right: 1rem;
      width: 1.25em;
      height: 1.25em;
      padding: 0;
      margin: 0;
      background: $color-white;
      border: none;
      border-radius: 50%;
      font-size: 1.75rem;
      font-weight: 900;
      line-height: 1.25em;
      display: flex;
      align-items: center;
      justify-content: center;

      &:focus {
        box-shadow: 0 0 0 2px $color-accent;
      }
    }

    .container {
      padding: 1rem 3rem;

      h4 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 1rem;
        margin-top: 2rem;
      }
    }
  }
}
</style>
