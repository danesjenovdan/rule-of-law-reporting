<template>
  <div class="event">
    <div class="event-header">
      <h4>{{ event['Naslov dogodka'] }}</h4>
      <div>
        <span class="author">Maja, Danes je nov dan</span
        ><span class="separator">|</span
        ><span class="date">{{ formatDate(event['created_at']) }}</span>
      </div>
      <p>
        {{ event['Kaj se je zgodilo in kako vpliva na vladavino prava'] }}
      </p>
      <FormKit
        type="button"
        :classes="{
          outer: 'small',
        }"
        @click="$router.push({ name: 'new-source' })"
      >
        Dodaj vir za ta dogodek
      </FormKit>
    </div>
    <div v-if="sources.length > 0" class="event-sources">
      <h3>Viri</h3>
      <SourceListElement
        v-for="source in sources"
        :key="source.id"
        :source="source"
      />
    </div>
    <div v-if="eventConnected" class="connection-dots">
      <div class="dot"></div>
      <div class="line"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
import SourceListElement from './SourceListElement.vue';

import { getSourcesFromEvent } from '../helpers/api.js';
import { formatDate } from '../helpers/format-time.js';

export default {
  components: {
    SourceListElement,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sources: [],
      eventConnected: false,
    };
  },
  async mounted() {
    const response = await getSourcesFromEvent(this.event.id);
    this.sources = response.data.list;
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.event {
  border: 1px solid $color-medium-grey;
  border-radius: 3px;
  margin-bottom: 1.5rem;
  position: relative;
  .event-header {
    padding: 1.5rem;
  }
  h4 {
    font-size: 14px;
    font-weight: 900;
    color: $color-black;
  }
  .author {
    font-size: 10px;
    font-style: italic;
    color: $color-black;
  }

  .date {
    color: $color-black;
    font-size: 10px;
    font-style: italic;
  }
  .separator {
    padding-left: 5px;
    padding-right: 5px;
    color: $color-medium-grey;
    font-size: 9px;
  }
  .event-sources {
    margin-bottom: 1.5rem;
    h3 {
      font-size: 10px;
      font-weight: 600;
      color: $color-accent;
      margin-bottom: 0.5rem;
      padding: 0 1.5rem;
    }
  }
  .connection-dots {
    position: absolute;
    left: 1.5rem;
    top: -26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .dot {
      height: 12px;
      width: 12px;
      border: 3px solid $color-accent;
      border-radius: 6px;
      background-color: $bg-color;
    }
    .line {
      height: 6px;
      width: 3px;
      background-color: $color-accent;
      margin: 1px;
    }
  }
}
</style>
