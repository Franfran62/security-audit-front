<script setup>
    import SignUpForm from '@/components/form/SignUpForm.vue';
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-60 w-auto" src="/Camping_Paradise_large.jpg" alt="Camping paradise" />
        <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Connexion</h2>
      </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm />
    </div>
    <p class="mt-10 text-center text-sm/6 text-gray-500">
        Déjà un compte ? 
        {{ ' ' }}
        <router-link :to="{ name: 'signin' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Connectez-vous</router-link>
    </p>
  </div>
</template>