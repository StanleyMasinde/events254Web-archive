
<template>
  <div>
    <nuxt-loading-indicator color="#FF6601"></nuxt-loading-indicator>
    <nav class="flex justify-between py-3 px-2">
      <router-link to="/">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </router-link>

      <div>
        <h1 class=" font-bold text-lg">My Profile</h1>
      </div>

      <button>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </nav>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const logout = useLogout();
</script>
