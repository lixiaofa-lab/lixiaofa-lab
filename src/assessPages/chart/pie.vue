<template>

  <chart :options='getOptions()'/>

</template>

<script>
  export default {
    methods: {
      getOptions () {
        let arr = this.$store.state.theDamageResultData
        //总弹量
        let countAll = 0
        //总命中
        let countAllMZ = 0

        Array.from(arr, item => {
          let {
            fsddsl,//发射导弹数量
            mzddsl,//命中导弹数量
          } = item

          //总耗弹情况
          countAll += fsddsl
          countAllMZ += mzddsl
        })

        let data = [
          {value: countAll - countAllMZ, name: '被拦截弹量'},
          {value: countAllMZ, name: '突防成功弹量'},
        ]

        return {
          title: {
            text: '总体耗弹情况',
            subtext: '导弹发射突防情况',
            x: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10px',
            data: ['突防成功弹量', '被拦截弹量'],
            textStyle: {
              color: '#eee'
            }
          },
          color: ['orange', 'darkcyan'],
          series: [
            {
              name: '耗弹情况',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data,
              // data:[
              //   {value:20, name:'被拦截弹量'},
              //   {value:80, name:'突防成功弹量'},
              // ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    }
  }
</script>



