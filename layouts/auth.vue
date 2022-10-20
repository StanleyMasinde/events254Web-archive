<template>
    <div>
        <nuxt-loading-indicator color="#FF6601"></nuxt-loading-indicator>
        <div class="h-screen bg-[url('/authbg.svg')] bg-no-repeat bg-cover bg-center grid place-items-center">
            <slot></slot>
        </div>
    </div>
</template>