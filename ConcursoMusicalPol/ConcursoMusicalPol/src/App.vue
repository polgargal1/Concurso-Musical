<template>
  <div class="app">
    <NavBar />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #0f172a;
  color: #e5e7eb;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  box-sizing: border-box;
}
</style>
