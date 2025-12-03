<template>
  <section class="game">
    <div v-if="!hasName" class="name-card">
      <h1>Bienvenido al concurso musical</h1>
      <p>Introduce tu nombre para comenzar. Lo usaremos durante la partida y en el ranking.</p>
      <form @submit.prevent="onStart">
        <input
          v-model="name"
          type="text"
          placeholder="Tu nombre"
          class="input"
          required
        />
        <button type="submit" class="btn">Comenzar</button>
      </form>
    </div>

    <div v-else>
      <header class="header">
        <div><strong>Jugador:</strong> {{ store.playerName }}</div>
        <div><strong>Puntos:</strong> {{ store.score }}</div>
        <div><strong>Pregunta:</strong> {{ store.currentIndex + 1 }} / {{ store.totalQuestions }}</div>
      </header>

      <QuestionCard
        v-if="!store.gameFinished && store.currentQuestion"
        :question="store.currentQuestion"
        :time-left="store.timeLeft"
        :result="store.lastAnswerResult"
        :on-answer="store.answer"
        :on-next="store.nextQuestion"
        :is-last="store.currentIndex + 1 === store.totalQuestions"
      />

      <GameSummary
        v-if="store.gameFinished"
        :score="store.score"
        :correct-count="store.correctCount"
        :total-questions="store.totalQuestions"
        :accuracy="store.accuracy"
        :position="store.lastPosition"
        :on-play-again="playAgain"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '../stores/gameStore'
import QuestionCard from '../components/QuestionCard.vue'
import GameSummary from '../components/GameSummary.vue'

const store = useGameStore()
const name = ref(store.playerName)

const hasName = computed(() => !!store.playerName)

const onStart = () => {
  store.setPlayerName(name.value)
  store.startGame()
}

const playAgain = () => {
  store.startGame()
}

watch(
  () => store.playerName,
  (value) => {
    if (!value) {
      name.value = ''
    }
  }
)
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.name-card {
  background: #020617;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #1f2937;
}
.name-card h1 {
  margin-top: 0;
}
form {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.input {
  flex: 1;
  min-width: 180px;
  padding: 0.6rem 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
}
.btn {
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  border: none;
  background: #38bdf8;
  color: #020617;
  font-weight: 600;
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}
@media (max-width: 640px) {
  .header {
    flex-direction: column;
  }
}
</style>
