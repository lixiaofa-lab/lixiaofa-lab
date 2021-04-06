<template>

  <el-container class="home-panel">

    <div class="nav-panel">
      <div class="body-logo"></div>
      <div class="body-title">中越边境重要设施防卫分析</div>
      <div></div>
    </div>

    <div class="main-panel">
      <div class="tree-aside">
        <div class="tree-body">
          <AsideTree></AsideTree>
        </div>
      </div>

      <div class="earth-panel">
        <div class="earth-tool">
          <div class="earth-tool-body">
            <el-button type="primary" @click="entityShowEarth">设施总览</el-button>
            <el-button type="primary" @click="entityCircle">辐射范围</el-button>
            <el-button type="primary">查询统计</el-button>
            <el-button type="primary">关联关系</el-button>
            <el-button type="primary">基本信息</el-button>
            <el-button type="primary" @click="pointPointBlock">重要信息</el-button>
            <el-button type="primary" @click="fragileInfo">脆弱信息</el-button>
            <el-button type="primary">数据维护</el-button>
          </div>
        </div>
        <EarthView class="earth-body"></EarthView>

        <div class="separate-left-panel">
          <div class="separate-body el-icon-caret-left"></div>
        </div>
        <div class="separate-right-panel">
          <div class="separate-body el-icon-caret-right"></div>
        </div>
      </div>

      <div class="info-aside">
        <div class="info-body">
          <EntityInfo></EntityInfo>
        </div>
      </div>
    </div>

  </el-container>

</template>

<script>

  import EarthView from 'src/home/views/earth'
  import AsideTree from 'src/home/views/treeAside'
  import EntityInfo from 'src/home/views/entityInfo'

  export default {
    watch: {
      '$store.state.theFrameLoadState' (v) {
      }
    },
    components: {
      EarthView,
      AsideTree,
      EntityInfo
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getData()
      },
      getData () {
        this.axios.get(`datamix/api/v1.0/view/all_entities`).then(res => {
          console.log(res)
        })
      },

      //设施总览
      entityShowEarth () {
        let points = [
          {
            position: [120.00, 23.00, 5000],
            label: '预备役步兵师',
            id: '123456789'
          }
        ]
        GLOBAL_WINDOW.pointPoint(points[0])
      },
      //辐射范围
      entityCircle () {
        let points = [
          {
            position: [125.00, 25.00, 5000],
            label: '预备役步兵师',
            id: '777888999'
          }
        ]
        GLOBAL_WINDOW.circleCircle(points[0])
      },
      //重要信息
      pointPointBlock () {
        layer.open({
          title: '重要信息',
          type: 2,
          content: 'http://localhost:7999/pie',
          area: ['600px', '500px'],
          anim: 5,
          moveOut: false,
          shade: 0
        })
        let points = [
          {
            position: [115.00, 25.00, 5000],
            label: '预备役步兵师',
            id: '333666999'
          }
        ]
        GLOBAL_WINDOW.drawImageAndBlock(points[0])
      },
      //脆弱信息
      fragileInfo () {
        layer.open({
          title: '脆弱信息',
          type: 2,
          content: 'http://localhost:7999/bar',
          area: ['500px', '500px'],
          anim: 5,
          moveOut: false,
          shade: 0
        })
      }

    }
  }

</script>

<style scoped lang="scss">
  .home-panel {
    position: relative;
    padding: 40px 0 0 0;
    box-sizing: border-box;

    .nav-panel {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      background: #132843;
      border-bottom: 2px solid #2e76a3;
      display: grid;
      grid-template-columns: 80px 300px 1fr;

      .body-logo {
        /*background:url("../../../static/img/headerlogo2.png") no-repeat;*/
        /*background-size: 60% 60%;*/
        /*background-position: center;*/
      }

      .body-title {
        line-height: 38px;
        color: #9be2f9;
        font-size: 20px;
        letter-spacing: 2px;
        font-family: "Microsoft YaHei";
      }
    }

    .main-panel {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 320px;
      position: relative;
      background: black;

      .tree-aside {
        width: 300px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: transparent;
        box-sizing: border-box;
        padding: 2px;

        .tree-body {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 2px;
          border: 2px solid #3076a6;
        }
      }

      .info-aside {
        width: 300px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: transparent;
        box-sizing: border-box;
        padding: 2px;

        .info-body {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 2px solid #3076a6;
        }
      }

      .earth-panel {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding-top: 48px;

        .earth-tool {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 48px;
          box-sizing: border-box;
          padding: 2px 0;

          .earth-tool-body {
            box-sizing: border-box;
            border: 2px solid #3076a6;
            display: flex;
            align-items: center;
            background: radial-gradient(#0a8eae, #fff);
            padding: 2px;
          }
        }

        .earth-body {
          width: 100%;
          height: 100%;
        }

        .separate-left-panel {
          position: absolute;
          width: 20px;
          height: 100%;
          top: 0;
          left: -20px;
          background: transparent;
          box-sizing: border-box;
          padding: 2px 2px 2px 0;
          background: radial-gradient(#0a8eae, #013342);

          .separate-body {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 2px solid #3076a6;
            display: flex;
            align-items: center;
            color: #ffff00;
            cursor: pointer;
          }
        }

        .separate-right-panel {
          position: absolute;
          width: 20px;
          height: 100%;
          top: 0;
          right: -20px;
          background: transparent;
          box-sizing: border-box;
          padding: 2px 0 2px 2px;
          background: radial-gradient(#0a8eae, #013342);

          .separate-body {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 2px solid #3076a6;
            cursor: pointer;
            display: flex;
            align-items: center;
            color: #ffff00;
            cursor: pointer;
          }
        }
      }


    }

  }

</style>

