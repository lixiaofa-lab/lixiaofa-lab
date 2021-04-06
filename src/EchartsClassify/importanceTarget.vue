<template>
  <!--  重要性指标-->
  <div class="targetImport shine-box">
        <div class="target">
            <div class="angle left-top"></div>
            <div class="angle left-bottom"></div>
            <div class="angle right-top"></div>
            <div class="angle right-bottom"></div>
            <chart :options='importanceTarget' :auto-resize="true"/>
        </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        importanceTarget: {},

        importanceNormData: {
          name: [],
          value:[],
        }
      }
    },
    watch: {
      /**监听重要性设施类型选择*/
      '$store.state.theSelectedImportanceClassType' () {
        this.init()
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        let importanceClassType = this.$store.state.theSelectedImportanceClassType
        // console.log(importanceClassType)
        let importanceUrlA = '/facility/airImport'
        // let importanceUrlB = '/importance/classDatas'
        if(importanceClassType == 3){//电力设施
          importanceUrlA = '/facility/elecImport'
          // importanceUrlB = '/importElectric/classDatas'
        }
        //
        // 获取交通设施重要性指标数据
        this.axios.get(importanceUrlA).then((res) => {
          let {code, data, msg} = res
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          let feature = []
          let value = []
          for (let item of data) {
            feature.push(item.feature)
            value.push(item.value)
          }
          feature.reverse()
          value.reverse()
          // console.log(data)
          // console.log(feature)
          // console.log(value)

          this.importanceTarget = {
            title: {
              text: '重要性指标',
              subtext: '',
              x: 'center',
              textStyle: {
                color: 'yellow',
                fontSize: 12,
              }
            },
            //弹窗，相应鼠标滑过，显示具体细节
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: ' 0%',
              right: '20%',
              bottom: '3%',
              top: '12%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              show: false,
              minInterval: 0,
              axisLabel: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#fff',
                }
              }
            },
            yAxis: {
              type: 'category',
              data: feature,
              // data: ['出度', '入度',
              //   '服务能力','经济价值','军事价值'],
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 10
                }
              },
              axisLine: {
                show: false,
                // position:'right',
                lineStyle: {
                  show: false,
                  color: "#fff"
                }
              },
              axisTick:{
                show:false,
              }
            },
            series: [
              {
                type: 'bar',
                // data: [6,7,8,9,10],
                data: value,
                barWidth:12,
                itemStyle: {
                  normal: {
                    color: function (params) {
                      let colorList = [
                        'red', ' pink', 'blue', 'green', 'yellow',
                        'red', ' yellow', 'blue', 'purple', 'orange',
                        'red', ' yellow', 'blue', 'purple', 'orange',
                        'red', ' yellow', 'blue', 'purple', 'orange',
                      ]
                      return colorList[params.dataIndex]
                    }
                  },
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                      fontSize: 12,
                      fontWeight: 'bold',
                      color:'#fff',
                    },
                    formatter: "{c}"
                  }
                },
              }
            ]
          }
        })

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

  .targetImport{
    /*box-sizing: border-box;*/
    width: 50%;
    height: 100%;
    margin-right: 2%;
    position: relative;
    background-color:rgba(51,51,51,.7);
    border: 1px solid rgba(25,143,121,.2);
    .target {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      /*overflow-x: scroll;*/
      /*border: 10px solid rgba(51,51,51,.2);*/
      ::-webkit-scrollbar /deep/{
        width: 1px!important;
        background: red;
      }
      .echarts {
        width: 100%;
        height: 150%;
        /*overflow: auto;*/
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




  }

</style>
