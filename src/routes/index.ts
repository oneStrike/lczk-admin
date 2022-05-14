import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import localCache from '@/utils/localCache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/exception/404.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: true,
  trickleSpeed: 200,
  minimum: 0.3
})
router.beforeEach((to) => {
  NProgress.start()
  if (to.path !== '/login' && !localCache.get('token')) {
    return '/login'
  }
  return true
})
router.afterEach(() => {
  NProgress.done()
})
export default router
