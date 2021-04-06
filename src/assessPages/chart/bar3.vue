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
            text: '目标命中弹量情况',
            subtext: '目标命中弹量情况',
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
            // data: ['目标1', '目标2', '目标3', '目标4', '目标5'],
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
              data: this.datadata.columnsDataAll
              // data: [100, 80, 90, 100, 80]
            },
            {
              name: '达成',
              type: 'bar',
              data: this.datadata.columnsDataSucc
              //data: [80, 70, 80, 90, 75]
            }
          ]

        }
      }
    },
    methods:{
      init(){
        this.options={
          title: {
            text: '目标命中弹量情况',
            subtext: '目标命中弹量情况',
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
            // data: ['目标1', '目标2', '目标3', '目标4', '目标5'],
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
              data: this.datadata.columnsDataAll
              // data: [100, 80, 90, 100, 80]
            },
            {
              name: '达成',
              type: 'bar',
              data: this.datadata.columnsDataSucc
              //data: [80, 70, 80, 90, 75]
            }
          ]

        }
      }
    }
  }
</script>



