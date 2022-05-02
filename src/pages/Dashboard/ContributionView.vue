<template>
  <header>
    <SmallHeader />
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
        @click="$router.push({ name: 'new-event' })"
        :classes="{
          outer: 'small',
        }"
      >
        Dodaj dogodek na ta prispevek
      </FormKit>
    </main>
    <section v-if="events?.length > 0" class="events">
      <div class="events-header">
        <h3>Povezani dogodki</h3>
        <hr />
      </div>
      <div v-for="event in events" :key="event['Naslov dogodka']" class="event">
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
            @click="$router.push({ name: 'new-source' })"
            :classes="{
              outer: 'small',
            }"
          >
            Dodaj vir za ta dogodek
          </FormKit>
        </div>
        <div class="event-sources">
          <h3>Viri</h3>
          <SourceListElement v-for="i in 3" :key="i" />
        </div>
      </div>
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
import SourceListElement from '../../components/SourceListElement.vue';
import { getContribution } from '../../helpers/api.js';
import { colors } from '../../helpers/area-colors.js';

export default {
  components: {
    SmallHeader,
    SourceListElement,
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
      // console.log(response);
      // this.contribution = response.data.list;
      // this.pageInfo = response.data.pageInfo;
    },
    formatDate(dateString) {
      const d = new Date(dateString);
      return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
    },
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

.event {
  border: 1px solid $color-medium-grey;
  border-radius: 3px;
  margin-bottom: 1rem;
  .event-header {
    padding: 1.5rem;
  }
  h4 {
    font-size: 14px;
    font-weight: 900;
    color: $color-black;
  }
  .date {
    color: $color-black;
  }
  .separator {
    padding-left: 5px;
    padding-right: 5px;
    color: $color-medium-grey;
    font-size: 9px;
  }
  .event-sources {
    h3 {
      font-size: 10px;
      font-weight: 600;
      color: $color-accent;
      margin-bottom: 0.5rem;
      padding: 0 1.5rem;
    }
  }
}
</style>
