<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { me } from '../helpers/api.js';

const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await me();
    if (response?.data?.isAuthorized) {
      return;
    }
  }
  router.push('/login');
});
</script>

<template>
  <div>
    <div>
      <button>dodaj prispevek</button>
      <button>dodaj dogodek</button>
      <button>dodaj vir</button>
    </div>
  </div>
</template>
