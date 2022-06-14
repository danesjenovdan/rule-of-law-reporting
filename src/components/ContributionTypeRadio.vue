<template>
  <div class="contribution-type-radio">
    <div class="info-button-container">
      <button @click.prevent="context.node.emit('modal-open')">?</button>
    </div>
    <div data-type="radio">
      <ul class="formkit-options">
        <li v-for="(area, i) in areas" :key="area.value" class="formkit-option">
          <label class="formkit-wrapper">
            <div class="formkit-inner">
              <input
                v-if="i !== areas.length - 1"
                v-model="areaRadioValue"
                type="radio"
                class="formkit-input"
                name="area-radio"
                :value="area.value"
              /><span
                :class="[
                  'formkit-decorator',
                  { 'no-radio-decorator': i === areas.length - 1 },
                ]"
                aria-hidden="true"
              />
            </div>
            <span class="formkit-label">{{ area.label }}</span>
          </label>
          <div v-if="area.help" class="formkit-option-help">
            {{ area.help }}
          </div>
        </li>
      </ul>
      <div class="other-options-container">
        <ul class="formkit-options">
          <li
            v-for="area in otherAreas"
            :key="area.value"
            class="formkit-option"
          >
            <label class="formkit-wrapper">
              <div class="formkit-inner">
                <input
                  v-model="areaRadioValue"
                  type="radio"
                  class="formkit-input"
                  name="area-radio"
                  :value="area.value"
                /><span class="formkit-decorator" aria-hidden="true" />
              </div>
              <span class="formkit-label">{{ area.label }}</span>
            </label>
            <div v-if="area.help" class="formkit-option-help">
              {{ area.help }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  emits: ['modal-open'],
  data() {
    return {
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
        { value: 'azil in migracije', label: 'azil in migracije', help: '' },
        {
          value: 'sistemske kršitve človekovih pravic',
          label: 'sistemske kršitve človekovih pravic',
          help: '',
        },
        {
          value: 'prostor civilne družbe',
          label: 'prostor civilne družbe',
          help: '',
        },
        { value: 'lgbtqi+', label: 'lgbtqi+', help: '' },
        { value: 'manjšine', label: 'manjšine', help: '' },
        { value: 'Drugo.', label: 'Drugo.', help: '' },
      ],
      areaRadioValue: '',
    };
  },
  computed: {
    allAreas() {
      return [...this.areas, ...this.otherAreas];
    },
  },
  watch: {
    areaRadioValue(newVal) {
      if (Number(newVal)) {
        // main area selected
        this.context.node.input({ area: newVal, subarea: undefined });
      } else {
        // other subarea selected
        this.context.node.input({
          area: this.areas[this.areas.length - 1].value,
          subarea: newVal,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.contribution-type-radio {
  margin-left: -1.35rem;

  .info-button-container {
    float: right;
  }

  .no-radio-decorator {
    display: block;
    width: 1rem;
    height: 1rem;
    margin-left: 0.15rem;
    margin-right: 0.75rem;
  }

  .other-options-container {
    margin-left: 2rem;
    margin-top: 1.5rem;
  }
}
</style>
