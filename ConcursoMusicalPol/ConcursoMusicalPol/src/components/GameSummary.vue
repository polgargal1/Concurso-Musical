<template>
  <div class="summary">
    <h2>Resultado del concurso</h2>
    <p class="phrase">{{ phrase }}</p>
    <ul class="stats">
      <li><strong>Puntos obtenidos:</strong> {{ score }}</li>
      <li><strong>Preguntas acertadas:</strong> {{ correctCount }} / {{ totalQuestions }}</li>
      <li><strong>Porcentaje de aciertos:</strong> {{ accuracy }} %</li>
      <li v-if="position"><strong>Posición en el ranking:</strong> {{ position }}</li>
      <li v-else><strong>Posición en el ranking:</strong> Fuera del top-10</li>
    </ul>
    <button class="again" @click="onPlayAgain">Jugar de nuevo</button>
  </div>
</template>

<script setup>
const props = defineProps({
  score: { type: Number, required: true },
  correctCount: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  position: { type: Number, default: null },
  onPlayAgain: { type: Function, required: true }
})

const phrase = computed(() => {
  if (props.accuracy === 100) return '¡Espectacular! Lo has acertado todo.'
  if (props.accuracy >= 70) return 'Muy bien, ¡tienes buen oído musical!'
  if (props.accuracy >= 40) return 'Nada mal, pero puedes mejorar con otra partida.'
  if (props.accuracy > 0) return 'Ha sido una ronda complicada. Inténtalo otra vez.'
  return 'No pasa nada, todos empezamos por algún sitio. ¡Vuelve a intentarlo!'
})
</script>

<script>
import { computed } from 'vue'
export default {}
</script>

<style scoped>
.summary {
  background: #020617;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #1f2937;
}
h2 {
  margin-top: 0;
  color: #38bdf8;
}
.phrase {
  margin-bottom: 1rem;
}
.stats {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}
.stats li {
  margin-bottom: 0.35rem;
}
.again {
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  border: none;
  background: #22c55e;
  color: #020617;
  cursor: pointer;
  font-weight: 600;
}
</style>
