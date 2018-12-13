import Qs from 'qs'
import {
   COMMENT_CREATE_URL,
   COMMENT_READ_URL,
   REPLY_CREATE_URL
  } from '@/apis/API.js'
  // 瀑布流每次增加3篇文
export const ADD_COMMENT_DATA = 'ADD_COMMENT_DATA'
export const SHOW_COMMENT_DATA = 'SHOW_COMMENT_DATA'

export const ADD_COMMENT_DATA_ASYNC = 'ADD_COMMENT_DATA_ASYNC'
export const READ_COMMENT_DATA_ASYNC = 'READ_COMMENT_DATA_ASYNC'

export const ADD_REPLY_DATA_ASYNC = 'ADD_REPLY_DATA_ASYNC'

  const comment = {
    state: {
      comments: []
    },
    getters: {
      getCommentsAll: state => state.comments
    },
    actions: {
      [ADD_REPLY_DATA_ASYNC]({
         commit
       }, payload) {
        console.log(Qs.stringify(payload), 'ok')
        return new Promise((resolve, reject) => {
          this._vm.$axios({
            commit,
            url: `${REPLY_CREATE_URL}`,
            data: Qs.stringify(payload),
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success(result) {
              resolve(result)
            },
            fail(err) {
              reject(err)
            }
          })
        })
      },
      [ADD_COMMENT_DATA_ASYNC]({
        commit
      }, payload) {
        console.log(Qs.stringify(payload), 'ok')
        return new Promise((resolve, reject) => {
          this._vm.$axios({
            commit,
            url: `${COMMENT_CREATE_URL}`,
            data: Qs.stringify(payload),
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success(result) {
              resolve(result)
            },
            fail(err) {
              reject(err)
            }
          })
        })
      },
      [READ_COMMENT_DATA_ASYNC]({
         commit
       }, payload) {
        console.log(payload, '999999999999')
        return new Promise((resolve, reject) => {
          this._vm.$axios({
            commit,
            url: `${COMMENT_READ_URL}?id=${payload.id}`,
            success(result) {
              commit(ADD_COMMENT_DATA, result.data)
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
      [ADD_COMMENT_DATA](state, payload) {
        state.comments = payload
        console.log(payload, '数据更新')
      }
    }
  }
  export default comment
