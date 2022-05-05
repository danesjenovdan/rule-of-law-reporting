<template>
  <header>
    <SmallHeader />
    <ToolsBar
      :contributions-no="pageInfo.totalRows"
      :chosen-no="selectedContributionsCount"
      @close="showFiltersModal = true"
    />
  </header>
  <main v-if="contributions.length > 0" class="contributions-list">
    <FormKit v-model="formData" type="form" :actions="false">
      <FormKit
        type="checkbox"
        name="contributions"
        :options="sortedContributions"
        :wrapper-class="'contribution'"
      />
    </FormKit>
  </main>
  <footer>
    <div class="buttons">
      <FormKit type="button"> Izvozi prispevke </FormKit>
    </div>
  </footer>
  <FiltersModal v-if="showFiltersModal" @close="showFiltersModal = false" />
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import FiltersModal from '../../components/FiltersModal.vue';
import ToolsBar from '../../components/Header/ToolsBar.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    FiltersModal,
    ToolsBar,
  },
  data() {
    return {
      contributions: [],
      formData: {},
      pageInfo: {},
      showFiltersModal: false,
    };
  },
  computed: {
    selectedContributionsCount() {
      return this.formData?.contributions?.length || 0;
    },
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
      this.contributions = response.data.list.map((item) => ({
        value: item.id,
        label: item['Ime prispevka'],
        created_at: item.created_at,
      }));
      this.pageInfo = response.data.pageInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.contributions-list {
  :deep(.formkit-option) {
    margin-bottom: 0;
  }
}

.arrow-right-icon {
  width: 8px;
  height: 13px;
}
</style>
