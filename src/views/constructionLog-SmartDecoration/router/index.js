/*
 * @Author: 许雷 创建
 * @Date: 2020-06-29
 * @Desc 施工日志路由
 */

import Layout from '@/layout'
/**
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为no redirect，则breadcrumb中不会重定向
 * name:'router-name'             名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'             图标显示在侧栏中,支持/src/icons/svg格式和element-ui icon两种形式
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */
export const constructionLogSmartDecorationRouter = [
  {
    path: '/constructionLog-SmartDecoration',
    component: Layout,
    redirect: '/constructionLog-SmartDecoration/list',
    name: 'ConstructionLogSmartDecoration',
    meta: { title: '', icon: 'el-icon-odometer' },
    children: [
      {
        path: 'list',
        name: 'ConstructionLogListSmartDecoration',
        component: () => import('@/views/constructionLog-SmartDecoration/list'),
        meta: { title: '施工日志' }
      },
      {
        path: 'new',
        name: 'NewConstructionLogSmartDecoration',
        hidden: true,
        component: () => import('@/views/constructionLog-SmartDecoration/newConstructionLog'),
        meta: { title: '新建施工日志', activeMenu: '/constructionLog-SmartDecoration/list' }
      },
      {
        path: 'edit',
        name: 'EditConstructionLogSmartDecoration',
        hidden: true,
        component: () => import('@/views/constructionLog-SmartDecoration/newConstructionLog'),
        meta: { title: '编辑施工日志', activeMenu: '/constructionLog-SmartDecoration/list' }
      },
      {
        path: 'addWorker',
        name: 'AddWorkerConstructionLogSmartDecoration',
        hidden: true,
        component: () => import('@/views/constructionLog-SmartDecoration/addWorker'),
        meta: { title: '新建施工日志(施工员版)', activeMenu: '/constructionLog-SmartDecoration/list' }
      },
      {
        path: 'DetailWorker',
        name: 'DetailWorkerConstructionLogSmartDecoration',
        hidden: true,
        component: () => import('@/views/constructionLog-SmartDecoration/detailWorker'),
        meta: { title: '施工日志详情(施工员版)', activeMenu: '/constructionLog-SmartDecoration/list' }
      },
      {
        path: 'addManager',
        name: 'AddManagerConstructionLogSmartDecoration',
        hidden: true,
        component: () => import('@/views/constructionLog-SmartDecoration/addManager'),
        meta: { title: '新建施工日志(项目经理版)', activeMenu: '/constructionLog-SmartDecoration/list' }
      },
      {
        path: 'DetailManager',
        name: 'DetailManagerConstructionLogSmartDecoration',
        hidden: true,
        component: () => import('@/views/constructionLog-SmartDecoration/detailManager'),
        meta: { title: '施工日志详情(项目经理版)', activeMenu: '/constructionLog-SmartDecoration/list' }
      },
      {
        path: 'listDetail',
        name: 'ConstructionLogDetailSmartDecoration',
        hidden: true,
        component: () => import('@/views/constructionLog-SmartDecoration/constructionLogDetail'),
        meta: { title: '施工日志详情', activeMenu: '/constructionLog-SmartDecoration/list' }
      }
    ]
  }
]
