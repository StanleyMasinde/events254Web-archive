<template>
  <div class="px-3 my-3">
    <div class="flex justify-center">
      <img class=" rounded-full aspect-square bg-contain h-64" src="/hero.jpg" alt="Profile picture">
    </div>

    <div class="text-center">
      <h1 class="font-semibold text-xl">{{ user.name }}</h1>
      <h1 class="text-lg">@{{ user.username }}</h1>
    </div>

    <div>
      <form class="flex flex-col gap-3" action="#" method="post">
        <label for="name">
          <h1>Name</h1>
          <input v-model="user.name" class="w-full rounded-lg" type="text">
        </label>

        <label for="name">
          <h1>Username</h1>
          <input v-model="user.username" class="w-full rounded-lg" type="text">
        </label>

        <label for="name">
          <h1>E-mail</h1>
          <input v-model="user.email" readonly class="w-full rounded-lg" type="text">
        </label>

        <button class=" bg-primary rounded-lg py-2 text-white">Update</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'home',
  middleware: ["auth"],
})

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
</script>
