<template>
  <div class="source" :class="{ expanded: !collapsed }">
    <div class="source-header" @click="collapsed = !collapsed">
      <div class="source-header-wrapper">
        <div>
          <h4>{{ source['Naslov vira'] }}</h4>
          <p>
            <i>{{ source['Tip vira'] }}</i>
          </p>
        </div>
        <span>i</span>
      </div>
    </div>
    <div v-if="!collapsed" class="collapsed">
      <br />
      <div>
        <p>
          <i>{{ source['Avtor vira (oseba, organizacija, medij)'] }}</i>
        </p>
        <p>{{ formatDate(source['Datum objave vira']) }}</p>
      </div>
      <br />
      <div class="date">
        <p>Obdobje, na katerega se navezuje vir</p>
        <p>
          {{ formatDate(source['Datum začetka obdobja']) }} –
          {{ formatDate(source['Datum konca obdobja']) }}
        </p>
      </div>
      <br />
      <div
        v-if="JSON.parse(source['Dokumenti povezani z virom']).length > 0"
        class="documents"
      >
        <p>Dokumenti</p>
        <a
          v-for="document in JSON.parse(source['Dokumenti povezani z virom'])"
          :key="document.title"
          :href="document.url"
          target="_blank"
          >{{ document.title }}</a
        >
      </div>
      <div>
        <a
          :href="source['Povezava do vira']"
          target="_blank"
          class="source-button"
          >Povezava do vira</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../helpers/format-time.js';

export default {
  props: {
    source: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
  methods: {
    formatDate,
  },
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
    padding-bottom: 1.5rem;
    .source-header-wrapper {
      border-color: $color-white;
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
.documents a {
  display: block;
  font-size: 10px;
  color: $color-blue;
  margin-bottom: 1rem;
}

a.source-button {
  text-decoration: none;
  border: 3px solid $color-accent-light;
  border-radius: 5px;
  color: $color-black;
  padding: 4px 16px;
  margin: 1rem 0;
}
</style>
