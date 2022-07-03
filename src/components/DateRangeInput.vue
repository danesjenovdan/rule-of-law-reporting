<template>
  <div class="date-range-input">
    <div data-type="date">
      <div class="formkit-wrapper">
        <label class="date-input-label">Začetek</label>
        <div class="formkit-inner">
          <input
            v-model="startDate"
            type="date"
            class="formkit-input"
            name="date-start"
            @change="onDateChange"
          />
        </div>
      </div>
    </div>
    <div data-type="date">
      <div class="formkit-wrapper">
        <label class="date-input-label">Konec</label>
        <div class="formkit-inner">
          <input
            v-model="endDate"
            type="date"
            class="formkit-input"
            name="date-end"
            @change="onDateChange"
          />
        </div>
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
  data() {
    return {
      startDate: '',
      endDate: '',
    };
  },
  methods: {
    onDateChange() {
      this.context.node.input({
        start: this.startDate,
        end: this.endDate,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.date-range-input {
  display: flex;
  gap: 1rem;

  .formkit-inner {
    width: 9.5em;
  }

  .date-input-label {
    font-style: italic;
    margin-bottom: 0.33em;
  }
}
</style>
