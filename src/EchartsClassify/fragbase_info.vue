<template>
<!--  基本信息-->
    <div class="base_info shine-box" :auto-resize="true">
      <div class="angle left-top"></div>
      <div class="angle left-bottom"></div>
      <div class="angle right-top"></div>
      <div class="angle right-bottom"></div>
      <p>基本信息</p>
      <div class="info">
          <div style="display: flex; margin-top: 12%">
            <div class="img">
<!--                  <img src="static/img/entity/百色机场.jpg" alt="">-->
              <img :src="getUrl()"  alt="" >
            </div>
            <table  v-if="$store.state.equipmentInfo == ''" border="1" cellspacing="0" >
              <tr>
                <td>DN:</td>
                <td>BSJC005</td>
              </tr>
              <tr>
                <td>MC:</td>
                <td>百色机场</td>
              </tr>
              <tr>
                <td>ZYX:</td>
                <td>58</td>
              </tr>
              <tr>
                <td>JD:</td>
                <td>107.18</td>
              </tr>
              <tr>
                <td>ID:</td>
                <td>5</td>
              </tr>
              <tr>
                <td>GC:</td>
                <td>0</td>
              </tr>
              <tr>
                <td>WD:</td>
                <td>24.03</td>
              </tr>

            </table>
            <table v-else border="1" cellspacing="0" >
              <tr>
                <td>DN:</td>
                <td>{{this.$store.state.equipmentInfo.code}}</td>
              </tr>
              <tr>
                <td>MC:</td>
                <td>{{this.$store.state.equipmentInfo.name}}</td>
              </tr>
              <tr>
                <td>ZYX:</td>
                <td>{{this.$store.state.equipmentInfo.fragility}}</td>
              </tr>
              <tr>
                <td>JD:</td>
                <td>{{this.$store.state.equipmentInfo.lat}}</td>
              </tr>
              <tr>
                <td>ID:</td>
                <td>{{this.$store.state.equipmentInfo.id}}</td>
              </tr>
              <tr>
                <td>GC:</td>
                <td>0</td>
              </tr>
              <tr>
                <td>WD:</td>
                <td>{{this.$store.state.equipmentInfo.lon}}</td>
              </tr>
            </table>

          </div>
      </div>
  </div>
</template>

<script>
  export default{
    watch: {
      '$store.state.equipmentInfo' () {
        this.init()
        this.operName = '222'
      }
    },
    data () {
      return{
        // defultUrl: '../../../static/img/entity/JC005.jpg', //默认图片
        defultUrl: '../../../distLogin/static/img/entity/JC005.jpg', //默认图片
        // imgFilesPath: '../../../static/img/entity/',
        imgFilesPath: '../../../distLogin/static/img/entity/',
        operName: ''
      }
    },
    created(){
      this.init()
    },
    methods:{
      getUrl(){
        // return  `${this.imgFilesPath}${this.eli_cate}.jpg`
        return this.operName ? `${this.imgFilesPath}${this.$store.state.equipmentInfo.code}.jpg` : this.defultUrl
      },
      init(){
        // console.log(this.$store.state.equipmentInfo)
        // this.fragilityOptions = {
        //   title: {
        //     text: '脆弱性指标',
        //     subtext: '',
        //     x: 'center',
        //     textStyle: {
        //       color: 'yellow',
        //       fontSize:12,
        //     }
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'shadow'
        //     }
        //   },
        //   grid: {
        //     left: '0%',
        //     right: '0%',
        //     bottom: '3%',
        //     top: '15%',
        //     containLabel: true
        //   },
        //   xAxis: {
        //     type: 'value',
        //     show:false,
        //     minInterval: 1,
        //     axisLabel: {
        //       show:false,
        //       textStyle: {
        //         color: '#fff'
        //       }
        //     },
        //     axisLine: {
        //       show:false,
        //       lineStyle: {
        //         color: '#fff'
        //       }
        //     }
        //   },
        //   yAxis: {
        //     type: 'category',
        //     data: ['火炮袭击易损性（x7）','出度（x13）', '距敌方兵力部署位置的距离（x2）', '距前沿距离（x1）',
        //       '距我方防卫部署地的距离（x3）','入度（x12）','地地导弹易损性（x5）', '我方防卫能力的大小（x4）', '重要性量得分（x10）', '特战袭击易损性（x8）'],
        //     axisLabel: {
        //       textStyle: {
        //         color: '#fff',
        //         fontSize:'10px',
        //       }
        //     },
        //     axisLine: {
        //       show:false,
        //       lineStyle: {
        //         // color: '#fff'
        //       }
        //     }
        //   },
        //   series: [
        //     {
        //       type: 'bar',
        //       data: [-851,-17,-9,8,22,28,107,218,2962,5778],
        //       itemStyle: {
        //         normal: {
        //           color: function (params) {
        //             let colorList = ['red', 'orange', ' yellow', 'blue']
        //             return colorList[params.dataIndex]
        //           }
        //         }
        //       }
        //     }
        //   ]
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes shine {
    0% {
      -webkit-box-shadow: 0 0 7px #007579;
      box-shadow: 0 0 7px #007579;
    }
    50% {
      -webkit-box-shadow: 0 0 14px #22bdcd;
      box-shadow: 0 0 14px #22bdcd;
    }
    100% {
      -webkit-box-shadow: 0 0 7px #007579;
      box-shadow: 0 0 7px #007579;
    }
  }
  .shine-box {
    webkit-box-shadow: 0 0 5px #003140;
    box-shadow: 0 0 5px #003140;
    -webkit-animation: shine 3s;
    animation: shine 3s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }


  .base_info{
    position: relative;
    width: 50%;
    height: 100%;
    background-color:rgba(51,51,51,.7);
    border: 1px solid rgba(51,51,51,.2);
    box-sizing: border-box;

    p{
      text-align: center;
      color: yellow;
      font-size: 12px;
      font-weight: bolder;
    }
    .info{
      display: flex;
      justify-content: space-between;
      .img{
        width: 50%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      table {
        width: 50%;
        text-align: center;
        font-size: 12px;
        color: #fff;
        border: 1px solid #0d6aad;
        background-color: #0D1A2D;
      }
    }


    .angle{
      position: absolute;
      width: 5px;
      height:5px;
    }
    .left-top{
      top:-3px;
      left: -3px;
      border-left: 4px solid rgba(33,142,121,.6);
      border-top: 4px solid rgba(33,142,121,.6);
    }
    .left-bottom{
      bottom:-3px;
      left: -3px;
      border-left: 4px solid   rgba(33,142,121,.6);
      border-bottom: 4px solid  rgba(33,142,121,.6);
    }
    .right-top{
      top:-3px;
      right: -3px;
      border-right: 4px solid  rgba(33,142,121,.6);
      border-top: 4px solid  rgba(33,142,121,.6);
    }
    .right-bottom{
      bottom:-3px;
      right:-3px;
      border-right: 4px solid rgba(33,142,121,.6);;
      border-bottom: 4px solid  rgba(33,142,121,.6);
    }
  }
</style>
