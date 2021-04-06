<template>
<!--  情报动态-->
  <div class="info-aside-bottom" :auto-resize="true">
    <div class="angle left-top"></div>
    <div class="angle left-bottom"></div>
    <div class="angle right-top"></div>
    <div class="angle right-bottom"></div>
    <p>我情动态 | 敌情动态 | 情报信息 | 水文气象</p>
    <table class="table">
      <tr class="title">
        <th>单位名称</th>
        <th>编制军种</th>
        <th>编制人数</th>
        <th>实有人数</th>
        <th>军官编制</th>
        <th>军官实有</th>
        <th>士兵编制</th>
        <th>士兵实有</th>
      </tr>
      <tr>
        <td>一营</td>
        <td>陆军</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
      </tr>
      <tr>
        <td>一营</td>
        <td>陆军</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
      </tr>
      <tr>
        <td>一营</td>
        <td>陆军</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
      </tr>
      <tr>
        <td>一营</td>
        <td>陆军</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
      </tr>
      <tr>
        <td>一营</td>
        <td>陆军</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
        <td>200</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default{
    data () {
      return{
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
      }

    }
  }
</script>

<style lang="scss" scoped>
  .info-aside-bottom{
    position: relative;
    width: 100%;
    height: 45%;
    margin-top: 3%;
    color: yellow;
    padding:  10px;
    box-sizing: border-box;
    background-color:rgba(51,51,51,.2);
    border: 1px solid rgba(51,51,51,.2);
    p{
      margin-top: 2%;
    }
    table{
      width: 100%;
      text-align:center;
      color: #fff;
      font-size: 10px;
      border-collapse: separate;
      border-spacing: 0px 10px;
      margin-top: 3%;
      tr:nth-child(2n-1){
        background-color:rgba(38,168,220,.2);
      }
      .title th{
        font-size:12px;
        color: #0a8eae;
        white-space: nowrap;
        font-weight: bolder;
      }
    }
    .angle{
      position: absolute;
      width: 5px;
      height:5px;
    }
    .left-top{
      top:0%;
      left: -1%;
      border-left: 4px solid rgba(33,142,121,.6);
      border-top: 4px solid rgba(33,142,121,.6);
    }
    .left-bottom{
      top: 98%;
      left: -1%;
      border-left: 4px solid   rgba(33,142,121,.6);
      border-bottom: 4px solid  rgba(33,142,121,.6);
    }
    .right-top{
      top:0%;
      left: 99%;
      border-right: 4px solid  rgba(33,142,121,.6);
      border-top: 4px solid  rgba(33,142,121,.6);
    }
    .right-bottom{
      top:98%;
      left: 99%;
      border-right: 4px solid rgba(33,142,121,.6);;
      border-bottom: 4px solid  rgba(33,142,121,.6);
    }
  }
</style>
