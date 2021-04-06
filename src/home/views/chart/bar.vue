<template>

  <div class="chart-panel">

    <div class="header">
      <img src="/static/img/bg/CR.png" />
    </div>

    <div class="cantainer">
      <div class="left_box">
        <div class="left_top">
          <p>交通设施</p>
          <table border="1">
            <tr>
              <td>脆弱性</td>
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
        <div class="center_top">
          <chart :options='options'/>
        </div>
        <div class="center_bottom">
          <chart :options='options2'/>
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
              <p>{{pie}}%</p>
              <chart :options='pieOptions'/>
              <p>脆弱报警</p>
            </div>
            <div class="item">
              <p>{{pie1}}%</p>
              <chart :options='pieOptions1'/>
              <p>脆弱警告</p>
            </div>
            <div class="item">
              <p>{{pie2}}%</p>
              <chart :options='pieOptions2'/>
              <p>关键情报</p>
            </div>
            <div class="item">
              <p>{{pie3}}%</p>
              <chart :options='pieOptions3'/>
              <p>重要情报	</p>
            </div>
            <div class="item">
              <p>{{pie4}}%</p>
              <chart :options='pieOptions4'/>
              <p>一般情报</p>
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
        options2: {},
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
            text: '脆弱性总览',
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
            data: ['一般情报', '重要情报', '关键情报', '脆弱警告', '脆弱报警'],
            textStyle: {
              color: '#eee'
            }
          },
          color: ['#088d20', '#9bad63', '#951c9b', '#84993e', '#fe0005'],
          series: [
            {
              name: '重要性',
              type: 'pie',
              radius: ['40%', '55%'],
              data: [
                {value: 10, name: '一般情报'},
                // {value: options[0], name: '重要情报'},
                {value: 8, name: '重要情报'},
                {value: options[1], name: '关键情报'},
                {value: options[2], name: '脆弱警告'},
                {value: options[3], name: '脆弱报警'},
              ],
            }
          ]
        }

        this.options2 = {
          title: {
            text: '脆弱性分析',
            x: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['一般情报', '重要情报', '关键情报', '脆弱警告', '脆弱报警'],
            textStyle: {
              color: '#eee'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              // data: this.datadata.columnsTitle,
              data: ['2020-09-08', '2020-09-09', '2020-09-10', '2020-09-11', '2020-09-12'],
              axisLine: {
                lineStyle: {
                  color: '#fff',
                }
              },
              axisLabel: {
                interval: 0,
                // rotate: -90,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitNumber:3,
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
            }
          ],
          color: ['#088d20', '#9bad63', '#951c9b', '#84993e', '#fe0005'],
          series: [
            {
              name: '一般情报',
              type: 'bar',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccBottom
              data: [1, 0, 0, 1, 0],
              barWidth:5
            },
            {
              name: '重要情报',
              type: 'bar',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSucc
              data: [0, 1, 0, 0, 0]

            },
            {
              name: '关键情报',
              type: 'bar',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccTop
              data: [0, 0, 1, 0, 1]
            },
            {
              name: '脆弱警告',
              type: 'bar',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccTop
              data: [0, 1, 1, 0, 1]
            },
            {
              name: '脆弱报警',
              type: 'bar',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccTop
              data: [0, 0, 1, 0, 1],
            },
          ]
        }
        /* this.options = {
          title: {
            text: '目标毁伤结果',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['重度毁伤', '中度毁伤', '轻度毁伤'],
            textStyle: {
              color: '#eee'
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
              data: this.datadata.columnsTitle,
              // data: ['目标1', '目标2', '目标3', '目标4', '目标5'],
              axisLine: {

                lineStyle: {
                  color: '#fff',
                }
              },
              axisLabel:{
                interval:0,
                rotate:40,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
            }
          ],
          color:['#cddd9c','#ddb879','orange'],
          series: [
            {
              name: '轻度毁伤',
              type: 'bar',
              stack: '理想',
              data: this.datadata.columnsDataAll.dataSuccBottom
              // data: [100, 100, 100, 100, 100]
            },
            {
              name: '中度毁伤',
              type: 'bar',
              stack: '理想',
              data: this.datadata.columnsDataAll.dataSucc
              // data: [100, 100, 100, 100, 100]

            },
            {
              name: '重度毁伤',
              type: 'bar',
              stack: '理想',
              data: this.datadata.columnsDataAll.dataSuccTop
              // data: [100, 100, 100, 100, 100]
            },

            {
              name: '轻度毁伤',
              type: 'bar',
              stack: '现实',
              data: this.datadata.columnsDataSucc.dataSuccBottom
              // data: [100, 100, 100, 100, 100]
            },
            {
              name: '中度毁伤',
              type: 'bar',
              stack: '现实',
              data: this.datadata.columnsDataSucc.dataSucc
              // data: [100, 100, 0, 100, 0]
            },
            {
              name: '重度毁伤',
              type: 'bar',
              stack: '现实',
              data: this.datadata.columnsDataSucc.dataSuccTop
              // data: [0, 100, 0, 0, 0]
            }
          ]
        }  */

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
              data: ['脆弱报警', '脆弱警告', '关键情报', '重要情报', '一般情报'],
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
                    let colorList = ['#fe0005', '#84993e', '#951c9b', '#9bad63', '#088d20']
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
            data: ['脆弱报警', '脆弱警告', '关键情报', '重要情报', '一般情报'],
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
                    let colorList = ['#fe0005', '#84993e', '#951c9b', '#9bad63', '#088d20']
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
          let pie = 0
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
          this.pie = (pie / total * 100)
          this.pie1 = (pie1 / total * 100)
          this.pie2 = (pie2 / total * 100)
          this.pie3 = (pie3 / total * 100)
          this.pie4 = (pie4 / total * 100)
          this.pieOptions = {
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
                  {value: pie, name: '脆弱报警'},
                  {value: total - pie, name: '其他'},
                ],
                color: ['#fe0005', '#636E76'],
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }
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
                  {value: pie1, name: '脆弱警告'},
                  {value: total - pie1, name: '其他'},
                ],
                color: ['#84993e', '#636E76'],
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
                  {value: pie2, name: '关键情报'},
                  {value: total - pie2, name: '其他'}
                ],
                color: ['#951c9b', '#636E76'],
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
                  {value: pie3, name: '重要情报'},
                  {value: total - pie3, name: '其他'}
                ],
                color: ['#9bad63', '#636E76'],
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
                  {value: pie4, name: '一般情报'},
                  {value: total - pie4, name: '其他'}
                ],
                color: ['#088d20', '#636E76'],
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
            {name: '脆弱报警', num: 0},
            {name: '脆弱警告', num: 0},
            {name: '关键情报', num: 0},
            {name: '重要情报', num: 0},
            {name: '一般情报', num: 0},
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
          box-sizing: border-box;
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
          height: 50%;
          .echarts {
            width: 100%;
            height: 95%;
          }
        }
        .center_top {
          padding: 10px 0;
          box-sizing: border-box;
          border-bottom: 2px solid #1D81B6;
        }
        .center_bottom {
          padding: 10px 0;
          box-sizing: border-box;
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
          box-sizing: border-box;
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



