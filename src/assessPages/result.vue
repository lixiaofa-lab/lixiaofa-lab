<template>

  <el-container class="judge-container">

    <div class="main-radius-panel">

      <div class="title-logo">
        <!--        <div class="logo-img"></div>-->
        <div class="logo-text">检验评估系统-评估结果</div>
        <div class="logo-tools" style="float: right;padding: 16px 100px 16px 0;">
          <el-button class="shine-box" size="mini" type="primary" @click="home">首页</el-button>
        </div>
      </div>

      <div class="task-box shine-box">
        <div class="box-header">
          <div class="box-title">{{title}}</div>
          <div class="box-tool">
          </div>
        </div>
        <div class="box-body">

          <div class="table-box">

            <div class="table-left">
              <!--              <div  class='shine-box' style="height: 200px;margin-bottom: 10px;box-sizing: border-box;padding: 10px;">-->
              <!--                <el-tag class="shine-box" style="margin-bottom: 3px;" type="success">当前方案0</el-tag>-->

              <!--                <template v-if="showTag">-->
              <!--                  <el-tag-->
              <!--                    v-for="(item,index) in 2"-->
              <!--                    :key="index"-->
              <!--                    class="shine-box"-->
              <!--                    style="margin-bottom: 3px;"-->
              <!--                    closable-->
              <!--                    @close="handleClose(tag)">-->
              <!--                    相关方案{{item}}-->
              <!--                  </el-tag>-->
              <!--                </template>-->


              <!--                <el-button-->
              <!--                  class="button-new-tag shine-box"-->
              <!--                  @click="openAddForm"-->
              <!--                  type="primary"-->
              <!--                  size="small">+ 多案对比-->
              <!--                </el-button>-->
              <!--              </div>-->
              <el-tree
                class="shine-box"
                default-expand-all
                height="400"
                :expand-on-click-node="false"
                :data="treeData"
                :props="defaultProps"
                @node-click="handleNodeClick">
              </el-tree>
            </div>

            <div class="table-right">

              <transition name="el-fade-in">
                <div v-if="showStatus==1&&showmode=='single'" class="div-1">
                  <div class="row-1">
                    <div class="col-1 shine-box">
                      <div class="col-title">导弹代价</div>
                      <div class="col-body">{{dataA.topLeft}}</div>
                    </div>
                    <div class="col-2 shine-box" style="width: 1px;">
                      <PieChart style="width: 100%;" :datadata="dataA.topRight"></PieChart>
                    </div>
                  </div>
                  <div class="row-2">
                    <!--                    <div class="col-1 shine-box" style="width: 1px;">-->
                    <!--                      <BarChart1 style="width: 100%;" :datadata="dataA.bottomLeft"></BarChart1>-->
                    <!--                    </div>-->
                    <div class="col-2 shine-box" style="width: 1px;">
                      <BarChart2 style="width: 100%;" :datadata="dataA.bottomRight"></BarChart2>
                    </div>
                  </div>
                </div>
                <div v-if="showStatus==1&&showmode=='more'" class="div-1">
                  <div class="row-1">
                    <div class="col-1 shine-box">
                      <div class="col-title">导弹代价</div>
                      <div class="col-body">65,66,67</div>
                    </div>
                    <div class="col-2 shine-box" style="width: 1px;">
                      <PieChart style="width: 100%;" :datadata="dataA.topRight"></PieChart>
                    </div>
                  </div>
                  <div class="row-2">
                    <div class="col-1 shine-box" style="width: 1px;">
                      <BarChart1 style="width: 100%;"></BarChart1>
                    </div>
                    <div class="col-2 shine-box" style="width: 1px;">
                      <BarChart2 style="width: 100%;"></BarChart2>
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="el-fade-in">
                <div v-if="showStatus==2" class="div-2">
                  <div class="row-1">
                    <div class="col-1 shine-box">
                      <div class="col-title">目标毁伤效果</div>
                      <div class="col-body">{{dataB.topLeft}}</div>
                    </div>
                    <div class="col-2 shine-box" style="width: 1px;">
                      <PieChart2 style="width: 100%;" :datadata="dataB.topRight"></PieChart2>
                    </div>
                  </div>
                  <div class="row-2">
                    <div class="col-1 shine-box" style="width: 1px;">
                      <BarChart3 style="width: 100%;" :datadata="dataB.bottomLeft"></BarChart3>
                    </div>
                    <div class="col-2 shine-box" style="width: 1px;">
                      <BarChart4 style="width: 100%;" :datadata="dataB.bottomRight"></BarChart4>
                    </div>
                  </div>
                </div>
              </transition>

              <!--              <transition name="el-fade-in">-->
              <!--                <div v-if="showStatus==3" class="div-3">-->
              <!--                  <div class="row-1">-->
              <!--                    <div class="col-1 shine-box" style="width: 1px;">-->
              <!--                      <RadarChart style="width: 100%;height:100%;background:transparent" :datadata="dataC.top"></RadarChart>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="row-2">-->
              <!--                    <div class="col-1 shine-box" style="width: 1px;">-->
              <!--                      <BarChart6 style="width: 100%;height:100%" :datadata="dataC.bottomLeft"></BarChart6>-->
              <!--                    </div>-->
              <!--                    <div class="col-2 shine-box" style="width: 1px;">-->
              <!--                      <BarChart6 style="width: 100%;height:100%" :datadata="dataC.bottomCenter"></BarChart6>-->
              <!--                    </div>-->
              <!--                    <div class="col-3 shine-box" style="width: 1px;">-->
              <!--                      <BarChart6 style="width: 100%;height:100%" :datadata="dataC.bottomRight"></BarChart6>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </transition>-->

            </div>

          </div>

        </div>

      </div>

    </div>

    <!--    <el-dialog title="多案对比" :visible.sync="dialogAddFormVisible">-->
    <!--      <div>-->
    <!--        <el-table-->
    <!--          :data="taskList"-->
    <!--          height="300px"-->
    <!--          highlight-current-row-->
    <!--          @selection-change="handleSelectionChange"-->
    <!--          style="width: 100%">-->
    <!--          <el-table-column-->
    <!--            type="selection"-->
    <!--            width="55">-->
    <!--          </el-table-column>-->
    <!--          <el-table-column-->
    <!--            prop="name"-->
    <!--            label="任务名称"-->
    <!--          >-->
    <!--          </el-table-column>-->
    <!--          <el-table-column-->
    <!--            prop="userId"-->
    <!--            label="创建人"-->
    <!--          >-->
    <!--          </el-table-column>-->
    <!--          <el-table-column-->
    <!--            prop="updateTime"-->
    <!--            label="创建时间"-->
    <!--          >-->
    <!--          </el-table-column>-->
    <!--        </el-table>-->
    <!--      </div>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button @click="cancelAddForm" size="mini">取 消</el-button>-->
    <!--        <el-button type="primary" @click="confirmAddForm" size="mini">确 定</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->

  </el-container>

</template>

<script>
  import PieChart from 'src/assessPages/chart/pie'
  import BarChart1 from 'src/assessPages/chart/bar1'
  import BarChart2 from 'src/assessPages/chart/bar2'

  import PieChart2 from 'src/assessPages/chart/pie2'
  import BarChart3 from 'src/assessPages/chart/bar3'
  import BarChart4 from 'src/assessPages/chart/bar4'

  // import RadarChart from 'src/assessPages/chart/radar'
  // import BarChart6 from 'src/assessPages/chart/bar6'
  // import BarChart7 from 'src/assessPages/chart/bar7'

  export default {
    created(){
      let {title} = this.$route.params
      this.title=`${title}`
    },

    mounted () {
      this.init()
    },

    components: {
      PieChart,
      BarChart1,
      BarChart2,
      PieChart2,
      BarChart3,
      BarChart4,

      // RadarChart,
      // BarChart6,
      // BarChart7,

      // PieChart: import('src/assessPages/chart/pie'),
      // BarChart1: import('src/assessPages/chart/bar1'),
      // BarChart2: import('src/assessPages/chart/bar2'),
      //
      // PieChart2:  import('src/assessPages/chart/pie2'),
      // BarChart3: import('src/assessPages/chart/bar3'),
      // BarChart4: import('src/assessPages/chart/bar4'),
      //
      // RadarChart:  import('src/assessPages/chart/radar'),
      // BarChart6:  import('src/assessPages/chart/bar6'),
      // BarChart7: import('src/assessPages/chart/bar7'),
    },

    data () {
      return {
        title:'',
        dataA: {
          topLeft: '0',
          topRight:
            [
              // {value: 30, name: '被拦截弹量'},
              // {value: 50, name: '突防成功弹量'}
            ],
          bottomLeft: {
            columnsTitle: [
              // '第一波', '第二波', '第三波'
            ],
            columnsDataAll: [
              // 20000, 20000, 20000
            ],
            columnsDataSucc: [
              // 15000, 18000, 15000
            ]
          },
          bottomRight: {
            columnsTitle: [
              // 'DF-11A', 'DF-15B', 'DF-16', 'DF-21C', 'DF-26B', 'DF-10A', 'DF-17'
            ],
            columnsDataAll: [
              // 1000, 1000, 1000, 1000, 1000, 1000, 1000
            ],
            columnsDataSucc: [
              // 800, 900, 700, 750, 300, 950, 500
            ]
          },
        },
        dataB: {
          topLeft: '0',
          topRight:
            [
              // {value: 20, name: '未达成意图目标数'},
              // {value: 50, name: '达成意图目标数'},
            ],
          bottomLeft: {
            columnsTitle: [
              // '目标1', '目标2', '目标3', '目标4', '目标5'
            ],
            columnsDataAll: [
              // 100, 80, 90, 100, 80
            ],
            columnsDataSucc: [
              // 80, 70, 80, 90, 30
            ]
          },
          bottomRight: {
            columnsTitle: [
              // '目标1', '目标2', '目标3', '目标4', '目标5'
            ],
            columnsDataAll: {
              dataSuccTop: [
                // 100, 100, 100, 100, 100
              ],//理想重度
              dataSucc: [
                // 100, 100, 100, 100, 100
              ],//理想中度
              dataSuccBottom: [
                // 100, 100, 100, 100, 100
              ],//理想轻度
            },
            columnsDataSucc: {
              dataSuccTop: [
                // 0, 100, 0, 0, 0
              ],//实际重度
              dataSucc: [
                // 100, 100, 0, 100, 0
              ],//实际中度
              dataSuccBottom: [
                // 100, 100, 100, 100, 0
              ],//实际轻度
            }
          },
        },
        dataC: {
          top: {
            data: [
              [80, 90, 70]
            ]//气象 防抗 突防
          },
          bottomLeft: {
            title: '气象条件变化风险',
            data: [100, 75, 50, 20]//标准 低 中 高
          },
          bottomCenter: {
            title: '防抗条件变化风险',
            data: [100, 75, 50, 20]//标准 低 中 高
          },
          bottomRight: {
            title: '突防条件变化风险',
            data: [100, 75, 50, 20]//标准 低 中 高
          },
        },

        showTag: false,
        showStatus: '1',
        selectRadio: false,
        selection: [],
        dialogAddFormVisible: false,
        addForm: {},
        task: {
          name: '',
          path: '',
          status: '',
          updateTime: '',
          userId: '',
        },
        files: [],
        taskList: [
          {}
        ],
        check: true,
        showAdd: false,

        keyWord: '',
        tableKeyWord: '',
        radio: '',
        form: {
          path: ''
        },

        treeData: [
          {
            label: '检验评估',
            children: [
              {
                label: '作战代价',
                children: [
                  {label: '导弹代价'},
                ]
              },
              {
                label: '作战效果',
                children: [
                  {label: '目标毁伤效果'},
                ]
              },
              // {
              //   label: '作战风险',
              //   children: [
              //     {label: '气象类风险'},
              //     {label: '防抗类风险'},
              //     {label: '突防类风险'},
              //   ]
              // },

            ]
          }
        ],

        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },

    computed: {
      //任务列表
      tableData () {
        let arr = this.taskList
        let result = Array.from(arr, item => {
          let {id, name, path, status, updateTime, userId, version} = item
          return {id, name, path, status, updateTime, userId, version}
        })
        return result
      },
      //删除单个按钮激活
      canDeleteTask () {
        return this.selection.length !== 1
      },
      //批量删除按钮激活
      canDeleteMoreTask () {
        return this.selection.length < 2
      },
      //多方案对比
      showmode () {
        let mode = this.showTag ? 'more' : 'single'
        return mode
      }
    },

    methods: {

      init () {
        //获取计算结果数据
        this.getData()

      },

      //获取数据
      getData () {
        this.getHSSJ()
        this.getDDDJ()
        this.getHSXG()
      },

      // 目标毁伤数据统计
      getHSSJ () {
        let taskId = this.$store.state.theSelectedTaskId
        this.axios.get(`/statistic/hssj/${taskId}`).then(
          res => {
            let {code, msg, data} = res


            if (code == 0) {

              //保存数据
              this.$store.commit('SET_THEDAMAGERESULTDATA',data)

              //总弹量
              let countAll = 0
              //总命中
              let countAllMZ = 0
              //型号统计
              let XH_Map = new Map()
              let XH_Arr = {
                columnsTitle: [],
                columnsDataAll: [],
                columnsDataSucc: [],
              }

              //目标统计达成意图数量统计
              let countTargetSuc = 0
              //目标统计未达成意图数量
              let countTargetNoSuc = 0
              //目标命中弹量情况
              let MB_MZ_Map = new Map()
              let MB_MZ = {
                columnsTitle: [],
                columnsDataAll: [],
                columnsDataSucc: []
              }
              //目标毁伤结果
              let MB_HS_Map = new Map()
              let MB_HS = {
                columnsTitle: [],
                columnsDataAll: {
                  dataSuccTop: [],//理想重度
                  dataSucc: [],//理想中度
                  dataSuccBottom: [],//理想轻度
                },
                columnsDataSucc: {
                  dataSuccTop: [],//实际重度
                  dataSucc: [],//实际中度
                  dataSuccBottom: [],//实际轻度
                }
              }

              if (data.length == 0) {
                // data = [
                //   {
                //     fsddsl: 100,
                //     fzrwbh: 100,
                //     hsyq: 3,
                //     hscd: 1,
                //     jhmzdl: 100,
                //     mbbh: 1,
                //     mbzyxdj: 10,
                //     mzddsl: 100,
                //     mzddxh: 'DF-11A',
                //     zzfxdh: 1
                //   },

                // ]
              }

              if (!Array.isArray(data)) {
                data = []
              }
              Array.from(data, item => {
                let {
                  fsddsl,//发射导弹数量
                  fzrwbh,//仿真任务编号
                  hscd,//毁伤程度，重度3，中度2，轻度1
                  hsyq,//毁伤要求，重度3，中度2，轻度1
                  jhmzdl,//计划命中弹量
                  mbbh,//目标编号
                  mbzyxdj,//目标重要性等级，1~10，默认为1
                  mzddsl,//命中导弹数量
                  mzddxh,//命中导弹型号
                  zzfxdh,//作战风险代号
                } = item

                countTargetNoSuc += (jhmzdl - mzddsl)
                countTargetSuc += mzddsl

                //总耗弹情况
                countAll += fsddsl
                countAllMZ += mzddsl

                //型号统计
                let XH_Item = {jhmzdl: 0, mzddsl: 0}
                if (XH_Map.has(mzddxh)) {
                  XH_Item = XH_Map.get(mzddxh)
                } else {
                  XH_Map.set(mzddxh, XH_Item)
                }
                XH_Item.jhmzdl += jhmzdl
                XH_Item.mzddsl += mzddsl

                //目标命中弹量情况

                let MB_MZ_Item = {jhmzdl: 0, mzddsl: 0}
                if (MB_MZ_Map.has(mbbh)) {
                  MB_MZ_Item = MB_MZ_Map.get(mbbh)
                } else {
                  MB_MZ_Map.set(mbbh, MB_MZ_Item)
                }
                MB_MZ_Item.jhmzdl += jhmzdl
                MB_MZ_Item.mzddsl += mzddsl

                //目标毁伤情况
                let MB_HS_Item = {hsyq, hscd}
                if (MB_HS_Map.has(mbbh)) {
                  MB_HS_Item = MB_HS_Map.get(mbbh)
                } else {
                  MB_HS_Map.set(mbbh, MB_HS_Item)
                }
                MB_HS_Item.hscd = MB_HS_Item.hscd > hscd ? MB_HS_Item.hscd : hscd//取最大值

              })

              //总耗弹情况
              // this.dataA.topRight =

              this.$store.commit('SET_THEPGJG_DDDJ_ZTQK', [
                {value: countAll - countAllMZ, name: '被拦截弹量'},
                {value: countAllMZ, name: '突防成功弹量'}
              ])

              //型号统计
              Array.from([...XH_Map], item => {
                let {jhmzdl, mzddsl} = item[1]
                XH_Arr.columnsTitle.push(item[0])
                XH_Arr.columnsDataAll.push(jhmzdl)
                XH_Arr.columnsDataSucc.push(mzddsl)
              })
              this.dataA.bottomRight = XH_Arr

              //目标意图达成统计
              this.dataB.topRight = [
                {value: countTargetNoSuc, name: '未达成意图目标数'},
                {value: countTargetSuc, name: '达成意图目标数'},
              ]
              //目标命中弹量情况
              Array.from([...MB_MZ_Map], item => {
                let {jhmzdl, mzddsl} = item[1]
                MB_MZ.columnsTitle.push(item[0])
                MB_MZ.columnsDataAll.push(jhmzdl)
                MB_MZ.columnsDataSucc.push(mzddsl)
              })
              this.dataB.bottomLeft = MB_MZ

              //目标毁伤结果
              let hsbzArr = [
                [0, 0, 0],//未命中
                [0, 0, 1],//重度
                [0, 1, 1],//中度
                [1, 1, 1],//轻度
              ]
              Array.from([...MB_HS_Map], item => {
                let {hsyq, hscd} = item[1]
                MB_HS.columnsTitle.push(item[0])
                let hsbzSel = hsbzArr[hsyq]//毁伤要求
                MB_HS.columnsDataAll.dataSuccTop.push(hsbzSel[0])
                MB_HS.columnsDataAll.dataSucc.push(hsbzSel[1])
                MB_HS.columnsDataAll.dataSuccBottom.push(hsbzSel[2])
                let hsbzGet = hsbzArr[hscd]//毁伤程度
                MB_HS.columnsDataSucc.dataSuccTop.push(hsbzGet[0])
                MB_HS.columnsDataSucc.dataSucc.push(hsbzGet[1])
                MB_HS.columnsDataSucc.dataSuccBottom.push(hsbzGet[2])
              })
              this.dataB.bottomRight = MB_HS

            }
          }
        )
      },
      // 获取导弹代价数据
      getDDDJ () {
        let taskId = this.$store.state.theSelectedTaskId
        let zbId = this.$store.state.theSelectedComputedIndexId
        this.axios.get(`/statistic/dddj/${taskId}/${zbId}`).then(
          res => {
            let {code, msg, data} = res
            if (code == 0) {
              this.dataA.topLeft = data || 0
            }

          }
        )
      },

      // 毁伤效果查询
      getHSXG () {
        let taskId = this.$store.state.theSelectedTaskId
        let zbId = this.$store.state.theSelectedComputedIndexId
        this.axios.get(`/statistic/hsxg/${taskId}/${zbId}`).then(
          res => {
            let {code, msg, data} = res
            if (code == 0) {
              this.dataB.topLeft = data || 0
            }
          }
        )
      },

      //设置数据
      loadData (data) {
        //导弹代价

        //目标毁伤效果

        //作战风险

      },

      handleSelectionChange (selection) {
        this.selection = selection
      },

      handleNodeClick (data, node) {

        if (data.label == '导弹代价') {
          this.showStatus = '1'
        }
        if (data.label == '目标毁伤效果') {
          this.showStatus = '2'
        }
        if (data.label == '作战风险') {
          this.showStatus = '3'
        }

      },

      taskDbClick (data) {
        let {id} = data
        this.check = !this.check
        this.getTaskInfoData({id})

        // this.$store.commit('SET_THESELECTEDTASKID', data.id)
      },

      deleteTask () {
        let {id, name} = this.selection[0]

        this.$confirm(`此操作将删除任务'${name}'，是否确认删除？`, '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认删除',
          cancelButtonText: '取消删除'
        })
          .then(() => {
            this.deleteTaskData({id})
          })
          .catch(action => {
            /* this.$message({
               type: 'info',
               message: action === 'cancel'
                 ? '放弃保存并离开页面'
                 : '停留在当前页面'
             })*/
          })
      },

      deleteAllTask () {
        this.$confirm('此操作将删除所有勾选的任务，是否确认删除？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认删除',
          cancelButtonText: '取消删除'
        })
          .then(() => {
            this.deleteAllTaskData()
          })
          .catch(action => {
            /* this.$message({
               type: 'info',
               message: action === 'cancel'
                 ? '放弃保存并离开页面'
                 : '停留在当前页面'
             })*/
          })
      },

      addTask () {
        this.showAdd = !this.showAdd
        let d = new Date()
        let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        let state = '新建'
        let id = parseInt(Math.random() * 100)

        this.form = {
          id,
          name: `任务00${id}`,
          file: `文件${id}`,
          creater: `user${id}`,
          createDate: date,
          state
        }

        this.getFilesData()

      },

      //打开新增窗口
      openAddForm () {
        this.dialogAddFormVisible = true
        this.addForm = {}
      },
      //取消新增
      cancelAddForm () {
        this.dialogAddFormVisible = false
      },
      //确认新增
      confirmAddForm () {

        // this.showTag = true
        this.cancelAddForm()
      },

      //新增任务 promise
      postTask (data) {
        return this.axios.post('/task-info', data)
      },

      //查询任务列表 promise
      getTask (data) {
        let {page, size} = data
        return this.axios.get(`/task-info/${page}/${size}`)
      },

      //删除一个任务 promise
      deleteTaskP (data) {
        let {id} = data
        return this.axios.delete(`/task-info/${id}`)
      },

      //删除批量任务 promise
      deleteAllTaskP (data) {
        return this.axios.delete('/task-info/batchRemove', {data})
      },

      //查看任务详情 promise
      getTaskInfoP (data) {
        let {id} = data
        return this.axios.get(`/task-info/${id}`)
      },

      //查看文件目录 promise
      getFilesP () {
        return this.axios.get('/task-info/dir')
      },

      async saveTask () {
        let {name, path} = this.addForm
        let res = await this.postTask({name, path})
        let {code, msg, data} = res
        if (code == 0) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.init()
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      },

      async getTaskData () {
        let page = 1
        let size = 10
        let res = await this.getTask({page, size})
        let {code, data, msg} = res

        if (code !== 0) {
          this.$message({
            type: 'warning',
            message: msg
          })
          return
        }
        this.taskList = data.rows
        console.log(res)
      },

      async deleteTaskData (data) {
        let res = await this.deleteTaskP(data)
        let {code, msg} = res
        if (code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.init()
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      },

      async deleteAllTaskData () {

        let data = Array.from(this.selection, item => {
          return item.id
        })
        let res = await this.deleteAllTaskP(data)
        let {code, msg} = res
        if (code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.init()
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      },

      async getTaskInfoData (data) {
        let res = await this.getTaskInfoP(data)
        let {code, data: task, msg} = res
        if (code !== 0) {
          this.$message({
            type: 'warning',
            message: msg
          })
          return
        }

        this.task = task

      },

      async getFilesData () {
        let res = await this.getFilesP()
        let {code, data, msg} = res
        if (code !== 0) {
          this.$message({
            type: 'warning',
            message: msg
          })
          return
        }
        this.files = data

      },

      go () {
        this.$router.push('/frame')
      },

      //开始仿真推演
      simulatHandle (scope) {
        this.$router.push('/frame')
      },

      //分析评估
      assessHandle (scope) {
        this.$router.push('/assess')
      },

      //查看分析评估结果
      assessResultHandle (scope) {
        this.$router.push('/result')
      },

      //回到主页
      home () {
        this.$router.push('/home/3')
      },

      //删除标签
      handleClose (tag) {
        this.showTag = false
      }

    }

  }
</script>

<style scoped lang="scss">


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

  .judge-container {
    height: 100%;
    background: #1e576c;
    padding: 10px;
    box-sizing: border-box;

    .main-radius-panel {
      width: 100%;
      height: 100%;
      background: #0d1d2b;
      border-radius: 40px;
      box-sizing: border-box;
      padding: 10px 18px 22px 18px;

      .title-logo {
        height: 60px;
        width: 100%;
        box-sizing: border-box;
        background: radial-gradient(#0a8eae, #013342);
        border-top-right-radius: 60px;
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
        position: relative;
        padding-left: 100px;

        margin-bottom: 20px;

        .logo-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 60px;
          box-sizing: border-box;
          border-bottom-left-radius: 30px;
          border-top-left-radius: 30px;
          background: url("../../static/iframe/logo.png") no-repeat;
          background-size: 63px 42px;
          background-position: center center;
        }

        .logo-text {
          display: inline-block;
          font-size: 24px;
          font-family: "Microsoft YaHei";
          color: #f9f9f9;
          line-height: 60px;
        }

      }

      .task-box {
        border-radius: 5px;
        overflow: hidden;

        .box-header {
          height: 40px;
          background: -webkit-gradient(linear, left top, left bottom, from(#0982a0), to(#034051));
          background: linear-gradient(180deg, #0982a0, #034051);

          .box-title {
            line-height: 40px;
            color: #fff;
            font-size: 15px;
            box-sizing: border-box;
            display: inline-block;
            padding: 0 0 0 10px;
          }

          .box-tool {
            float: right;
            display: inline-block;
            height: 40px;
            box-sizing: border-box;
            padding: 5px 10px 0 0;
          }
        }

        .box-body {
          box-sizing: border-box;
          padding: 10px;
        }

        .table-tools {
          height: 35px;
          padding: 3px 0 0 10px;
        }

        .table-box {
          display: flex;

          .table-left {
            width: 300px;
            margin-right: 10px;
            background: transparent;
          }

          .table-right {
            flex: 2;
            background: rgba(255, 255, 255, .2);
            height: 750px;
            position: relative;

            .div-1 {
              position: absolute;
              width: 100%;

              .row-1 {
                height: 375px;
                display: flex;

                .col-1 {
                  flex: 1;
                  color: #ffffff;
                  font-family: "Microsoft YaHei";
                  font-weight: normal;

                  .col-title {
                    height: 30px;
                    line-height: 30px;
                    box-sizing: border-box;
                    padding-left: 20px;
                    font-size: 20px;
                  }

                  .col-body {
                    font-weight: bold;
                    font-size: 100px;
                    text-align: center;
                    line-height: 300px;
                  }
                }

                .col-2 {
                  flex: 1;
                }
              }

              .row-2 {
                height: 375px;
                display: flex;

                .col-1 {
                  flex: 1;
                }

                .col-2 {
                  flex: 2;
                }
              }
            }

            .div-2 {
              position: absolute;
              width: 100%;

              .row-1 {
                height: 375px;
                display: flex;

                .col-1 {
                  flex: 1;
                  color: #ffffff;
                  font-family: "Microsoft YaHei";
                  font-weight: normal;

                  .col-title {
                    height: 30px;
                    line-height: 30px;
                    box-sizing: border-box;
                    padding-left: 20px;
                    font-size: 20px;
                  }

                  .col-body {
                    font-weight: bold;
                    font-size: 100px;
                    text-align: center;
                    line-height: 300px;
                  }
                }

                .col-2 {
                  flex: 1;
                }
              }

              .row-2 {
                height: 375px;
                display: flex;

                .col-1 {
                  flex: 1;
                }

                .col-2 {
                  flex: 1;
                }
              }
            }

            .div-3 {
              position: absolute;
              width: 100%;

              .row-1 {
                height: 500px;
                display: flex;

                .col-1 {
                  flex: 1;
                  color: #ffffff;
                  font-family: "Microsoft YaHei";
                  font-weight: normal;

                  .col-title {
                    height: 30px;
                    line-height: 30px;
                    box-sizing: border-box;
                    padding-left: 20px;
                    font-size: 20px;
                  }

                  .col-body {
                    font-weight: bold;
                    font-size: 100px;
                    text-align: center;
                    line-height: 300px;
                  }
                }
              }

              .row-2 {
                height: 300px;
                display: flex;

                .col-1 {
                  flex: 1;
                }

                .col-2 {
                  flex: 1;
                }

                .col-3 {
                  flex: 1;
                }
              }
            }


          }

          .echarts{
            height: 100%;
          }

          .table-right-header {
            height: 48px;
            line-height: 48px;
            box-sizing: border-box;
            padding-left: 10px;
            background: radial-gradient(#0a8eae, #013342) !important;
            text-align: left;
            color: #fff;
            font-size: 14px;
            font-weight: normal;
            font-family: "Microsoft YaHei";
          }

        }
      }


    }
  }
</style>

<style lang="scss">
  .judge-container {
    .el-table {
      background: transparent !important;
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

    .el-dialog__header {
      background: radial-gradient(#0a8eae, #013342) !important;

      .el-dialog__title, .el-dialog__close {
        color: #ffffff !important;
      }
    }

    .el-radio__label {
      color: #ffffff !important;
    }

    .el-tree {
      background-color: #013342 !important;
      color: #ffffff;
    }

    .el-tree-node__content:hover {
      background-color: rgba(255, 255, 255, .2) !important;
    }

    .el-tree-node:focus > .el-tree-node__content {
      background-color: rgba(255, 255, 255, .3) !important;
    }

    .el-tree-node__content {
      border-bottom: 1px solid #0a8eae !important;
    }

    .echarts {
      background: transparent !important;
    }

    .el-dialog__body, .el-dialog__footer {
      background: radial-gradient(#0a8eae, #013342) !important;
    }

    .el-tag {
      background-color: #013342 !important;
    }
  }
</style>


