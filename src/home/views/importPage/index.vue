<template>
  <el-container class="import-panel">
    <div class="tc">
      <el-button size="mini" @click="$router.replace('/home')">查看</el-button>
    </div>
    <!--    <div class="aside-panel-title shine-box" style="color: #000;: #fff">基本信息</div>-->
    <div class="t-l-rep"></div>
    <div class="t-r-rep"></div>

    <div class="rt"></div>
    <div class="r-rep"></div>
    <div class="rb"></div>

    <div class="bc"></div>
    <div class="b-l-rep"></div>
    <div class="b-r-rep"></div>

    <div class="lt"></div>
    <div class="l-rep"></div>
    <div class="lb"></div>


    <div class="main-panel">
      <div class="head-panel">
        <div class="head-title">基础数据维护</div>
      </div>
      <div class="body-panel ">
        <div class="body-top-tools shine-box">
          <el-button size="mini" type="primary">新增</el-button>
          <el-button size="mini" type="primary">删除</el-button>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="primary">查询</el-button>
        </div>
        <div class="body-main-box shine-box">
          <el-table
            :data="taskList"
            highlight-current-row
            :height="tableHeight"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
            >
            </el-table-column>
            <el-table-column
              prop="type"
              label="属性"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
            >
            </el-table-column>
            <!--            <el-table-column-->
            <!--              label="任务状态"-->
            <!--            >-->
            <!--              <template slot-scope="scope">-->
            <!--                <el-steps :space="300" :active="scope.row.status" finish-status="success" process-status="finish">-->
            <!--                  <el-step title="已新建"></el-step>-->
            <!--                  <el-step title="已推演"></el-step>-->
            <!--                  <el-step title="已评估"></el-step>-->
            <!--                </el-steps>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--              label="操作"-->
            <!--              width="220"-->
            <!--            >-->
            <!--              <template slot-scope="scope">-->

            <!--                <el-button v-if="canToFrame()" class="shine-box " size="mini" type="primary"-->
            <!--                           @click="simulatHandle(scope)">-->
            <!--                  开始推演-->
            <!--                </el-button>-->
            <!--                <el-button v-else class="shine-box " icon="el-icon-loading" size="mini" type="primary"-->
            <!--                           @click="simulatHandle(scope)">-->
            <!--                  开始推演-->
            <!--                </el-button>-->

            <!--                &lt;!&ndash;                  <el-button class="shine-box"  size="mini" type="primary" @click="simulatHandle(scope)">&ndash;&gt;-->
            <!--                &lt;!&ndash;                    回放&ndash;&gt;-->
            <!--                &lt;!&ndash;                  </el-button>&ndash;&gt;-->

            <!--                <el-button class="shine-box" size="mini" type="primary" @click="assessHandle(scope)">-->
            <!--                  开始评估-->
            <!--                </el-button>-->

            <!--                &lt;!&ndash;                    <el-button class="shine-box"  size="mini" type="primary" @click="assessResultHandle(scope)">&ndash;&gt;-->
            <!--                &lt;!&ndash;                      评估结果&ndash;&gt;-->
            <!--                &lt;!&ndash;                    </el-button>&ndash;&gt;-->

            <!--              </template>-->
            <!--            </el-table-column>-->

          </el-table>
        </div>
        <div class="body-bottom-tools shine-box">
          <el-pagination
            layout="prev, pager, next"
            background
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="pagesize"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

  </el-container>
</template>

<script>

  export default {
    watch: {},
    components: {},
    computed: {
      'tableHeight' () {
        return document.body.offsetHeight - 295 + 'px'
      }
    },
    data () {
      let taskList = (() => {
        let arr = []
        for (let i = 0; i < 100; i++) {
          arr.push(
            {
              name: 'name' + i,
              type: 'type' + i,
              createTime: 'createTime' + i,
            }
          )
        }
        return arr
      })()

      return {
        // taskList:[],
        taskList: taskList,
        total: 100,
        pagesize: 7,
        page: 1,
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
      },
      handleSelectionChange (selection) {
      },
      handleCurrentChange () {
        this.init()
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

  .import-panel {
    position: relative;
    background: #0c1a2d;

    .tc {
      position: absolute;
      top: 0;
      left: 71.5px;
      right: 71.5px;
      height: 74px;
      background: url("../../../../static/img/bg/tc.png") no-repeat;
      background-position: center;
      background-size: 1777px 74px;
    }

    .t-l-rep {
      position: absolute;
      top: 0;
      left: 59px;
      right: 1848.5px;
      height: 74px;
      background: url("../../../../static/img/bg/top-repeat.png") repeat;
      background-position: center;
    }

    .t-r-rep {
      position: absolute;
      top: 0;
      right: 59px;
      left: 1848.5px;
      height: 74px;
      background: url("../../../../static/img/bg/top-repeat.png") repeat;
      background-position: center;
    }

    .lt {
      position: absolute;
      top: 0;
      left: 0;
      height: 153px;
      width: 59px;
      background: url("../../../../static/img/bg/left-top.png") no-repeat;
      background-position: center;
      background-size: 59px 153px;
    }

    .l-rep {
      position: absolute;
      top: 153px;
      bottom: 64px;
      left: 0;
      width: 59px;
      background: url("../../../../static/img/bg/left-repeat.png") repeat;
      background-position: center;
      background-size: 59px 3px;
    }

    .lb {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 64px;
      width: 59px;
      background: url("../../../../static/img/bg/left-bottom.png") no-repeat;
      background-position: center;
      background-size: 59px 64px;
    }

    .rt {
      position: absolute;
      top: 0;
      right: 0;
      height: 153px;
      width: 59px;
      background: url("../../../../static/img/bg/right-top.png") no-repeat;
      background-position: center;
      background-size: 59px 153px;
    }

    .r-rep {
      position: absolute;
      top: 153px;
      bottom: 64px;
      right: 0;
      width: 59px;
      background: url("../../../../static/img/bg/right-repeat.png") repeat;
      background-position: center;
      background-size: 59px 3px;
    }

    .rb {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 64px;
      width: 59px;
      background: url("../../../../static/img/bg/right-bottom.png") no-repeat;
      background-position: center;
      background-size: 59px 64px;
    }

    .bc {
      position: absolute;
      bottom: 0;
      left: 71.5px;
      right: 71.5px;
      height: 36px;
      background: url("../../../../static/img/bg/bc.png") no-repeat;
      background-position: center;
      background-size: 1777px 36px;
    }

    .b-l-rep {
      position: absolute;
      bottom: 0;
      left: 59px;
      right: 1848.5px;
      height: 36px;
      background: url("../../../../static/img/bg/bottom-repeat.png") repeat;
      background-position: center;
    }

    .b-r-rep {
      position: absolute;
      bottom: 0;
      right: 59px;
      left: 1848.5px;
      height: 36px;
      background: url("../../../../static/img/bg/bottom-repeat.png") repeat;
      background-position: center;
    }

    .main-panel {
      position: absolute;
      top: 85px;
      right: 30px;
      bottom: 40px;
      left: 30px;
      box-sizing: border-box;
      /*padding: 0 320px;*/
      border-radius: 20px;
      overflow: hidden;

      padding-top: 50px;

      .head-panel {
        background: radial-gradient(#0a8eae, #013342);
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;

        .head-title {
          position: absolute;
          min-width: 100px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          padding-left: 20px;
          letter-spacing: 5px;
          color: #eee;
        }
      }

      .body-panel {
        width: 100%;
        height: 100%;
        background: radial-gradient(#0a8eae, #013342);
        box-sizing: border-box;
        position: relative;
        padding: 60px 10px 60px 10px;

        .body-top-tools {
          height: 50px;
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          background: radial-gradient(#013342, #013342);
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 10px;
        }

        .body-main-box {


        }

        .body-bottom-tools {
          height: 50px;
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          background: radial-gradient(#013342, #013342);
          display: flex;
          align-items: center;
          justify-content: center;
        }

      }


    }

  }

</style>

<style lang="scss">
  .import-panel {
    .el-table {
      background: transparent !important;
    }

    .el-table__empty-text {
      color: #ffffff !important;
    }

    .el-table th > .cell {
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    .el-table th, .el-table tr {
      background-color: #013342 !important;
      color: #ffffff;
    }

    .el-table th {
      background: radial-gradient(#0a8eae, #013342) !important;
      text-align: center;
      color: #fff;
    }

    .el-table td, .el-table th.is-leaf {
      border-bottom: 1px solid #0a8eae !important;
    }

    .el-table::before {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0 !important;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgba(255, 255, 255, .2);
    }

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #22bd7a !important;
      border-color: #22bd7a !important;
    }

    .el-table__body tr.current-row > td {
      background-color: rgba(255, 255, 255, .3) !important;
    }

    .el-input__inner, .el-form-item__label {
      color: #f9f9f9 !important;
    }

    .el-dialog__header {
      background: radial-gradient(#0a8eae, #013342) !important;

      .el-dialog__title, .el-dialog__close {
        color: #ffffff !important;
      }
    }

    .el-dialog__body, .el-dialog__footer {
      background: radial-gradient(#0a8eae, #013342) !important;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #07708b !important;
      color: #FFF;
    }
  }
</style>

