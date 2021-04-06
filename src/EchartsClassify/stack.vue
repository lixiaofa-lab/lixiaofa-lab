<template>
<!--  重要性指标-->
    <div class="stack" style="height: 100%">
      <chart :options='stack' :auto-resize="true"/>
    </div>
</template>

<script>
  export default{
    props:['warningData'],
    watch: {
      'warningData' () {
        this.init()
      }
    },
    data () {
      return{
        stack:{}
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        let arrRed = [];
        let arrOrange = [];
        let arrYellow = [];
        let arrBlue = [];
        let arrAxisY = [];

        for(let item of this.warningData){
            arrRed.push(item.red).reverse
            arrOrange.push(item.orange).reverse
            arrYellow.push(item.yellow).reverse
            arrBlue.push(item.blue).reverse
            arrAxisY.push(item.type).reverse
        }
          arrRed.reverse()
          arrOrange.reverse()
          arrYellow.reverse()
          arrBlue.reverse()
          arrAxisY.reverse()

        this.stack =  {
          // tooltip : {
          //   trigger: 'axis',
          //   axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          //   }
          // },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '15%',
            top:'2%',
            containLabel: true
          },
          xAxis:  {
            type: 'value',
            show:false,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              show:false,
              lineStyle: {
                color: '#fff'
              }
            },
            data:['0','1','2','3']
          },
          yAxis: {
            type: 'category',
            // data: ['炼油厂','通信基站','加油站','油库','火车站','变电站','国道','汽车站','机场','海港','发电厂'],
            data: arrAxisY,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              show:true,
              textStyle: {
                color: '#fff',
                fontSize:11,
              }
            },
            axisLine: {
              show:false,
              lineStyle: {
                show:false,
                color: '#fff'
              }
            }
          },
          series: [
            {
              name: '红',
              type: 'bar',
              stack: '总量',
              barWidth:12,
              // barCategoryGap:6,
              label: {
                normal: {
                  show: false,
                  position: 'insideRight',
                },
              },
              // data: [1,1,1,1,1,1,1,1,1,1,1],
              data:arrRed,
              itemStyle:{
                normal: {
                  show: false,
                  color:'red',
                  position: 'insideRight',
                },
              }
            },
            {
              name: '橙色',
              type: 'bar',
              stack: '总量',
              barWidth:12,
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              itemStyle:{
                normal: {
                  show: false,
                  color:'orange',
                  position: 'insideRight',
                },
              },
              // data: [0,0,0,0,1,1,1,1,1,1,1]
              data: arrOrange
            },
            {
              name: '黄',
              type: 'bar',
              stack: '总量',
              barWidth:12,
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              itemStyle:{
                normal: {
                  // barCategoryGap:10,
                  show: false,
                  color:'yellow',
                  position: 'insideRight',
                },
              },
              // data: [0,0,0,0,0,0,1,1,1,1,1]
              data: arrYellow
            },
            {
              name: '蓝',
              type: 'bar',
              stack: '总量',
              barWidth:12,
              areaStyle:{
                color:'blue',
              },
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              itemStyle:{
                normal: {
                  // barCategoryGap:10,
                  show: false,
                  color:'blue',
                  position: 'insideRight',
                },
              },
              // data: [0,0,0,0,0,0,0,0,0,0,1],
              data: arrBlue,
            }
          ]
        };
      }

    }
  }
</script>

<style lang="scss" scoped>
  .stack{
    width: 60%;
    height: 100%;
    .echarts{
      width: 100%;
      height: 100%;
    }
  }
</style>
