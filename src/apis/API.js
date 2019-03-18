let API_HOSTNAME
if (process.env.NODE_ENV === 'production') {
	API_HOSTNAME = 'http://118.24.194.224:20001/api'
	// API_HOSTNAME = 'http://new-practice.local/api'
} else {
	API_HOSTNAME = 'http://new-practice.local/api'
}
export const SSR_ARTICLE_LIST = `${API_HOSTNAME}/blog/article-list`

export const SSR_ARTICLE_DETAIL = `${API_HOSTNAME}/blog/article-detail`

export const ARTICLE_MD_URL = `${API_HOSTNAME}/blog/md`

export const COMMENT_CREATE_URL = `${API_HOSTNAME}/blog/create-comment`

export const COMMENT_READ_URL = `${API_HOSTNAME}/blog/read-comment`

export const REPLY_CREATE_URL = `${API_HOSTNAME}/blog/create-reply`

export const ADMIN_URL = 'http://118.24.194.224'
