// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import hljs from 'highlight.js'
import App from './App'
import createRouter from './router'
import createStore from './store'
import async from './utils/async'
Vue.config.productionTip = false
Vue.use(async)
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  setTimeout(() => {
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
      // $('pre code').each(function () {
      //   var lines = $(this).text().split('\n').length - 1
      //   var $numbering = $('<ul/>').addClass('pre-numbering')
      //   $(this)
      //     .addClass('has-numbering')
      //     .parent()
      //     .append($numbering)
      //   for (var i = 1; i <= lines; i++) {
      //     $numbering.append($('<li/>').text(i + '.'))
      //   }
      // })
    })
  }, 100)
})

/* eslint-disable no-new */
export default function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}
