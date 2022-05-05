<template>
  <header>
    <SmallHeader />
    <PillButtonNav />
  </header>
  <main>
    <div class="tabs">
      <div
        :class="{ active: filterReportType == 'ec' }"
        @click="filterReportType = 'ec'"
      >
        Evropska komisija
      </div>
      <div
        :class="{ active: filterReportType == 'other' }"
        @click="filterReportType = 'other'"
      >
        Drugo
      </div>
    </div>
    <div class="filters">
      <!-- TODO: style forms -->
      <FormKit
        v-model="filterAuthors"
        type="select"
        placeholder="Vsi avtorji poročil / odzivov"
        :options="[]"
        @click.stop=""
      >
      </FormKit>
      <FormKit
        v-model="filterYear"
        type="select"
        placeholder="Vsa leta"
        :options="years"
        @click.stop=""
      >
      </FormKit>
    </div>
    <div class="info">
      <span>{{ reports?.length }} prispevkov</span>
      <hr />
    </div>
    <div>
      <div v-for="report in reports" :key="report.id" class="report">
        <div>
          <div class="title">{{ report['Ime poročila ali odziva'] }}</div>
          <div class="subtitle">
            <!-- TODO: zamenjaj za avtor polje, ko bo dodano v nocodb -->
            <span class="author">{{ report['Tip poročila'] }}</span
            ><span class="separator">|</span
            ><span class="date">{{
              formatDate(report['Datum oddaje ali objave poročila ali odziva'])
            }}</span>
          </div>
        </div>
        <a :href="report['Link do poročila ali odziva']" target="_blank">
          <div class="open-new-page-icon"></div>
        </a>
      </div>
    </div>
  </main>
  <footer>
    <div class="buttons">
      <FormKit type="button" @click="$router.push({ name: 'new-report' })">
        Želim dodati poročilo / odziv
      </FormKit>
    </div>
  </footer>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';

import { getReports } from '../../helpers/api.js';
import { formatDate } from '../../helpers/format-time.js';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
  },
  data() {
    return {
      reports: [],
      filterReportType: 'ec',
      filterAuthors: null,
      filterYear: null,
    };
  },
  computed: {
    authors() {
      // s = Set();
      // for (let r of this.reports) {
      //   s.add(r.author);
      // }
      // return Array.from(s);
      return [];
    },
    years() {
      const s = new Set();
      this.reports.forEach((r) => {
        s.add(r.Leto);
      });
      return Array.from(s);
    },
  },
  mounted() {
    this.fetchReports();
    // TODO: fetch authors and years for filters ?
  },
  methods: {
    formatDate,
    async fetchReports() {
      const response = await getReports();
      this.reports = response.data.list;
      // this.pageInfo = response.data.pageInfo;
      // const entries = response.data.list.map((item) => ({
      //   value: item.id,
      //   label: item['Ime prispevka'],
      // }));
      // this.contributions = [
      //   {
      //     value: '0',
      //     label: '---',
      //     attrs: { disabled: true },
      //   },
      //   ...entries,
      // ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.tabs {
  box-shadow: 0 0 4px 1px $color-accent-super-light;
  border-radius: 3px;
  border: 1px solid $color-white;
  background-color: $color-white;
  margin-left: -1.6667rem;
  margin-right: -1.6667rem;
  padding-left: 1.6667rem;
  padding-right: 1.6667rem;
  div {
    display: inline-block;
    padding: 1rem;
    color: $color-grey;
    font-size: 10px;
    font-weight: 900;
  }
  .active {
    border-bottom: 4px solid $color-accent;
    color: $color-accent;
  }
}

.filters {
  margin: 2rem 0;
  display: flex;
}

.info {
  span {
    color: $color-black;
    font-size: 8px;
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
  font-size: 12px;
  font-weight: 600;
}

.subtitle {
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
}
</style>
