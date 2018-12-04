import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      name: '博客首页',
      component: () => import( /* webpackChunkName:'index' */ '@/blog')
    }, {
      path: '/detail/:id',
      name: '博客详情',
      component: () => import( /* webpackChunkName:'detail' */ '@/blog/detail.vue')
    }]
  })
}
