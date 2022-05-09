<template>
    <main>
        <nav class="bg-white py-3 sm:py-5 px-1 sm:px-16">
            <div class="flex flex-row-reverse justify-between px-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div class="sm:flex">
                    <button @click="toggleMenu" class="block sm:hidden">
                        <svg v-if="layout.mobileMenuToggle" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>

                    <ul class="hidden sm:flex">
                        <nuxt-link to="/">
                            <li class="mr-5 py-1">Home</li>
                        </nuxt-link>

                        <nuxt-link to="/explore">
                            <li class="mr-2 py-1">Explore</li>
                        </nuxt-link>

                        <nuxt-link to="/login">
                            <li class="mr-2 py-1">Login</li>
                        </nuxt-link>

                        <nuxt-link to="/register">
                            <li>
                                <button class="py-1 px-3 rounded-md border hover:bg-primary">
                                    Register
                                </button>
                            </li>
                        </nuxt-link>
                    </ul>
                </div>
            </div>

            <!-- Mobile menu -->
            <div :class="{
                'hidden': !layout.mobileMenuToggle,
                'relative': layout.mobileMenuToggle
            }" class="z-10 shadow sm:hidden">
                <ul class="mt-4 pb-2 rounded-md bg-white absolute w-full">
                    <li class="rounded px-1 py-1">
                        <nuxt-link to="/">
                            Home
                        </nuxt-link>
                    </li>

                    <li class="rounded px-1 py-1">
                        <nuxt-link to="/explore">
                            Explore
                        </nuxt-link>
                    </li>


                    <li class="px-1 py-1 mt-1 flex justify-between">
                        <nuxt-link to="/login">
                            Login
                        </nuxt-link>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </li>


                    <li class="rounded-md px-1 py-1 mt-1">
                        <nuxt-link to="/register">
                            Register
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <!--/ Mobile menu -->
        </nav>

        <!-- Body content here -->
        <slot></slot>
        <div class="mt-32 sm:mt-0"></div>
        <!--Bottom navigation for mobile-->
        <div class="w-screen px-2 py-4 fixed bottom-0 bg-gray-100">
            <ul class="flex justify-between">
                <nuxt-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                </nuxt-link>
                <nuxt-link to="/explore">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Explore
                </nuxt-link>
                <nuxt-link to="/saved">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Saved
                </nuxt-link>
                <nuxt-link to="/tickets">
                    <div class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        Tickets
                    </div>
                </nuxt-link>
            </ul>
        </div>
        <!--/ Bottom navigation for mobile-->
        <!-- End of body -->
        <footer class="hidden sm:block">
            <p>&copy; Events254 {{ year }}</p>
            <div class="hidden router-link-exact-active"></div>
        </footer>
    </main>
</template>

<script setup>
import { reactive } from 'vue';
const year = new Date().getFullYear();

const layout = reactive({
    mobileMenuToggle: false
});

function toggleMenu() {
    layout.mobileMenuToggle = !layout.mobileMenuToggle;
}

const mobileMenuClasses = {
    'hidden': !layout.mobileMenuToggle,
    'relative': layout.mobileMenuToggle
};
</script>

