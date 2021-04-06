// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import {http,http2} from './http'

import store from './store/index'
// import router from './router/index';
import Root from './Root.vue'

//xml数据处理插件
import x2js from 'x2js'

// 引入公共样式表
import 'normalize.css'
import 'animate.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入echarts主模块（基础模块）
import ECharts from 'vue-echarts/components/ECharts.vue'

// 引入需要的echarts如表
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'

// 引入需要的 echarts的交互组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/toolbox'

import 'src/assets/styles/variable.scss'
import 'src/assets/styles/base.scss'
import 'src/assets/styles/common.scss'
import 'src/assets/styles/iconfont.css'

Vue.use(ElementUI)

Vue.component('chart', ECharts)

// cytoscape
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';
cytoscape.use( edgehandles );
cytoscape.use(fcose);
cytoscape.use(dagre);
Vue.prototype.$cytoscape = cytoscape;



Vue.config.productionTip = false

/* eslint-disable no-new */

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = http
Vue.prototype.axios2 = http2
// Vue.prototype.$echarts = ECharts

Vue.prototype.$x2js = new x2js();



Vue.prototype.getViewportSize = function () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

import router from './router/index'

window.VUE_ENTITY = new Vue({
  el: '#app',
  store,
  router,
  template: '<Root/>',
  components: {Root}
})
