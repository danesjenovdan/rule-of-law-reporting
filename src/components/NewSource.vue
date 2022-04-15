<template>
  <div>
    <h2>Nov vir</h2>
    <FormKit v-model="formData" type="form" @submit="submit">
      <FormKit
        type="select"
        name="Tip vira"
        label="Tip vira"
        :options="type"
        validation="required"
      />
      <FormKit
        type="text"
        name="Avtor vira (oseba, organizacija, medij)"
        label="Avtor vira (oseba, organizacija, medij)"
        validation="required"
      />
      <FormKit
        type="date"
        name="Datum objave vira"
        label="Datum objave vira"
        validation="required"
      />
      <FormKit
        type="date"
        name="Datum začetka obdobja"
        label="Datum začetka obdobja"
        validation="required"
      />
      <FormKit
        type="date"
        name="Datum konca obdobja"
        label="Datum konca obdobja"
        validation="required"
      />
      <FormKit
        type="url"
        name="Povezava do vira"
        label="Povezava do vira"
        validation="required"
      />
      <FormKit
        type="file"
        name="Dokumenti povezani z virom"
        label="Dokumenti povezani z virom"
        multiple
      />
    </FormKit>
  </div>
</template>

<script>
import { postSource } from '../helpers/api.js';

export default {
  data() {
    return {
      type: [
        'Sodna praksa',
        'Sprememba zakonodaje',
        'Nove prakse / sporne prakse',
        'Izjava v medijih ali na družbenih omrežjih',
        'Članek',
        'Objava poročila / analiza / študije',
        'Drugo',
      ],
      formData: {
        'Tip vira': 'Sodna praksa',
        'Avtor vira (oseba, organizacija, medij)': '',
        'Datum objave vira': '',
        'Povezava do vira': '',
        'Dokumenti povezani z virom': [],
        'Datum začetka obdobja': '',
        'Datum konca obdobja': '',
      },
    };
  },
  methods: {
    async submit(data, node) {
      try {
        await postSource(data);
        node.reset();
      } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message;
        node.setErrors([errorMessage]);
      }
    },
  },
};
</script>
