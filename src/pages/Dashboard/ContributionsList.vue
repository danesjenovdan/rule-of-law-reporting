<template>
  <header>
    <SmallHeader />
    <PillButtonNav />
    <div class="tools">
      <span>{{ pageInfo.totalRows }} prispevkov</span>
      <div class="filters">
        <div class="filter" @click="showFiltersModal = true">
          <div class="filter-icon"></div>
          Filtiraj prikaz
        </div>
        <div class="search">
          <div class="search-icon"></div>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div>
      <div
        v-for="contribution in sortedContributions"
        :key="contribution.id"
        class="contribution"
        @click="
          $router.push({
            name: 'contribution',
            params: { id: contribution.id },
          })
        "
      >
        <span>{{ contribution['Ime prispevka'] }}</span>
        <span class="arrow-right-icon"></span>
      </div>
    </div>
  </main>
  <footer>
    <div class="buttons">
      <FormKit
        type="button"
        @click="$router.push({ name: 'new-contribution' })"
      >
        Želim dodati nov prispevek
      </FormKit>
    </div>
  </footer>
  <FiltersModal v-if="showFiltersModal" @close="showFiltersModal = false" />
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';
import FiltersModal from '../../components/FiltersModal.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
    FiltersModal,
  },
  data() {
    return {
      contributions: [],
      pageInfo: {},
      showFiltersModal: false,
    };
  },
  computed: {
    sortedContributions() {
      return [...this.contributions]?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
  },
  mounted() {
    this.fetchContributions();
  },
  methods: {
    async fetchContributions() {
      const response = await getContributions();
      this.contributions = response.data.list;
      this.pageInfo = response.data.pageInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.tools {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 1rem 0 0.75rem 0;
  span {
    font-size: 10px;
    font-style: italic;
    padding-bottom: 4px;
  }
}

.filters {
  display: flex;
  align-items: center;
  .filter {
    display: flex;
    align-items: center;
    margin-right: 10px;
    border-radius: 3px;
    background-color: $color-orange;
    padding: 4px 6px;
    font-size: 10px;
    .filter-icon {
      width: 11px;
      height: 13px;
      margin-right: 5px;
    }
  }
  .search {
    border-radius: 3px;
    background-color: $color-orange;
    padding: 5px;
    .search-icon {
      width: 11px;
      height: 13px;
    }
  }
}

.contribution {
  font-size: 12px;
  font-weight: 600;
  padding: 20px 0;
  border-bottom: 1px solid $color-accent-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow-right-icon {
  width: 8px;
  height: 13px;
}
</style>
