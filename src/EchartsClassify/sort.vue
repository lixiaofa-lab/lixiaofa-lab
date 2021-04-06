<template>
<!--  分类统计-->
    <div class="sort shine-box">
      <div class="angle left-top"></div>
      <div class="angle left-bottom"></div>
      <div class="angle right-top"></div>
      <div class="angle right-bottom"></div>
      <chart :options='electricityOptions' :auto-resize="true"/>
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    data () {
      return{
        electricityOptions:{}
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        this.electricityOptions = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function (params) {
                    var colorList = [
                      {
                        c1:"#fce5ca",
                        c2:"#ff9d62",
                      },
                      {
                        c1:"#508dff",
                        c2:"#26c5fe",
                      },
                      {
                        c1:"#508dff",
                        c2:"#26c5fe",
                      },

                      {
                        c1:"#508dff",
                        c2:"#26c5fe",
                      },
                      {
                        c1:"#63e587",
                        c2:"#5fe2e4",
                      }]
                    return new echarts.graphic.LinearGradient(1,0,0,0,[//左下右上渐变
                      {
                        offset:0,
                        color:colorList[params.dataIndex].c1
                      },
                      {
                        offset:1,
                        color:colorList[params.dataIndex].c2
                      }])
                  },
                }

              },
            }
          ]
        };






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

  .sort{
    position: relative;
    width: 50%;
    height: 100%;
    background-color:rgba(51,51,51,.7);
    border: 1px solid rgba(25,143,121,.1);
    margin-left: 3%;
    .echarts {
      width: 100%;
      height: 100%;
      margin-left: 1%;
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
