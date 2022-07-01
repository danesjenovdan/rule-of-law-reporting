<template>
  <header>
    <DesktopHeader v-if="isDesktop" />
    <SmallHeader v-if="!isDesktop" />
    <BackArrow text="Nazaj na seznam poročil" :to="{ name: 'reports' }" />
  </header>
  <div class="container">
    <main>
      <div>
        <template v-if="!submitted">
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
              name="Na kateri poročevalski mehanizem se nanaša poročilo ali odziv"
              label="Na kateri poročevalski mehanizem se nanaša poročilo ali odziv"
              :options="[
                {
                  value: '0',
                  label: '---',
                  attrs: { disabled: true },
                },
                'Poročilo Evropska komisija o stanju vladavine prava',
                'drugo',
              ]"
              validation="required|not:0"
            />
            <FormKit
              type="select"
              name="Poročilo je pripravila"
              label="Poročilo je pripravila"
              :options="[
                {
                  value: '0',
                  label: '---',
                  attrs: { disabled: true },
                },
                {
                  value: 'civilna družba',
                  label: 'civilna družba',
                },
                {
                  value: 'institucija，kateri se poroča',
                  label: 'institucija, kateri se poroča',
                },
                {
                  value: 'vlada',
                  label: 'vlada',
                },
              ]"
              validation="required|not:0"
            />
            <FormKit
              type="text"
              name="Ime poročila ali odziva"
              label="Naslov poročila ali odziva"
              help="Naslov poročila naj vključuje organizacijo, ki poroča, in mehanizem, kateremu se poroča. Primer: Prispevki slovenskih NVO za poročilo Evropske komisije o vladavini prava."
              validation="required"
            />
            <FormKit
              type="text"
              name="Avtor poročila"
              label="Avtor poročila"
              validation="required"
            />
            <FormKit
              type="date"
              name="Datum oddaje ali objave poročila ali odziva"
              label="Datum oddaje ali objave poročila ali odziva"
              validation="required"
            />
            <FormKit
              type="text"
              name="Link do poročila ali odziva"
              label="Link do poročila ali odziva"
            />
            <FormKit
              type="multifile"
              name="Dokument poročila ali odziva"
              label="Dokument poročila ali odziva"
            />
          </FormKit>
        </template>
        <template v-else>
          <div class="submitted-container">
            <div class="submitted-icon"></div>
            <div class="lead-in-text">
              <div class="lead">Hvala za oddajo!</div>
              <div>
                Tvoje poročilo bo vidno takoj, ko bo odobren s strani
                administratorjev.
              </div>
            </div>
            <hr />
            <div class="strong-text">Želiš dodati novo poročilo?</div>
            <FormKit type="button" outer-class="small-button" @click="reset">
              Dodaj poročilo
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
import { postReport } from '../../helpers/api.js';

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
      formData: {
        'Na kateri poročevalski mehanizem se nanaša poročilo ali odziv': '0',
        'Poročilo je pripravila': '0',
        'Ime poročila ali odziva': '',
        'Avtor poročila': '',
        'Datum oddaje ali objave poročila ali odziva': '',
        'Link do poročila ali odziva': '',
        'Dokument poročila ali odziva': '',
      },
      submitted: false,
      lastSubmittedId: 0,
    };
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
