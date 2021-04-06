<template>
  <!--  脆弱性统计-->
  <div class="fragilityStatistics shine-box">
    <div class="angle left-top"></div>
    <div class="angle left-bottom"></div>
    <div class="angle right-top"></div>
    <div class="angle right-bottom"></div>
    <chart :options='fragilityStatistics' :auto-resize="true"/>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        fragilityStatistics: {},
        data1:'',
        data2:'',
        data3:'',
        data4:'',
      }

    },
    created () {
      this.init()
    },
    watch: {
      /**监听脆弱性设施类型选择*/
      '$store.state.theSelectedFragilityClassType' () {
        this.init()
      },
    },
    methods: {
      init () {

        // 脆弱性选择类型
        let fragilityClassType = this.$store.state.theSelectedFragilityClassType
        //设置选中的设施  1 交通设施 2 通讯设施 3 电力设施 4 石化设施
      // console.log(fragilityClassType)
        if (fragilityClassType == 1) {
          var type = '交通设施'
        }
        if (fragilityClassType ==3) {
          var type = '电力设施'
        }


        // 获取脆弱性统计数据
          this.axios.get(`/facility/fragPer/${type}`).then((res) => {
              let {code, data, msg} = res
              if (code !== 0) {
                this.$message({
                  type: 'warning',
                  message: msg
                })
                return
              }
            var arr1 =[]
            var arr2 =[]
            for(let item of data){
              arr1.push(item.num)
            }
            console.log(arr1)

            this.fragilityStatistics = {
              title: {
                text: '脆弱性统计',
                subtext: '',
                x: 'center',
                textStyle: {
                  color: 'yellow',
                  fontSize: 12,
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              color: ['#E90035','#2C56A8','#CFFF99','#01DED5','#FDFF3A'],
              legend: {
                orient: 'vertical',
                x: 'right',
                y: 'center',
                itemWidth: 14,
                align:'left',
                data: ['极高','高','中','低'],
                textStyle: {
                  color: '#eee'
                }
              },
              series : [
                {
                  name: '机场',
                  type: 'pie',
                  radius: ['0%','55%'],
                  center: ['40%', '50%'],
                  data:[
                    {value:arr1[0], name:'高'},
                    {value:arr1[1], name:'极高'},
                    {value:arr1[2], name:'低'},
                    {value:arr1[3], name:'中'},
                  ],
                  // data:chartData,
                  itemStyle: {
                    normal:{
                      label:{     //指示线文字
                        show:true,
                        position:'inner',   //标签的位置
                        textStyle:{
                          fontWeight:200,
                          fontSize:12,
                          color:'black',
                        },
                        formatter:'{d}%' //转换百分比
                      },
                      labelLine:{   //指示线状态
                        show:false,
                        smooth:0.2,
                        length:10,
                        length2:20,
                      },
                    },
                  },
                  // data: ['一般', '重要', '很重要', '特别重要'],
                },
              ]
            }



    })










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
  .fragilityStatistics {
    position: relative;
    width: 50%;
    height: 100%;
    background-color:rgba(51,51,51,.7);
    border: 1px solid rgba(51,51,51,.2);
    .echarts {
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
