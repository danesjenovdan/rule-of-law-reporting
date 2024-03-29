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
            <div class="lead">Nov prispevek</div>
            <div>
              Pred oddajo novega prispevka na seznamu vseh prispevkov preveri,
              če ta prispevek res še ne obstaja.
            </div>
          </div>
          <hr />
          <FormKit
            v-model="formData"
            type="form"
            submit-label="Oddaj prispevek"
            @submit="submit"
          >
            <FormKit
              ref="areaAndSubarea"
              type="contributiontyperadio"
              name="areaAndSubarea"
              label="Izberi področje, na katerega se navezuje prispevek."
              validation="required"
            />
            <FormKit
              type="text"
              name="Ime prispevka"
              label="Ime prispevka"
              validation="required"
            />
            <FormKit
              type="textarea"
              name="O področju prispevka"
              label="O področju prispevka"
              validation="required"
            />
          </FormKit>
        </template>
        <template v-else>
          <div class="submitted-container">
            <div class="submitted-icon"></div>
            <div class="lead-in-text">
              <div class="lead">Hvala za oddajo!</div>
              <div>
                Tvoj prispevek bo viden takoj, ko bo odobren s strani
                administratorjev.
              </div>
            </div>
            <hr />
            <div class="strong-text">
              Se na ravno oddani prispevek navezuje kakšen dogodek, ki ga želiš
              dodati?
            </div>
            <FormKit
              type="button"
              @click="
                $router.push({
                  name: 'new-event',
                  query: { contribution: lastSubmittedId },
                })
              "
            >
              Dodaj povezan dogodek
            </FormKit>
            <hr />
            <div class="strong-text">Želiš dodati nov prispevek?</div>
            <FormKit type="button" outer-class="small-button" @click="reset">
              Dodaj prispevek
            </FormKit>
          </div>
        </template>
      </div>
    </main>
  </div>
  <InfoModal v-if="showInfoModal" @close="showInfoModal = false" />
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';
import BackArrow from '../../components/Header/BackArrow.vue';
import InfoModal from '../../components/InfoModal.vue';
import { postContribution } from '../../helpers/api.js';

export default {
  components: {
    SmallHeader,
    DesktopHeader,
    BackArrow,
    InfoModal,
  },
  inject: {
    isDesktop: {
      default: false,
    },
  },
  data() {
    return {
      formData: {
        nc_0zwf__področja_id: '',
        'Če ste izbrali druga, na katerem področju': '',
        'Ime prispevka': '',
        'O področju prispevka ': '',
      },
      submitted: false,
      lastSubmittedId: 0,
      showInfoModal: false,
    };
  },
  mounted() {
    if (this.$refs.areaAndSubarea) {
      this.$refs.areaAndSubarea.node.on('modal-open', () => {
        this.showInfoModal = true;
      });
    }
  },
  methods: {
    async submit(data, node) {
      const { areaAndSubarea, ...postData } = data;
      postData.nc_0zwf__področja_id = String(areaAndSubarea.area);
      postData['Če ste izbrali druga, na katerem področju'] =
        areaAndSubarea.subarea || '';
      try {
        const response = await postContribution(postData);
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
