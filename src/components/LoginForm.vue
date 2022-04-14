<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input v-model="email" type="text" placeholder="email" />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="password" />
      </div>
      <div class="form-error">{{ errorMessage }}</div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../helpers/api.js';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

async function onSubmit() {
  try {
    const response = await login(email.value, password.value);
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    errorMessage.value = error.response?.data?.msg || error.message;
  }
}
</script>
