<template>
  <header>
    <DesktopHeader v-if="isDesktop" />
    <SmallHeader v-if="!isDesktop" />
    <PillButtonNav v-if="!isDesktop" />
  </header>
  <div class="container">
    <main class="about-reporting">
      <h1>
        Poročanje o stanju pravne države - opis mehanizma in postopka
        sodelovanja civilne družbe
      </h1>
      <p>
        Evropski mehanizem pravne države omogoča letni dialog o pravni državi
        med Komisijo, Svetom in Evropskim parlamentom, skupaj z državami
        članicami ter nacionalnimi parlamenti, civilno družbo in drugimi
        deležniki. Poročilo o stanju pravne države je temelj tega novega
        mehanizma.
      </p>
      <p>
        Osrednji cilj mehanizma je okrepiti medinstitucionalno sodelovanje in
        spodbujati vse institucije EU, da prispevajo v skladu s svojimi
        institucionalnimi vlogami. Ta cilj odraža dolgoročni interes Evropskega
        parlamenta in Sveta. Komisija poleg tega poziva nacionalne parlamente in
        organe, da razpravljajo o poročilu, ter spodbuja druge deležnike na
        nacionalni ravni in ravni EU, da sodelujejo v razpravi.
      </p>
      <p>
        Poročilo o stanju pravne države in pripravljalno delo z državami
        članicami v okviru mehanizma potekata vsako leto in sta podlaga za
        razprave v EU ter za preprečevanje nastajanja ali poglabljanja težav.
        Čimprejšnja opredelitev izzivov ob vzajemni podpori Komisije, drugih
        držav članic ter deležnikov, kot sta na primer Svet Evrope in Beneška
        komisija, bi bila državam članicam lahko v pomoč pri iskanju rešitev, ki
        ščitijo pravno državo.
      </p>
      <p>
        Poročilo o pravni državi predstavlja povzetek stanja na področju pravne
        države v Evropski uniji in oceno pomembnih sprememb na področju pravne
        države v državah članicah v 27 poglavjih. Poročilo zajema štiri stebre:
        pravosodni sistem, protikorupcijski okvir, pluralnost medijev ter druga
        institucionalna vprašanja, povezana s sistemom zavor in ravnovesij.
        Poglavja o državah temeljijo na kvalitativni oceni, ki jo je izvedla
        Komisija. Osredotočajo se na sintezo pomembnih sprememb od januarja
        2019, za vsak steber pa je najprej na kratko predstavljen ustrezni
        pravni in institucionalni okvir. Ocena predstavlja tako izzive kot
        pozitivne vidike, vključno z dobrimi praksami. v vseh državah članicah
        uporablja enako metodologijo in proučuje ista vprašanja, pri tem pa je
        vprašanjem namenja pozornost, sorazmerno s stanjem in razvojem dogodkov.
        Več o informacij o metodologiji je dostopnih na:
        <a
          href="https://ec.europa.eu/info/sites/default/files/2020_rule_of_law_report_methodology_en.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://ec.europa.eu/info/sites/default/files/2020_rule_of_law_report_methodology_en.pdf
        </a>
      </p>
      <p>
        Cikel poročanja se določa sproti, ko Komisija začne postopek javnega
        posvetovanja; ta praviloma traja 8 tednov. V tem času mora prispevke
        predložiti tudi civilna družba.
      </p>
      <hr />
      <p>
        Projekt je bil delno financiran s strani Veleposlaništva Kraljevine
        Nizozemske.
      </p>
      <p>
        Projekt je bil delno financiran s strani Veleposlaništva Združenih držav
        Amerike. Izražena mnenja, ugotovitve in zaključki ali priporočila
        izražajo stališča avtorjev in ne nujno tudi Ministrstva za zunanje
        zadeve ZDA.
      </p>
      <p>
        <img
          src="../../assets/images/Embassy_LJ_LOGO.svg"
          alt="US Embassy Ljubljana logo"
          width="100"
        />
      </p>
    </main>
  </div>
  <footer></footer>
</template>

<script>
import SmallHeader from '../../components/Header/SmallHeader.vue';
import PillButtonNav from '../../components/PillButtonNav.vue';
import DesktopHeader from '../../components/Header/DesktopHeader.vue';

export default {
  components: {
    SmallHeader,
    PillButtonNav,
    DesktopHeader,
  },
  inject: {
    isDesktop: {
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

main.about-reporting {
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: $color-black;
  word-break: normal;
  overflow-wrap: anywhere;

  @media (min-width: 992px) {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }
}

h1 {
  font-weight: 900;
  font-size: 18px;
  line-height: 1.4;
  margin-bottom: 1em;
}

h2 {
  font-weight: 900;
  font-size: 14px;
  line-height: 15px;
  margin-top: 2rem;
}

p,
li {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 1em;

  span {
    font-weight: 600;
  }
}

ul {
  padding-left: 0;
  list-style-type: none;
}

li {
  padding-left: 22px;
  background-image: url('../../assets/icons/puscica-dol.svg');
  background-position: 4px 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
</style>
