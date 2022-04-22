<template>
  <div>
    <div class="lead-in-text">
      <div class="lead">Nov dogodek</div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
        beatae expedita nostrum cumque quos!
      </div>
    </div>
    <hr />
    <template v-if="!submitted">
      <FormKit
        v-model="formData"
        type="form"
        submit-label="Oddaj dogodek"
        @submit="submit"
      >
        <FormKit
          type="select"
          name="nc_0zwf__prispevek_id"
          label="Prispevek"
          :options="contributions"
          validation="required|not:0"
        />
        <hr />
        <FormKit
          type="text"
          name="Naslov dogodka"
          label="Naslov dogodka"
          validation="required"
        />
        <hr />
        <FormKit
          type="textarea"
          name="Kaj se je zgodilo in kako vpliva na vladavino prava"
          label="Kaj se je zgodilo in kako vpliva na vladavino prava"
          validation="required"
        />
        <hr />
        <FormKit
          type="select"
          name="nc_0zwf__dogodek_id"
          label="Dogodek"
          :options="events"
          help="Izberite če ta dogodek posodobi drug dogodek."
        />
        <hr />
      </FormKit>
    </template>
    <template v-else>
      <div>Dogodek oddan</div>
      <FormKit type="button" @click="reset">dodaj še enega</FormKit>
      <FormKit
        type="button"
        @click="
          $router.push({
            name: 'new-source',
            query: { event: lastSubmittedId },
          })
        "
      >
        dodaj povezan vir
      </FormKit>
    </template>
  </div>
</template>

<script>
import { getContributions, getEvents, postEvent } from '../helpers/api.js';

export default {
  data() {
    return {
      contributions: [],
      events: [],
      formData: {
        nc_0zwf__prispevek_id: '0',
        'Naslov dogodka': '',
        'Kaj se je zgodilo in kako vpliva na vladavino prava': '',
        nc_0zwf__dogodek_id: '0',
      },
      submitted: false,
      lastSubmittedId: 0,
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
    const selectedContributionId = Number(this.$route.query.contribution);
    this.fetchContributions(selectedContributionId);
    this.fetchEvents();
  },
  methods: {
    async fetchContributions(selectedContributionId) {
      const response = await getContributions();
      const entries = response.data.list.map((item) => ({
        value: item.id,
        label: item['Ime prispevka'],
      }));
      this.contributions = [
        {
          value: '0',
          label: '---',
          attrs: { disabled: true },
        },
        ...entries,
      ];
      if (selectedContributionId) {
        this.formData.nc_0zwf__prispevek_id = selectedContributionId;
      }
    },
    async fetchEvents() {
      const response = await getEvents({
        nc_0zwf__prispevek_id: this.formData.nc_0zwf__prispevek_id,
      });
      const entries = response.data.list.map((item) => ({
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
        const response = await postEvent(data);
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

      const selectedContributionId = Number(this.$route.query.contribution);
      if (selectedContributionId) {
        this.formData.nc_0zwf__prispevek_id = selectedContributionId;
      }
    },
  },
};
</script>
