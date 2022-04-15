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
      <a href="/dashboard/new-report">dodaj prispevek</a>
      <br />
      <a href="/dashboard/new-event">dodaj dogodek</a>
      <br />
      <a href="/dashboard/new-source">dodaj vir</a>
      <br />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>
