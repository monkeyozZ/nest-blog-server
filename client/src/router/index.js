import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/article',
    component: Layout,
    // con: 'pen'
    meta: { icon: 'dashboard', title: '文章管理', hidden: false },
    children: [
      {
        path: 'index',
        name: 'articleindex',
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表', hidden: false }
      },
      {
        path: 'save',
        name: 'articleSave',
        component: () => import('@/views/article/save'),
        meta: { title: '发布文章', hidden: false }
      },
      {
        path: 'edit',
        name: 'articleEdit',
        component: () => import('@/views/article/edit'),
        hidden: true,
        meta: { title: '编辑文章' }
      },
      {
        path: 'tag',
        name: 'articletag',
        component: () => import('@/views/article/tag'),
        meta: { title: '文章标签', hidden: false }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    // icon: 'comment'
    meta: { icon: 'dashboard', title: '评论管理', hidden: false },
    children: [
      {
        path: 'index',
        name: 'commentindex',
        component: () => import('@/views/comment/index'),
        meta: { title: '所有评论', hidden: false }
      }
    ]
  },
  {
    path: '/timeline',
    component: Layout,
    // icon: 'time'
    meta: { icon: 'dashboard', title: '时间轴', hidden: false },
    children: [
      {
        path: 'index',
        name: 'timelineindex',
        component: () => import('@/views/time/index'),
        meta: { title: '时间轴列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'timelineinsert',
        component: () => import('@/views/time/insert'),
        meta: { title: '时间轴续写', hidden: false }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = []

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
