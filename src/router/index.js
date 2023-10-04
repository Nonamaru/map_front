import { createRouter, createWebHistory } from 'vue-router'
import NewUser from '@/views/NewUser.vue';
import AuthUser from '@/views/AuthUser.vue';

const zareganLi = function (to, from, next) {
  if (localStorage.getItem('id') == null) {
      next({name: 'auth'});
  } else {
      next();
  }
}
const ujeEst = function (to, from, next) {
  if (localStorage.getItem('id') == null) {
      next();
  } else {
      next({name: 'home'});
  }
}

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('../views/UserView.vue')
  // },
  {
    path: '/',
    name: 'home',
    component: NewUser,
    beforeEnter: zareganLi,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthUser,
    beforeEnter: ujeEst,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
