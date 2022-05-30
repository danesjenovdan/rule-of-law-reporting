<template>
  <header>
    <DesktopHeader v-if="isDesktop.value" />
    <SmallHeader v-if="!isDesktop.value" />
    <BackArrow text="Nazaj na seznam poročil" :to="{ name: 'reports' }" />
  </header>
  <div class="container">
    <main>
      <div>
        <div class="lead-in-text">
          <div class="lead">Novo poročilo</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <hr />
        <FormKit
          v-model="formData"
          type="form"
          submit-label="Oddaj poročilo / odziv"
          @submit="submit"
        >
          <FormKit
            type="select"
            name="Tip poročila"
            label="Vrsta poročila / odziva"
            :options="[
              'proročilo / odziv je pripravila civilna družba',
              'poročilo / odziv je pripravila institucija, kateri se poroča',
              'poročilo / odziv je pripravila vlada',
            ]"
          />
          <FormKit
            type="text"
            name="Ime poročila ali odziva"
            label="Naslov poročila / odziva"
          />
          <FormKit type="text" name="name" label="Avtor poročila / odziva" />
          <FormKit
            type="date"
            name="Datum oddaje ali objave poročila ali odziva"
            label="Datum objave poročila / odziva"
          />
          <FormKit
            type="text"
            name="Link do poročila ali odziva"
            label="Povezava do poročila / odziva"
          />
          <FormKit
            type="file"
            name="Dokument poročila ali odziva"
            label="Dokumenti, povezani z virom"
          />
        </FormKit>
      </div>
    </main>
  </div>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import BackArrow from '../../components/Header/BackArrow.vue';
// import { getContributions, getEvents, postEvent } from '../../helpers/api.js';

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
      formData: {},
    };
  },
  mounted() {},
  methods: {
    async submit() {
      // async submit(data, node) {
      // try {
      //   const response = await postEvent(data);
      //   node.reset();
      //   this.lastSubmittedId = response.data.id;
      //   this.submitted = true;
      // } catch (error) {
      //   const errorMessage = error.response?.data?.msg || error.message;
      //   node.setErrors([errorMessage]);
      // }
    },
    reset() {
      // this.submitted = false;
      // this.lastSubmittedId = 0;
      // const selectedContributionId = Number(this.$route.query.contribution);
      // if (selectedContributionId) {
      //   this.formData.nc_0zwf__prispevek_id = selectedContributionId;
      // }
    },
  },
};
</script>
