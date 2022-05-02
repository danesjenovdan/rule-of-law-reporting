<template>
  <header>
    <SmallHeader />
    <div class="tools">
      <span>{{ pageInfo.totalRows }} prispevkov</span>
      <span>Število izbranih: {{ formData.contributions?.length }}</span>
    </div>
  </header>
  <main v-if="contributions.length > 0">
    <FormKit v-model="formData" type="form" :actions="false">
      <FormKit
        type="checkbox"
        name="contributions"
        :options="contributions"
        :wrapper-class="'contribution'"
      >
        <template #label="context">
          <div class="contribution-inner">
            <span>{{ context.option.label }}</span>
            <!-- TODO: for some reason ne dobi .value ven?? -->
            <span
              v-if="context.option?.value"
              class="arrow-right-icon"
              @click.stop="
                $router.push({
                  name: 'contribution',
                  params: { id: String(context.option.value) },
                })
              "
            ></span>
          </div>
        </template>
      </FormKit>
    </FormKit>
    {{ formData }}
  </main>
  <footer>
    <div class="buttons">
      <FormKit type="button"> Izvozi prispevke </FormKit>
    </div>
  </footer>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
  },
  data() {
    return {
      contributions: [],
      formData: {},
      pageInfo: {},
      showFiltersModal: false,
    };
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
      }));
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
