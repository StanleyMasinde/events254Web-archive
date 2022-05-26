<template>
    <section class="p-3">
        <div class="text-center mt-4">
            <h1 class="text-2xl font-bold">Sign Up</h1>
            <p>Create your free Events254 account today</p>
        </div>

        <div>
            <div class="text-red-500  rounded-lg py-2 text-center">
                <p class="font-bold">{{ errorMessage }}</p>
            </div>
            <form action="#" method="post" @submit.prevent="registerUser()">
                <label for="name">
                    <h1 class="mt-5">Your full name<span class=" text-red-400">*</span></h1>
                    <input v-model="name" class="w-full rounded-lg mb-3" type="text" name="name" id="name"
                        placeholder="John Doe">
                    <div class=" -mt-2">
                        <span class=" text-sm text-red-500 italic">{{ nameError }}</span>
                    </div>
                </label>

                <label for="email">
                    <h1 class="mt-3">Email<span class=" text-red-400">*</span></h1>
                    <input v-model="email" class="w-full rounded-lg mb-3" type="text" name="email" id="email"
                        placeholder="john@example.com">
                    <div class=" -mt-2">
                        <span class=" text-sm text-red-500 italic">{{ emailError }}</span>
                    </div>
                </label>

                <label for="password">
                    <h1 class="mt-3">Choose a strong password<span class="text-red-400">*</span></h1>
                    <input v-model="password" class="w-full rounded-lg mb-2" type="password" name="password" id="password"
                        placeholder="At least 8 characters">
                    <div class="-mt-2">
                        <span class=" text-sm text-red-500 italic">{{ passwordError }}</span>
                    </div>
                </label>

                <div class="px-2">
                    <button :disabled="formIsInvalid"
                        class="w-full bg-primary text-white rounded-lg mt-5 py-2 disabled:bg-white disabled:border disabled:text-gray-700">Create
                        account</button>
                </div>
            </form>

            <div class="mt-5 text-center">
                <nuxt-link to="/login">
                    <h1 class="underline">Have an account?</h1>
                </nuxt-link>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useField, useForm } from 'vee-validate';

useHead({
    title: 'Create a free account',
})

onMounted(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
        window.location.href = '/'
    }
})


const validationSchema = {
    name(value) {
        if (!value) {
            return 'What can we call you?'
        }
        if (value.trim().split(' ').length < 2) {
            return 'Please enter your full name'
        }
        return true
    },
    email(value) {
        if (!value) {
            return 'We need your email address'
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return 'This email does not look valid'
        }
        // ensure the email does not contain example.com
        if (/example\.com$/i.test(value)) {
            return 'Are you sure this is your email?'
        }
        return true
    },
    password(value) {
        if (!value) {
            return 'Please enter a password'
        }
        if (value.length < 8) {
            return 'The password must be at least 8 characters'
        }
        if (!/[A-Z]/.test(value)) {
            return 'The password must contain at least one uppercase letter'
        }
        if (!/[a-z]/.test(value)) {
            return 'The password must contain at least one lowercase letter'
        }
        if (!/[0-9]/.test(value)) {
            return 'The password must contain at least one number'
        }
        if (!/[^A-Za-z0-9]/.test(value)) {
            return 'The password must contain at least one special character'
        }
        return true
    },
}

useForm({
    validationSchema
})

const { value: name, errorMessage: nameError, meta: nameMeta } = useField('name');
const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email');
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')

const formIsInvalid = computed(() => {
    return !nameMeta.valid || !emailMeta.valid || !passwordMeta.valid
})

const errorMessage = ref('')
const { $axios } = useNuxtApp()
const $router = useRouter()

const registerUser = async () => {
    try {
        const { data } = await $axios.post('/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value
        })
        
        const { data: user } = await $axios.post('/auth/login', {
            email: data.email,
            password: password.value
        })
        localStorage.setItem('auth', true)
        localStorage.setItem('name', user.name)
        localStorage.setItem('email', user.email)
        localStorage.setItem('username', user.username)

        location.reload() // TODO: Auth logic
        $router.push(localStorage.getItem('lastPath') || '/')
    } catch (error) {
        if (error.response.status === 422) {
            errorMessage.value = 'This email is already in use'
        } else {
            errorMessage.value = error
        }

        setTimeout(() => {
            errorMessage.value = ''
        }, 5000)
    }
}
</script>