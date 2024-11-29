<template>
    <nav class="flex w-full m-3">
        <ul :class="['flex w-full', { 'justify-between': isGranted('admin') }]">
            <div class="flex">
                <li class="p-2">
                    <router-link :to="{ name: 'home' }" class="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded" aria-current="page">Home</router-link>
                </li>
                <li class="p-2">
                    <router-link :to="{ name: 'signin' }" class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                        Connexion
                    </router-link>
                </li>
            </div>
            <li v-if="isGranted('admin')" class="p-2">
                <router-link :to="{ name: 'admin' }" class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                    Accès Administrateur
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useCurrentPermission } from '@/hook/useCurrentPermission';

const { isGranted } = useCurrentPermission();
</script>