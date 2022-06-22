<template>
  <header>
    <DesktopHeader v-if="isDesktop" />
    <SmallHeader v-if="!isDesktop" />
    <BackArrow
      text="Nazaj na seznam prispevkov"
      :to="{ name: 'contributions' }"
    />
  </header>
  <div class="container">
    <main>
      <div>
        <template v-if="!submitted">
          <div class="lead-in-text">
            <div class="lead">Dodaj dogodek</div>
            <div>
              Dodaj dogodek, ki je zaznamoval vladavino prava, nato pa dogodku
              dodaj enega ali več virov. Če gre za dva povezana dogodka, lahko
              to označiš na dnu obrazca.
            </div>
          </div>
          <hr />
          <FormKit
            v-model="formData"
            type="form"
            submit-label="Oddaj dogodek"
            @submit="submit"
          >
            <FormKit
              type="select"
              name="nc_0zwf__prispevek_id"
              label="Povezan prispevek"
              :options="contributions"
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
              label="Povezan dogodek"
              :options="events"
              help="Izberite samo, če ta dogodek posodobi drug dogodek."
            />
          </FormKit>
        </template>
        <template v-else>
          <div class="submitted-container">
            <div class="submitted-icon"></div>
            <div class="lead-in-text">
              <div class="lead">Hvala za oddajo!</div>
              <div>
                Tvoj dogodek bo viden takoj, ko bo odobren s strani
                administratorjev.
              </div>
            </div>
            <hr />
            <div class="strong-text">
              Se na ravno oddani dogodek navezuje kakšen vir, ki ga želiš
              dodati?
            </div>
            <FormKit
              type="button"
              @click="
                $router.push({
                  name: 'new-source',
                  query: { event: lastSubmittedId },
                })
              "
            >
              Dodaj povezan vir
            </FormKit>
            <hr />
            <div class="strong-text">Želiš dodati nov dogodek?</div>
            <FormKit type="button" outer-class="small-button" @click="reset">
              Dodaj povezan dogodek
            </FormKit>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import BackArrow from '../../components/Header/BackArrow.vue';
import { getContributions, getEvents, postEvent } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    DesktopHeader,
    BackArrow,
  },
  inject: {
    isDesktop: {
      default: false,
    },
  },
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
    // this.fetchEvents();
  },
  methods: {
    async fetchContributions(selectedContributionId) {
      const response = await getContributions('id,Ime prispevka');
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
      const response = await getEvents('id,Naslov dogodka', {
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
