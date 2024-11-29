<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useFlashMessage } from '@/hook/useFlashMessage';

const { setFlashMessage } = useFlashMessage();

const router = useRouter();
let isAuthorized = false;

onBeforeMount(async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/is-granted`, {}, {
      withCredentials: true 
    });
    if (response.status === 200 && response.data.data === true) {
      isAuthorized = true;
      return;
    }
  } catch (error) {
    console.error('Err : ', error);
  }
  setFlashMessage('warning', 'Vous n\'avez pas les droits pour accéder à cette page.');
  router.push('/');
});

onMounted(() => {
  if (!isAuthorized) return;
});
</script>

<template>
  <div v-if="isAuthorized">
    <h1>Admin Home</h1>
  </div>
</template>