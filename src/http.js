import axios from 'axios';
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import store from './store/index';
import router from './router/index';
// import { sessionStorage } from 'src/assets/js/storage';

// if (!store.state.token) {
//   store.commit('SET_TOKEN', sessionStorage.getItem('token'));
// }

// axios 配置

const http = axios.create({
  //开发用
  //  baseURL: '/southdefend',
  //打包用
  baseURL: '',
  timeout: 1000 * 60 * 2,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // transformRequest: [function (data, headers) {
  //   headers.token = store.state.token;
  //   if (headers['Content-type'] === 'multipart/form-data') {
  //     return data;
  //   } else {
  //     return JSON.stringify(data);
  //   }
  // }]
  withCredentials: true
  // transformRequest: [function (data) {
  //   let ret = '';
  //   for (let it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
  //   }
  //   console.log(data);
  //   let retLast = ret.substring(0, ret.length - 1);
  //   console.log(retLast);
  //   return retLast;
  // }]
});


var loadingInstance;

// 请求拦截器
http.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: '正在请求数据...'
  });
  // config.data = JSON.stringify(config.data)
  // config.headers = {
  //   'Content-Type': 'application/json'
  // }

    // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
    // if (process.env.NODE_ENV === 'development') {
    //   const { method } = config;
    //   if (method === 'post' || method === 'put' || method === 'patch') {
    //     console.log(config.data);
    //   }
    // }


  return config;
}
);

// 响应拦截器
http.interceptors.response.use(res => {
  loadingInstance.close();
  // console.log(res);
  return res.data;
}, error => {
  loadingInstance.close();
  if (error && error.response) {
    console.log(error.response);

    switch (error.response.status) {
      //// 401 token失效
      //case 401:
      //  MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
      //    confirmButtonText: '重新登陆',
      //    showClose: false,
      //    type: 'error',
      //    callback: action => {
      //      router.replace({
      //        path: '/login',
      //        query: {
      //          redirect: router.currentRoute.fullPath
      //        }
      //      });
      //    }
      //  });
      //  break;
      //
      //// 403 服务器拒绝访问
      //case 403:
      //  router.push('/error/403');
      //  break;
      //
      //// 404 访问的资源不存在
      //case 404:
      //  router.push('/error/404');
      //  break;
      //
      //// 500 服务器错误
      //case 500:
      //  router.push('/error/500');
      //  break;
    }

    return Promise.reject(error);
  }
});


const http2 = axios.create({
  // baseURL: '/9527',//开发用
  baseURL: '/datamix',//打包用
  timeout: 1000 * 60 * 2,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true
});
let loadingInstance2;
// 请求拦截器
http2.interceptors.request.use(config => {
  loadingInstance2 = Loading.service({
      fullscreen: true,
      lock: true,
      text: '正在请求数据...'
    });
    return config;
  }
);
// 响应拦截器
http2.interceptors.response.use(res => {
  loadingInstance2.close();
  // console.log(res);
  return res.data;
}, error => {
  loadingInstance2.close();
  if (error && error.response) {
    console.log(error.response);
    return Promise.reject(error);
  }
});


export {http,http2}
