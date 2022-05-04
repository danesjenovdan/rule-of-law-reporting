<template>
  <header>
    <SmallHeader />
    <ToolsBar
      :contributionsNo="pageInfo.totalRows"
      :chosenNo="checkboxData.length"
      @close="showFiltersModal = true"
    />
  </header>
  <main v-if="contributions.length > 0">
    <!-- TODO: remove formData, as it is not working properly -->
    <FormKit v-model="formData" type="form" :actions="false">
      <FormKit
        type="checkbox"
        name="contributions"
        :options="sortedContributions"
        :wrapper-class="'contribution'"
      >
        <template #wrapper="context">
          <div class="formkit-wrapper contribution">
            <label
              ><div class="formkit-inner">
                <input
                  :id="context.option.attrs['id']"
                  v-model="checkboxData"
                  type="checkbox"
                  class="formkit-input"
                  name="contributions"
                  :value="context.option.value"
                />
                <span class="formkit-decorator" aria-hidden="true"></span>
                <span>{{ context.option.label }}</span>
              </div>
            </label>
            <!-- arrows to the right -->
            <!-- <div class="contribution-inner">
              <router-link
                :to="{
                  name: 'contribution',
                  params: { id: context.option.value },
                }"
              >
                <span class="arrow-right-icon"></span>
              </router-link>
            </div> -->
          </div>
        </template>
      </FormKit>
    </FormKit>
    <!-- HOLDS ids {{ checkboxData }} -->
    <!-- DOESNT WORK {{ formData }} -->
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
      checkboxData: [],
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

.arrow-right-icon {
  width: 8px;
  height: 13px;
}
</style>
