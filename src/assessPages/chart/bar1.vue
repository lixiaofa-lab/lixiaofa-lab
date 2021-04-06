<template>

  <chart :options='options'/>

</template>

<script>
  export default {
    props:['datadata'],
    data () {
      return {
        options: {
          title: {
            text: '波次耗弹情况',
            subtext: '波次耗弹情况',
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
            // data: ['第一波', '第二波', '第三波'],
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
              // data: [20000, 20000, 20000]
            },
            {
              name: '达成',
              type: 'bar',
              data: this.datadata.columnsDataSucc,
              // data: [15000, 18000, 19000]
            }
          ]

        }
      }
    }
  }
</script>



