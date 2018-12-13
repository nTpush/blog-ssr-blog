import Vue from 'vue'
import Vuex from 'vuex'
import article from '@/components/Article/module'
import comment from '@/components/Comment/module'
Vue.use(Vuex)
export default function createStore() {
  return new Vuex.Store({
    modules: {
      article,
      comment
    }
  })
}
