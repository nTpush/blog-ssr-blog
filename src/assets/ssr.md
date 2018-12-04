# Vue SSR

- CSS方面：使用postcss，另外采用vue-cli创建的项目，并未安装postcss-loader。让 module 代替 scope, 详情见[在vue中使用css modules替代scroped](https://www.cnblogs.com/xiaohuochai/p/8537959.html)

``` html
<style module lang="postcss">
  .wrapper {
    color: red
  }
</style>

<!-- html -->
<div :class="$style.wrapper">
  hello world
</div>
```

- 路由方面：使用history模式，另外，使用history模式，需得到后台的配合，否则刷新页面时会出现异常，因本人习惯于nginx的使用，所以附上nginx的相关配置，温馨提示一下，设置该模式之后，切勿使用router-link切换路由，原因是，使用它之后会造成切换路由时整个页面刷新，最后采用import异步引入组件，并对打包后的chunk重新命名

```js
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: '博客首页',
    component: () => import( /* webpackChunkName:'index' */ '@/blog')
  }]
})


location / {
  try_files $uri $uri/ /index.html;
}
```

- 接口方面：将请求地址区分生成环境或开发环境

```js
let API_HOSTNAME
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'http://118.24.194.224:20001/api'
} else {
  API_HOSTNAME = 'http://new-practice.local/api'
}
export const ARTICLE_URL = `${API_HOSTNAME}/article`
```

- axios方面：二次封装

- store方面：数据均通过状态管理器进行管理

- vue SSR 参见：[基于vue现有项目的服务器端渲染SSR改造](https://www.cnblogs.com/xiaohuochai/p/9158675.html)
  - npm install webpack-node-externals --save-dev
  - npm install sw-precache-webpack-plugin --save-dev
  - npm install cross-env --save-dev
  - npm install vue-server-renderer --save-dev