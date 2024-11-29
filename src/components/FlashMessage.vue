<template>
    <transition-group name="fade" tag="div">
        <div v-for="flash in flashMessage" :key="flash.message" :class="`flash-message alert-${flash.type}`" @click="clearMessage(flash.message)">
            {{ flash.message }}
        </div>
    </transition-group>
</template>

<script setup>
import { useFlashMessage } from '../hook/useFlashMessage.js';

const { flashMessage, clearMessage } = useFlashMessage();
console.log("depuis le composant");
console.log(flashMessage.value);
</script>

<style scoped>
.flash-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 20px; /* Agrandir la pop-up */
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    z-index: 9999;
}
.alert-warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
}
.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
.alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>