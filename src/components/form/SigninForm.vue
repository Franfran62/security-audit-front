<template>
        <form @submit="handleSubmit">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Adresse email</label>
            <div class="">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" @input="validateEmail" />
              <span v-if="!isEmailValid" class="text-red-500 text-sm">Adresse email invalide</span>
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-900">Mot de passe</label>
            </div>
            <div class="">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" @input="validatePassword" />
            </div>
          </div>
  
          <div>
                <div class="flex justify-center mt-2">
                <button :disabled="!isEmailValid || !isPasswordValid" type="submit" class="mt-2 flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm main-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50">
                  Se connecter
                </button>
                </div>
          </div>
        </form>
</template>

<script setup>
    import { ref } from 'vue';
    import { useInputSecurity } from '../../hook/useInputSecurity';
    import { useFlashMessage } from '../../hook/useFlashMessage.js';
    import { useCurrentPermission } from '../../hook/useCurrentPermission';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const { isCorrectMail, isCorrectPassword } = useInputSecurity();
    const { setFlashMessage } = useFlashMessage();
    const { setCurrentPermission } = useCurrentPermission();

    const email = ref('');
    const password = ref('');
    const isEmailValid = ref(true);
    const isPasswordValid = ref(true);

    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        if (isCorrectMail(email.value) && isCorrectPassword(password.value)) {
          axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
            email: email.value,
            password: password.value
          }) 
          .then(response => { 
            if (response.status == 200) {
              setCurrentPermission(response.data.data);
              router.push({ name: 'home' });
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch(error => {
            setFlashMessage('danger', 'Une erreur est survenue. Veuillez réessayer plus tard.');
          });          
        } else {
          setFlashMessage('danger', 'Informations incorrectes.');
        }
    }

    function validateEmail() {
        isEmailValid.value = isCorrectMail(email.value);
    }

    function validatePassword() {
        isPasswordValid.value = isCorrectPassword(password.value);
    }
</script>
