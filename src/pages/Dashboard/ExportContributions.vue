<template>
  <header>
    <DesktopHeader v-if="isDesktop.value" />
    <DesktopToolsExport v-if="isDesktop.value" />
    <SmallHeader v-if="!isDesktop.value" />
    <ToolsBar v-if="!isDesktop.value" @close="showFiltersModal = true" />
    <HeaderLine
      :contributions-no="pageInfo.totalRows"
      :chosen-no="selectedContributionsCount"
    />
  </header>
  <div class="container">
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
  </div>
  <div class="container">
    <footer>
      <div class="buttons">
        <FormKit type="button"> Izvozi prispevke </FormKit>
      </div>
    </footer>
  </div>
  <FiltersModal v-if="showFiltersModal" @close="showFiltersModal = false" />
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import DesktopToolsExport from '../../components/Header/DesktopToolsExport.vue';
import HeaderLine from '../../components/Header/HeaderLine.vue';
import FiltersModal from '../../components/FiltersModal.vue';
import ToolsBar from '../../components/Header/ToolsBar.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    DesktopHeader,
    DesktopToolsExport,
    HeaderLine,
    FiltersModal,
    ToolsBar,
  },
  inject: {
    isDesktop: {
      default: false,
    },
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
