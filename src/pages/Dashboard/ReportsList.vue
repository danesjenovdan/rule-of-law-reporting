<template>
  <header>
    <DesktopHeader v-if="isDesktop" />
    <SmallHeader v-if="!isDesktop" />
    <PillButtonNav v-if="!isDesktop" />
    <div :class="['tabs-container', { container: !isDesktop }]">
      <div class="tabs">
        <div
          :class="{ active: filterInstitution == 'ec' }"
          @click="filterInstitution = 'ec'"
        >
          Evropska komisija
        </div>
        <div
          :class="{ active: filterInstitution == 'other' }"
          @click="filterInstitution = 'other'"
        >
          Drugo
        </div>
      </div>
    </div>
  </header>
  <div class="container">
    <main>
      <div class="filters">
        <div class="filters-left">
          <FormKit v-model="filterAuthor" type="select" :options="authors">
          </FormKit>
          <FormKit
            v-model="filterYear"
            type="select"
            placeholder="Vsa leta"
            :options="years"
          >
          </FormKit>
        </div>
        <div class="tools-right">
          <FormKit
            v-if="isDesktop"
            type="button"
            @click="$router.push({ name: 'new-report' })"
          >
            Želim dodati poročilo / odziv
          </FormKit>
        </div>
      </div>
      <div v-if="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>
      <template v-else>
        <div class="info">
          <span>Število prispevkov: {{ reports?.length }}</span>
          <hr />
        </div>
        <div>
          <div v-for="report in reports" :key="report.id" class="report">
            <div>
              <div class="title">{{ report['Ime poročila ali odziva'] }}</div>
              <div class="subtitle">
                <span class="author"
                  >{{ report['Avtor poročila'] }} /
                  {{ report['Tip poročila glede na avtorja'] }}</span
                ><span class="separator">|</span
                ><span class="date">{{
                  formatDate(
                    report['Datum oddaje ali objave poročila ali odziva']
                  )
                }}</span>
              </div>
            </div>
            <a
              v-if="report['Link do poročila ali odziva']"
              :href="report['Link do poročila ali odziva']"
              target="_blank"
            >
              <div class="open-new-page-icon"></div>
            </a>
          </div>
        </div>
      </template>
    </main>
  </div>
  <footer>
    <div class="container">
      <div class="buttons">
        <FormKit type="button" @click="$router.push({ name: 'new-report' })">
          Želim dodati poročilo / odziv
        </FormKit>
      </div>
    </div>
  </footer>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import { getReportAuthors, getReports } from '../../helpers/api.js';
import { formatDate } from '../../helpers/format-time.js';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
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
      authors: ['Vsi avtorji poročil / odzivov'],
      reports: [],
      filterInstitution: 'ec',
      filterAuthor: 'Vsi avtorji poročil / odzivov',
      filterYear: null,
    };
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      return Array.from(new Array(10), (x, i) => currentYear - i);
    },
    filters() {
      const filters = {};
      if (this.filterYear) {
        filters['Datum oddaje ali objave poročila ali odziva'] = {
          op: 'btw',
          value: `${this.filterYear}-01-01,${this.filterYear}-12-31`,
        };
      }
      if (this.filterInstitution) {
        filters[
          'Na kateri poročevalski mehanizem se nanaša poročilo ali odziv'
        ] = this.filterInstitution === 'ec' ? 'evropska komisija' : 'drugo';
      }
      if (
        this.filterAuthor &&
        this.filterAuthor !== 'Vsi avtorji poročil / odzivov'
      ) {
        filters['Avtor poročila'] = this.filterAuthor;
      }
      return filters;
    },
  },
  watch: {
    filterInstitution() {
      this.filterReports();
    },
    filterAuthor() {
      this.filterReports();
    },
    filterYear() {
      this.filterReports();
    },
  },
  async mounted() {
    await this.fetchReports();
    await this.fetchAuthors();
    this.loading = false;
  },
  methods: {
    formatDate,
    async fetchReports() {
      const response = await getReports(this.filters);
      this.reports = response.data.list;
    },
    async filterReports() {
      this.loading = true;
      const response = await getReports(this.filters);
      this.reports = response.data.list;
      this.loading = false;
    },
    async fetchAuthors() {
      const response = await getReportAuthors();
      this.authors = [
        ...this.authors,
        ...response.data.list.map((o) => o['Avtor poročila'] || 'N/A'),
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.tabs-container {
  box-shadow: 0px 5px 4px -4px $color-accent-super-light;
  position: relative;
}

.tabs {
  border-radius: 3px;
  // border: 1px solid $color-white;
  background-color: $color-white;
  margin-left: -1.6667rem;
  margin-right: -1.6667rem;
  padding-left: 1.6667rem;
  padding-right: 1.6667rem;

  @media (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 960px;
  }

  div {
    display: inline-block;
    padding: 0.75rem 1rem calc(0.75rem - 3px) 1rem;
    color: $color-grey;
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
    border-bottom: 4px solid transparent;
  }

  .active {
    border-color: $color-accent;
    color: $color-accent;
  }
}

.filters {
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;

  .filters-left {
    display: flex;
    gap: 1rem;
  }
}

.info {
  span {
    color: $color-black;
    font-size: 10px;
    font-style: italic;
    line-height: 20px;
  }

  hr {
    background-color: $color-accent-light;
    height: 2px;
    margin: 0;
    opacity: 1;
  }
}

.report {
  padding: 1rem 0;
  border-bottom: 2px solid $color-accent-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.subtitle {
  .author {
    font-size: 12px;
    font-style: italic;
    color: $color-black;
  }

  .date {
    color: $color-black;
    font-size: 12px;
    font-style: italic;
  }

  .separator {
    padding-left: 5px;
    padding-right: 5px;
    color: $color-medium-grey;
    font-size: 9px;
  }
}
</style>
