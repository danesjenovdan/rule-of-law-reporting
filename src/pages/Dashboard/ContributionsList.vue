<template>
  <header>
    <DesktopHeader v-if="isDesktop.value" />
    <DesktopToolsList v-if="isDesktop.value" @close="showFiltersModal = true" />
    <SmallHeader v-if="!isDesktop.value" />
    <PillButtonNav v-if="!isDesktop.value" />
    <ToolsBar v-if="!isDesktop.value" @close="showFiltersModal = true" />
    <HeaderLine :contributions-no="pageInfo.totalRows" />
  </header>
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
  </div>
  <FiltersModal v-if="showFiltersModal" @close="showFiltersModal = false" />
</template>

<script>
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
    // get data
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

.contribution {
  font-size: 12px;
  font-weight: 600;
  padding: 20px 0;
  border-bottom: 2px solid $color-accent-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-black;
  text-decoration: none;
}

.arrow-right-icon {
  width: 8px;
  height: 13px;
}

@media (min-width: 992px) {
  footer {
    padding-bottom: 20px;
  }
  footer .buttons {
    display: none;
  }
}
</style>
