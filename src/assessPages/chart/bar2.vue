<template>

  <chart ref="chartchart" :options='options'/>

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
            text: '型号耗弹情况',
            subtext: '型号耗弹情况',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['总数', '达成'],
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
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          },
          xAxis: {
            type: 'category',
            data: this.datadata.columnsTitle,
            //data: ['DF-11A', 'DF-15B', 'DF-16', 'DF-21C', 'DF-26B', 'DF-10A', 'DF-17'],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          },
          color:['orange','darkcyan'],
          series: [
            {
              name: '总数',
              type: 'bar',
              data: this.datadata.columnsDataAll,
              // data: [1000, 1000, 1000, 1000, 1000, 1000, 1000]
            },
            {
              name: '达成',
              type: 'bar',
              data: this.datadata.columnsDataSucc,
              // data: [800, 900, 700, 750, 850, 950, 500]
            }
          ]

        }
      }
    },
    methods:{
      init(){
        this.options = {
          title: {
            text: '型号耗弹情况',
            subtext: '型号耗弹情况',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['总数', '达成'],
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
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          },
          xAxis: {
            type: 'category',
            data: this.datadata.columnsTitle,
            //data: ['DF-11A', 'DF-15B', 'DF-16', 'DF-21C', 'DF-26B', 'DF-10A', 'DF-17'],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          },
          color:['orange','darkcyan'],
          series: [
            {
              name: '总数',
              type: 'bar',
              data: this.datadata.columnsDataAll,
              // data: [1000, 1000, 1000, 1000, 1000, 1000, 1000]
            },
            {
              name: '达成',
              type: 'bar',
              data: this.datadata.columnsDataSucc,
              // data: [800, 900, 700, 750, 850, 950, 500]
            }
          ]

        }
      }
    }
  }
</script>



