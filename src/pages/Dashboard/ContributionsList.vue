<template>
  <header>
    <SmallHeader />
    <PillButtonNav />
    <h2>Seznam vseh prispevkov</h2>
    <div style="margin: 1rem 0">TODO: filtri</div>
  </header>
  <main>
    <div>
      <div>
        {{ pageInfo }}
        <div
          v-for="contribution in contributions"
          :key="contribution.id"
          style="font-size: 25px"
        >
          {{ contribution['Ime prispevka'] }}
        </div>
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
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';
import { getContributions } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
  },
  data() {
    return {
      contributions: [],
      pageInfo: {},
    };
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
