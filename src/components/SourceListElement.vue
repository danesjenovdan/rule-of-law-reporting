<template>
  <div class="source" :class="{ expanded: !collapsed }">
    <div class="source-header" @click="collapsed = !collapsed">
      <div class="source-header-wrapper">
        <div>
          <h4>To je naslov tega vira, ki ga vpiše uporabnik</h4>
          <p><i>Objava poročila / analize / študija</i></p>
        </div>
        <span>i</span>
      </div>
    </div>
    <div v-if="!collapsed" class="collapsed">
      <br />
      <div>
        <p><i>Avtor</i></p>
        <p>13. 4. 2022</p>
      </div>
      <br />
      <div class="date">
        <p>Obdobje, na katerega se navezuje vir</p>
        <p>marec 2021 – marec 2022</p>
      </div>
      <br />
      <div>
        <p>Dokumenti</p>
        <a href="/" target="_blank">dokument1.pdf</a>
      </div>
      <button>Povezava do vira</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.source {
  margin: 0.5rem 0;
  .source-header {
    padding: 0 1.5rem;
    .source-header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid $color-medium-grey;
    }
  }
  &.expanded {
    background-color: $color-white;
    .source-header-wrapper {
      border: none;
    }
  }
}
h4 {
  font-size: 12px;
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-weight: 900;
  color: $color-black;
}
p {
  font-size: 8px;
  margin-bottom: 0;
  i {
    font-style: italic;
  }
}
.collapsed {
  padding: 0 1.5rem;
}
.date {
  p:last-child {
    font-size: 10px;
  }
}
a {
  display: block;
  font-size: 10px;
  color: $color-blue;
  margin-bottom: 1rem;
}

button {
  border: 3px solid $color-accent-light;
  border-radius: 5px;
  padding: 4px 16px;
  margin: 1rem 0;
}
</style>
