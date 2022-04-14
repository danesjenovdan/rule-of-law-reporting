<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { me } from '../helpers/api.js';
import LoginForm from '../components/LoginForm.vue';

const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await me();
    if (response?.data?.isAuthorized) {
      router.push('/dashboard');
    }
  }
});
</script>

<template>
  <div>
    <LoginForm />
  </div>
</template>
