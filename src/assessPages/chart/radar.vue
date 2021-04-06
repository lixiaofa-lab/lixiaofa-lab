<template>

  <chart :options='options'/>

</template>

<script>
  let dataBJ = [
    [80,90,70]
  ];

  let dataGZ = [
    [70,80,90]
  ];

  let dataSH = [
    [90,70,80]
  ]
  let lineStyle = {
    normal: {
      width: 1,
      opacity: 0.5
    }
  }

  export default {
    props:['datadata'],
    data () {
      return {
        options: {
          backgroundColor: '#161627',
          title: {
            text: '作战风险',
            left: 'left',
            textStyle: {
              color: '#eee'
            }
          },
          // legend: {
          //   bottom: 5,
          //   data: ['北京', '上海', '广州'],
          //   itemGap: 20,
          //   textStyle: {
          //     color: '#fff',
          //     fontSize: 14
          //   },
          //   selectedMode: 'single'
          // },
          // visualMap: {
          //     show: true,
          //     min: 0,
          //     max: 20,
          //     dimension: 6,
          //     inRange: {
          //         colorLightness: [0.5, 0.8]
          //     }
          // },
          radar: {
            indicator: [
              {name: '气象', max: 100},
              {name: '防抗', max: 100},
              {name: '突防', max: 100},
            ],
            shape: 'circle',
            splitNumber: 4,
            name: {
              textStyle: {
                color: 'rgb(238, 197, 102)'
              }
            },
            splitLine: {
              lineStyle: {
                color: [
                  'rgba(255, 0, 0, 1)',
                  'rgba(255, 0, 0, 1)',
                  'rgba(255, 255, 0, 1)',
                  'rgba(0, 255, 0, 1)',
                  'rgba(255, 255, 255, 1)',
                ]
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(238, 197, 102, 0.5)'
              }
            }
          },
          series: [
            {
              name: '北京',
              type: 'radar',
              lineStyle: lineStyle,
              data: this.datadata.data,
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#fff'
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.3
                }
              }
            },
            // {
            //   name: '上海',
            //   type: 'radar',
            //   lineStyle: lineStyle,
            //   data: dataSH,
            //   symbol: 'none',
            //   itemStyle: {
            //     normal: {
            //       color: '#B3E4A1'
            //     }
            //   },
            //   areaStyle: {
            //     normal: {
            //       opacity: 0.05
            //     }
            //   }
            // },
            // {
            //   name: '广州',
            //   type: 'radar',
            //   lineStyle: lineStyle,
            //   data: dataGZ,
            //   symbol: 'none',
            //   itemStyle: {
            //     normal: {
            //       color: 'rgb(238, 197, 102)'
            //     }
            //   },
            //   areaStyle: {
            //     normal: {
            //       opacity: 0.05
            //     }
            //   }
            // }
          ]
        }
      }
    }
  }
</script>



