import { authCheck, authorizationCheck, loginCheck } from '@/services/router.service'
import { createRouter, createWebHashHistory }        from 'vue-router'
import LoginView     from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import PresensiView  from '../views/PresensiView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: loginCheck
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    redirect : "/presensi",
    beforeEnter: authCheck,
    children: [
      {
        path: '/presensi',
        name: 'presensi',
        component: PresensiView
      },
      {
        path: '/nilai',
        name: 'score',
        component: () => import(/* webpackChunkName: "about" */ '../views/ScoreView.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        beforeEnter: authorizationCheck,
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
      },
      {
        path: '/guru',
        name: 'teacher',
        beforeEnter: authorizationCheck,
        component: () => import(/* webpackChunkName: "about" */ '../views/TeacherView.vue')
      },
      {
        path: '/siswa',
        name: 'student',
        component: () => import(/* webpackChunkName: "about" */ '../views/StudentView.vue')
      },
      {
        path: '/siswa/detail',
        name: 'student detail',
        props: route => ({ query: route.query }),
        component: () => import(/* webpackChunkName: "about" */ '../views/StudentDetailView.vue'),
      },
      {
        path: '/orangtua',
        name: 'parent',
        beforeEnter: authorizationCheck,
        component: () => import(/* webpackChunkName: "about" */ '../views/ParentView.vue')
      },
      {
        path: '/kelas',
        name: 'kelas',
        beforeEnter: authorizationCheck,
        component: () => import(/* webpackChunkName: "about" */ '../views/KelasView.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
