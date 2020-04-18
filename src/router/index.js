import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Read from '../views/Read'
import Login from '../components/auth/Login'
import Registration from '../components/auth/Registration'
import Main from '../views/Main.vue'
import Feedback from '../views/Feedback'
import AddImage from '../views/AddImage'

Vue.use(VueRouter)

const routes = [{
    path: '/read',
    components: {
      default: Read
    },
    props: true
  },
  {
    path: '/registration',
    components: {
      R: Registration
    },
    props: true
  },
  {
    path: '/login',
    components: {
      default: Login
    },
    props: true
  },
  {
    path: '/feedback',
    components: {
      default: Feedback
    },
    props: true
  },
  {
    path: '/addimage',
    components: {
      default: AddImage
    },
    props: true
  },
  {
    path: '/categories',
    component: () => import('../views/Categories.vue'),
    props: true
  },
  {
    path: '/gallery/:myid',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue'),
    props: true
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    // Если не зареган, то можно отправить его регаться
    // beforeEnter(to, from, next) {
    //   store.getters.checkUser ? next() : next('/login')
    // }
  }
]

const router = new VueRouter({
  routes
})

export default router