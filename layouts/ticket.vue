<template>
  <main>
      <nav class="py-4 px-1 sm:px-16 flex justify-between items-center">
          <div>
              <nuxt-link to="/tickets">
                  <button class=" rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                  </button>
              </nuxt-link>
          </div>

          <div class="text-center">
              <h1 class=" font-bold text-2xl">Ticket</h1>
          </div>

          <div>
              <button>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </button>
          </div>
      </nav>
      <slot></slot>
  </main>
</template>