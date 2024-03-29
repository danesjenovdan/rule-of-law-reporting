<template>
  <header>
    <DesktopHeader v-if="isDesktop" />
    <SmallHeader v-if="!isDesktop" />
    <BackArrow
      text="Nazaj na seznam prispevkov"
      :to="{ name: 'contributions' }"
    />
  </header>
  <div v-if="loading" class="spinner-container">
    <div class="spinner"></div>
  </div>
  <template v-else>
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
          <div class="author">
            <template v-if="contribution['Uporabnik']">
              {{ contribution['Uporabnik']['Ime'] }},
              {{ contribution['Uporabnik']['Organizacija'] }}
            </template>
            <template v-else>N/A</template>
          </div>
          <div class="date">
            {{ formatDate(contribution['created_at']) }}
          </div>
          <hr class="short-hr" />
          <p>
            {{ contribution['O področju prispevka'] }}
          </p>
          <FormKit
            type="button"
            :classes="{
              outer: 'small',
            }"
            @click="
              $router.push({
                name: 'new-event',
                query: { contribution: $route.params.id },
              })
            "
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
          <FormKit
            type="button"
            @click="
              $router.push({
                name: 'new-event',
                query: { contribution: $route.params.id },
              })
            "
          >
            Želim dodati povezani dogodek
          </FormKit>
        </div>
      </div>
    </footer>
  </template>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import BackArrow from '../../components/Header/BackArrow.vue';
import EventListElement from '../../components/EventListElement.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import {
  getContribution,
  getEventsFromContribution,
} from '../../helpers/api.js';
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
      loading: true,
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
  async mounted() {
    const { id } = this.$route.params;
    await this.fetchContribution(id);
    await this.fetchEvents(id);
    this.loading = false;
  },
  methods: {
    async fetchContribution(id) {
      const response = await getContribution(
        id,
        'Ime prispevka,created_at,Področja <= Prispevek,Uporabnik,O področju prispevka'
      );
      this.contribution = response.data;
      // nc_0zwf__dogodek_id je polje, ki ti pove, na kater dogodek je povezan ta dogodek
    },
    async fetchEvents(id) {
      // FIXME: this is a separate query from fetchContributions because of a bug in noco db
      // remove when fixed: https://github.com/nocodb/nocodb/pull/2454
      const response = await getEventsFromContribution(
        id,
        'id,Naslov dogodka,Uporabnik,created_at,Kaj se je zgodilo in kako vpliva na vladavino prava,nc_0zwf__dogodek_id'
      );
      this.contribution['Prispevek => Dogodek'] = response.data.list;
    },
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

h2 {
  font-size: 22px;
  font-weight: 900;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.contribution-area {
  display: inline-block;
  padding: 5px 7px;
  background-color: #aed8f0;
  color: $color-black;
  font-size: 10px;
  font-style: italic;
  margin-bottom: 0.75rem;
}

.author {
  font-size: 12px;
  font-style: italic;
  color: $color-black;
}

.date {
  color: $color-grey;
  font-size: 12px;
  font-style: italic;
}

.short-hr {
  border-color: $color-medium-grey;
  width: 50px;
  margin: 1.5rem 0;
}

p {
  font-size: 14px;
  margin-bottom: 2rem;
}

main {
  padding-top: 1px;
  padding-bottom: 2rem;
}

.events {
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  background-color: $bg-color;
}

.events-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 12px;
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
