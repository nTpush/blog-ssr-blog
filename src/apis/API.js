let API_HOSTNAME
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'http://118.24.194.224:20001/api'
} else {
  API_HOSTNAME = 'http://118.24.194.224:20001/api'
}
export const SSR_ARTICLE_LIST = `${API_HOSTNAME}/blog/article-list`

export const SSR_ARTICLE_DETAIL = `${API_HOSTNAME}/blog/article-detail`

export const ARTICLE_MD_URL = `${API_HOSTNAME}/blog/md`

export const ADMIN_URL = 'http://118.24.194.224'
