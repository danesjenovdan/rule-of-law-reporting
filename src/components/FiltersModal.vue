<template>
  <div class="filters-modal-bg">
    <div class="filters-modal">
      <button class="close-button" @click="$emit('close')">×</button>
      <div class="container">
        <div class="filters-modal-header">
          <h2>Filtri</h2>
        </div>
        <FormKit
          v-model="formData"
          type="form"
          :form-class="'filters-form'"
          submit-label="Prikaži rezultate"
          @submit="submit"
        >
          <FormKit
            ref="areaAndSubarea"
            type="contributiontypecheckbox"
            name="areaAndSubarea"
            label="Področje"
          />
          <FormKit
            type="daterangeinput"
            name="dateCreatedRange"
            label="Datum oddaje prispevka"
          />
          <FormKit
            type="daterangeinput"
            name="datePublishedRange"
            label="Datum objave vira"
          />
          <FormKit
            type="checkbox"
            name="showUserCreatedOnly"
            label="Prikaži zgolj moje prispevke"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['filter', 'close'],
  data() {
    return {
      formData: {},
      areas: [
        { value: '1', label: 'Pravosodni sistem', help: '' },
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
    submit(data) {
      this.$emit('filter', data);
      this.$emit('close');
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
      width: 600px;
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
      z-index: 1;

      &:focus {
        box-shadow: 0 0 0 2px $color-accent;
      }
    }

    .filters-modal-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;

      h2 {
        line-height: 2.1875rem;
        margin: 0.75rem 0;
        background: $bg-color;
      }
    }

    .container {
      margin-top: 3.6875rem;
      padding: 1rem 3rem;
      overflow-y: auto;
      background: $color-white;

      h4 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 1rem;
        margin-top: 2rem;
      }
    }
  }
}
</style>
