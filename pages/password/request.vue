<template>
    <section class="px-3 sm:px-64">
        <div>
            <div class="mb-4 mt-2 text-center">
                <h1 class="text-xl font-bold">Request a new password</h1>
                <p class="mt-2 mb-7">
                    Just enter your email address below and we'll send you a link to reset your password.
                </p>
            </div>
            <div v-if="errorMessage" class="text-red-500 border border-red-500  rounded-lg py-2 text-center">
                <p class="font-bold">{{ errorMessage }}</p>
            </div>
            <div v-if="successMessage" class="text-green-500 border border-green-500 mb-4 rounded-lg py-2 text-center">
                <p class="font-bold">{{ successMessage }}</p>
            </div>
            <form id="resetForm" method="POST" @submit.prevent="requestPassword()">
                <label for="username">
                    <h1>Email</h1>
                    <input v-model="email" class="w-full rounded-lg mb-2"
                        :class="{ 'border-red-400 ring-red-400 ring-1': emailError }" type="email" name="username"
                        id="email" placeholder="Your email">
                    <div class=" -mt-2">
                        <span class=" text-sm text-red-500 italic">{{ emailError }}</span>
                    </div>
                </label>

                <div class="my-4">
                    <nuxt-link to="/login">
                    <h1 class="underline">Go back to the login page</h1>
                    </nuxt-link>
                </div>


                <button :disabled="formIsInvalid" type="submit"
                    class="bg-primary rounded-lg w-full text-white font-bold py-2 px-4 disabled:bg-white disabled:border disabled:text-gray-700">
                    Send me a link to reset my password
                </button>
            </form>

            <div class=" mt-8 text-center">
                <nuxt-link to="/register">
                    <h1 class="underline">Don't have an account? Create one</h1>
                </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate';

useHead({
    title: 'Sign in to your account',
})

definePageMeta({
    middleware: ["guest"],
})

onMounted(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
        window.location.href = '/'
    }
})


const validationSchema = {
    email(value) {
        if (!value) {
            return 'Please enter your email address';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return 'This email does not appear to be valid';
        }
        return true
    }
}

useForm({
    validationSchema
})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email')

const formIsInvalid = computed(() => {
    return !emailMeta.valid
})

const errorMessage = ref('')
const successMessage = ref('')
const { $axios } = useNuxtApp()
const $router = useRouter()
const requestPassword = async () => {
    try {
        await $axios.post('/auth/password', {
            email: email.value
        })
        successMessage.value = `An email has been sent to ${email.value} with instructions on how to reset your password.`
        document.getElementById('resetForm').reset()
    } catch (error) {
        errorMessage.value = error.response
    }
}
</script>