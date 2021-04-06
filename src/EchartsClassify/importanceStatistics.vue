<template>
  <!--  重要性统计-->
  <div class="fragilityStatistics shine-box">
    <div class="angle left-top"></div>
    <div class="angle left-bottom"></div>
    <div class="angle right-top"></div>
    <div class="angle right-bottom"></div>
    <chart :options='importanceStatistics' :auto-resize="true"/>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        importanceStatistics: {},
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
      '$store.state.theSelectedImportanceClassType' () {
        this.init()
      },
    },
    methods: {
      init () {

        //重要性选择类型
        let importanceClassType = this.$store.state.theSelectedImportanceClassType
        //设置选中的设施  1 交通设施 2 通讯设施 3 电力设施 4 石化设施
        // console.log(importanceClassType)
        if (importanceClassType == 1) {
          var type = '交通设施'
        }
        if (importanceClassType ==3) {
          var type = '电力设施'
        }


          this.axios.get(`/facility/importPer/${type}`).then((res) => {
            let {code, data, msg} = res
            // console.log(data)
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



            this.importanceStatistics = {
              title: {
                text: '重要性统计',
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
              color: ['#095AB3','#A3E298','#DF8F47','#A883E8'],
              legend: {
                show:true,
                // orient: 'vertical',
                x: 'center',
                y: 'bottom',
                itemWidth: 14,
                align:'left',
                data: ['一般','普通','重要','极其重要'],
                textStyle: {
                  color: '#eee'
                }
              },
              series : [
                {
                  name: '机场',
                  type: 'pie',
                  radius: ['0%','55%'],
                  center: ['50%', '50%'],
                  data:[
                    {value:arr1[0], name:'一般'},
                    {value:arr1[1], name:'普通'},
                    {value:arr1[2], name:'重要'},
                    {value:arr1[3], name:'极其重要'},
                  ],
                  // data:data,
                  itemStyle: {
                    normal:{
                      label:{     //指示线文字
                        show:true,
                        position:'inner',   //标签的位置
                        textStyle:{
                          fontWeight:200,
                          fontSize:10,
                          color:'black',
                        },
                        formatter:'{d}%' //转换百分比
                      },
                      labelLine:{   //指示线状态
                        show:false,
                        smooth:0.2,
                        // length:10,
                        // length2:0,
                      },
                    },
                  },
                },
                // {
                //   name: '机场',
                //   type: 'pie',
                //   radius: ['0%','55%'],
                //   center: ['50%', '50%'],
                //   data:[
                //     {value:70, name:'一般'},
                //     {value:15, name:'普通'},
                //     {value:10, name:'重要'},
                //     {value:5, name:'极其重要'},
                //   ],
                //   itemStyle: {
                //     normal:{
                //       label:{     //指示线文字
                //         show:false,
                //         // position:'inner',   //标签的位置
                //         // textStyle:{
                //         //   fontWeight:200,
                //         //   fontSize:12,
                //         //   color:'black',
                //         // },
                //         // formatter:'{d}%' //转换百分比
                //       },
                //       labelLine:{   //指示线状态
                //         show:false,
                //         smooth:0.2,
                //         length:10,
                //         length2:10,
                //       },
                //     },
                //   },
                // },
              ]
            }

          })


        // // 极其重要
        // let importanceUrlA = '/facility/jqImportCount/交通设施'
        // // 重要
        // let importanceUrlB = '/facility/ImportCount/交通设施'
        // // 普通
        // let importanceUrlC = '/facility/ptImportCount/交通设施'
        // // 一般
        // let importanceUrlD = '/facility/ybImportCount/交通设施'

        // if (importanceClassType == 3) {//电力设施
        //   importanceUrlA = '/facility/jqImportCount/电力设施'
        //   importanceUrlB = '/facility/ImportCount/电力设施'
        //   importanceUrlC = '/facility/ptImportCount/电力设施'
        //   importanceUrlD = '/facility/ybImportCount/电力设施'
        // }











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
      top:-3px;
      left: -3px;
      border-left: 4px solid rgba(33,142,121,.6);
      border-top: 4px solid rgba(33,142,121,.6);
    }
    .left-bottom{
      bottom:-3px;
      left: -3px;
      border-left: 4px solid   rgba(33,142,121,.6);
      border-bottom: 4px solid  rgba(33,142,121,.6);
    }
    .right-top{
      top:-3px;
      right: -3px;
      border-right: 4px solid  rgba(33,142,121,.6);
      border-top: 4px solid  rgba(33,142,121,.6);
    }
    .right-bottom{
      bottom:-3px;
      right:-3px;
      border-right: 4px solid rgba(33,142,121,.6);;
      border-bottom: 4px solid  rgba(33,142,121,.6);
    }
  }
</style>
