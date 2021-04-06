<template>

  <chart :options='options' />

</template>

<script>
  export default {
    props:['datadata'],
    watch:{
      'datadata'(){
        this.init()
      }
    },
    data () {
      return {
        options: {
          title : {
            text: '总体情况',
            subtext: '打击目标毁伤情况',
            x:'center',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left:'center',
            bottom: '10px',
            data: ['未达成意图目标数','达成意图目标数'],
            textStyle: {
              color: '#eee'
            }
          },
          color:['orange','darkcyan'],
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.datadata,
              // data:[
              //   {value:20, name:'未达成意图目标数'},
              //   {value:80, name:'达成意图目标数'},
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
    },
    methods:{
      init(){
        this.options={
          title : {
            text: '总体情况',
            subtext: '打击目标毁伤情况',
            x:'center',
            textStyle: {
              color: '#eee'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left:'center',
            bottom: '10px',
            data: ['未达成意图目标数','达成意图目标数'],
            textStyle: {
              color: '#eee'
            }
          },
          color:['orange','darkcyan'],
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.datadata,
              // data:[
              //   {value:20, name:'未达成意图目标数'},
              //   {value:80, name:'达成意图目标数'},
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



