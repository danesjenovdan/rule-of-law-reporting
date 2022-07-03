<template>
  <div class="contribution-type-checkbox">
    <div data-type="checkbox">
      <ul class="formkit-options">
        <li v-for="area in areas" :key="area.value" class="formkit-option">
          <label class="formkit-wrapper">
            <div class="formkit-inner">
              <input
                v-model="areaCheckboxValue"
                type="checkbox"
                class="formkit-input"
                name="area-checkbox"
                :value="area.value"
                @change="onAreaCheckboxChange(area.value)"
              /><span class="formkit-decorator" aria-hidden="true" />
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
                  v-model="areaCheckboxValue"
                  type="checkbox"
                  class="formkit-input"
                  name="area-checkbox"
                  :value="area.value"
                  @change="onAreaCheckboxChange(area.value)"
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
      areaCheckboxValue: [],
    };
  },
  methods: {
    onAreaCheckboxChange(value) {
      const isSelected = this.areaCheckboxValue.includes(value);

      if (!Number(value)) {
        // one of other areas changed
        const otherAreaSelectedIndex = this.areaCheckboxValue.indexOf(
          this.areas[this.areas.length - 1].value
        );

        if (!isSelected && otherAreaSelectedIndex !== -1) {
          this.areaCheckboxValue.splice(otherAreaSelectedIndex, 1);
        } else {
          const subAreas = this.areaCheckboxValue.filter((o) => !Number(o));
          if (isSelected && subAreas.length === this.otherAreas.length) {
            this.areaCheckboxValue.push(
              this.areas[this.areas.length - 1].value
            );
          }
        }
      } else if (value === this.areas[this.areas.length - 1].value) {
        // top level other area changed
        const areas = this.areaCheckboxValue.filter((o) => Number(o));

        if (isSelected) {
          const allSubAreas = this.otherAreas.map((o) => o.value);
          this.areaCheckboxValue = [...areas, ...allSubAreas];
        } else {
          this.areaCheckboxValue = [...areas];
        }
      }

      const areas = this.areaCheckboxValue.filter((o) => Number(o));
      const subAreas = this.areaCheckboxValue.filter((o) => !Number(o));
      this.context.node.input({
        area: areas,
        subarea: subAreas,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.contribution-type-checkbox {
  .other-options-container {
    margin-left: 2rem;
    margin-top: 1.5rem;
  }
}
</style>
