<template>
<!--  脆弱性预警-->
    <div class="fragilityWarning">
      <div class="angle left-top"></div>
      <div class="angle left-bottom"></div>
      <div class="angle right-top"></div>
      <div class="angle right-bottom"></div>
      <chart :options='fragilityWarning' :auto-resize="true"/>
    </div>
</template>

<script>
  export default{
    data () {
      return{
        fragilityWarning:{}
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        this.fragilityWarning =  {
          title: {
            text: '脆弱性预警',
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
            x: 'auto',
            y: 'auto',
            left:'center',
            bottom:0,
            itemWidth:10,
            itemGap:2,
            data: ['一般情报', '重要情报', '关键情报', '脆弱警告', '脆弱报警'],
            textStyle: {
              color: '#eee',
              fontSize:10
            }
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '30%',
            top:'15%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              // data: this.datadata.columnsTitle,
              data: ['2020-\n09-08', '2020-\n09-09', '2020-\n09-10', '2020-\n09-11', '2020-\n09-12'],
              axisLine: {
                lineStyle: {
                  color: '#fff'
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
              // data: this.datadata.columnsDataAll.dataSuccBottom,
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fragilityWarning{
    position: relative;
    width: 50%;
    height: 100%;
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
</style>
