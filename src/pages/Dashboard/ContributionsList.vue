<template>
  <header>
    <SmallHeader />
    <PillButtonNav />
    <ToolsBar
      :contributionsNo="pageInfo.totalRows"
      @close="showFiltersModal = true"
    />
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
import ToolsBar from '../../components/Header/ToolsBar.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
    FiltersModal,
    ToolsBar,
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
