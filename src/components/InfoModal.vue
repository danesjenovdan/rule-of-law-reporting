<template>
  <div class="filters-modal">
    <div class="dashboard-page">
      <header>
        <div>&nbsp;</div>
        <span @click="$emit('close')">x</span>
      </header>
      <div class="container">
        <main>
          <h4>Ime področja</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            reiciendis facere labore aut fugit aperiam id architecto molestias
            at rem, harum voluptatem commodi quo quibusdam quis necessitatibus
            mollitia deserunt tempore?
          </p>
          <h4>Ime področja</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            reiciendis facere labore aut fugit aperiam id architecto molestias
            at rem, harum voluptatem commodi quo quibusdam quis necessitatibus
            mollitia deserunt tempore?
          </p>
          <h4>Ime področja</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            reiciendis facere labore aut fugit aperiam id architecto molestias
            at rem, harum voluptatem commodi quo quibusdam quis necessitatibus
            mollitia deserunt tempore?
          </p>
          <h4>Ime področja</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            reiciendis facere labore aut fugit aperiam id architecto molestias
            at rem, harum voluptatem commodi quo quibusdam quis necessitatibus
            mollitia deserunt tempore?
          </p>
          <h4>Ime področja</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            reiciendis facere labore aut fugit aperiam id architecto molestias
            at rem, harum voluptatem commodi quo quibusdam quis necessitatibus
            mollitia deserunt tempore?
          </p>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.filters-modal {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

header {
  background-color: $bg-color;
  text-align: center;
  padding: 1rem 0;
  position: relative;
  span {
    cursor: pointer;
    position: absolute;
    right: 1.25rem;
    top: 1rem;
  }
}

main {
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

footer {
  background-color: $bg-color;
}

h4 {
  font-size: 16px;
  font-weight: 600;
}

/* dekstop */
@media (min-width: 992px) {
  .filters-modal {
    width: 560px;
    height: 80vh;
    margin: auto;
    overflow-y: scroll;
    box-shadow: 0 0 4px 1px #eeebf7;
    border-radius: 3px;
    border: 1px solid #ffffff;
  }
}
</style>
