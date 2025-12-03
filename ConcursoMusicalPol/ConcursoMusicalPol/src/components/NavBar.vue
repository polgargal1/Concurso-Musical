<template>
  <header class="nav">
    <div class="nav-inner">
      <router-link to="/" class="logo">Concurso musical</router-link>
      <nav class="links">
        <router-link to="/" class="link" active-class="active">Inicio</router-link>
        <router-link to="/concurso" class="link" active-class="active">Concurso</router-link>
        <router-link to="/ranking" class="link" active-class="active">Ranking</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.nav {
  background: #020617;
  border-bottom: 1px solid #1f2937;
}
.nav-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-weight: 700;
  color: #38bdf8;
  text-decoration: none;
}
.links {
  display: flex;
  gap: 0.75rem;
}
.link {
  text-decoration: none;
  color: #e5e7eb;
  font-size: 0.95rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
}
.link:hover {
  background: #0f172a;
}
.active {
  background: #38bdf8;
  color: #020617;
}
</style>
