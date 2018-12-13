/* eslint-disable */
import Vue from 'vue'
import createApp from './main'

Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData({
				store: this.$store,
				route: to
			})
				.then(next)
				.catch(next)
		} else {
			next()
		}
	}
})

const { app, router, store } = createApp()

/* 获得初始数据 */
import { LODA_ARTICLES_ASYNC } from '@/components/Article/module.js'
import { READ_COMMENT_DATA_ASYNC } from '@/components/Comment/module.js'
;(function getInitialData() {
	const { getArticles, getCommentsAll } = store.getters
	const { dispatch } = store
	// 获取类别信息
	dispatch(LODA_ARTICLES_ASYNC)
	dispatch(READ_COMMENT_DATA_ASYNC, {id: ''})
	setTimeout(() => {
		console.log(getArticles, '文章')
		console.log(getCommentsAll, '评论')
	}, 1000)
})()

if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)
		let diffed = false
		const activated = matched.filter((c, i) => {
			return diffed || (diffed = prevMatched[i] !== c)
		})
		if (!activated.length) {
			return next()
		}
		Promise.all(
			activated.map((c) => {
				if (c.asyncData) {
					return c.asyncData({
						store,
						route: to
					})
				}
			})
		)
			.then(() => {
				next()
			})
			.catch(next)
	})
	app.$mount('#root')
})
