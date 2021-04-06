<template>
<!--  系统态势-->
    <div class="state">
      <div class="angle left-top"></div>
      <div class="angle left-bottom"></div>
      <div class="angle right-top"></div>
      <div class="angle right-bottom"></div>
      <chart :options='systemState' :auto-resize="true"/>
    </div>
</template>

<script>
  export default{
    data () {
      return{
        systemState:{}
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        this.systemState =  {
          title: {
            text: '系统态势',
            x: 'center',
            textStyle: {
              color: 'yellow',
              fontSize:12,
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
            left: '1%',
            right: '1%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: [
            {
              axisTick:{
                show:false,
              },

              type: 'category',
              // data: this.datadata.columnsTitle,
              data: ['2020-\n09-08', '2020-\n09-09', '2020-\n09-10', '2020-\n09-11', '2020-\n09-12'],
              axisLine: {
                lineStyle: {
                  show:false,
                }
              },
                // spiltNumber:100,
              axisLabel: {
                color:'#fff',
                interval: 1,
                // rotate: -90,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick:{
                show:false,
              },
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
              type: 'line',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccBottom
              data: [1, 0, 0, 1, 0],
              // barWidth:5
            },
            {
              type: 'line',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSucc
              data: [1, 1, 0, 0, 0]

            },
            {
              type: 'line',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccTop
              data: [1, 0, 1, 0, 1]
            },
            {
              type: 'line',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccTop
              data: [1, 1, 1, 0, 1]
            },
            {
              type: 'line',
              stack: '理想',
              // data: this.datadata.columnsDataAll.dataSuccTop
              data: [1, 0, 1, 0, 1],
            },
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .state{
    position: relative;
    width: 50%;
    height: 100%;
    margin-right: 2%;
    background-color:rgba(51,51,51,.2);
    border: 1px solid rgba(51,51,51,.2);
    .echarts{
      width: 100%;
      height: 100%;
    }
    .angle{
      position: absolute;
      width: 5px;
      height:5px;
    }
    .left-top{
      top:0%;
      left: -2%;
      border-left: 4px solid rgba(33,142,121,.6);
      border-top: 4px solid rgba(33,142,121,.6);
    }
    .left-bottom{
      top: 97%;
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
      left: 97%;
      border-right: 4px solid rgba(33,142,121,.6);;
      border-bottom: 4px solid  rgba(33,142,121,.6);
    }
  }
</style>
