<template>
  <div>
    <h2>Nov dogodek</h2>
    <FormKit v-model="formData" type="form" @submit="submit">
      <FormKit
        type="select"
        name="nc_0zwf__prispevek_id"
        label="Prispevek"
        :options="reports"
        validation="required|not:0"
      />
      <FormKit
        type="text"
        name="Naslov dogodka"
        label="Naslov dogodka"
        validation="required"
      />
      <FormKit
        type="textarea"
        name="Kaj se je zgodilo in kako vpliva na vladavino prava"
        label="Kaj se je zgodilo in kako vpliva na vladavino prava"
        validation="required"
      />
      <FormKit
        type="select"
        name="nc_0zwf__dogodek_id"
        label="Dogodek"
        :options="events"
        help="Izberite če ta dogodek posodobi drug dogodek."
      />
    </FormKit>
  </div>
</template>

<script>
import { getEvents, getReports, postEvent } from '../helpers/api.js';

export default {
  data() {
    return {
      reports: [],
      events: [],
      formData: {
        nc_0zwf__prispevek_id: '0',
        'Naslov dogodka': '',
        'Kaj se je zgodilo in kako vpliva na vladavino prava': '',
        nc_0zwf__dogodek_id: '0',
      },
    };
  },
  watch: {
    'formData.nc_0zwf__prispevek_id': {
      handler() {
        this.fetchEvents();
      },
    },
  },
  mounted() {
    this.fetchReports();
    this.fetchEvents();
  },
  methods: {
    async fetchReports() {
      const response = await getReports();
      const entries = response.data.map((item) => ({
        value: item.id,
        label: item['Ime prispevka'],
      }));
      this.reports = [
        {
          value: '0',
          label: '---',
          attrs: { disabled: true },
        },
        ...entries,
      ];
    },
    async fetchEvents() {
      const response = await getEvents({
        nc_0zwf__prispevek_id: this.formData.nc_0zwf__prispevek_id,
      });
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
    },
    async submit(data, node) {
      try {
        await postEvent(data);
        node.reset();
      } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message;
        node.setErrors([errorMessage]);
      }
    },
  },
};
</script>
