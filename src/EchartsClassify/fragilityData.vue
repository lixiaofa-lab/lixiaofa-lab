<template>
<!--  情报动态-->
  <div class="info-aside-bottom shine-box" :auto-resize="true">
    <div class="angle left-top"></div>
    <div class="angle left-bottom"></div>
    <div class="angle right-top"></div>
    <div class="angle right-bottom"></div>
    <p>当日脆弱性数据 | 7日脆弱性数据 | 30日脆弱性数据</p>
    <table class="table">
      <tr class="title">
        <th>日期</th>
        <th>设施名称</th>
        <th>脆弱性值</th>
      </tr>
      <tr>
        <td>20201010</td>
        <td>北海火力发电厂</td>
        <td>14</td>
      </tr>
      <tr>
        <td>20201010</td>
        <td>百色机场</td>
        <td>0.98</td>
      </tr>
      <tr>
        <td>20201010</td>
        <td>昆明长水国际机场</td>
        <td>15</td>
      </tr>
      <tr>
        <td>20201010</td>
        <td>文山机场</td>
        <td>53</td>
      </tr>
      <tr>
        <td>20201010</td>
        <td>南宁吴圩国际机场</td>
        <td>86</td>
      </tr>
      <tr>
        <td>20201010</td>
        <td>普洱机场</td>
        <td>87</td>
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
  .info-aside-bottom{
    position: relative;
    width: 100%;
    height: 45%;
    margin-top: 3%;
    color: yellow;
    padding:  10px;
    box-sizing: border-box;
    background-color:rgba(51,51,51,.7);
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
      cursor: pointer;
      tr{
        &:hover{
          background-color: #0a6aa1;
        }
      }
      tr:nth-child(2n-1){
        background-color:rgba(38,168,220,.2);
      }
      .title th{
        font-size:12px;
        color: #04DDE2;
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
