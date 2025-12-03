import { defineStore } from 'pinia'
import { questions as allQuestions } from '../questions'
import { Howl } from 'howler'

function shuffle(array) {
  const arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}

function loadRanking() {
  try {
    const raw = localStorage.getItem('music-quiz-ranking')
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveRanking(list) {
  localStorage.setItem('music-quiz-ranking', JSON.stringify(list))
}

export const useGameStore = defineStore('game', {
  state: () => ({
    playerName: '',
    questions: [],
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    totalTimeMs: 0,
    questionStartTime: null,
    currentHowl: null,
    isPlaying: false,
    timeLimit: 15,
    timeLeft: 15,
    timerId: null,
    lastAnswerResult: null,
    gameFinished: false,
    ranking: loadRanking(),
    lastPosition: null,
    lastEntryId: null
  }),
  actions: {
    setPlayerName(name) {
      this.playerName = name.trim()
    },
    startGame() {
      const shuffled = shuffle(allQuestions)
      this.questions = shuffled.slice(0, 10).map(q => {
        const indices = [0, 1, 2, 3]
        const shuffledIdx = shuffle(indices)
        const answers = shuffledIdx.map(i => q.answers[i])
        const correctAnswer = q.answers[q.correctIndex]
        const newCorrectIndex = answers.indexOf(correctAnswer)
        return {
          id: q.id,
          title: q.title,
          question: q.question,
          answers,
          correctIndex: newCorrectIndex,
          audioUrl: q.audioUrl
        }
      })
      this.currentIndex = 0
      this.score = 0
      this.correctCount = 0
      this.totalTimeMs = 0
      this.lastAnswerResult = null
      this.gameFinished = false
      this.lastPosition = null
      this.lastEntryId = null
      this.startQuestion()
    },
    startQuestion() {
      this.stopAudio()
      this.clearTimer()
      const current = this.currentQuestion
      if (!current) return
      this.timeLeft = this.timeLimit
      this.questionStartTime = Date.now()
      this.playRandomSegment(current.audioUrl)
      this.timerId = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1
        }
        if (this.timeLeft === 0) {
          this.handleTimeout()
        }
      }, 1000)
    },
    playRandomSegment(url) {
      const sound = new Howl({
        src: [url],
        html5: true,
        onload: () => {
          const duration = sound.duration()
          const segment = 5
          let start = 0
          if (duration > segment + 1) {
            const maxStart = duration - segment
            start = Math.random() * maxStart
          }
          sound.seek(start)
          sound.play()
          setTimeout(() => {
            sound.stop()
            this.isPlaying = false
          }, segment * 1000)
        }
      })
      this.currentHowl = sound
      this.isPlaying = true
    },
    clearTimer() {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
    },
    stopAudio() {
      if (this.currentHowl) {
        this.currentHowl.stop()
        this.currentHowl = null
      }
      this.isPlaying = false
    },
    answer(index) {
      if (this.gameFinished) return
      if (!this.currentQuestion) return
      if (this.lastAnswerResult && this.lastAnswerResult.questionIndex === this.currentIndex) return

      const now = Date.now()
      if (this.questionStartTime) {
        this.totalTimeMs += now - this.questionStartTime
      }
      this.questionStartTime = null

      this.clearTimer()
      this.stopAudio()

      const correctIndex = this.currentQuestion.correctIndex
      let message = ''
      let delta = 0
      let status = ''

      if (index === correctIndex) {
        delta = 10
        this.score += delta
        this.correctCount += 1
        status = 'correct'
        message = '¡Respuesta correcta! Has sumado 10 puntos.'
      } else {
        delta = -5
        this.score += delta
        status = 'wrong'
        message = 'Has fallado. Se restan 5 puntos y se muestra la respuesta correcta.'
      }

      this.lastAnswerResult = {
        questionIndex: this.currentIndex,
        selectedIndex: index,
        correctIndex,
        status,
        message
      }
    },
    handleTimeout() {
      if (this.gameFinished) return
      if (!this.currentQuestion) return
      this.clearTimer()
      this.stopAudio()

      const now = Date.now()
      if (this.questionStartTime) {
        this.totalTimeMs += now - this.questionStartTime
      }
      this.questionStartTime = null

      const correctIndex = this.currentQuestion.correctIndex
      this.lastAnswerResult = {
        questionIndex: this.currentIndex,
        selectedIndex: null,
        correctIndex,
        status: 'timeout',
        message: 'Se ha agotado el tiempo. No se modifica la puntuación.'
      }
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex += 1
        this.lastAnswerResult = null
        this.startQuestion()
      } else {
        this.finishGame()
      }
    },
    finishGame() {
      this.clearTimer()
      this.stopAudio()
      this.gameFinished = true
      const totalQuestions = this.questions.length || 1
      const accuracy = Math.round((this.correctCount / totalQuestions) * 100)
      const entry = {
        id: Date.now(),
        name: this.playerName || 'Anónimo',
        score: this.score,
        accuracy,
        correctCount: this.correctCount,
        totalTimeMs: this.totalTimeMs,
        date: new Date().toISOString()
      }
      const list = this.ranking.slice()
      list.push(entry)
      list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        if (a.totalTimeMs !== b.totalTimeMs) return a.totalTimeMs - b.totalTimeMs
        return new Date(a.date) - new Date(b.date)
      })
      const index = list.findIndex(e => e.id === entry.id)
      this.lastPosition = index + 1
      this.lastEntryId = entry.id
      this.ranking = list.slice(0, 10)
      saveRanking(this.ranking)
    }
  },
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentIndex] || null
    },
    totalQuestions(state) {
      return state.questions.length
    },
    accuracy(state) {
      if (!state.questions.length) return 0
      return Math.round((state.correctCount / state.questions.length) * 100)
    }
  }
})
