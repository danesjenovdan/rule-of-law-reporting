<template>
  <header>
    <DesktopHeader v-if="isDesktop" />
    <DesktopTools
      v-if="isDesktop"
      @open-filters="showFiltersModal = true"
      @search="onSearch"
    />
    <SmallHeader v-if="!isDesktop" />
    <PillButtonNav v-if="!isDesktop" />
    <ToolsBar
      v-if="!isDesktop"
      @open-filters="showFiltersModal = true"
      @search="onSearch"
    />
    <HeaderLine v-if="!loading" :contributions-no="pageInfo.totalRows" />
  </header>
  <div class="container">
    <main>
      <div v-if="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>
      <div v-else>
        <RouterLink
          v-for="contribution in sortedContributions"
          :key="contribution.id"
          class="contribution"
          :to="{ name: 'contribution', params: { id: contribution.id } }"
        >
          <span>{{ contribution['Ime prispevka'] }}</span>
          <span class="arrow-right-icon"></span>
        </RouterLink>
      </div>
    </main>
  </div>
  <footer>
    <div class="container">
      <div class="buttons">
        <FormKit
          type="button"
          @click="$router.push({ name: 'new-contribution' })"
        >
          Želim dodati nov prispevek
        </FormKit>
      </div>
    </div>
  </footer>
  <DesktopFooter v-if="isDesktop" />
  <FiltersModal
    v-if="showFiltersModal"
    @filter="onFiltersSelected"
    @close="showFiltersModal = false"
  />
</template>

<script>
import { debounce } from 'lodash-es';
import SmallHeader from '../../components/Header/SmallHeader.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import DesktopFooter from '../../components/Header/DesktopFooter.vue';
import DesktopTools from '../../components/Header/DesktopTools.vue';
import HeaderLine from '../../components/Header/HeaderLine.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';
import FiltersModal from '../../components/FiltersModal.vue';
import ToolsBar from '../../components/Header/ToolsBar.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    DesktopHeader,
    DesktopFooter,
    DesktopTools,
    PillButtonNav,
    FiltersModal,
    ToolsBar,
    HeaderLine,
  },
  inject: {
    isDesktop: {
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      contributions: [],
      pageInfo: {},
      showFiltersModal: false,
      selectedFilters: {},
    };
  },
  computed: {
    sortedContributions() {
      return [...this.contributions]?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
  },
  async mounted() {
    await this.fetchContributions();
    this.loading = false;
  },
  methods: {
    async fetchContributions() {
      const response = await getContributions('id,Ime prispevka');
      this.contributions = response.data.list;
      this.pageInfo = response.data.pageInfo;
    },
    debouncedSearchContributions: debounce(async function d(query) {
      const response = await getContributions('id,Ime prispevka', query);
      this.contributions = response.data.list;
      this.pageInfo = response.data.pageInfo;
      this.loading = false;
    }, 500),
    async fetchFilteredContributions() {
      const filters = {};
      if (this.selectedFilters?.areaAndSubarea) {
        const { area, subarea } = this.selectedFilters.areaAndSubarea;
        filters.or = {};
        if (area?.length) {
          filters.or['nc_0zwf__področja_id'] = {
            op: 'in',
            value: area.join(','),
          };
        }
        if (subarea?.length) {
          filters.or['Če ste izbrali druga, na katerem področju'] = {
            op: 'in',
            value: subarea.join(','),
          };
        }
      }

      if (this.selectedFilters?.dateCreatedRange) {
        const { start, end } = this.selectedFilters.dateCreatedRange;
        if (start && end) {
          filters.created_at = {
            op: 'btw',
            value: `${start},${end}`,
          };
        } else if (start) {
          filters.created_at = {
            op: 'ge',
            value: start,
          };
        } else if (end) {
          filters.created_at = {
            op: 'le',
            value: end,
          };
        }
      }

      // if (this.selectedFilters?.datePublishedRange) {
      //   // TODO
      // }

      const response = await getContributions(
        'id,Ime prispevka',
        null, // query
        true,
        filters,
        this.selectedFilters?.showUserCreatedOnly
      );
      this.contributions = response.data.list;
      this.pageInfo = response.data.pageInfo;
      this.loading = false;
    },
    onSearch(query) {
      this.loading = true;
      this.debouncedSearchContributions(query);
    },
    onFiltersSelected(filters) {
      this.selectedFilters = filters;
      this.loading = true;
      this.fetchFilteredContributions();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.contribution {
  font-size: 14px;
  font-weight: 600;
  padding: 20px 0;
  border-bottom: 1px solid $color-accent-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-black;
  text-decoration: none;

  &:last-child {
    border-bottom: 0;
  }
}

.arrow-right-icon {
  width: 8px;
  height: 13px;
}
</style>
