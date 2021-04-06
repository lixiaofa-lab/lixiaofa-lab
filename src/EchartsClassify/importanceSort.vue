<template>
<!--  重要性排序-->
  <div class="info" :auto-resize="true">
    <div class="angle left-top"></div>
    <div class="angle left-bottom"></div>
    <div class="angle right-top"></div>
    <div class="angle right-bottom"></div>
    <p>重要性排序 | 当日重要性数据 | 7日重要性数据 | 30日重要性数据</p>
        <table class="table">
          <tr class="title">
            <th>序号</th>
            <th>设施名称</th>
            <th>重要性值</th>
          </tr>
          <tr v-for="(item,index) in tabelData">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.importance}}</td>
          </tr>
        </table>
  </div>
</template>

<script>
  export default{
    data () {
      return{
        tabelData:[],
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        this.axios.get("/facility/sortImport").then((res) => {
          let {code, data, msg} = res
          // console.log(data)
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          this.tabelData = data

        })
      }

    }
  }
</script>

<style lang="scss" scoped>


  .info{
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 3%;
    color: yellow;
    padding:  10px;
    box-sizing: border-box;
    background-color:rgba(51,51,51,.7);
    border: 1px solid rgba(51,51,51,.2);
    p{
      font-size: 14px;
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
      tr:nth-child(2n-1){
        background-color:rgba(38,168,220,.2);
      }
      .title th{
        font-size:12px;
        color: #00D4D8;
        white-space: nowrap;
        font-weight: bolder;
      }
      tr{
        &:hover{
          cursor: pointer;
          background-color: #0a6aa1;
        }
      }
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
