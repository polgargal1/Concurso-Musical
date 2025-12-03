<template>
  <div class="card">
    <h2 class="title">{{ question.title }}</h2>
    <p class="question">{{ question.question }}</p>

    <p class="timer">Tiempo restante: {{ timeLeft }} s</p>

    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        class="answer"
        :class="answerClass(index)"
        @click="onAnswer(index)"
        :disabled="disabledButtons"
      >
        {{ answer }}
      </button>
    </div>

    <p v-if="resultMessage" class="result">{{ resultMessage }}</p>

    <button
      v-if="showNextButton"
      class="next"
      @click="onNext"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  question: { type: Object, required: true },
  timeLeft: { type: Number, required: true },
  result: { type: Object, default: null },
  onAnswer: { type: Function, required: true },
  onNext: { type: Function, required: true },
  isLast: { type: Boolean, required: true }
})

const disabledButtons = computed(() => !!props.result)

const showNextButton = computed(() => !!props.result)

const resultMessage = computed(() => (props.result ? props.result.message : ''))

const answerClass = (index) => {
  if (!props.result) return ''
  if (props.result.selectedIndex === index && props.result.status === 'wrong') {
    return 'wrong'
  }
  if (props.result.status === 'timeout') {
    if (index === props.result.correctIndex) return 'correct'
    return 'disabled'
  }
  if (index === props.result.correctIndex) {
    return 'correct'
  }
  if (props.result.selectedIndex === index && props.result.status === 'wrong') {
    return 'wrong'
  }
  return 'disabled'
}
</script>

<script>
import { computed } from 'vue'
export default {}
</script>

<style scoped>
.card {
  background: #020617;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #1f2937;
}
.title {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  color: #38bdf8;
}
.question {
  margin: 0 0 1rem;
  font-size: 1rem;
}
.timer {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #facc15;
}
.answers {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.answer {
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  background: #111827;
  color: #e5e7eb;
  text-align: left;
}
.answer:hover:enabled {
  background: #1f2937;
}
.answer.correct {
  background: #16a34a;
  color: white;
}
.answer.wrong {
  background: #dc2626;
  color: white;
}
.answer.disabled {
  opacity: 0.6;
  cursor: default;
}
.result {
  font-size: 0.95rem;
  margin-bottom: 1rem;
}
.next {
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  border: none;
  background: #38bdf8;
  color: #020617;
  cursor: pointer;
  font-weight: 600;
}
</style>
