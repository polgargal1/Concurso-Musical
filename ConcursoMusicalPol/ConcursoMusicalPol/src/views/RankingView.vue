<template>
  <section class="ranking">
    <h1>Ranking de mejores puntuaciones</h1>

    <div v-if="!store.ranking.length" class="empty">
      <p>Todavía no hay ninguna puntuación registrada.</p>
      <p>Anímate a jugar una partida y conviértete en la primera persona en entrar al ranking.</p>
      <router-link to="/concurso" class="play-link">Jugar ahora</router-link>
    </div>

    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Puntos</th>
            <th>Precisión</th>
            <th>Tiempo de escucha</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in store.ranking"
            :key="entry.id"
            :class="rowClass(entry, index)"
          >
            <td>
              <span v-if="index === 0">👑</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else-if="index === 2">🥉</span>
              <span v-else>{{ index + 1 }}</span>
            </td>
            <td>{{ entry.name }}</td>
            <td>{{ entry.score }}</td>
            <td>{{ entry.accuracy }} %</td>
            <td>{{ formatTime(entry.totalTimeMs) }}</td>
            <td>{{ formatDate(entry.date) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="messages">
        <p v-if="store.lastEntryId && store.lastPosition && store.lastPosition <= 10">
          Tu última partida está en la posición <strong>{{ store.lastPosition }}</strong> del ranking.
        </p>
        <p v-else-if="store.lastEntryId">
          No has entrado en el top-10. Tendrás que hacerlo un poco mejor para aparecer en la clasificación.
        </p>
        <p v-else>
          Juega una partida para intentar entrar en el top-10.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'

const store = useGameStore()

const formatTime = (ms) => {
  if (!ms) return '—'
  const totalSeconds = Math.round(ms / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60)
  if (minutes === 0) return seconds + ' s'
  return minutes + ' min ' + seconds + ' s'
}

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return day + '/' + month + '/' + year
}

const rowClass = (entry, index) => {
  if (entry.id === store.lastEntryId) {
    return 'current'
  }
  if (index === 0) return 'first'
  if (index === 1 || index === 2) return 'podium'
  return ''
}
</script>

<style scoped>
.ranking {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
h1 {
  margin-top: 0;
}
.empty {
  background: #020617;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #1f2937;
}
.play-link {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  text-decoration: none;
  background: #38bdf8;
  color: #020617;
  font-weight: 600;
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
th, td {
  padding: 0.5rem 0.4rem;
  border-bottom: 1px solid #1f2937;
  text-align: left;
}
thead {
  background: #020617;
}
tbody tr:nth-child(even) {
  background: #020617;
}
tbody tr:nth-child(odd) {
  background: #020617;
}
.current {
  background: #1e293b !important;
}
.first {
  font-weight: 600;
}
.podium {
  font-weight: 500;
}
.messages {
  margin-top: 0.75rem;
}
</style>
