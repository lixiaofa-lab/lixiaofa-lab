<template>
  <el-container class="body-panel">
    <div class="tc">
<!--      <el-button size="mini" @click="$router.replace('/import')">数据维护</el-button>-->
    </div>
    <div class="tct"></div>
    <div class="time">
      <span>{{nowTimes.yy}}. {{nowTimes.mm}}. {{nowTimes.dd}}</span>
      <span> {{nowTimes.hou}} : {{nowTimes.min}} : {{nowTimes.sec}}</span>
    </div>
    <div class="home"></div>

<!--    <div class="t-l-rep"></div>-->
<!--    <div class="t-r-rep"></div>-->

<!--    <div class="rt"></div>-->
<!--    <div class="r-rep"></div>-->
<!--    <div class="rb"></div>-->

<!--    <div class="bc"></div>-->
<!--    <div class="b-l-rep"></div>-->
<!--    <div class="b-r-rep"></div>-->

<!--    <div class="lt"></div>-->
<!--    <div class="l-rep"></div>-->
<!--    <div class="lb"></div>-->


    <!--          <div class="aside-panel-title shine-box" style="color: #000;: #fff">基本信息</div>-->
    <div class="main-panel">
      <div class="tree-aside ">
        <div class="aside_top">
          <Fragbase_info/>
          <Sort/>
        </div>
        <div class="aside_bottom">
          <FragilityTarget/>
          <FragilityStatistics/>
        </div>

        <FragilityData/>
      </div>
      <div class="earth-panel">
        <EarthView class="earth-body shine-box"></EarthView>
        <div class="earth-tool">
          <div class="earth-tool-body">
            <div class="item-btn shine-box" @click="fragileInfo">数据查询</div>
            <div class="item-btn shine-box">数据统计</div>
          </div>
        </div>
      </div>

      <div class="info-aside">
        <!--        <div class="aside-panel-title shine-box">基本信息</div>-->
        <!--        <div class="info-body">-->
        <!--          <EntityInfo></EntityInfo>-->
        <!--        </div>-->
        <div class="info-aside-top">
          <!--          <Fragility :fragilityNormData="fragilityNormData"/>-->
          <TrafficFragilityStatistics/>
          <!--          <FragilityStatistics :fragilityStatisticsData='fragilityStatisticsData'/>-->

          <CommunicationFragilityStatistics/>
        </div>
        <div class="info-aside-center">
          <ElectricityFragilityStatistics/>
          <!--                    <Stack/>-->
          <PetrifactionFragilityStatistics/>
        </div>
        <FragilitySort/>
      </div>
    </div>

    <!-- 重要性弹出框-->
<!--    <el-dialog title="重要性分析" :visible.sync="importance">-->
<!--      <el-form :model="form1">-->
<!--        <el-form-item label="设施名称：" :label-width="form1LabelWidth">-->
<!--          <el-input v-model="form1.name" auto-complete="off" placeholder="请输入设施名称："></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="设施类别：" :label-width="form1LabelWidth">-->
<!--          <el-select v-model="form1.region" placeholder="请选择设施类别：">-->
<!--            <el-option label="交通设施" value="1"></el-option>-->
<!--            <el-option label="通讯设施" value="2"></el-option>-->
<!--            <el-option label="电力设施" value="3"></el-option>-->
<!--            <el-option label="石化设施" value="4"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="importance = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="closeImportanceHandle">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <!--  脆弱性弹框-->
    <el-dialog title="脆弱性分析" :visible.sync="fragility">
      <el-form :model="form2">
        <el-form-item label="设施名称：" :label-width="form2LabelWidth">
          <el-input @input="imp()" v-model="form2.name" auto-complete="off" placeholder="请输入设施名称："></el-input>
        </el-form-item>
        <el-form-item label="设施类别：" :label-width="form2LabelWidth">
          <el-select v-model="form2.region" placeholder="请选择设施类别：">
            <el-option label="交通设施" value="1"></el-option>
            <el-option label="通讯设施" value="2"></el-option>
            <el-option label="电力设施" value="3"></el-option>
            <el-option label="石化设施" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fragility = false">取 消</el-button>
        <el-button type="primary" @click="closeFragilityHandle">确 定</el-button>
      </div>
    </el-dialog>

    <!--  异常预警弹框-->
    <el-dialog title="异常预警" :visible.sync="warning">
      <el-form :model="form3">
        <el-form-item label="区域名称：" :label-width="form3LabelWidth">
          <el-select v-model="form3.region" placeholder="区域名称：">
            <el-option label="南宁" value="南宁"></el-option>
            <el-option label="北海" value="北海"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="灾害类别：" :label-width="form4LabelWidth">
          <el-select v-model="form4.region" placeholder="灾害类别：">
            <el-option label="暴雨" value="暴雨"></el-option>
            <el-option label="滑坡泥石流" value="滑坡泥石流"></el-option>
            <el-option label="雷电" value="雷电"></el-option>
            <el-option label="风灾" value="风灾"></el-option>
            <el-option label="洪涝灾害" value="洪涝灾害"></el-option>
            <el-option label="雨雪冰冻" value="雨雪冰冻"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="灾害等级：" :label-width="form5LabelWidth">
          <el-select v-model="form5.region" placeholder="灾害等级：">
            <el-option label="无" value="无"></el-option>
            <el-option label="红色" value="红色"></el-option>
            <el-option label="橙色" value="橙色"></el-option>
            <el-option label="黄色" value="黄色"></el-option>
            <el-option label="蓝色" value="蓝色"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="warning = false">取 消</el-button>
        <el-button type="primary" @click="closeRelationHandle">确 定</el-button>
      </div>
    </el-dialog>


  </el-container>

</template>

<script>
  import EarthView from 'src/home/views/earth'
  import AsideTree from 'src/home/views/treeAside'
  import EntityInfo from 'src/home/views/entityInfo'

  // Echarts图形组件
  import Fragbase_info from 'src/EchartsClassify/fragbase_info'
  import Sort from 'src/EchartsClassify/sort'
  import FragilityStatistics from 'src/EchartsClassify/fragilityStatistics'
  import FragilityData from 'src/EchartsClassify/fragilityData'
  import TrafficFragilityStatistics from 'src/EchartsClassify/trafficFragilityStatistics'
  import CommunicationFragilityStatistics from 'src/EchartsClassify/communicationFragilityStatistics'
  import ElectricityFragilityStatistics from 'src/EchartsClassify/electricityFragilityStatistics'
  import PetrifactionFragilityStatistics from 'src/EchartsClassify/petrifactionFragilityStatistics'
  import FragilitySort from 'src/EchartsClassify/fragilitySort'
  import FragilityTarget from 'src/EchartsClassify/fragilityTarget'

  export default {
    watch: {
      // /**监听左侧树状态*/
      // '$store.state.theCheckdNodes' () {
      //   this.doEarthControll()
      // },
      //
      // /**监听控制按钮状态*/
      // '$store.state.theControllBtnsState' () {
      //   this.doEarthControll()
      // },
      //
      // /**监听重要性设施类型选择*/
      // '$store.state.theSelectedImportanceClassType' () {
      //   this.init()
      // },
      //
      // /**监听脆弱性设施类型选择*/
      // '$store.state.theSelectedFragilityClassType' () {
      //   this.init()
      // },
      /**监听地球加载完成状态*/
      '$store.state.theFrameLoadState' () {
        this.loadPointsDataToEarth()
      },
      /**监听地球数据是否获取到*/
      'pointsData' () {
        this.loadPointsDataToEarth()
      },
      /**监听数据融合的红方数据是否获取到 20201118 sgl*/
      'pointsFusionData' () {
        this.loadPointsDataToEarth()
      },

    },
    components: {
      EarthView,
      AsideTree,
      EntityInfo,
      // Echarts图形组件
      Fragbase_info,FragilityStatistics, FragilityData,
      TrafficFragilityStatistics, CommunicationFragilityStatistics,
      ElectricityFragilityStatistics,PetrifactionFragilityStatistics,
      FragilitySort, Sort, FragilityTarget,
    },
    mounted () {
      setInterval(()=>{
        this.setNowTimes();
      },1000)
    },

    created () {
      this.init()
    },
    data () {
      return {
        // 同步本地时间
        nowTimes:{
          yy:"",
          mm:0,
          dd:'',
          hou:'',
          min:'',
          sec:''
        },

        //数据融合的点数据 要和点数据一起加载
        pointsFusionData: [],
        //点数据
        pointsData: [],
        // 灾害预警数据
        warningData: [],
        // 重要性弹框
        importance: false,
        form1: {
          name: '冲口变电站',
          region: '',
          // date1: '',
          // date2: '',
          delivery: false,
          type: [],
          resource: '',
          // desc: ''
        },
        form1LabelWidth: '120px',
        // 脆弱性弹框
        fragility: false,
        form2: {
          name: '北海火力发电厂',
          region: '',
          // date1: '',
          // date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form2LabelWidth: '120px',

        // 灾害预警弹框
        warning: false,
        form3: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          // desc: ''
        },
        form3LabelWidth: '120px',
        form4: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          // desc: ''
        },
        form4LabelWidth: '120px',
        form5: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          // desc: ''
        },
        form5LabelWidth: '120px',

      }
    },
    methods: {
      imp(){
        let name = this.form2.name
        console.log(name)
        if(name.indexOf("场") != -1){
          this.form2.region = '1'
        }
        if(name.indexOf("厂") != -1){
          this.form2.region = '3'
        }
      },
      // 同步本地时间
      setNowTimes(){
        let myDate = new Date();
        this.nowTimes.yy = myDate.getFullYear();
        this.nowTimes.mm =  myDate.getMonth()+1
        this.nowTimes.dd = String(myDate.getDate()<10?"0"+myDate.getDate():myDate.getDate());
        this.nowTimes.hou =  String(myDate.getHours()<10?"0"+myDate.getHours():myDate.getHours());
        this.nowTimes.min = String(myDate.getMinutes()<10?"0"+myDate.getMinutes():myDate.getMinutes());
        this.nowTimes.sec = String(myDate.getSeconds()<10?"0"+myDate.getSeconds():myDate.getSeconds());
      },
      init () {
        // 0 判断是什么设施 默认显示交通信息 目前只有交通设施和电力设施有数据

        //重要性选择类型
        let importanceClassType = this.$store.theSelectedImportanceClassType
        //设置选中的设施  1 交通设施 2 通讯设施 3 电力设施 4 石化设施
        let importanceUrlA = '/importance/datas'
        let importanceUrlB = '/importance/classDatas'
        if (importanceClassType == 3) {//电力设施
          importanceUrlA = '/importElectric/datas'
          importanceUrlB = '/importElectric/classDatas'
        }

        // 0 判断是什么设施 默认显示交通信息 目前只有交通设施和电力设施有数据
        //脆弱性选择类型
        let fragilityClassType = this.$store.theSelectedFragilityClassType
        //设置选中的设施  1 交通设施 2 通讯设施 3 电力设施 4 石化设施
        let fragilityUrlA = '/fragility/datas'
        let fragilityUrlB = '/fragility/classDatas'
        if (fragilityClassType == 3) {//电力设施
          fragilityUrlA = '/FragElectric/datas'
          fragilityUrlB = '/FragElectric/classDatas'
        }

        // 获取设施信息(球上的点)
        this.getPointsData()
        // 表格灾害预警默认数据展示
        this.tabelDefaultData()

        // 获取数据融合的红方点数据
        // this.getPointsFusionData()

      },

      // 表格灾害预警默认数据展示
      tabelDefaultData () {
        this.axios.get(`/warn/data/南宁/暴雨`).then(res => {
          let {code, data, msg} = res
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          this.warningData = data
        })
      },

      //获取数据融合的点数据
      getPointsFusionData () {
        this.axios2.get('/api/v1.0/view/all_entities').then((res) => {
          let {result: {maininfo, info}} = res
          if (Array.isArray(info)) {
            this.pointsFusionData = Array.from(info, (item, index) => {
              let {name, type, longitude: lon, latitude: lat, friend} = item
              return {id: `fus_id_${index}`, lat, lon, name, type, friend}
            }).filter(item => {
              return item.friend
            })
          }
        })
      },

      //获取点数据
      getPointsData () {
        this.axios.get('/facility/gs').then((res) => {
          let {code, data, msg} = res
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          // 画点
          // console.log(data)
          this.pointsData = Array.from(data, item => {
            let {id, lon: lon, lat: lat, name, type,grade,score,frag:fra,} = item
            return {id, lon, lat, name, type,grade,score,fra}
          })

        })
      },
      //设施点上球
      loadPointsDataToEarth () {
        // console.log('设施点上球')
        let points = this.pointsData
        let earthIsLoaded = this.$store.state.theFrameLoadState
        let pointsFusion = this.pointsFusionData

        // if (points.length > 0 && earthIsLoaded == 1 && pointsFusion.length > 0) {
        if (points.length > 0 && earthIsLoaded == 1) {
          //清空数据
          // GLOBAL_WINDOW.removeAllEntities()
          for (let item of points) {
            item.lon = parseFloat(item.lon)
            item.lat = parseFloat(item.lat)
            let {id, lon, lat, name,type,grade,score,fra} = item
            console.log(item)
            window.GLOBAL_WINDOW['add_fragscore']({id, lon, lat, name,score,fra})
            window.GLOBAL_WINDOW['addPoints_zdpx']({id, lon, lat, name})

            if(type == '电力设施'){
              window.GLOBAL_WINDOW['add_electricity']({id, lon, lat, name})
            }
            if(type == '石化设施'){
              window.GLOBAL_WINDOW['add_petrifaction']({id, lon, lat, name})
            }
            if(type == '通信设施'){
              window.GLOBAL_WINDOW['add_communication']({id, lon, lat, name})
            }
            if(type == '交通设施'){
              window.GLOBAL_WINDOW['add_traffic']({id, lon, lat, name})
            }
            if(grade == '1'){
              window.GLOBAL_WINDOW['ImportanceBlue']({id, lon, lat, name})
            }
            if(grade == '2'){
              window.GLOBAL_WINDOW['ImportanceGreen']({id, lon, lat, name})
            }
            if(grade == '3'){
              window.GLOBAL_WINDOW['ImportanceYellow']({id, lon, lat, name})
            }
            if(grade == '4'){
              window.GLOBAL_WINDOW['ImportanceRed']({id, lon, lat, name})
            }

            // window.GLOBAL_WINDOW['addPoints_zdpx']({id, lon, lat, name})
            // window.GLOBAL_WINDOW['spreadCircle'](item,lat,lon)
            // window.GLOBAL_WINDOW['addCircle'](id, lon, lat, name)
          }
          for (let item of pointsFusion) {
            item.lon = parseFloat(item.lon)
            item.lat = parseFloat(item.lat)
            let {id, lon, lat, name} = item
            // window.GLOBAL_WINDOW['']({id, lon, lat, name})
            // window.GLOBAL_WINDOW['addCircle'](item)
          }
        }
      },

      //脆弱性设施弹窗关闭事件
      closeFragilityHandle () {
        if(this.form2.name == '' && this.form2.region == '3'){
          let data = {
            code:"FDC002",
            name:"临沧发电厂",
            type:"电力设施",
            lat:'100.89',
            lon:'23.27',
            importance:9,
            id:'19',
          }
          this.$store.commit('SET_EQUIPMENTINFO',data)
        }
        if(this.form2.name == '' && this.form2.region == '1'){
          let data = {
            code:"JC005",
            name:"百色机场",
            type:"交通设施",
            lat:'107.18',
            lon:'24.03',
            importance:58,
            id:'5',
          }
          this.$store.commit('SET_EQUIPMENTINFO',data)
        }
        // console.log(222)
        //设置选中的设施  1 交通设施 2 通讯设施 3 电力设施 4 石化设施
        let key = this.form2.region
        // console.log(key)
        if (key == 1 || key == 3) {//目前只有交通和电力有数据
          this.$store.commit('SET_THESELECTEDFRAGILITYCLASSTYPE', key)
        }
        let name = this.form2.name
        let type = key == 1 ? '交通设施' : key == 2 ? '通讯设施' : key == 3 ? '电力设施' : key == 4 ? '石化设施' : ''

        //根据当前的设施名称和类型获取脆弱性等级值
        this.axios.get(`/facility/fragValue/${type}/${name}`).then((res) => {
          let {code, data, msg} = res
          if (code !== 0) {
            // this.$message({
            //   type: 'warning',
            //   message: msg
            // })
            //   console.log(msg)
            return
          }
          this.$store.commit('SET_EQUIPMENTINFO',data)
          // console.log( this.$store.state.equipmentInfo)
          let lon = Number(data.lon)
          let lat = Number(data.lat)
          let fragility = data.fragility
          let fra= data.fragility+''
          let name = data.name
          let type = data.type
          console.log(data)
          window.GLOBAL_WINDOW.removeAllEntities()

          if(type == '电力设施'){
            window.GLOBAL_WINDOW['addPoints_zdpx']({lat, lon,fragility,type,name})
            window.GLOBAL_WINDOW['ImportanceBlue']({lat, lon,fragility,type,name})
            window.GLOBAL_WINDOW['add_electricity']({lat, lon,fragility,type,name})
            window.GLOBAL_WINDOW['add_fragscore']({lat, lon,fra})
            window.GLOBAL_WINDOW['fly']({lat, lon,fragility,type,name})
          }
          if(type == '交通设施'){
            window.GLOBAL_WINDOW['addPoints_zdpx']({lat, lon,fragility,type,name})
            window.GLOBAL_WINDOW['ImportanceBlue']({lat, lon,fragility,type,name})
            window.GLOBAL_WINDOW['add_electricity']({lat, lon,fragility,type,name})
            window.GLOBAL_WINDOW['add_fragscore']({lat, lon,fra})
            window.GLOBAL_WINDOW['fly']({lat, lon,fragility,type,name})
          }

        })

        this.fragility = false
      },

      //异常预警弹窗关闭事件
      closeRelationHandle () {
        let locName = this.form3.region
        let type = this.form4.region
        let warn = this.form5.region

        this.axios.get(`/warn/data/${locName}/${type}`).then(res => {
          let {code, data, msg} = res
          if (code !== 0) {
            this.$message({
              type: 'warning',
              message: msg
            })
            return
          }
          this.warningData = data
        })

        if (locName && type && warn) {
          this.axios.get(`/index/facilityWarn/${locName}/${type}/${warn}`).then(res => {
            let {code, data, msg} = res
            if (code !== 0) {
              this.$message({
                type: 'warning',
                message: msg
              })
              return
            }

            if (data.length == 0) {
              this.$message({
                type: 'warning',
                message: '无灾害异常'
              })
            }
            for (let item of data) {
              // console.log(data)
              if (data.length == 1) {
                // if(item.isabnormal === '否'){
                //   this.$message({
                //     type: 'warning',
                //     message: '无灾害异常'
                //   })
                // }
              }
              if (data.length == 1 && item.isabnormal === '是') {
                let lat = Number(item.lat)
                let lon = Number(item.lon)
                window.GLOBAL_WINDOW['disasterAbnormal'](data, lat, lon)
              }

              if (data.length > 1) {
                if (item.isabnormal === '是') {
                  let lat = Number(item.lat)
                  let lon = Number(item.lon)
                  window.GLOBAL_WINDOW['disasterAbnormal'](data, lat, lon)
                } else {
                  this.$message({
                    type: 'warning',
                    message: '无灾害异常'
                  })
                }
              }

            }
          })
        }

        // 关闭弹窗
        this.warning = false

      },

      doEarthControll () {
        /**获取左侧分类列表*/
        let arr = this.$store.state.theCheckdNodes
        let classList = Array.from(arr, item => {
          let {id} = item
          return id
        })
        /**获取实体数据*/
        let entitiesSource = this.$store.state.theEntitiesLists
        let entityMap = new Map(entitiesSource)
        let entities = []
        Array.from(classList, item => {
          let eee = entityMap.get(item)
          if (Array.isArray(eee)) {
            entities.push(...eee)
          }
        })

        let points = Array.from(entities, item => {
          let {lon, lat, alt, name, classAndId: classAddId, ZYX = 0, FSBJ = 0, dw, hasZYX} = item
          return {lon, lat, alt, name, classAddId, ZYX, FSBJ, dw, hasZYX}
        })

        /**获取控制按钮类型状态*/
          // 1 显示标牌 2 显示重要性 3 显示区域
        let state = this.$store.state.theControllBtnsState
        let fnName = 'loadBaseEntity'//show
        if (state == 2) {
          fnName = 'loadImportEntity'
        }
        if (state == 3) {
          fnName = 'loadRangeEntity'
        }

        function hasGLOBAL_WINDOW () {
          if (window.GLOBAL_WINDOW) {
            //清空数据
            GLOBAL_WINDOW.removeAllEntities()
            for (let i = 0, len = points.length; i < len; i++) {
              window.GLOBAL_WINDOW[fnName](points[i])
            }
          } else {
            setTimeout(() => {
              hasGLOBAL_WINDOW()
            }, 500)
          }
        }

        hasGLOBAL_WINDOW()
      },

      loadEntity () {
        this.entityShowEarth()
      },

      //脆弱性指标
      fragilityNorm (resArr) {

        let points = []

        Array.from(resArr, item => {
          let {code, data} = item
          if (code == 0) {
            Array.from(data, iii => {
              let {lon, lat, alt, name, classAndId: classAddId, ZYX = 0, FSBJ = 0} = iii
              points.push({
                lon, lat, alt, name, classAddId, ZYX, FSBJ
              })
            })
          }
        })

      },
      //辐射范围
      entityCircle () {
        // 1 显示标牌 2 显示重要性 3 显示区域
        this.$store.commit('SET_THECONTROLLBTNSSTATE', 3)
      },
      //重要信息
      pointPointBlock () {
        // layer.open({
        //   title: '重要信息',
        //   type: 2,
        //   content: '/pie',
        //   area: ['800px', '500px'],
        //   anim: 5,
        //   moveOut: false,
        //   shade: 0
        // })
        this.importance = true
        // this.openWin(1)
        // // 1 显示标牌 2 显示重要性 3 显示区域 4 显示脆弱性
        // this.$store.commit('SET_THECONTROLLBTNSSTATE', 2)
      },
      //脆弱信息
      fragileInfo () {
        this.fragility = true
      },
      // 灾害预警
      warnInfo () {
        this.warning = true
      },

      openWin (i) {
        if (i == 1) { // 重要性
          let strWindowFratures = 'width=1600,height=903,menubar=false,location=yes,resizable=yes,scrollbars=true,ststus=true'
          // if(!window.AAASSSDDD){
          window.AAASSSDDD = window.open(`/distfxpg/#/pie`, `a_page`, strWindowFratures)
          // }
        }
        if (i == 2) {// 脆弱性
          let strWindowFratures = 'width=1600,height=903,menubar=false,location=yes,resizable=yes,scrollbars=true,ststus=true'
          window.AAASSSFFF = window.open(`/distfxpg/#/bar`, `b_page`, strWindowFratures)
        }
      }

    }
  }

</script>

<style lang="scss" scoped>
  .body-panel /deep/ .el-dialog__footer .dialog-footer .el-button {
    border-radius: 20% 20% 20% 20%!important;
  }
  .body-panel /deep/ .el-button--primary{
    background-color: #408EBE !important;
  }
  .body-panel /deep/ .el-input__inner{
    color: #fff;
  }
  .body-panel /deep/ .el-scrollbar{
    background-color: #408EBE !important;
  }
  .body-panel /deep/ .el-dialog__header {
    /*border-radius: 30px 30px 0 0 !important;*/
    width: 410px;
    height: 10px;
    line-height: 10px;
    background-color: #122533 !important;
    border: 1px solid #366379;
  }
  .body-panel /deep/ .el-form-item {
    margin-right: 5px;
  }
  .body-panel /deep/ .el-form-item__label{
    color: #fff!important;
  }

  .body-panel /deep/ .el-dialog {
    width: 450px;
    height: 300px;
    box-sizing: border-box;
    background-color: #141F31;
    border: 1px solid #366379 !important;
    opacity: .6;
    /*border-radius: 10%;*/
    background-color: #122533 !important;
    .el-dialog__title {
      color: #4AD0D1;
      line-height: 10px;
    }

    .body-panel /deep/ .el-input .el-input__inner{
      color: #fff!important;
    }

    .el-dialog__body {

      .el-form {
        display: flex;
        justify-content: space-around;

        .el-form-item {
          width: 45%;
          display: flex;
          flex-direction: column;

          .el-form-item__content {
            margin: 0 !important;
          }
        }
      }
    }
  }

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

  .body-panel {
    position: relative;
    background: #0c1a2d;
    .time{
      position: absolute;
      width: 300px;
      height: 30px;
      top: 60px;
      left: 150px;
      font-size: 20px;
      color: #00C0D7;
    }
    .home{
      position: absolute;
      width: 300px;
      height: 45px;
      top: 45px;
      right: 100px;
      background: url("../../static/img/bg/home.png") no-repeat;
      background-size: 120px 45px;
    }

    .tc {
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 56px;
      background: url("../../static/img/bg/header3.png") no-repeat;
      background-position: center;
      background-size: 100% 60px;
    }
    .tct {
      position: absolute;
      z-index: 100;
      top: 0;
      left: 50%;
      right: 0px;
      width: 40%;
      height: 120px;
      transform: translateX(-50%);
      background: url("../../static/img/bg/header.png") no-repeat;
      background-position: center;
      background-size: 100% 100px;
    }
    .t-l-rep {
      position: absolute;
      top: 0;
      left: 59px;
      right: 1848.5px;
      height: 74px;
      background: url("../../static/img/bg/top-repeat.png") repeat;
      background-position: center;
    }

    .t-r-rep {
      position: absolute;
      top: 0;
      right: 59px;
      left: 1848.5px;
      height: 74px;
      background: url("../../static/img/bg/top-repeat.png") repeat;
      background-position: center;
    }

    .lt {
      position: absolute;
      top: 0;
      left: 0;
      height: 153px;
      width: 59px;
      background: url("../../static/img/bg/left-top.png") no-repeat;
      background-position: center;
      background-size: 59px 153px;
    }

    .l-rep {
      position: absolute;
      top: 153px;
      bottom: 64px;
      left: 0;
      width: 59px;
      background: url("../../static/img/bg/left-repeat.png") repeat;
      background-position: center;
      background-size: 59px 3px;
    }

    .lb {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 64px;
      width: 59px;
      background: url("../../static/img/bg/left-bottom.png") no-repeat;
      background-position: center;
      background-size: 59px 64px;
    }

    .rt {
      position: absolute;
      top: 0;
      right: 0;
      height: 153px;
      width: 59px;
      background: url("../../static/img/bg/right-top.png") no-repeat;
      background-position: center;
      background-size: 59px 153px;
    }

    .r-rep {
      position: absolute;
      top: 153px;
      bottom: 64px;
      right: 0;
      width: 59px;
      background: url("../../static/img/bg/right-repeat.png") repeat;
      background-position: center;
      background-size: 59px 3px;
    }

    .rb {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 64px;
      width: 59px;
      background: url("../../static/img/bg/right-bottom.png") no-repeat;
      background-position: center;
      background-size: 59px 64px;
    }

    .bc {
      position: absolute;
      bottom: 0;
      left: 71.5px;
      right: 71.5px;
      height: 36px;
      background: url("../../static/img/bg/bc.png") no-repeat;
      background-position: center;
      background-size: 1777px 36px;
    }

    .b-l-rep {
      position: absolute;
      bottom: 0;
      left: 59px;
      right: 1848.5px;
      height: 36px;
      background: url("../../static/img/bg/bottom-repeat.png") repeat;
      background-position: center;
    }

    .b-r-rep {
      position: absolute;
      bottom: 0;
      right: 59px;
      left: 1848.5px;
      height: 36px;
      background: url("../../static/img/bg/bottom-repeat.png") repeat;
      background-position: center;
    }

    .main-panel {
      position: absolute;
      top: 100px;
      right: 30px;
      bottom: 40px;
      left: 30px;
      box-sizing: border-box;
      /*padding: 0 320px;*/
      background: #0c1a2d;

      .tree-aside {
        /*overflow: auto;*/
        /*overflow-x: scroll;*/
        /*background-color: red;*/
        /*display: flex;*/
        z-index: 2;
        width: 30%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 10px 70px 10px 15px;
        /*background: url("../../static/img/bg/aside/left.png") no-repeat;*/
        background-size: contain;
        background-position: center;
        /*background-color: pink;*/

        .aside_top {
          display: flex;
          width: 100%;
          height: 25%;
        }

        .aside_bottom {
          display: flex;
          width: 100%;
          height: 25%;
          margin-top: 3%;
        }

        p {
          color: yellow;
        }

        .aside-panel-title {
          position: absolute;
          top: -18px;
          left: 44px;
          color: #fff;
          font-size: 18px;
          letter-spacing: 2px;
          display: inline-block;
          background: radial-gradient(#00a0a0, #0c1a2d) !important;
          padding: 10px;
          /*z-index: 100;*/
        }

        img {
          width: 100px;
          height: 100px;
        }

        table {
          color: #fff;
          text-align: center;
        }

        .tree-body {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 2px;
        }
      }

      .info-aside {
        width: 30%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: transparent;
        box-sizing: border-box;
        padding: 10px 15px 10px 50px;
        /*background: url("../../static/img/bg/aside/right.png") no-repeat;*/
        background-size: contain;
        background-position: center;

        .info-aside-top {
          display: flex;
          width: 100%;
          height: 25%;
        }

        .info-aside-center {
          display: flex;
          width: 100%;
          height: 25%;
          margin-top: 3%;
        }

        .info-aside-bottom {
          width: 100%;
        }


        p {
          color: yellow;
          font-size: 16px;
        }

        .aside-panel-title {
          position: absolute;
          top: -18px;
          left: 44px;
          color: #fff;
          font-size: 18px;
          letter-spacing: 2px;
          display: inline-block;
          background: radial-gradient(#00a0a0, #0c1a2d) !important;
          padding: 10px;
        }

        .info-body {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
      }

      .earth-panel {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        /*padding-bottom: 166px;*/

        .earth-tool {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 500px;
          height: 71px;
          transform: translateX(-50%);
          box-sizing: border-box;
          background: url("../../static/img/bg/aside/bottom2.png") no-repeat;
          /*background-size: contain;*/
          background-size: 500px 70px;
          background-position: center;

          .earth-tool-body {
            position: absolute;
            left: 30px;
            right: 30px;
            top: 6px;
            bottom: 14px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            /*justify-content: space-around;*/
            justify-content: center;
            padding: 5px;

            .item-btn {
              display: inline-block;
              width: 96px;
              height: 28px;
              background: url("../../static/img/bg/aside/btn.jpg") no-repeat;
              background-size: cover;
              background-position: center;
              line-height: 28px;
              text-align: center;
              color: #ffffff;
              letter-spacing: 2px;
              cursor: pointer !important;
              font-size: 12px;
              margin: 0 3px;

              &:hover {
                background: url("../../static/img/bg/aside/btn-active.png") no-repeat;
              }
              background-size: cover;

            }
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

