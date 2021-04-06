<template>
<!--  重要性统计-->
    <div class="statistics shine-box">
      <div class="angle left-top"></div>
      <div class="angle left-bottom"></div>
      <div class="angle right-top"></div>
      <div class="angle right-bottom"></div>
      <chart :options='options' :auto-resize="true"/>
    </div>
</template>

<script>
  export default{
    data () {
      return {
        options: {},
      }
    },
    created(){
        // console.log(this.chartData.zero.length)
        this.init()
    },
    watch:{
      /**监听重要性设施类型选择*/
      '$store.state.theSelectedImportanceClassType' () {
        this.init()
      },
    },
    methods:{
      init(){

        //重要性选择类型
        let importanceClassType = this.$store.state.theSelectedImportanceClassType
        //设置选中的设施  1 交通设施 2 通讯设施 3 电力设施 4 石化设施
        let importanceUrlA = '/importance/datas'  //重要性指标数据
        let importanceUrlB = '/importance/classDatas' //重要性等级数据
        if(importanceClassType == 3){//电力设施
          importanceUrlA = '/importElectric/datas'
          importanceUrlB = '/importElectric/classDatas'
        }

        // 获取重要性统计数据
        this.axios.get(importanceUrlB).then((res) => {
          let {code, data, msg} = res
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          // console.log(data)

          let arr0 = []
          let arr1 = []
          let arr2 = []
          let arr3 = []
          let arr4 = []
          for (let item of data) {
            if (item.level == 0) {
              item.name = '一般'
              arr0.push(item)
            }
            if (item.level == 1) {
              item.name = '普通'
              arr1.push(item)
            }
            if (item.level == 2) {
              item.name = '重要'
              arr2.push(item)
            }
            if (item.level == 3) {
              item.name = '很重要'
              arr3.push(item)
            }
            if (item.level == 4) {
              item.name = '极其重要'
              arr4.push(item)
            }
          }
          // console.log(arr0)

          let chartData = [
            {value: arr0.length, name: arr0[0].name},
            {value: arr1.length, name: arr1[0].name},
            {value: arr2.length, name: arr2[0].name},
            {value: arr3.length, name: arr3[0].name},
            {value: arr4.length, name: arr4[0].name}
          ]
          // console.log(chartData)

          this.options = {
            title: {
              text: '重要性统计',
              subtext: '',
              x: 'center',
              textStyle: {
                color: 'yellow',
                fontSize:12,
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            // legend: {
            //   x: 'center',
            //   y: 'bottom',
            //   data: ['一般', '重要', '很重要', '特别重要'],
            //   textStyle: {
            //     color: '#eee'
            //   }
            // },
            color: ['#4188FD', '#53C156', '#A382ED', 'pink','orange'],
            series: [
              {
                name: '重要性',
                type: 'pie',
                radius: ['15%','45%'],
                center:['52%','50%'],
                // data: [
                //   {value: this.chartData.zero.length, name: '一般'},
                //   {value: this.chartData.one.length, name: '普通'},
                //   {value: this.chartData.two.length, name: '重要'},
                //   {value: this.chartData.three.length, name: '很重要'},
                //   {value: this.chartData.four.length, name: '极其重要'},
                // ],
                data: chartData,
                labelLine:{
                  normal:{
                    length:1,
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                      fontSize: 10,
                      fontWeight: 'bold'
                    },
                    formatter: "{b}{c}"
                  }
                },
              }
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

  .statistics{
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
      top:0;
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
