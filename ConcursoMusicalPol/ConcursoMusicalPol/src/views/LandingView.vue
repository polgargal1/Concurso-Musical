<template>
  <section class="landing">
    <div class="hero">
      <h1>Concurso musical: pon a prueba tu oído</h1>
      <p class="intro">
        Escucha fragmentos de canciones, responde a las preguntas y consigue la mejor puntuación posible.
        Tienes solo unos segundos para decidir cada respuesta.
      </p>
      <router-link to="/concurso" class="cta">Empezar a jugar</router-link>
    </div>

    <div class="rules">
      <h2>Normas del concurso</h2>
      <ul>
        <li>Antes de comenzar, introduce tu nombre. Se mostrará durante la partida y en el ranking.</li>
        <li>Hay 20 canciones posibles, pero en cada partida se seleccionan 10 al azar.</li>
        <li>Cada canción tiene una pregunta y 4 respuestas posibles, solo una es correcta.</li>
        <li>Escucharás un fragmento de 5 segundos de cada canción, empezando en un punto aleatorio.</li>
        <li>Tienes un tiempo limitado para responder cada pregunta.</li>
        <li>Si aciertas, sumas 10 puntos. Si fallas, se restan 5 puntos.</li>
        <li>Si se agota el tiempo, se muestra la respuesta correcta pero tu puntuación no cambia.</li>
      </ul>
    </div>

    <div class="encourage">
      <h2>¿Te atreves a entrar en el top-10?</h2>
      <p>
        Al terminar la partida verás tu puntuación, tu porcentaje de aciertos y la posición en el ranking.
        Solo las diez mejores puntuaciones quedarán guardadas. ¡Intenta superar a los demás jugadores!
      </p>
      <router-link to="/ranking" class="link-ranking">Ver ranking</router-link>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.hero {
  background: radial-gradient(circle at top left, #1d4ed8, #020617);
  border-radius: 0.75rem;
  padding: 1.75rem 1.5rem;
}
.hero h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
.intro {
  margin-bottom: 1.25rem;
}
.cta {
  display: inline-block;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  background: #22c55e;
  color: #020617;
  text-decoration: none;
  font-weight: 600;
}
.rules, .encourage {
  background: #020617;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #1f2937;
}
.rules ul {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
}
.link-ranking {
  display: inline-block;
  margin-top: 0.5rem;
  color: #38bdf8;
  text-decoration: none;
}
</style>
