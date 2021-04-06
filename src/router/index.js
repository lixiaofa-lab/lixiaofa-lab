import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers} from './route';
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import {setTitle} from 'src/assets/js/util';


Vue.use(VueRouter);

const routerConfig = {
  base: '/distLogin/',//war包的包名 打包成war包后 war包的名字也
  // mode: 'history',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: routers
};

const router = new VueRouter(routerConfig);

let loading;
router.beforeEach((to, form, next) => {
  if (form.name === 'frame') {

    MessageBox.confirm('确定保存了吗!!!', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showClose: false,
      type: 'error'
    }).then((action) => {//确定
      loading = Loading.service({
        // fullscreen: true,
        target: '.content-wrapper',
        text: '跳转中...'
      });
      // 设置window.document.title 的名称
      setTitle(to.meta.title);

      if (!to.matched.length) {
        next({
          path: '/error/404',
          replace: true
        });
      } else {
        next();
      }

    }).catch(() => {//取消
      return;
    })

  } else {
    loading = Loading.service({
      // fullscreen: true,
      target: '.content-wrapper',
      text: '跳转中...'
    });
    // 设置window.document.title 的名称
    setTitle(to.meta.title);

    if (!to.matched.length) {
      next({
        path: '/error/404',
        replace: true
      });
    } else {
      next();
    }
  }


});

router.afterEach((to, from) => {
  // 解决某些情况下loading无法关闭的情况
  setTimeout(() => {
    loading.close();
  }, 0)
});

export default router;
