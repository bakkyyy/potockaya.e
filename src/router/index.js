import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/read',
    component: () => import('../views/Read.vue')
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
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, savedPosition) {
    return {
      x: 0,
      y: 290
    }
  }
})

export default router