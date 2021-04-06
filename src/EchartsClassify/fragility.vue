<template>
<!--  脆弱性指标-->
<!--  <div style="overflow:hidden">-->
    <div class="fragility">
<!--      <div class="angle left-top"></div>-->
<!--      <div class="angle left-bottom"></div>-->
<!--      <div class="angle right-top"></div>-->
<!--      <div class="angle right-bottom"></div>-->
      <chart :options='fragilityOptions' :auto-resize="true"/>
    </div>
<!--  </div>-->
</template>

<script>
  export default{
    data () {
      return{
        fragilityOptions:{}
      }
    },
    watch:{
      /**监听脆弱性设施类型选择*/
      '$store.state.theSelectedFragilityClassType' () {
        this.init()
      },
    },
    created(){
      this.init()
    },
    methods:{
      init(){


        //脆弱性选择类型
        let fragilityClassType = this.$store.state.theSelectedFragilityClassType
        //设置选中的设施  1 交通设施 2 通讯设施 3 电力设施 4 石化设施
        let fragilityUrlA = '/fragility/datas'
        let fragilityUrlB = '/fragility/classDatas'
        if(fragilityClassType == 3){//电力设施
          fragilityUrlA = '/FragElectric/datas'
          fragilityUrlB = '/FragElectric/classDatas'
        }
        // 获取脆弱性指标数据
        this.axios.get(fragilityUrlA).then((res) => {
          let {code, data, msg} = res
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          let arr = []
          let arr1 = []
          for (let item of data) {
            arr.push(item.feature)
            arr1.push(item.value)
          }
          this.fragilityOptions = {
            title: {
              text: '脆弱性指标',
              subtext: '',
              x: 'center',
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
              left: '0%',
              right: '0%',
              bottom: '0%',
              top: '10%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              show:false,
              minInterval: 0,
              axisLabel: {
                show:false,
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                show:false,
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            yAxis: {
              type: 'category',
              // data: ['火炮袭击易损性（x7）','出度（x13）', '距敌方兵力部署位置的距离（x2）', '距前沿距离（x1）',
              //   '距我方防卫部署地的距离（x3）','入度（x12）','地地导弹易损性（x5）', '我方防卫能力的大小（x4）',
              //   '重要性量得分（x10）', '特战袭击易损性（x8）'],
              data:arr,
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize:10,
                }
              },
              axisLine: {
                show:false,
                lineStyle: {
                  show:false,
                  color: '#fff'
                }
              },
              axisTick:{
                show:false,
              }
            },
            series: [
              {
                type: 'bar',
                // data: [-851,-17,-9,8,22,28,107,218,2962,5778],
                data: arr1,
                barWidth:12,
                itemStyle: {
                  normal: {
                    color: function (params) {
                      let colorList = [
                        'red', 'orange', ' yellow', 'blue','green',
                        'purple', 'pink', 'gray','brown','red',
                        'yellow', 'blue','green',
                      ]
                      return colorList[params.dataIndex]
                    }
                  }
                },
                label: {
                  normal: {
                    show: false,
                    // position: 'right',
                    textStyle: {
                      // fontSize: '12',
                      // fontWeight: 'bold'
                    },
                    formatter: "{c}"
                  }
                },
              }
            ],

          }
        })

      }
    }
  }
</script>



<style lang="scss" scoped>
    .fragility{
      position: relative;
      width: 50%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      margin-right: 2%;
      background-color:rgba(51,51,51,.2);
      border: 1px solid rgba(51,51,51,.2);
      .echarts{
        width: 100%;
        height: 150%;
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
