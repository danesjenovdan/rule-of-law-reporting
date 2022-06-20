<template>
  <header>
    <DesktopHeader v-if="isDesktop" />
    <DesktopToolsList
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
  <div v-if="loading" class="spinner-container">
    <div class="spinner"></div>
  </div>
  <template v-else>
    <div class="container">
      <main>
        <div>
          <router-link
            v-for="contribution in sortedContributions"
            :key="contribution.id"
            class="contribution"
            :to="{ name: 'contribution', params: { id: contribution.id } }"
          >
            <span>{{ contribution['Ime prispevka'] }}</span>
            <span class="arrow-right-icon"></span>
          </router-link>
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
    <FiltersModal v-if="showFiltersModal" @close="showFiltersModal = false" />
  </template>
</template>

<script>
import { debounce } from 'lodash-es';
import SmallHeader from '../../components/Header/SmallHeader.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import DesktopToolsList from '../../components/Header/DesktopToolsList.vue';
import HeaderLine from '../../components/Header/HeaderLine.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';
import FiltersModal from '../../components/FiltersModal.vue';
import ToolsBar from '../../components/Header/ToolsBar.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    DesktopHeader,
    DesktopToolsList,
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
    onSearch(query) {
      this.loading = true;
      this.debouncedSearchContributions(query);
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
