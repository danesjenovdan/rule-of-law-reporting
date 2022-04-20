<template>
  <div>
    <div class="lead-in-text">
      <div class="lead">Nov prispevek</div>
      <div>
        Pred oddajo novega prispevka na seznamu vseh prispevkov preveri, če ta
        prispevek res še ne obstaja.
      </div>
    </div>
    <hr />
    <template v-if="!submitted">
      <FormKit
        v-model="formData"
        type="form"
        submit-label="Oddaj prispevek"
        @submit="submit"
      >
        <FormKit
          type="select"
          name="nc_0zwf__področja_id"
          label="Področje"
          :options="areas"
          :help="selectedArea?.help"
          validation="required|not:0"
        />
        <template v-if="formData.nc_0zwf__področja_id === '4'">
          <FormKit
            type="select"
            name="Če ste izbrali druga, na katerem področju"
            label="Če ste izbrali druga, na katerem področju"
            :options="otherAreas"
          />
        </template>
        <hr />
        <FormKit
          type="text"
          name="Ime prispevka"
          label="Ime prispevka"
          validation="required"
        />
        <hr />
        <FormKit
          type="textarea"
          name="O področju prispevka"
          label="O področju prispevka"
          validation="required"
        />
        <hr />
      </FormKit>
    </template>
    <template v-else>
      <div>Prispevek oddan</div>
      <FormKit type="button" @click="reset">dodaj še enega</FormKit>
      <FormKit
        type="button"
        @click="$router.push(`/dashboard/new-event?report=${lastSubmittedId}`)"
      >
        dodaj povezan dogodek
      </FormKit>
    </template>
  </div>
</template>

<script>
import { getAreas, postReport } from '../helpers/api.js';

export default {
  data() {
    return {
      areas: [],
      otherAreas: [
        'azil in migracije',
        'sistemske kršitve človekovih pravic',
        'prostor civilne družbe',
        'lgbtqi+',
        'manjšine',
        'Drugo.',
      ],
      formData: {
        nc_0zwf__področja_id: '0',
        'Če ste izbrali druga, na katerem področju': '',
        'Ime prispevka': '',
        'O področju prispevka ': '',
      },
      submitted: false,
      lastSubmittedId: 0,
    };
  },
  computed: {
    selectedArea() {
      const selectedId = this.formData.nc_0zwf__področja_id;
      return this.areas.find((e) => String(e.value) === selectedId);
    },
  },
  async mounted() {
    const response = await getAreas();
    const entries = response.data.map((item) => ({
      value: item.id,
      label: item['Ime področja'],
      help: item['Opis področja'],
    }));
    this.areas = [
      {
        value: '0',
        label: '---',
        attrs: { disabled: true },
      },
      ...entries,
    ];
  },
  methods: {
    async submit(data, node) {
      try {
        const response = await postReport(data);
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
    },
  },
};
</script>
