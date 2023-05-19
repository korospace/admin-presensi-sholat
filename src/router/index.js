import { authCheck, authorizationCheck, loginCheck } from '@/services/router.service'
import { createRouter, createWebHashHistory }        from 'vue-router'
import LoginView     from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import PresensiView  from '../views/PresensiView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,meta: {
      title : 'Login'
    },
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
        meta: {
          title : 'Absensi siswa'
        },
        component: PresensiView
      },
      {
        path: '/nilai',
        name: 'score',
        meta: {
          title : 'Nilai siswa'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/ScoreView.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        beforeEnter: authorizationCheck,
        meta: {
          title : 'Daftar Admin'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
      },
      {
        path: '/guru',
        name: 'teacher',
        beforeEnter: authorizationCheck,
        meta: {
          title : 'Daftar guru'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/TeacherView.vue')
      },
      {
        path: '/siswa',
        name: 'student',
        meta: {
          title : 'Daftar siswa'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/StudentView.vue')
      },
      {
        path: '/siswa/detail',
        name: 'student detail',
        meta: {
          title : 'Detil Siswa'
        },
        props: route => ({ query: route.query }),
        component: () => import(/* webpackChunkName: "about" */ '../views/StudentDetailView.vue'),
      },
      {
        path: '/orangtua',
        name: 'parent',
        beforeEnter: authorizationCheck,
        meta: {
          title : 'Daftar orangtua'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/ParentView.vue')
      },
      {
        path: '/kelas',
        name: 'kelas',
        beforeEnter: authorizationCheck,
        meta: {
          title : 'Tabel kelas'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/KelasView.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next();
})

export default router
