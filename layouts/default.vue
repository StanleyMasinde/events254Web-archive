<template>
    <main>
        <nav class="bg-white static py-3 sm:py-5 px-1 sm:px-16">
            <div class="flex flex-row-reverse justify-between px-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
        </nav>

        <!-- Mobile menu -->
        <div @click="toggleMenu" :class="{
            'hidden': !layout.mobileMenuToggle,
            'relative': layout.mobileMenuToggle
        }" class="shadow z-10 sm:hidden">
            <ul class="pb-2 rounded-md">
                <li class="rounded px-1 py-1">
                    <nuxt-link class=" font-semibold" to="/">
                        Home
                    </nuxt-link>
                </li>
                <hr>
                <li class="rounded px-1 py-1">
                    <nuxt-link class=" font-semibold" to="/events/create">
                        Create Event
                    </nuxt-link>
                </li>
                <hr>
                <li class="rounded px-1 py-1">
                    <nuxt-link class=" font-semibold" to="/explore">
                        Explore
                    </nuxt-link>
                </li>
                <hr>
                <div v-if="!user.isAuthenticated">
                    <li class="px-1 py-1 mt-1 flex justify-between">
                        <nuxt-link class="font-semibold" to="/login">
                            Login
                        </nuxt-link>
                    </li>
                    <hr>
                    <li class="rounded-md px-1 py-1 mt-1">
                        <nuxt-link class="font-semibold" to="/register">
                            Register
                        </nuxt-link>
                    </li>
                </div>

                <div v-else>
                    <li class="px-1 py-1 mt-1 flex">
                        <div class="h-7 w-7 flex justify-center text-white bg-primary rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <nuxt-link class=" font-semibold" to="/profile">
                                {{ user.name }}
                            </nuxt-link>
                        </div>
                    </li>
                    <hr>
                    <li @click="logout()" class="rounded-md px-1 py-1 mt-1 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 mr-3" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <p class=" font-semibold">
                            Logout
                        </p>
                    </li>
                    <hr>
                </div>
            </ul>
        </div>
        <!--/ Mobile menu -->

        <!-- Body content here -->
        <slot></slot>
        <div class="mt-32 sm:mt-0"></div>
        <!--Bottom navigation for mobile-->
        <div class="px-2 sm:hidden py-1 fixed inset-x-2 bottom-0 rounded-lg shadow-2xl drop-shadow-2xl bg-gray-200">
            <ul class="flex justify-around">
                <nuxt-link class="self-center" v-slot="{ isExactActive }" to="/">
                    <button :class="{ 'bg-primary text-white rounded-full': isExactActive }"
                        class="transition-all duration-500 flex gap-1 px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span v-show="isExactActive">Home</span>
                    </button>
                </nuxt-link>
                <nuxt-link class="self-center" v-slot="{ isExactActive }" to="/explore">
                    <button :class="{ 'bg-primary text-white rounded-full': isExactActive }"
                        class="transition-all duration-500 flex gap-1 px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span v-show="isExactActive">Explore</span>
                    </button>
                </nuxt-link>
                <nuxt-link class=" self-center" to="/events/create" v-slot="{ isExactActive }">
                    <button :class="{ 'bg-primary text-white rounded-full': isExactActive }"
                        class="transition-all duration-500 flex gap-1 px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class=" h-6 w-full" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span v-show="isExactActive">Create</span>
                    </button>
                </nuxt-link>
                <nuxt-link class="self-center" v-slot="{ isExactActive }" to="/saved">
                    <button :class="{ 'bg-primary text-white rounded-full': isExactActive }"
                        class="transition-all duration-500 flex gap-1 px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span v-show="isExactActive">Saved</span>
                    </button>
                </nuxt-link>
                <nuxt-link class="self-center" v-slot="{ isExactActive }" to="/tickets">
                    <button :class="{ 'bg-primary text-white rounded-full': isExactActive }"
                        class="transition-all duration-500 flex gap-1 px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-full" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <span v-show="isExactActive">Tickets</span>
                    </button>
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

<script lang="ts" setup>
import { reactive } from 'vue';
const year = new Date().getFullYear();

const user = reactive({
    isAuthenticated: false,
    name: '',
    username: '',
    email: '',
})
const layout = reactive({
    mobileMenuToggle: false
});

onMounted(() => {
    if (localStorage.getItem('auth.token')) {
        user.isAuthenticated = true;
        user.name = localStorage.getItem('auth.name');
        user.username = localStorage.getItem('auth.username');
        user.email = localStorage.getItem('auth.email');
    }
});

const logout = useLogout();

function toggleMenu() {
    layout.mobileMenuToggle = !layout.mobileMenuToggle;
}

const mobileMenuClasses = {
    'hidden': !layout.mobileMenuToggle,
    'relative': layout.mobileMenuToggle
};
</script>

