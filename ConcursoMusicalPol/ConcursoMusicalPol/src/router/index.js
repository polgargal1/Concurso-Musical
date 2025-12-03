import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import GameView from '../views/GameView.vue'
import RankingView from '../views/RankingView.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingView },
  { path: '/concurso', name: 'game', component: GameView },
  { path: '/ranking', name: 'ranking', component: RankingView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
