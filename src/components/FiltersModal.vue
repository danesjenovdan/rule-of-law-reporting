<template>
  <div class="filters-modal-bg">
    <div class="filters-modal">
      <!-- <div>Filtri</div> -->
      <button class="close-button" @click="$emit('close')">×</button>
      <div class="container">
        <FormKit
          v-model="formData"
          type="form"
          :form-class="'filters-form'"
          submit-label="Prikaži rezultate"
          @submit="submit"
        >
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
        </FormKit>
      </div>
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
  mounted() {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = '';
    }
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

.filters-modal-bg {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999999;
  background: rgba(0, 0, 0, 0.5);

  .filters-modal {
    position: relative;
    display: flex;
    max-width: 600px;
    max-height: 100%;
    background: $bg-color;

    @media (min-width: 992px) {
      margin: 0 auto;
      max-height: 90vh;
    }

    .close-button {
      position: absolute;
      top: 0.75rem;
      right: 1rem;
      width: 1.25em;
      height: 1.25em;
      padding: 0;
      margin: 0;
      background: $color-white;
      border: none;
      border-radius: 50%;
      font-size: 1.75rem;
      font-weight: 900;
      line-height: 1.25em;
      display: flex;
      align-items: center;
      justify-content: center;

      &:focus {
        box-shadow: 0 0 0 2px $color-accent;
      }
    }

    .container {
      padding: 1rem 3rem;
      overflow-y: auto;

      h4 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 1rem;
        margin-top: 2rem;
      }
    }
  }
}
</style>
