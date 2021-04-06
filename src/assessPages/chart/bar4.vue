<template>

  <chart :options='options'/>

</template>

<script>
  export default {
    props:['datadata'],
    watch:{
      'datadata'(){
        this.init()
      }
    },

    data () {
      return {
        options: {
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
                  color: '#fff'
                }
              },
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
        }
      }
    },
    methods:{
      init(){
        this.options = {
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
                  color: '#fff'
                }
              },
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
        }
      }
    }
  }
</script>



