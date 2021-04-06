<template>

  <div class="chart-panel">

    <div class="header">
      <img src="/static/img/bg/ZY.png" />
    </div>

    <div class="cantainer">
      <div class="left_box">
        <div class="left_top">
          <p>交通设施</p>
          <table border="1">
            <tr>
              <td>重要性</td>
              <td>数量</td>
            </tr>
            <tr v-for="(item,index) in trafficArr" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.num}}</td>
            </tr>
          </table>
        </div>
        <div class="left_bottom">
          <p>电力设施</p>
          <chart :options='electricityOptions'/>
        </div>
      </div>
      <div class="cneter_box">
        <div>
          <chart :options='options'/>
        </div>
      </div>
      <div class="right_box">
        <div class="right_top">
          <p>通讯设施</p>
          <chart :options='communicationOptions'/>
        </div>
        <div class="right_bottom">
          <p>石化设施</p>
          <div class="pieConrent" v-if="oilArr.length != 0">
            <div class="item">
              <p>{{pie1}}%</p>
              <chart :options='pieOptions1'/>
              <p>特别重要</p>
            </div>
            <div class="item">
              <p>{{pie2}}%</p>
              <chart :options='pieOptions2'/>
              <p>很重要</p>
            </div>
            <div class="item">
              <p>{{pie3}}%</p>
              <chart :options='pieOptions3'/>
              <p>重要</p>
            </div>
            <div class="item">
              <p>{{pie4}}%</p>
              <chart :options='pieOptions4'/>
              <p>一般</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    watch: {
      '$store.state.theOpenWindowData' (v) {
        // window.opener.VUE_ENTITY.$store.state
        this.init()
      }
    },
    data () {
      return {
        options: {},
        electricityOptions: {},
        communicationOptions: {},
        pieOptions1: {},
        pieOptions2: {},
        pieOptions3: {},
        pieOptions4: {}
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        /**获取左侧分类列表*/
        let arr = window.opener.VUE_ENTITY.$store.state.theCheckdNodes
        let classList = Array.from(arr, item => {
          let {id} = item
          return id
        })

        /**获取实体数据*/
        let entitiesSource = window.opener.VUE_ENTITY.$store.state.theEntitiesLists
        let entityMap = new Map(entitiesSource)
        let entities = []
        Array.from(classList, item => {
          let eee = entityMap.get(item)
          if (Array.isArray(eee)) {
            entities.push(...eee)
          }
        })
        console.log(entities)

        let trafficArr = []
        let electricityArr = []
        let communicationArr = []
        let oilArr = []

        Array.from(entities, item => {
          let {classtype} = item
          if (classtype == 3) {
            electricityArr.push(item)
          }
          if (classtype == 4) {
            oilArr.push(item)
          }
          if (classtype == 5) {
            trafficArr.push(item)
          }
          if (classtype == 6) {
            communicationArr.push(item)
          }
        })

        let options = [0, 0, 0, 0]

        Array.from(entities, item => {
          let {lon, lat, alt, name, classAndId: classAddId, ZYX = 0, FSBJ = 0, classtype} = item
          if (ZYX >= 0.75) {//red
            options[3] = options[3] + 1
          } else if (ZYX >= 0.5) {//orange
            options[2] = options[2] + 1
          } else if (ZYX >= 0.25) {//yellow
            options[1] = options[1] + 1
          } else if (ZYX >= 0) {//green
            options[0] = options[0] + 1
          }
        })

        this.options = {
          title: {
            text: '重要性总览',
            subtext: '',
            x: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['一般', '重要', '很重要', '特别重要'],
            textStyle: {
              color: '#eee'
            }
          },
          color: ['blue', 'yellow', 'orange', 'red'],
          series: [
            {
              name: '重要性',
              type: 'pie',
              radius: ['40%', '55%'],
              data: [
                {value: options[0], name: '一般'},
                {value: options[1], name: '重要'},
                {value: options[2], name: '很重要'},
                {value: options[3], name: '特别重要'},
              ],
            }
          ]
        }

        let electricityOptions = [0, 0, 0, 0]
        Array.from(electricityArr, item => {
          let {ZYX = 0} = item
          if (ZYX >= 0.75) {
            electricityOptions[0] = electricityOptions[0] + 1
          } else if (ZYX >= 0.5) {
            electricityOptions[1] = electricityOptions[1] + 1
          } else if (ZYX >= 0.25) {
            electricityOptions[2] = electricityOptions[2] + 1
          } else if (ZYX >= 0) {
            electricityOptions[3] = electricityOptions[3] + 1
          }
        })
        this.electricityOptions = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['特别重要', '很重要', '重要', '一般'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 1,
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            }
          ],
          series: [
            {
              type: 'bar',
              barWidth: '60%',
              data: electricityOptions,
              itemStyle: {
                normal: {
                  color: function (params) {
                    let colorList = ['red', 'orange', ' yellow', 'blue']
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        }

        let communicationOptions = [0, 0, 0, 0]
        Array.from(communicationArr, item => {
          let {ZYX = 0} = item
          if (ZYX >= 0.75) {
            communicationOptions[0] = communicationOptions[0] + 1
          } else if (ZYX >= 0.5) {
            communicationOptions[1] = communicationOptions[1] + 1
          } else if (ZYX >= 0.25) {
            communicationOptions[2] = communicationOptions[2] + 1
          } else if (ZYX >= 0) {
            communicationOptions[3] = communicationOptions[3] + 1
          }
        })
        this.communicationOptions = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval: 1,
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['特别重要', '很重要', '重要', '一般'],
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: [
            {
              type: 'bar',
              data: communicationOptions,
              itemStyle: {
                normal: {
                  color: function (params) {
                    let colorList = ['red', 'orange', ' yellow', 'blue']
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        }

        this.oilArr = oilArr
        if (oilArr.length != 0) {
          let total = 0
          let pie1 = 0
          let pie2 = 0
          let pie3 = 0
          let pie4 = 0
          Array.from(oilArr, item => {
            let {ZYX = 0} = item
            if (ZYX >= 0.75) {
              pie1 = pie1 + 1
            } else if (ZYX >= 0.5) {
              pie2 = pie2 + 1
            } else if (ZYX >= 0.25) {
              pie3 = pie3 + 1
            } else if (ZYX >= 0) {
              pie4 = pie4 + 1
            }
            total = total + 1
          })
          this.pie1 = (pie1 / total * 100)
          this.pie2 = (pie2 / total * 100)
          this.pie3 = (pie3 / total * 100)
          this.pie4 = (pie4 / total * 100)
          this.pieOptions1 = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  {value: pie1, name: '特别重要'},
                  {value: total - pie1, name: '其他'},
                ],
                color: ['red', '#636E76'],
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }
          this.pieOptions2 = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  {value: pie2, name: '很重要'},
                  {value: total - pie2, name: '其他'}
                ],
                color: ['orange', '#636E76'],
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }
          this.pieOptions3 = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  {value: pie3, name: '重要'},
                  {value: total - pie3, name: '其他'}
                ],
                color: ['yellow', '#636E76'],
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }
          this.pieOptions4 = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  {value: pie4, name: '一般'},
                  {value: total - pie4, name: '其他'}
                ],
                color: ['blue', '#636E76'],
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }
        }

        if (trafficArr.length != 0) {
          let arr = [
            {name: '特别重要', num: 0},
            {name: '很重要', num: 0},
            {name: '重要', num: 0},
            {name: '一般', num: 0},
          ]
          Array.from(trafficArr, item => {
            let {ZYX = 0} = item
            if (ZYX >= 0.75) {
              arr[0].num = arr[0].num + 1
            } else if (ZYX >= 0.5) {
              arr[1].num = arr[1].num + 1
            } else if (ZYX >= 0.25) {
              arr[2].num = arr[2].num + 1
            } else if (ZYX >= 0) {
              arr[3].num = arr[3].num + 1
            }
          })
          this.trafficArr = arr
        } else {
          this.trafficArr = []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart-panel {
    background: radial-gradient(#0a8eae, #0c1a2d);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header {
      color: #fff;
      text-align: center;
    }

    .cantainer {
      flex: 1;
      display: flex;
      box-sizing: border-box;
      padding: 10px;

      div {
        flex: 1;
      }

      .left_box {
        border: 2px solid #1D81B6;
        border-radius: 5px;

        div {
          height: 50%;
        }

        .left_top {
          border-bottom: 2px solid #1D81B6;

          p {
            text-align: center;
            padding: 10px 0;
            font-size: 18px;
            color: #ffffff;
          }

          table {
            width: 95%;
            margin: 20px auto 0;
            border-collapse: collapse;
            border: 1px solid #1D81B6;

            tr {
              color: #fff;

              td {
                padding: 10px 5px;
                text-align: center;
              }
              td:nth-child(1) {
                width: 30%;
              }
            }
          }
        }

        .left_bottom {
          p {
            text-align: center;
            padding: 10px 0;
            font-size: 18px;
            color: #ffffff;
          }

          .echarts {
            width: 100%;
            height: 80%;
          }
        }
      }

      .cneter_box {
        border: 2px solid #1D81B6;
        border-radius: 5px;
        margin: 0 10px;
        div {
          box-sizing: border-box;
          padding: 10px 0;
          height: 100%;
          .echarts {
            width: 100%;
            height: 95%;
          }
        }
      }

      .right_box {
        border: 2px solid #1D81B6;
        border-radius: 5px;

        div {
          height: 50%;
        }

        .right_top {
          border-bottom: 2px solid #1D81B6;

          p {
            text-align: center;
            padding: 10px 0;
            font-size: 18px;
            color: #ffffff;
          }

          .echarts {
            width: 100%;
            height: 80%;
          }
        }

        .right_bottom {
          p {
            text-align: center;
            padding: 10px 0;
            font-size: 18px;
            color: #ffffff;
          }

          .pieConrent {
            margin-top: 50px;
            display: flex;
            height: 80%;

            .item {
              flex: 1;

              .echarts {
                width: 100%;
                height: 80%;
              }
            }
          }
        }
      }
    }

  }
</style>



