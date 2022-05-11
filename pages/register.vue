<template>
    <section class="p-3">
        <div class="text-center mt-4">
            <h1 class="text-2xl font-bold">Sign Up</h1>
            <p>Create your free Events254 account today</p>
        </div>

        <div>
            <form action="#" method="post">
                <label for="name">
                    <h1 class="mt-5">Your full name<span class=" text-red-400">*</span></h1>
                    <input class="w-full rounded-lg" type="text" name="name" id="name" placeholder="John Doe">
                </label>

                <label for="email">
                    <h1 class="mt-3">Email<span class=" text-red-400">*</span></h1>
                    <input class="w-full rounded-lg" type="text" name="email" id="email" placeholder="john@example.com">
                </label>

                <label for="password">
                    <h1 class="mt-3">Choose a strong password<span class="text-red-400">*</span></h1>
                    <input class="w-full rounded-lg" type="text" name="name" id="name"
                        placeholder="At least 8 characters">
                </label>

                <div class="px-2">
                    <button class="w-full bg-primary text-white rounded-lg mt-5 py-2">Create account</button>
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
useHead({
    title: 'Create a free account',
})
</script>