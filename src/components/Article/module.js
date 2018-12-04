import {
  SSR_ARTICLE_LIST,
  SSR_ARTICLE_DETAIL
} from '@/apis/API.js'

// 获取所有文章
export const LODA_ARTICLES = 'LODA_ARTICLES'
export const LODA_ARTICLES_ASYNC = 'LODA_ARTICLES_ASYNC'
// 根据ID获取1篇文章
export const LODA_ARTICLE = 'LODA_ARTICLE'
export const LODA_ARTICLE_ASYNC = 'LODA_ARTICLE_ASYNC'

// 瀑布流每次增加3篇文
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const ADD_ARTICLE_ASYNC = 'ADD_ARTICLE_ASYNC'

const article = {
  state: {
    articles: [],
    article: {},
    add: []
  },
  getters: {
    getArticlesAll: state => state.articles,
    getArticles: state => state.add,
    getArticle: state => state.article
  },
  actions: {
    [ADD_ARTICLE_ASYNC]({
      commit
    }, payload) {
      commit(ADD_ARTICLE, payload)
    },
    [LODA_ARTICLES_ASYNC]({
      commit
    }, keyword = '') {
      console.log(keyword, 'keyword')
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: keyword ? `${SSR_ARTICLE_LIST}?keyword=${keyword}` : `${SSR_ARTICLE_LIST}`,
          success(result) {
            commit(LODA_ARTICLES, result)
            resolve(result)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    },
    [LODA_ARTICLE_ASYNC]({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: `${SSR_ARTICLE_DETAIL}?id=${payload.id}`,
          success(result) {
            commit(LODA_ARTICLE, result.data)
            resolve(result)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    }
  },
  mutations: {
    [LODA_ARTICLES](state, payload) {
      state.articles = payload
      state.add = state.articles.data.slice(0, 3)
    },
    [LODA_ARTICLE](state, payload) {
      state.article = payload
    },
    [ADD_ARTICLE](state, payload) {
      state.add = [...state.add, ...state.articles.data.slice((payload - 1) * 3, (payload - 1) * 3 + 3)]
    }
  }
}
export default article
