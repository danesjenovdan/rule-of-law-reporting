<template>
  <section class="login-form">
    <header class="lead-in-text">
      <div class="lead">Pozdravljen_a v aplikaciji!</div>
      <div>Za uporabo se vpiši.</div>
    </header>
    <FormKit
      v-model="formData"
      type="form"
      submit-label="Prijavi se"
      @submit="submit"
    >
      <FormKit
        type="email"
        name="email"
        label="E-pošta"
        validation="required|email"
        autofocus
      />
      <FormKit
        type="password"
        name="password"
        label="Geslo"
        validation="required"
      />
    </FormKit>
    <footer class="lead-in-text">
      <div class="lead">Še nisi registriran_a?</div>
      <div>
        Za dostop nam piši na
        <a href="mailto:pomoc@pravna-mreza.si">pomoc@pravna-mreza.si</a>.
      </div>
    </footer>
  </section>
</template>

<script>
import { getUser, login } from '../helpers/api.js';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submit(data, node) {
      try {
        const response = await login(data.email, data.password);
        localStorage.setItem('token', response.data.token);
        const userResponse = await getUser(data.email);
        localStorage.setItem('user_id', userResponse.data.list[0].id);
        this.$router.push({ name: 'dashboard' });
      } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message;
        node.setErrors([errorMessage]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.login-form {
  header {
    margin-bottom: 2.5rem;
  }

  footer {
    border-top: 1px solid $color-accent-light;
    margin-top: 3rem;
    margin-bottom: 2rem;
    padding-top: 3rem;
  }
}
</style>
