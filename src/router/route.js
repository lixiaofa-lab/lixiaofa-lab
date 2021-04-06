// 覆盖路由 部署的时候覆盖
export const allRouter = {
  path: '*',
  component: () =>
    import('src/pages/error/index')
}
// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
}


// 业务相关
// export const MainRouter = {
//   // path: '/loginPage',
//   path: '',
//   name: 'mainRouter',
//   props: true,
//   meta: {
//     requireAuth: true,
//     title: '火箭军训练管理大数据典型分析应用'
//   },
//   component: () =>import('src/home/views/loginPage'),
//   // component: () =>import('src/home/views/template'),
// }

export const HomeRouter = {
  path: '/',
  name: 'HomeRouter',
  props: true,
  redirect:'/importance',
  meta: {
    requireAuth: true,
    title: '中越边境重要设施防卫分析'
  },
  component: () =>import('src/home/importance'),
  // component: () =>import('src/home/echarts'),
  // children: [
  //   {   //重要性
  //     path: '/fragility',
  //     name: 'fragility',
  //     props: true,
  //     meta: {
  //       requireAuth: true,
  //       title: '中越边境重要设施防卫分析'
  //     },
  //     component: () =>import('src/home/fragility'),
  //   }
  // ]
}

export const importance = {   //重要性
  path: '/importance',
  name: 'importance',
  props: true,
  meta: {
    requireAuth: true,
    title: '中越边境重要设施防卫分析'
  },
  component: () =>import('src/home/importance'),
  // component: () =>import('src/home/views/template'),
}

export const fragility = {  //脆弱性
  path: '/fragility',
  name: 'fragility',
  props: true,
  meta: {
    requireAuth: true,
    title: '中越边境重要设施防卫分析'
  },
  component: () =>import('src/home/fragility'),
  // component: () =>import('src/home/views/template'),
}








export const pageRouter = {
  path: '/pie',
  name: 'pie',
  props: true,
  meta: {
    requireAuth: true
  },
  component: () =>import('src/home/views/chart/pie'),
}
export const pageRouter2 = {
  path: '/bar',
  name: 'bar',
  props: true,
  meta: {
    requireAuth: true
  },
  component: () =>import('src/home/views/chart/bar'),
}
export const dataImport = {
  path: '/import',
  name: 'import',

  props: true,
  meta: {
    requireAuth: true
  },
  component: () =>import('src/home/views/importPage'),
}
export const pageLogin = {
  path: '/login',
  name: 'login',
  props: true,
  meta: {
    requireAuth: true
  },
  component: () =>import('src/home/views/loginPage'),
}


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里

export const routers = [
  allRouter,
  errorRouter,
  // MainRouter,
  pageRouter,
  pageRouter2,
  dataImport,
  pageLogin,
  HomeRouter,
  importance,
  fragility

]
