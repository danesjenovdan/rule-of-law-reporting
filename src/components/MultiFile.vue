<template>
  <div class="multi-file-button-container">
    <input type="file" multiple @input="handleFileInput" />
    <div data-type="button" class="small-button">
      <button type="button" class="formkit-input" tabindex="-1">
        Naloži dokument
      </button>
    </div>
  </div>
  <table class="multi-file-list">
    <colgroup>
      <col />
      <col class="remove-col" />
    </colgroup>
    <tr>
      <th colspan="2">
        <template v-if="!context.node._value?.length">
          {{ context.node.t('noFiles') }}
        </template>
        <template v-else>Naloženi dokumenti</template>
      </th>
    </tr>
    <tr v-for="(file, i) in context.node._value" :key="i">
      <td>{{ file.name }}</td>
      <td>
        <button type="button" class="remove-button" @click="removeFile(i)">
          {{ context.node.t('remove') }}
        </button>
      </td>
    </tr>
  </table>
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
      files: [],
    };
  },
  methods: {
    handleFileInput(event) {
      const files = event?.target?.files || [];
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (file) {
          this.files.push({
            name: file.name,
            file,
          });
        }
      }
      this.context.node.input(this.files);
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    },
    removeFile(index) {
      this.files.splice(index, 1);
      this.context.node.input(this.files);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.multi-file-button-container {
  position: relative;

  input[type='file'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    inset: 0;
    cursor: pointer;
    z-index: 2;
    color: transparent;
    outline: none;

    &::file-selector-button {
      appearance: none;
      font-size: 0;
      padding: 0;
      border: 0;
    }
  }

  .small-button button {
    background-image: url('../assets/icons/plus.svg');
    background-size: 0.85em 1em;
  }

  &:focus-within .small-button button {
    box-shadow: 0 0 0 2px $color-accent;
  }
}

.multi-file-list {
  margin: 1rem 0 0 0;
  width: 100%;
  table-layout: fixed;

  th,
  td {
    padding: 0.5em 0;
    border-bottom: 1px solid $color-light-grey;
    font-size: 0.833334rem;
    font-weight: 400;
  }

  th {
    font-style: italic;
    color: $color-grey;
  }

  td:last-of-type {
    text-align: right;
  }

  .remove-col {
    width: 60px;
  }

  .remove-button {
    background: $color-white;
    box-shadow: 0 0 0 1px $color-light-grey;
    border: none;
    border-radius: 2px;
    outline: none;
    font-size: 0.9em;

    &:focus {
      box-shadow: 0 0 0 2px $color-accent;
    }
  }
}
</style>
