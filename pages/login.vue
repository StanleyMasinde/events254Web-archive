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
                    <input class="w-full rounded-lg mb-2" type="text" name="username" id="username"
                        placeholder="Username, email or phone">
                </label>

                <label for="password">
                    <h1>Password</h1>
                    <input class="w-full rounded-lg mb-3" type="password" name="password" id="password"
                        placeholder="Password">
                </label>

                <div class="my-4">
                    <h1 class="underline">Having trouble signing in?</h1>
                </div>


                <button class="bg-primary rounded-lg w-full text-white font-bold py-2 px-4">
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
useHead({
    title: 'Sign in to your account',
})
</script>