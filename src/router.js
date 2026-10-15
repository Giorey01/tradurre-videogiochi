import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home, meta: { title: 'Rosetta Pixel', field: 'f1' } },
    { path: '/strumenti', component: () => import('./views/Strumenti.vue'), meta: { title: 'Strumenti', field: 'f3' } },
    { path: '/motori', component: () => import('./views/Motori.vue'), meta: { title: 'Motori', field: 'f4' } },
    { path: '/motori/:id', component: () => import('./views/Motore.vue'), meta: { title: 'Motore' } },
    { path: '/mestiere', component: () => import('./views/Mestiere.vue'), meta: { title: 'Il mestiere', field: 'f2' } },
    { path: '/ostacoli', component: () => import('./views/Ostacoli.vue'), meta: { title: 'Ostacoli', field: 'f5' } },
    { path: '/programma', component: () => import('./views/Programma.vue'), meta: { title: 'Un programma tuo?', field: 'f4' } },
    { path: '/percorso', component: () => import('./views/Percorso.vue'), meta: { title: 'Percorso', field: 'f5' } },
    { path: '/fonti', component: () => import('./views/Fonti.vue'), meta: { title: 'Fonti e community', field: 'f2' } },
    { path: '/:rest(.*)*', redirect: '/' },
  ],
  scrollBehavior(to) {
    if (to.hash && to.hash.length > 1 && !to.hash.startsWith('#/')) return { el: to.hash, top: 80 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.path === '/' ? 'Rosetta Pixel' : `${to.meta.title} · Rosetta Pixel`
})
