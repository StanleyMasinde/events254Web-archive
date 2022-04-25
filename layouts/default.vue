<template>
    <nav class="bg-primary text-white py-5 sm:px-16">
        <div class="flex justify-between px-1">
            <h1 class="py-1">Events254</h1>
            <div class="sm:flex">
                <button @click="toggleMenu" class="block sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <ul class="hidden sm:flex">
                    <router-link to="/explore">
                        <li class="mr-5 py-1">Explore</li>
                    </router-link>

                    <router-link to="/login">
                        <li class="mr-2 py-1">Login</li>
                    </router-link>

                    <router-link to="/register">
                        <li>
                            <button class="py-1 px-3 rounded-md border border-white hover:bg-secondary">
                                Register
                            </button>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>

        <!-- Mobile menu -->
        <div :class="{ 'hidden': mobileMenuToggle }" class="transition ease-in sm:hidden">
            <ul class="mt-4">
                <router-link to="/explore">
                    <li class="rounded px-1 py-1">Explore</li>
                </router-link>

                <router-link to="/login">
                    <li class="px-1 py-1 mt-1 flex justify-between">
                        Login
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </li>
                </router-link>

                <router-link to="/register">
                    <li class="rounded-md px-1 py-1 mt-1">Register</li>
                </router-link>
            </ul>
        </div>
        <!--/ Mobile menu -->

    </nav>

    <!-- Body content here -->
    <slot></slot>
    <!-- End of body -->
    <footer>
        <p>&copy; Events254 {{ year }}</p>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
const year = new Date().getFullYear();

const mobileMenuToggle = ref(false)

function toggleMenu() {
    console.log(mobileMenuToggle.value);
    mobileMenuToggle.value = !mobileMenuToggle.value
}
</script>