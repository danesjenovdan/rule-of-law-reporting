<template>
  <div class="filters-modal">
    <div class="dashboard-page">
      <FormKit
        v-model="formData"
        type="form"
        :form-class="'filters-form'"
        submit-label="Prikaži rezultate"
        @submit="submit"
      >
        <header>
          <div>Filtri</div>
          <span @click="$emit('close')">x</span>
        </header>
        <div class="container">
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
            <FormKit
              type="text"
              name="created_at,le"
              label="Konec • opcijsko"
            />
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
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script>
import { filterContributions } from '../helpers/api.js';

export default {
  emits: ['close'],
  data() {
    return {
      formData: {},
      areas: [
        {
          value: '1',
          label: 'Pravosodni sistem',
          help: 'kartek opis za Pravosodni sistem',
        },
        { value: '2', label: 'Protikorupcijski sistem', help: '' },
        { value: '3', label: 'Pluralnost medijev', help: '' },
        {
          value: '4',
          label:
            'Druga institucionalna vprašanja povezana s sistemom zavor in ravnovesij',
          help: '',
        },
      ],
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
    cursor: pointer;
    position: absolute;
    right: 1.25rem;
    top: 1rem;
  }
}

main {
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

footer {
  background-color: $bg-color;
}

h6 {
  font-size: 10px;
  font-weight: 600;
}

/* dekstop */
@media (min-width: 992px) {
  .filters-modal {
    width: 560px;
    height: 80vh;
    margin: auto;
    overflow-y: scroll;
    box-shadow: 0 0 4px 1px #eeebf7;
    border-radius: 3px;
    border: 1px solid #ffffff;
  }
}
</style>
