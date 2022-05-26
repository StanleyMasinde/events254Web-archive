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
            <form id="resetForm" method="POST" @submit.prevent="updatePassword()">
                <label for="username">
                    <h1>Email</h1>
                    <input readonly :value="email" class="w-full rounded-lg mb-2 read-only:bg-gray-200" type="email"
                        name="username" id="email" placeholder="Your email">
                </label>

                <label for="username">
                    <h1>New password</h1>
                    <input autofocus v-model="password" class="w-full rounded-lg mb-2"
                        :class="{ 'border-red-400 ring-red-400 ring-1': passwordError }" type="password" name="password"
                        id="password" placeholder="Enter your new passsword">
                    <div class=" -mt-2">
                        <span class=" text-sm text-red-500 italic">{{ passwordError }}</span>
                    </div>
                </label>

                <div class="my-4">
                    <nuxt-link to="/login">
                        <h1 class="underline">Go back to the login page</h1>
                    </nuxt-link>
                </div>


                <button :disabled="formIsInvalid" type="submit"
                    class="bg-primary rounded-lg w-full text-white font-bold py-2 px-4 disabled:bg-white disabled:border disabled:text-gray-700">
                    Change my password
                </button>
            </form>
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

const $route = useRoute()

let email = $route.query.email
const token = $route.query.token



const validationSchema = {
    password(value) {
        if (!value) {
            return 'Please enter your email address';
        }
        if (value.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (/\s/.test(value)) {
            return 'Password cannot contain spaces';
        }
        if (!/[A-Z]/.test(value)) {
            return 'Password must contain at least one uppercase letter';
        }
        return true
    },
}

useForm({
    validationSchema
})

const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')

const formIsInvalid = computed(() => {
    return !passwordMeta.valid
})

const errorMessage = ref('')
const { $axios } = useNuxtApp()
const $router = useRouter()
const updatePassword = async () => {
    try {
        await $axios.post('/auth/password/update', {
            email,
            token,
            password: password.value
        })
        
        const {data} = await $axios.post('/auth/login', {
            email: email,
            password: password.value
        })

        localStorage.setItem('auth', true)
        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        localStorage.setItem('username', data.username)

        location.reload() // TODO: Auth logic
        $router.push(localStorage.getItem('lastPath') || '/')
    } catch (error) {
        console.log(error);
        if (error.response.status === 422) {
            errorMessage.value = error.response.data
            return
        }
        errorMessage.value = error.response.data.error
    }
}
</script>