<template>
  <section class="px-3 sm:px-64">
    <div>
      <div class="mb-4 mt-2 text-white">
        <h1 class="text-3xl font-bold">Welcome back!</h1>
        <p class="mt-2 mb-7">
          Enter your account details to sign in into your Events254 account to
          get full benefits
        </p>
      </div>

      <div class="border rounded-xl px-3 pb-5 text-black bg-white/50">
        <div class="text-red-500 rounded-lg py-2 text-center">
          <p class="font-bold">{{ errorMessage }}</p>
        </div>
        <form method="POST" @submit.prevent="attemptLogin">
          <label for="username">
            <h1>Email, phone or username</h1>
            <input
              v-model="username"
              class="w-full rounded-lg mb-2"
              :class="{ 'border-red-400 ring-red-400 ring-1': userNameError }"
              type="text"
              name="username"
              id="username"
              placeholder="Username, email or phone"
            />
            <div class="-mt-2">
              <span class="text-sm text-red-500 italic">{{
                userNameError
              }}</span>
            </div>
          </label>

          <label for="password">
            <h1>Password</h1>
            <input
              v-model="password"
              class="w-full rounded-lg mb-3"
              :class="{ 'border-red-400 ring-red-400 ring-1': passwordError }"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div class="-mt-2">
              <span class="text-sm text-red-500 italic">{{
                passwordError
              }}</span>
            </div>
          </label>

          <div class="my-4">
            <nuxt-link to="/password/request">
              <h1 class="underline">Having trouble signing in?</h1>
            </nuxt-link>
          </div>

          <button
            :disabled="formIsInvalid"
            type="submit"
            class="
              bg-primary
              rounded-lg
              w-full
              text-white
              font-bold
              py-2
              px-4
              disabled:bg-white disabled:border disabled:text-gray-700
            "
          >
            Sign in
          </button>
        </form>

        <div class="mt-8 text-center">
          <nuxt-link to="/register">
            <h1 class="underline">Don't have an account? Create one</h1>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useForm, useField } from "vee-validate";

const { $events254Api } = useNuxtApp();
useHead({
  title: "Sign in to your account",
});

definePageMeta({
  middleware: ["guest"],
  layout: "auth",
});

onMounted(() => {
  const auth = localStorage.getItem("auth");
  if (auth === "true") {
    window.location.href = "/";
  }
});

const validationSchema = {
  username(value: string) {
    if (!value) {
      return "This field is required";
    }
    return true;
  },
  password(value: string) {
    if (!value) {
      return "Please enter a password";
    }
    if (value.length < 6) {
      return "This does not look right";
    }
    return true;
  },
};

useForm({
  validationSchema,
});

const {
  value: username,
  errorMessage: userNameError,
  meta: usernameMeta,
} = useField<string>("username");
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
} = useField<string>("password");

const formIsInvalid = computed(() => {
  return !usernameMeta.valid || !passwordMeta.valid;
});

const errorMessage = ref("");
const $router = useRouter();
const $route = useRoute();
const attemptLogin = async () => {
  try {
    const {
      data: { user },
    } = await $events254Api.loginUser(
      { email: username.value, password: password.value },
      {
        headers: {
          "x-requested-with": "mobile",
        },
      }
    );
    localStorage.setItem("auth.id", user.id.toString());
    localStorage.setItem("auth.token", user.token);
    localStorage.setItem("auth.name", user.name);
    localStorage.setItem("auth.email", user.email);
    localStorage.setItem("auth.username", user.username);
    const cookie = useCookie('Authorization', {maxAge: 365 * 24 * 60 * 60 * 1000})
    cookie.value = `Bearer ${user.token}`
    
    if ($route.query.next) {
      $router.push($route.query.next.toString());
    } else {
        $router.push('/')
    }
  } catch (error) {
    errorMessage.value = error;
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  }
};
</script>