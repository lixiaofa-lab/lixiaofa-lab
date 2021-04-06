<template>

  <chart :options='options'/>

</template>

<script>
  export default {
    data () {
      return {
        options: {
          title: {
            text: '气象条件变化风险',
            textStyle: {
              color: '#eee'
            }
          },
          color: ['orange'],
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
              data: ['标准条件', '低风险', '中风险', '高风险'],
              axisTick: {
                alignWithLabel: true
              },
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
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '99%',
              data: [100, 75, 50, 20]
            }
          ]
        }
      }
    }
  }
</script>



