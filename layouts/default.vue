<template>
    <nav>
        <h1>Events254</h1>
        <ul>
            <li>Explore</li>
            <li>Login</li>
            <li>Register</li>
        </ul>
    </nav>
    <slot></slot>

    <footer>
        <p>&copy; Events254 {{ year }}</p>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>