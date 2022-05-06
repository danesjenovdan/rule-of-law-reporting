<template>
  <header>
    <SmallHeader />
    <BackArrow
      text="Nazaj na seznam prispevkov"
      :to="{ name: 'contributions' }"
    />
  </header>
  <section>
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
    <section v-if="events?.length > 0" class="events">
      <div class="events-header">
        <h3>Povezani dogodki</h3>
        <hr />
      </div>
      <EventListElement
        v-for="event in events"
        :key="event['Naslov dogodka']"
        :event="event"
      />
    </section>
  </section>
  <footer v-if="events?.length === 0">
    <div class="buttons">
      <FormKit type="button" @click="$router.push({ name: 'new-event' })">
        Želim dodati povezani dogodek
      </FormKit>
    </div>
  </footer>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import BackArrow from '../../components/Header/BackArrow.vue';
import EventListElement from '../../components/EventListElement.vue';
import { getContribution } from '../../helpers/api.js';
import { colors } from '../../helpers/area-colors.js';
import { formatDate } from '../../helpers/format-time.js';

export default {
  components: {
    SmallHeader,
    EventListElement,
    BackArrow,
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
      return this.contribution['Prispevek => Dogodek']
        ?.slice()
        ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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
