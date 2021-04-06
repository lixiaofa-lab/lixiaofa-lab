<template>
  <!--  脆弱性指标-->
  <div class="targetImport shine-box">
        <div class="target">
            <div class="angle left-top"></div>
            <div class="angle left-bottom"></div>
            <div class="angle right-top"></div>
            <div class="angle right-bottom"></div>
            <chart :options='fragilityTarget' :auto-resize="true"/>
        </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fragilityTarget: {},

        importanceNormData: {
          name: [],
          value:[],
        }
      }
    },
    watch: {
      /**监听脆弱性设施类型选择*/
      '$store.state.theSelectedFragilityClassType' () {
        this.init()
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        let fragilityClassType = this.$store.state.theSelectedFragilityClassType

        let fragilityUrlA = '/facility/airFrag'
        // let importanceUrlB = '/facility/airFrag'
        if(fragilityClassType == 3){//电力设施
          fragilityUrlA = '/facility/elecFrag'
          // importanceUrlB = '/importElectric/classDatas'
        }

        // 获取脆弱性指标数据
        this.axios.get(fragilityUrlA).then((res) => {
          let {code, data, msg} = res
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          // console.log(data)
          let feature = []
          let value = []
          for (let item of data) {
            feature.push(item.feature)
            value.push(item.value)
          }
          feature.reverse()
          value.reverse()
          // console.log(data)
          this.fragilityTarget = {
            title: {
              text: '脆弱性指标',
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
              right: '0%',
              bottom: '0%',
              top: '6%',
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
              // data: ['占地面积（x17）','机场起降架次（x10）','距敌方兵力部署位置的距离（x2）', '机场跑道的长度（x7）',
              //   '日平均货运量（x14）','机场建设总投入（x4）','日平均客运量（x13）', '辐射半径（x18', '战时军事价值（x3）', '年平均收入（x5）'],
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 10
                }
              },
              axisLine: {
                show: false,
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
                // data: [1,1,2,2,2,3,4,4,35,40],
                data: value,
                barWidth:12,
                itemStyle: {
                  normal: {
                    color: function (params) {
                      let colorList = [
                        'red', ' yellow', 'blue', 'purple', 'orange',
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
                    show: false,
                    position: 'right',
                    textStyle: {
                      fontSize: 12,
                      fontWeight: 'bold'
                    },
                    formatter: "{c}"
                  }
                },
              }
            ]
          }

        })




        // this.fragilityTarget = {
        //   title: {
        //     text: '脆弱性指标',
        //     subtext: '',
        //     x: 'center',
        //     textStyle: {
        //       color: 'yellow',
        //       fontSize: 12,
        //     }
        //   },
        //
        //   //弹窗，相应鼠标滑过，显示具体细节
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'shadow'
        //     }
        //   },
        //   grid: {
        //     left: ' 0%',
        //     right: '10%',
        //     bottom: '10%',
        //     top: '25%',
        //     containLabel: true
        //   },
        //   xAxis: {
        //     type: 'value',
        //     show: false,
        //     minInterval: 0,
        //     axisLabel: {
        //       show: false,
        //       textStyle: {
        //         color: '#fff'
        //       }
        //     },
        //     axisLine: {
        //       show: false,
        //       lineStyle: {
        //         color: '#fff',
        //       }
        //     }
        //   },
        //   yAxis: {
        //     type: 'category',
        //     // data: arr,
        //     data: ['出度', '入度',
        //       '重要性','距敌方距离','距敌方距离'],
        //     axisLabel: {
        //       textStyle: {
        //         color: '#fff',
        //         fontSize: 10
        //       }
        //     },
        //     axisLine: {
        //       show: false,
        //       // position:'right',
        //       lineStyle: {
        //         show: false,
        //         color: "#fff"
        //       }
        //     },
        //     axisTick:{
        //       show:false,
        //     }
        //   },
        //   series: [
        //     {
        //       type: 'bar',
        //       data: [6,7,8,9,10],
        //       // data: arr1,
        //       barWidth:12,
        //       itemStyle: {
        //         normal: {
        //           color: function (params) {
        //             let colorList = [
        //               'red', ' pink', 'blue', 'green', 'yellow',
        //               // 'red', ' yellow', 'blue', 'purple', 'orange',
        //               // 'red', ' yellow', 'blue', 'purple', 'orange',
        //               // 'red', ' yellow', 'blue', 'purple', 'orange',
        //             ]
        //             return colorList[params.dataIndex]
        //           }
        //         },
        //       },
        //       label: {
        //         normal: {
        //           show: true,
        //           position: 'right',
        //           textStyle: {
        //             fontSize: 12,
        //             fontWeight: 'bold'
        //           },
        //           formatter: "{c}"
        //         }
        //       },
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

  .targetImport{
    /*box-sizing: border-box;*/
    width: 50%;
    height: 100%;
    background-color:rgba(51,51,51,.7);
    margin-right: 2%;
    position: relative;
    border: 1px solid rgba(25,143,121,.2);
    .target {
      width: 100%;
      height: 100%;
      ::-webkit-scrollbar /deep/{
        width: 1px!important;
        background: red;
      }
      overflow-x: hidden;
      overflow-y: scroll;
      /*border: 10px solid rgba(51,51,51,.2);*/
      .echarts {
        width: 100%;
        height: 200%;
        /*overflow: auto;*/
      }
      .angle{
        position: absolute;
        width: 5px;
        height:5px;
      }
      .left-top{
        top:-1%;
        left: -2%;
        border-left: 4px solid rgba(33,142,121,.6);
        border-top: 4px solid rgba(33,142,121,.6);
      }
      .left-bottom{
        top:97%;
        left: -2%;
        border-left: 4px solid   rgba(33,142,121,.6);
        border-bottom: 4px solid  rgba(33,142,121,.6);
      }
      .right-top{
        top:0%;
        left: 97%;
        border-right: 4px solid  rgba(33,142,121,.6);
        border-top: 4px solid  rgba(33,142,121,.6);
      }
      .right-bottom{
        top:97%;
        left:97%;
        border-right: 4px solid rgba(33,142,121,.6);;
        border-bottom: 4px solid  rgba(33,142,121,.6);
      }
    }




  }

</style>
