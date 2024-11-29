<script setup>
  import SigninForm from '@/components/form/SigninForm.vue';
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-2">
    <img class="mx-auto h-60 w-auto" src="/Camping_Paradise_large.jpg" alt="Camping paradise" />
    <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Connexion</h2>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <SigninForm />
    </div>
    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Pas encore de compte ? 
      {{ ' ' }}
      <router-link :to="{ name: 'signup' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Créez-en un gratuitement</router-link>
    </p>
  </div>
</template>
