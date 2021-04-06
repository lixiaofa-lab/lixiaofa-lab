<template>

  <div class="base-info-panel">
    <table>
      <tr>
        <th colspan="6">
          <img class="img" :src="img" alt="实体图片">
        </th>
      </tr>
      <!--      <tr>-->
      <!--        <td>名称</td>-->
      <!--        <th colspan="5">炮兵阵地1{{id}}</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>代号</td>-->
      <!--        <th colspan="5">JSBM02008</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>类型</td>-->
      <!--        <th colspan="5">地面技术装备</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>名称</td>-->
      <!--        <th colspan="5">名称</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>子类型</td>-->
      <!--        <th colspan="5">炮兵阵地</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>属性</td>-->
      <!--        <th colspan="5">固定目标</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">所属敌方部队</td>-->
      <!--        <th colspan="4">第178守备旅</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">目标区域</td>-->
      <!--        <th colspan="4">守备旅目标区域</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">部署地域</td>-->
      <!--        <th colspan="4">桃园市新屋区</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">经</td>-->
      <!--        <th colspan="4">121.2107</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">纬</td>-->
      <!--        <th colspan="4">24.9502</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">高</td>-->
      <!--        <th colspan="4">145.04</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">探测范围</td>-->
      <!--        <th colspan="4">0</th>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td colspan="2">拦截范围</td>-->
      <!--        <th colspan="4">16</th>-->
      <!--      </tr>-->
      <tr v-for="(item,index) in tableList">
        <td colspan="1" style="width: 80px;">{{index}}</td>
        <th colspan="5">{{item}}</th>
      </tr>
    </table>
  </div>

</template>

<script>

  export default {
    watch: {
      '$store.state.theCesiumClickEntityId' (v) {
        this.init()
      }
    },
    data () {
      return {
        img: '',
        id: '',
        tableList: {}
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        let id = this.$store.state.theCesiumClickEntityId
        let arr = id.split('_class_')
        if (arr.length == 3) {
          this.getInfo(arr[0], arr[1])
        }
        let name = arr[2]
        let imgMap = new Map([
          ['东兴旅游汽车站', '东兴汽车站.jpg'],
          ['个旧汽车站', '个旧汽车站.jpg'],
          ['临沧发电厂', '临沧发电厂.jpg'],
          ['北海港口', '北海港口.jpg'],
          ['北海火力发电厂', '北海火力发电厂.jpg'],
          ['南宁机场', '南宁机场.jpg'],
          ['南宁火车站', '南宁火车站.jpg'],
          ['变电站(通用)', '变电站(通用).jpg'],
          ['文山机场', '文山机场.jpg'],
          ['昆明长水国际机场', '昆明长水机场.jpg'],
          ['普洱机场', '普洱机场.jpg'],
          ['曲靖站', '曲靖站.jpg'],
          ['油库', '油库.jpg'],
          ['澜沧江大桥', '澜沧江大桥.jpg'],
          ['玉溪炼油厂', '玉溪炼油厂.jpg'],
          ['百色机场', '百色机场.jpg'],
          ['通信中心(通用)', '通信中心（通用）.jpg'],
          ['通信基站(通用)', '通信基站（通用）.jpg'],
          ['钦州炼油厂', '钦州炼油厂.jpg'],
          ['防城港口', '防城港口.jpg'],
          ['龙门大桥', '龙门大桥.jpg']
        ])
        if (imgMap.has(name)) {
          let img = imgMap.get(name)
          this.img = `/distfxpg/static/img/entity/${img}`
        } else if (name.split('通信中心').length >= 2) {
          let img = imgMap.get('通信中心(通用)')
          this.img = `/distfxpg/static/img/entity/${img}`
        } else if (name.split('基站').length >= 2) {
          let img = imgMap.get('通信基站(通用)')
          this.img = `/distfxpg/static/img/entity/${img}`
        } else if (name.split('油库').length >= 2) {
          let img = imgMap.get('油库')
          this.img = `/distfxpg/static/img/entity/${img}`
        } else if (name.split('变电站').length >= 2) {
          let img = imgMap.get('变电站(通用)')
          this.img = `/distfxpg/static/img/entity/${img}`
        } else {
          this.img = '/distfxpg/static/img/entity/a.png'
        }
        this.id = id
      },
      getInfo (classId, id) {
        this.axios.get(`${HTTP_PRO_SOUTH_SERVER_PATH}/index/detail/${classId}/${id}`).then((res) => {
          let {code, data, msg} = res
          this.tableList = data
        })
      }
    }

  }

</script>

<style scoped lang="scss">
  .base-info-panel {
    width: 100%;
    height: 100%;
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: inherit;
      font-family: "Microsoft YaHei";
      font-size: 14px;
      color: #fff;
      word-break: break-all;

      td {
        text-align: right;

        &:after {
          content: ' :';
        }
      }

      th, td {
        border-bottom: 1px solid rgba(255,255,255,.2);
      }

      th {
        text-align: center;
      }
    }

    .img {
      width: 100%;
    }
  }
</style>

