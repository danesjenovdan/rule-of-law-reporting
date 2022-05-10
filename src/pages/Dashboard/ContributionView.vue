<template>
  <header>
    <DesktopHeader v-if="isDesktop.value" />
    <SmallHeader v-if="!isDesktop.value" />
    <BackArrow
      text="Nazaj na seznam prispevkov"
      :to="{ name: 'contributions' }"
    />
  </header>

  <section>
    <div class="container">
      <main>
        <h2>{{ contribution['Ime prispevka'] }}</h2>
        <div
          v-if="contribution['Področja <= Prispevek']"
          class="contribution-area"
          :style="{
            backgroundColor:
              colors[contribution['Področja <= Prispevek']['Ime področja']] ||
              '#dadada',
          }"
        >
          {{ contribution['Področja <= Prispevek']['Ime področja'] }}
        </div>
        <div class="author">Maja, Danes je nov dan</div>
        <div class="date">
          {{ formatDate(contribution['created_at']) }}
        </div>
        <hr class="short-hr" />
        <p>
          {{ contribution['O področju prispevka'] }}
        </p>
        <FormKit
          v-if="events?.length > 0"
          type="button"
          :classes="{
            outer: 'small',
          }"
          @click="$router.push({ name: 'new-event' })"
        >
          Dodaj dogodek na ta prispevek
        </FormKit>
      </main>
    </div>
    <section v-if="events?.length > 0" class="events">
      <div class="container">
        <div class="events-header">
          <h3>Povezani dogodki</h3>
          <hr />
        </div>
        <div v-for="(chain, key) in eventChains" :key="key">
          <EventListElement
            v-for="event in chain"
            :key="event['Naslov dogodka']"
            :event="event"
          />
        </div>
      </div>
    </section>
  </section>
  <footer v-if="events?.length === 0">
    <div class="container">
      <div class="buttons">
        <FormKit type="button" @click="$router.push({ name: 'new-event' })">
          Želim dodati povezani dogodek
        </FormKit>
      </div>
    </div>
  </footer>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import BackArrow from '../../components/Header/BackArrow.vue';
import EventListElement from '../../components/EventListElement.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';

import { getContribution } from '../../helpers/api.js';
import { colors } from '../../helpers/area-colors.js';
import { formatDate } from '../../helpers/format-time.js';

export default {
  components: {
    SmallHeader,
    EventListElement,
    BackArrow,
    DesktopHeader,
  },
  inject: {
    isDesktop: {
      default: false,
    },
  },
  data() {
    return {
      contribution: {},
      pageInfo: {},
      colors,
    };
  },
  computed: {
    events() {
      return this.contribution['Prispevek => Dogodek'];
      // ?.slice()
      // ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
    eventChains() {
      // chains - keys are ids of the last element of the chain
      const chains = {};
      // all events that we are going to sort into chains
      const eventsPool = [...this.contribution['Prispevek => Dogodek']];
      let previousLength = 0; // for safety check that we dont loop forever (if length is the same twice, break loop!)
      while (eventsPool.length > 0 && previousLength !== eventsPool.length) {
        // console.log(eventsPool);
        previousLength = eventsPool.length;
        for (let i = eventsPool.length - 1; i >= 0; i -= 1) {
          // starting nodes of the chain are not connected to any other event
          if (eventsPool[i].nc_0zwf__dogodek_id == null) {
            // console.log('v eventsPool dodajam ', eventsPool[i]['id']);
            // add to chains
            chains[eventsPool[i].id] = [eventsPool[i]];
            // remove from events pool
            eventsPool.splice(i, 1);
          }
          // add children to nodes
          else if (eventsPool[i].nc_0zwf__dogodek_id in chains) {
            // console.log(
            //   'v eventsPool na ',
            //   eventsPool[i]['nc_0zwf__dogodek_id'],
            //   ' dodajam ',
            //   eventsPool[i]['id']
            // );
            // save the chain under new key, which is the id of the last element of the chain
            chains[eventsPool[i].id] = [
              ...chains[eventsPool[i].nc_0zwf__dogodek_id],
              eventsPool[i],
            ];
            // remove old chain
            delete chains[eventsPool[i].nc_0zwf__dogodek_id];
            // remove from events pool
            eventsPool.splice(i, 1);
          }
        }
      }
      return chains;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchContribution(id);
  },
  methods: {
    async fetchContribution(id) {
      const response = await getContribution(id);
      this.contribution = response.data;
      // nc_0zwf__dogodek_id je polje, ki ti pove, na kater dogodek je povezan ta dogodek
    },
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

h2 {
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 0.5rem;
}

.contribution-area {
  display: inline-block;
  padding: 7px;
  background-color: #aed8f0;
  color: $color-black;
  font-size: 8px;
  font-style: italic;
  margin-bottom: 1rem;
}

.author {
  font-size: 10px;
  font-style: italic;
  color: $color-black;
}

.date {
  color: $color-grey;
  font-size: 10px;
  font-style: italic;
}

.short-hr {
  border-color: $color-light-grey;
  width: 50px;
  margin: 1rem 0;
}

p {
  font-size: 12px;
}

main {
  padding-bottom: 2rem;
}

.events {
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: $bg-color;
}

.events-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  h3 {
    font-size: 10px;
    font-weight: 600;
    color: $color-accent;
    margin-bottom: 0;
    padding-right: 5px;
  }
  hr {
    flex-grow: 1;
    background-color: $color-accent;
    height: 2px;
    margin: 0;
    opacity: 1;
  }
}
</style>
