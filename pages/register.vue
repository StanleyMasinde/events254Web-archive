<template>
    <section class="p-3 text-white">
        <div class="mt-4">
            <h1 class="text-4xl font-bold mb-3">Sign Up</h1>
            <p>
                Create your free Events254 account today. With an account, you will be able to create events and
                register
                for events.
            </p>
        </div>

        <div class="border bg-white/50 backdrop-blur-md text-black mt-4 rounded-xl px-3 pb-5">
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
                    <input v-model="password" class="w-full rounded-lg mb-2" type="password" name="password"
                        id="password" placeholder="At least 8 characters">
                    <div class="-mt-2">
                        <span class=" text-sm text-red-500 italic">{{ passwordError }}</span>
                    </div>
                </label>

                <div class="px-2">
                    <button :disabled="formIsInvalid"
                        class="bg-primary text-white rounded-lg mt-5 py-2 px-2 disabled:bg-white disabled:border disabled:text-gray-700">Create
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
<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';

useHead({
    title: 'Create a free account',
})

definePageMeta({
    layout: "auth"
})

onMounted(() => {
    const auth = localStorage.getItem('auth.token');
    if (auth) {
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
        // if (!/[^A-Za-z0-9]/.test(value)) {
        //     return 'The password must contain at least one special character'
        // }
        return true
    },
}

useForm({
    validationSchema
})

const { value: name, errorMessage: nameError, meta: nameMeta } = useField<string>('name');
const { value: email, errorMessage: emailError, meta: emailMeta } = useField<string>('email');
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField<string>('password')

const formIsInvalid = computed(() => {
    return !nameMeta.valid || !emailMeta.valid || !passwordMeta.valid
})

const errorMessage = ref('')
const { $events254Api } = useNuxtApp()
const $router = useRouter()

const registerUser = async () => {
    try {
        const { data } = await $events254Api.registerUser({
            name: name.value,
            email: email.value,
            password: password.value
        })

        const { data: { user } } = await $events254Api.loginUser({
            email: data.email,
            password: password.value
        }, {
            headers: {
                'x-requested-with': 'mobile'
            }
        })
        localStorage.setItem('auth.id', user.id.toString())
        localStorage.setItem('auth.token', user.token)
        localStorage.setItem('auth.name', user.name)
        localStorage.setItem('auth.email', user.email)
        localStorage.setItem('auth.username', user.username)

        let lastPath: string
        if (localStorage.getItem('lastPath') === '/login') {
            lastPath = '/'
        }
        $router.push(lastPath ? lastPath : '/')
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