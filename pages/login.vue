<template>
    <section class="px-2">
        <div>
            <div class="mb-4 mt-2 text-center">
                <h1 class="text-xl font-bold">Welcome back!</h1>
                <p class="mt-2 mb-7">Enter your account details to sign in into your Events254 account</p>
            </div>
            <form method="POST">
                <label for="username">
                    <h1>Email, phone or username</h1>
                    <input v-model="username" class="w-full rounded-lg mb-2" :class="{ 'border-red-400 ring-red-400 ring-1': userNameError }"
                        type="text" name="username" id="username" placeholder="Username, email or phone">
                    <div class=" -mt-2">
                        <span class=" text-sm text-red-500 italic">{{ userNameError }}</span>
                    </div>
                </label>

                <label for="password">
                    <h1>Password</h1>
                    <input v-model="password" class="w-full rounded-lg mb-3" :class="{ 'border-red-400 ring-red-400 ring-1': passwordError }" type="password" name="password"
                        id="password" placeholder="Password">
                    <div class=" -mt-2">
                        <span class=" text-sm text-red-500 italic">{{ passwordError }}</span>
                    </div>
                </label>

                <div class="my-4">
                    <h1 class="underline">Having trouble signing in?</h1>
                </div>


                <button :disabled="formIsInvalid" class="bg-primary rounded-lg w-full text-white font-bold py-2 px-4 disabled:bg-white disabled:border disabled:text-gray-700">
                    Sign in
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
import { reactive, computed } from 'vue'
import { useForm, useField } from 'vee-validate';
useHead({
    title: 'Sign in to your account',
})

const credentials = reactive({
    username: '',
    password: ''
})

const validationSchema = {
    username(value) {
        if (!value) {
            return 'This field is required'
        }
        return true
    },
    password(value) {
        if (!value) {
            return 'Please enter a password'
        }
        return true
    },
}

useForm({
    validationSchema
})

const { value: username, errorMessage: userNameError, meta: usernameMeta } = useField('username')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')

const formIsInvalid = computed(() => {
    return !usernameMeta.valid || !passwordMeta.valid
})
</script>