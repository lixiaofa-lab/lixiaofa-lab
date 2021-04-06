<template>
<!--  石化设施脆弱性统计-->
    <div class="sort shine-box">
      <div class="angle left-top"></div>
      <div class="angle left-bottom"></div>
      <div class="angle right-top"></div>
      <div class="angle right-bottom"></div>
      <chart :options='electricityFragilityStatistics' :auto-resize="true"/>
    </div>
</template>

<script>
  export default{
    data () {
      return{
        electricityFragilityStatistics:{}
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        this.electricityFragilityStatistics = {
          title: {
            text: '石化设施脆弱性统计',
            subtext: '',
            x: '20',
            textStyle: {
              color: 'yellow',
              fontSize:12,
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '1%',
            right: '3%',
            bottom: '3%',
            top: '35%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['很高','高','中', '低'],
              axisTick: {
                show:false,
                inside:false,
                alignWithLabel: true
              },
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                show:true,
                lineStyle: {
                  color: '#fff'
                }
              }
            }
          ],
          yAxis: [
            {
              name:'数量',
              type: 'value',
              minInterval: 1,
              splitLine:{
                show:false,
              },
              axisLabel: {
                show:false,
                textStyle: {
                  color: '#fff'
                }
              },
              axisTick: {
                inside:true,
              },
              axisLine: {
                // show:false,
                // position:'right',
                lineStyle: {
                  color: '#fff'
                }
              }
            }
          ],
          series: [
            {
              type: 'bar',
              barWidth: '40%',
              data: [20,25,28,22,29],
              itemStyle: {
                normal: {
                  label:{
                    show:true,
                    position:'top',
                    textStyle:{
                      color:"#fff",
                      fontSize:10
                    }
                  },
                  color: function (params) {
                    let colorList = ['#E900CB', '#E900CB', '#E900CB', '#E900CB']
                    return colorList[params.dataIndex]
                  },
                }
              }
            }
          ]
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  @keyframes shine {
    0% {
      -webkit-box-shadow: 0 0 7px #007579;
      box-shadow: 0 0 7px #007579;
    }
    50% {
      -webkit-box-shadow: 0 0 14px #22bdcd;
      box-shadow: 0 0 14px #22bdcd;
    }
    100% {
      -webkit-box-shadow: 0 0 7px #007579;
      box-shadow: 0 0 7px #007579;
    }
  }
  .shine-box {
    webkit-box-shadow: 0 0 5px #003140;
    box-shadow: 0 0 5px #003140;
    -webkit-animation: shine 3s;
    animation: shine 3s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .sort{
    position: relative;
    width: 50%;
    height: 100%;
    background-color:rgba(51,51,51,.7);
    /*background-color:blue;*/
    border: 1px solid rgba(25,143,121,.1);
    margin-left: 3%;
    .echarts {
      width: 100%;
      height: 100%;
      margin-left: 1%;
    }
    .angle{
      position: absolute;
      width: 5px;
      height:5px;
    }
    .left-top{
      top:0%;
      left: -3%;
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
      top:0;
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
