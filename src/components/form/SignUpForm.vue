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
        <label for="firstname" class="block text-sm/6 font-medium text-gray-900">Prénom</label>
        <div class="">
          <input v-model="firstname" id="firstname" name="firstname" type="text" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" @input="validateFirstname" />
          <span v-if="!isFirstnameValid" class="text-red-500 text-sm">Votre prénom n'est pas correct</span>
        </div>
      </div>

      <div>
        <label for="lastname" class="block text-sm/6 font-medium text-gray-900">Nom</label>
        <div class="">
          <input v-model="lastname" id="lastname" name="lastname" type="text" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" @input="validateLastname" />
          <span v-if="!isLastnameValid" class="text-red-500 text-sm">Votre nom n'est pas correct</span>
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
        <label for="confirmPassword" class="block text-sm/6 font-medium text-gray-900">Confirmer le mot de passe</label>
        <div class="">
          <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" @input="validateConfirmPassword" />
          <span v-if="!isConfirmPasswordValid" class="text-red-500 text-sm">Les mots de passe ne correspondent pas</span>
        </div>
      </div>

      <div>
            <div class="flex justify-center mt-2">
            <button :disabled="!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isLastnameValid || !isFirstnameValid" type="submit" class="mt-2 flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm main-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50">
              S'inscrire
            </button>
            </div>
      </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useInputSecurity } from '../../hook/useInputSecurity';
import { useFlashMessage } from '../../hook/useFlashMessage.js';
import axios from 'axios';

const { isCorrectMail, isCorrectPassword, isCorrectString } = useInputSecurity();
const { setFlashMessage } = useFlashMessage();

const email = ref('');
const password = ref('');
const firstname = ref('');
const lastname = ref('');
const confirmPassword = ref('');
const isEmailValid = ref(true);
const isFirstnameValid = ref(true);
const isLastnameValid = ref(true);
const isPasswordValid = ref(true);
const isConfirmPasswordValid = ref(true);

function handleSubmit(e) {
    e.preventDefault();
    if (isCorrectMail(email.value) && isCorrectPassword(password.value) && password.value === confirmPassword.value && isCorrectString(firstname.value) && isCorrectString(lastname.value)) {
      axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        email: email.value,
        password: password.value,
        firstname: firstname.value,
        lastname: lastname.value
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

function validateConfirmPassword() {
    isConfirmPasswordValid.value = password.value === confirmPassword.value;
}

function validateFirstname() {
    isFirstnameValid.value = isCorrectString(firstname.value);
}   

function validateLastname() {
    isLastnameValid.value = isCorrectString(lastname.value);
}
</script>
