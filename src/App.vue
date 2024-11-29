<script setup>
import { RouterView } from 'vue-router'
import FlashMessage from './components/FlashMessage.vue';
import Navigation from './components/Navigation.vue';

</script>

<template>
  <header>
      <Navigation />
  </header>
  <FlashMessage />
  <RouterView />
</template>

