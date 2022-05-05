<template>
  <header>
    <SmallHeader />
    <PillButtonNav />
  </header>
  <main>
    <h1>Nastanek in namen mehanizma</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <h2>Podnaslov tega sklopa</h2>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt.
    </p>
    <ul>
      <li>
        <span>Neque porro quisquam est</span>, qui dolorem ipsum quia dolor sit
        amet, consectetur, adipisci velit, sed quia non numquam eius modi
        tempora.
      </li>
      <li>Incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</li>
    </ul>
    <h1>Nastanek in namen mehanizma</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <h2>Podnaslov tega sklopa</h2>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt.
    </p>
    <ul>
      <li>
        <span>Neque porro quisquam est</span>, qui dolorem ipsum quia dolor sit
        amet, consectetur, adipisci velit, sed quia non numquam eius modi
        tempora.
      </li>
      <li>Incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</li>
    </ul>
  </main>
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

<style lang="scss" scoped>
@import '../../assets/scss/variables';

main {
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: $color-black;
}

h1 {
  font-weight: 900;
  font-size: 16px;
  line-height: 30px;
}

h2 {
  font-weight: 900;
  font-size: 12px;
  line-height: 15px;
  margin-top: 2rem;
}

p,
li {
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 0.5rem;
  span {
    font-weight: 600;
  }
}

ul {
  padding-left: 0;
  list-style-type: none;
}

li {
  padding-left: 22px;
  background-image: url(/src/assets/icons/puscica-dol.svg);
  background-position: 4px 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
</style>
