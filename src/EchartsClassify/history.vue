<template>
<!--  历史沿革 历史异常-->
  <div class="history shine-box">
    <div class="angle left-top"></div>
    <div class="angle left-bottom"></div>
    <div class="angle right-top"></div>
    <div class="angle right-bottom"></div>
    <el-tabs v-model="activeName" @tab-click="handleClick" :auto-resize="true">
      <el-tab-pane label="历史异常" name="first">
        <div class="sentence">
          <div>2008年1月24日，南宁市中部地区，暴雨，红色预警，吴圩机场发生异常</div>
          <div>2008年1月24日，南宁市中部地区，暴雨，红色预警，吴圩机场发生异常</div>
          <div>2008年1月24日，南宁市中部地区，暴雨，红色预警，吴圩机场发生异常</div>
          <div>2008年1月24日，南宁市中部地区，暴雨，红色预警，吴圩机场发生异常</div>
          <div>2008年1月24日，南宁市中部地区，暴雨，红色预警，吴圩机场发生异常</div>
          <div>2008年1月24日，南宁市中部地区，暴雨，红色预警，吴圩机场发生异常</div>
          <div>2008年1月24日，南宁市中部地区，暴雨，红色预警，吴圩机场发生异常</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="灾害预警" name="second" class="tab-pane-1">
        <table border="10" cellspacing="0">
          <tr>
            <th>{{warningData[1] ? warningData[1].desert : ''}}</th>
            <th>关联设施</th>
            <th>提升度</th>
          </tr>
          <tr v-for='item in warningData'>
            <td>{{item.warn}}</td>
            <td>{{item.type}}</td>
            <td>{{item.lift}}</td>
          </tr>
        </table>
        <Stack class="stack" :warningData='warningData'/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Stack from 'src/EchartsClassify/stack'
  export default{
    props:['warningData'],
    data () {
      return{
        activeName: 'second',
      }
    },
    components: {
      // Echarts图形组件
      Stack
    },
    watch: {
      'warningData' () {
        this.init()
      }
    },
    created(){
      this.init(
      )
    },
    methods:{
      init(){
        // console.log(this.warningData)
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },

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
  .history{
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    margin-top: 3%;
    background-color:rgba(51,51,51,.7);
    border: 1px solid rgba(51,51,51,.2);
    .el-tabs /deep/ .el-tabs__item{
      color: lightsteelblue;
    }
    .el-tabs /deep/ .is-active {
      color: yellow;
    }
    p{
      font-size: 15px;
      /*padding: 10px;*/
      color: #ffff00;
    }
    .sentence{
      text-align: center;
      font-size: 10px;
      div{
        margin: 5px auto 5px;
      }
    }
    .sentence :nth-child(2n+1){
      background-color:rgba(38,168,220,.2);
    }
    table{
      width: 40%;
      height: 80%;
      text-align: center;
      font-size:12px;
      border: 1px solid #0d6aad;
      /*border-left: none;*/
      /*border-right: none;*/
    }
    .tab-pane-1{
      display: flex;
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
  .history /deep/ .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: 100%;
      .el-tab-pane {
        height: 100%;
      }
    }
  }



</style>
