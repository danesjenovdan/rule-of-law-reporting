<template>
  <div class="filters-modal page-container">
    <div class="dashboard-page">
      <FormKit
        v-model="formData"
        type="form"
        submit-label="Prikaži rezultate"
        @submit="submit"
      >
        <header>
          <div>Filtri</div>
          <span @click="$emit('close')">x</span>
        </header>
        <main>
          <h6>Področje</h6>
          <FormKit
            type="checkbox"
            name="nc_0zwf__področja_id"
            :options="areas"
          />
          <FormKit
            type="checkbox"
            name="'Če ste izbrali druga, na katerem področju'"
            :options="otherAreas"
          />
          <hr />
          <h6>Datum oddaje prispevka</h6>
          <FormKit
            type="text"
            name="created_at,gt"
            label="Začetek • opcijsko"
          />
          <FormKit type="text" name="created_at,le" label="Konec • opcijsko" />
          <hr />
          <h6>Datum objave vira</h6>
          <!-- TODO: set correct names to use in filtering query -->
          <FormKit type="text" name="" label="Začetek • opcijsko" />
          <FormKit type="text" name="" label="Konec • opcijsko" />
          <hr />
          <!-- TODO: set correct name to use in filtering query -->
          <FormKit
            type="checkbox"
            name="user"
            label="Prikaži zgolj moje prispevke"
          />
        </main>
      </FormKit>
    </div>
  </div>
</template>

<script>
import { getAreas, filterContributions } from '../helpers/api.js';

export default {
  emits: ['close'],
  data() {
    return {
      formData: {},
      areas: [],
      otherAreas: [
        'azil in migracije',
        'sistemske kršitve človekovih pravic',
        'prostor civilne družbe',
        'lgbtqi+',
        'manjšine',
        'Drugo.',
      ],
    };
  },
  computed: {},
  async mounted() {
    const response = await getAreas();
    this.areas = response.data.list.map((item) => ({
      value: item.id,
      label: item['Ime področja'],
      // help: item['Opis področja'],
    }));
  },
  methods: {
    async submit(data, node) {
      try {
        // const response = await filterContributions(data);
        await filterContributions(data);
        this.$emit('close');
      } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message;
        node.setErrors([errorMessage]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.filters-modal {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

header {
  background-color: $bg-color;
  text-align: center;
  padding: 1rem 0;
  position: relative;
  span {
    position: absolute;
    right: 1.25rem;
    top: 1rem;
  }
}

main {
  background-color: white;
}

footer {
  background-color: $bg-color;
}

h6 {
  font-size: 10px;
  font-weight: 600;
}
</style>
