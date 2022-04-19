<template>
  <div>
    <h2>Nov vir</h2>
    <template v-if="!submitted">
      <FormKit v-model="formData" type="form" @submit="submit">
        <FormKit
          type="select"
          name="related_dogodek_id"
          label="Dogodek"
          :options="events"
          validation="required|not:0"
        />
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
        /> </FormKit
    ></template>
    <template v-else>
      <div>Vir oddan</div>
      <FormKit type="button" @click="reset">dodaj še enega</FormKit>
    </template>
  </div>
</template>

<script>
import { getEvents, postSource } from '../helpers/api.js';

export default {
  data() {
    return {
      events: [],
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
        related_dogodek_id: '0',
        'Tip vira': 'Sodna praksa',
        'Avtor vira (oseba, organizacija, medij)': '',
        'Datum objave vira': '',
        'Povezava do vira': '',
        'Dokumenti povezani z virom': [],
        'Datum začetka obdobja': '',
        'Datum konca obdobja': '',
      },
      submitted: false,
      lastSubmittedId: 0,
    };
  },
  mounted() {
    const selectedEventId = Number(this.$route.query.event) || undefined;
    this.fetchEvents(selectedEventId);
  },
  methods: {
    async fetchEvents(selectedEventId) {
      const response = await getEvents();
      const entries = response.data.map((item) => ({
        value: item.id,
        label: item['Naslov dogodka'],
      }));
      this.events = [
        {
          value: '0',
          label: '---',
        },
        ...entries,
      ];
      if (selectedEventId) {
        this.formData.related_dogodek_id = selectedEventId;
      }
    },
    async submit(data, node) {
      try {
        const response = await postSource(data);
        node.reset();
        this.lastSubmittedId = response.data.id;
        this.submitted = true;
      } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message;
        node.setErrors([errorMessage]);
      }
    },
    reset() {
      this.submitted = false;
      this.lastSubmittedId = 0;

      const selectedEventId = Number(this.$route.query.event) || undefined;
      if (selectedEventId) {
        this.formData.related_dogodek_id = selectedEventId;
      }
    },
  },
};
</script>
