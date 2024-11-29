import { ref } from 'vue';

const flashMessage = ref([]);

function clearMessage(message) {
    flashMessage.value = flashMessage.value.filter(flash => flash.message !== message);
}

function setFlashMessage(type, message) {
    flashMessage.value.push({ type, message });
    console.log(flashMessage.value);
}

export function useFlashMessage() {
    return { flashMessage, setFlashMessage, clearMessage };
}