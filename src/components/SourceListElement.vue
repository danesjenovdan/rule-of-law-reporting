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
        <span class="arrow-icon"></span>
      </div>
    </div>
    <div v-if="!collapsed" class="collapsed">
      <br />
      <div>
        <p>
          <i>{{ source['Avtor vira (oseba, organizacija, medij)'] }}</i>
        </p>
        <p v-if="source['Datum objave vira']">
          {{ formatDate(source['Datum objave vira']) }}
        </p>
      </div>
      <br />
      <div class="date">
        <p>Obdobje, na katerega se navezuje vir</p>
        <p>
          <span v-if="source['Datum začetka obdobja']">{{
            formatDate(source['Datum začetka obdobja'])
          }}</span
          ><span v-else>?</span>
          <span>–</span>
          <span v-if="source['Datum konca obdobja']">
            {{ formatDate(source['Datum konca obdobja']) }}</span
          >
          <span v-else>?</span>
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
  .source-header {
    padding: 0 2rem 0.75rem 2rem;
    cursor: pointer;

    .source-header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid $color-medium-grey;

      .arrow-icon {
        transform: rotate(180deg);
      }
    }
  }

  &.expanded {
    background-color: $color-white;
    padding-bottom: 1.5rem;

    .source-header-wrapper {
      border-color: $color-white;

      .arrow-icon {
        transform: none;
      }
    }
  }

  &:last-of-type {
    margin-bottom: 1.25rem;

    &.expanded {
      margin-bottom: 0;
    }
  }
}

h4 {
  font-size: 14px;
  margin-top: 0.75rem;
  margin-bottom: 0;
  font-weight: 600;
  color: $color-black;
}

p {
  font-size: 10px;
  margin-bottom: 0;

  i {
    font-style: italic;
  }
}

.collapsed {
  padding: 0 2rem;
}

.date {
  p:last-child {
    font-size: 12px;
  }
}

.documents a {
  display: block;
  font-size: 12px;
  color: $color-blue;
  margin-bottom: 1rem;
}

a.source-button {
  display: inline-block;
  margin: 1rem 0 0.5rem 0;
  font-size: 12px;
  background-color: transparent;
  background-image: url('../assets/icons/arrow-right.svg');
  background-repeat: no-repeat;
  background-position: right 0.8em top 0.6em;
  background-size: 0.4em 1em;
  padding: 0.4em 2em 0.4em 1em;
  text-decoration: none;
  color: inherit;
  border: 2px solid $color-accent-light;
  border-radius: 5px;

  &:hover {
    border-color: $color-accent;
  }
}
</style>
