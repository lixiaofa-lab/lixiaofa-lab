<template>

  <el-container class="judge-container">
    <iframe @load="loadStart" :src="url" frameborder="0" style="width:100%;height:100%;"></iframe>
  </el-container>

</template>

<script>

  export default {
    data(){
      return {
        // url:'/distfxpg/static/superMap/app/index.html'
        // url:'/static/superMap/app/index.html',


        url:'/static/earth/index.html',//开发用
        // url:'/distLogin/static/earth/index.html',//打包用
      }
    },
    methods:{
      loadStart (e) {
        let that = this
        window.GLOBAL_WINDOW = e.target.contentWindow
        let win = e.target.contentWindow

        loadEarth()

        function loadEarth () {
          if (win.EarthIsLoaded) {
            that.$store.commit('SET_THEFRAMELOADSTATE', 1)
          } else {
            setTimeout(() => {
              loadEarth()
            }, 2000)
          }
        }

      },
    }
  }

</script>

