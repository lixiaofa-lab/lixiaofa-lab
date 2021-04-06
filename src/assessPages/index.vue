<template>

  <el-container class="judge-container">

    <div class="main-radius-panel">

      <div class="title-logo" style="position: relative;">
<!--        <div class="logo-img"></div>-->
        <div class="logo-text">检验评估系统-分析评估</div>
        <div style="position: absolute; right: 30px;top: 15px;">
          <el-button type="primary" @click="goToHome" size="mini">首页</el-button>
        </div>
      </div>

      <div class="task-box shine-box">
        <div class="box-header">
          <div class="box-title">{{title}}</div>
          <div class="box-tool">
          </div>
        </div>
        <div class="box-body">

          <div class="table-tools">
            <el-button @click="goResult" size="mini" type="primary">开始分析</el-button>
            <el-button @click="goToResult" size="mini" type="primary">查看结果</el-button>
          </div>
          <div class="table-box">

            <div class="table-left">

              <el-table
                :data="taskList"
                ref="indexTable"
                height="700px"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="指标体系名称"
                >
                  <template slot-scope="scope">
                    {{scope.row.name}}
                    <!--                    <el-radio v-model="selectRadio" :label="scope.row.name"></el-radio>-->
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="table-right">
              <div class="table-right-header">指标体系详情-{{selectionName}}</div>
              <div id="cy" style="width: 100%;height: 652px;background: #013342;"></div>
            </div>

          </div>

        </div>
      </div>


    </div>

  </el-container>

</template>

<script>

  function randomColor () {
    return 'cyan'
    // return `rgba(${parseInt(Math.random()*250)},${parseInt(Math.random()*250)},${parseInt(Math.random()*250)},1)`
  }

  export default {
    watch: {},

    created () {
      let {name,path} = this.$route.params
      this.title=`${name}:${path}`
    },

    data () {
      return {
        title:'任务评估',
        pan: '',
        indexsystemxml: '',
        xml2jsdata: '',
        selectionName: '',
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
        taskList: [{name: '任务评估方案',id:'1'}],
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
                  {label: '作战区代价'},
                  {label: '主战装备代价'},
                ]
              },
              {
                label: '作战效果',
                children: [
                  {label: '目标毁伤效果'},
                ]
              },
              {
                label: '作战风险',
                children: [
                  {label: '气象类风险'},
                  {label: '防抗类风险'},
                  {label: '突防类风险'},
                ]
              },

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
        return !this.selection
      },
      //批量删除按钮激活
      canDeleteMoreTask () {
        return this.selection.length < 2
      }
    },

    mounted () {
      this.init()

      // this.draw()
    },

    methods: {

      init () {
        this.getIndexsData()
      },

      //获取指标分组 p
      getIndexGroup () {
        return this.axios2.post('/api/indexsystem/allindexsystemgroup', {indexsystype: '0'})
      },

      //获取指标分组数据
      async getIndexGroupData () {
        let res = await this.getIndexGroup()
        let {result, status} = res
        if (status !== 0) {
          this.$message({
            type: 'warning',
            message: result
          })
          return
        }

        let {IndexSystemGroup} = JSON.parse(result)

        if (Array.isArray(IndexSystemGroup) && IndexSystemGroup.length > 0) {
          return IndexSystemGroup[0]['ID']
        } else {
          return ''
        }
      },

      //获取指标体系列表
      getIndexLists (id) {
        return this.axios2.post('/api/indexsystem/indexsystembygroup', {id})
      },
      //获取指标体系列表数据
      async getIndexListsData (id) {
        let res = await this.getIndexLists(id)
        let {result, status} = res
        if (status !== 0) {
          this.$message({
            type: 'warning',
            message: result
          })
          return
        }
        //指标体系集合
        let {IndexSystems} = JSON.parse(result)
        if (Array.isArray(IndexSystems)) {
          return IndexSystems
        } else {
          return []
        }

      },

      //获取指标体系详情 p
      getIndexSysInfo (id) {
        return this.axios2.post('/api/indexsystem/indexsystemxmlbyid', {id})
      },

      async getIndexsData () {
        let groupID = await this.getIndexGroupData()
        let indexLists = await this.getIndexListsData(groupID)

        this.taskList = Array.from(indexLists, item => {
          let {Name: name, ID: id} = item
          return {name, id}
        })
        // 0 高亮第一行
        this.$refs.indexTable.setCurrentRow(this.taskList[0])
      },

      handleCurrentChange (currentRow, oldCurrentRow) {
        let {id, name} = currentRow
        this.selection = id
        this.selectionName = name

        //检验评估 指标体系ID
        this.$store.commit('SET_THETHESELECTEDCOMPUTEDINDEXID',id)


        // 0 获取指标体系详情
        this.getIndexSysInfoData(id)
      },

      //获取指标体系详情数据
      async getIndexSysInfoData (id) {
        let res = await this.getIndexSysInfo(id)
        let {result: xml, status} = res
        if (status !== 0) {//非0 失败
          this.$message({
            type: 'warning',
            message: xml
          })
          return
        }
        this.loadCanvas(xml)
      },

      //绘制指标体系结构图
      loadCanvas (xml) {
        if (!xml) return

        let showLayer = 2//前两层横着
        let data = this.$x2js.xml2js(xml)
        let root = data.SpecSys.SpecItems.Item
        let nodeArr = []
        let linkArr = []

        treeToArr(root, 0)

        let elements = [...linkArr]
        elements = elements.concat(...nodeArr)

        // 0 调整每层的高度 调整显示模式(横，竖)
        Array.from(nodeArr, (item, index) => {

          // 0 取当前层最长的节点长度
          let lens = Array.from(item, point => {
            let {data: {name}} = point
            return name.length
          })
          let maxLen = Math.max(...lens)

          // 1 设置当前层的模式
          let mode = index < showLayer ? 'horizontal' : 'vertical'// h 水平 v 垂直

          // 2 设置当前层的节点贴图和样式

          Array.from(item, point => {
            let {data: {isLeaf, name}} = point

            // horizontal 水平
            let fontSize = 15 //文字大小
            let padding = 10 //节点内边距
            let space = 2 //文字间距
            let color = '#000' //文字颜色
            let bgColor = isLeaf ? 'orange' : 'cyan' //背景颜色
            let width = maxLen * (fontSize + space) + padding * 2 //节点宽度
            let height = 30  //节点高度

            // vertical 垂直
            if ('vertical' == mode) {
              height = width
              width = 30
            }

            point.classes.push(mode)
            point.data.width = width
            point.data.height = height
            point.data.type = 'round-rectangle'
            point.data.img = generateImg({
              name,
              width,
              height,
              color,
              bgColor,
              fontSize,
              maxLen,
              space,
              mode,
              isLeaf,
              padding
            })
          })

        })

        function treeToArr (node, layer, pid) {

          let {_Id: id, _Name: name, Item} = node

          // 0 创建节点
          let point = {
            data: {id, name, layer, isLeaf: false},
            classes: [],
          }
          if (!nodeArr[layer]) {
            nodeArr[layer] = []
          }
          nodeArr[layer].push(point)

          if (pid != undefined) {
            // 1 创建连线
            let line = {
              data: {source: pid, target: id},
              classes: ['taxi']
            }
            linkArr.push(line)
          }

          //递归子节点
          layer++
          if (Item && !Array.isArray(Item)) {
            Item = [Item]
          }
          if (Array.isArray(Item)) {
            Array.from(Item, item => {
              treeToArr(item, layer, id)
            })
          } else {
            point.data.isLeaf = true
          }
        }

        function generateImg (config) {

          let {name, width, height, color, bgColor, fontSize, space, mode, maxLen, padding} = config

          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, width, height)
          ctx.fillStyle = color
          ctx.font = `normal ${fontSize}PT 黑体`
          let len = name.length

          if ('horizontal' == mode) {
            let ofset = fontSize + space
            for (let i = 0; i < len; i++) {
              let w = name.substr(i, 1)
              ctx.fillText(w, (i + (maxLen - len) / 2) * ofset + padding, fontSize + (height - fontSize) / 2)
            }
          }

          if ('vertical' == mode) {
            let ofset = fontSize + space
            for (let i = 0; i < len; i++) {
              let w = name.substr(i, 1)
              ctx.fillText(w, 5, (i + 1 + (maxLen - len) / 2) * ofset + padding)
            }
          }

          let url = canvas.toDataURL('image/png')
          return url

        }

        let cy = this.$cytoscape({
          container: document.getElementById('cy'),
          elements,
          layout: {
            name: 'dagre',

            // dagre algo options, uses default value on undefined
            nodeSep: undefined, // the separation between adjacent nodes in the same rank
            edgeSep: undefined, // the separation between adjacent edges in the same rank
            rankSep: undefined, // the separation between each rank in the layout
            // rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right,
            rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right,
            ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
            minLen: function (edge) {
              return 1
            }, // number of ranks to keep between the source and target of the edge
            edgeWeight: function (edge) {
              return 1
            }, // higher weight edges are generally made shorter and straighter than lower weight edges

            // general layout options
            fit: true, // whether to fit to viewport
            padding: 30, // fit padding
            spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
            nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
            animate: false, // whether to transition the node positions
            animateFilter: function (node, i) {
              return true
            }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            transform: function (node, pos) {
              return pos
            }, // a function that applies a transform to the final node position
            ready: function () {
              console.time('画图')
            }, // on layoutready
            stop: function () {
              console.timeEnd('画图')
            } // on layoutstop
          },
          minZoom: 0.1,
          maxZoom: 1.2,
          // so we can see the ids
          style: [
            {
              'selector': 'node',
              'style': {
                'shape': 'data(type)',
                'text-valign': 'center',
                'text-halign': 'center',
                // 'content': 'data(id)',
                'background-image': 'data(img)',
                'color': '#333',
                'font-size': '26',
                'background-color': 'data(color)',
              }
            },
            {
              'selector': 'node.horizontal',
              'style': {
                'shape': 'data(type)',
                'height': 'data(height)',
                'width': 'data(width)',
                'text-valign': 'center',
                'text-halign': 'center',
                // 'content': 'data(name)',
              }
            },
            {
              'selector': 'node.vertical',
              'style': {
                'shape': 'data(type)',
                'height': 'data(height)',
                'width': 'data(width)',
                'text-valign': 'center',
                'text-halign': 'center',
                // 'content': 'data(name)',
              }
            },
            {
              'selector': 'edge',
              'style': {
                'width': 1
              }
            }, {
              'selector': 'edge.bezier',
              'style': {
                'curve-style': 'bezier',
                'control-point-step-size': 40
              }
            }, {
              'selector': 'edge.unbundled-bezier',
              'style': {
                'curve-style': 'unbundled-bezier',
                'control-point-distances': 120,
                'control-point-weights': 0.1
              }
            }, {
              'selector': 'edge.multi-unbundled-bezier',
              'style': {
                'curve-style': 'unbundled-bezier',
                'control-point-distances': [40, -40],
                'control-point-weights': [0.250, 0.75]
              }
            }, {
              'selector': 'edge.haystack',
              'style': {
                'curve-style': 'haystack',
                'haystack-radius': 0.5
              }
            }, {
              'selector': 'edge.segments',
              'style': {
                'curve-style': 'segments',
                'segment-distances': [40, -40],
                'segment-weights': [0.250, 0.75]
              }
            }, {
              'selector': 'edge.taxi',
              'style': {
                'curve-style': 'taxi',
                'taxi-direction': 'downward',
                // 'taxi-direction': 'leftward',
                'taxi-turn': 20,
                'taxi-turn-min-distance': 5,
                'line-color': 'cyan'
              }
            },
            {
              'selector': '#bird',
              'style': {
                'shape': 'rectangle',
                'height': '300',
                'width': '50',
                'background-image': 'data(img)',
                'background-position': '100',
              }
            }
          ],
          wheelSensitivity: 0.2,
        })
        cy.panningEnabled(true) // 设置画布能否拖动
        cy.autolock(true) // 设置节点能否拖动
        this.pan = JSON.parse(JSON.stringify(cy.pan())) // 复位坐标

      },

      draw () {

        console.time('画指标图片')

        let elements = []

        let index = 32
        for (let i = 1; i < index; i++) {
          let id = i
          let name = `指标${id}`
          let mode = id < 8 ? 'horizontal' : 'vertical'
          // let mode = id > 10 ? '' : 'vertical'
          // let mode = 'horizontal'

          elements.push({
            data: {
              name: `指标${id}`,
              id: `n${id}`,
              img: generateImg(name, mode),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: [mode]
          })
        }
        console.timeEnd('画指标图片')

        console.time('准备线')
        for (let i = 1; 2 * i < index; i++) {

          elements.push(
            {
              data: {
                // inferred as an edge because `source` and `target` are specified:
                source: `n${i}`, // the source node id (edge comes from this node)
                target: `n${2 * i}`,  // the target node id (edge goes to this node)

                // (`source` and `target` can be effectively changed by `eles.move()`)
              },
              'classes': 'taxi'
            },
            {
              data: {
                // inferred as an edge because `source` and `target` are specified:
                source: `n${i}`, // the source node id (edge comes from this node)
                target: `n${2 * i + 1}`  // the target node id (edge goes to this node)
                // (`source` and `target` can be effectively changed by `eles.move()`)
              },
              'classes': 'taxi'
            }
          )

        }
        console.timeEnd('准备线')
        /*
              elements.push({
                data: {id: `n5`, 'type': 'round-rectangle'}
              })*/

        let items = [
          {
            data: {
              name: '火力计划/火力方案检验评估',
              id: 1,
              img: generateImg('火力计划/火力方案检验评估', 'horizontal'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['horizontal']
          },
          {
            data: {
              name: '作战代价',
              id: 2,
              img: generateImg('作战代价', 'horizontal'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['horizontal']
          },
          {
            data: {
              name: '作战效果',
              id: 3,
              img: generateImg('作战效果', 'horizontal'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['horizontal']
          },
          {
            data: {
              name: '作战风险',
              id: 4,
              img: generateImg('作战风险', 'horizontal'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['horizontal']
          },
          {
            data: {
              name: '导弹代价',
              id: 5,
              img: generateImg('导弹代价', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '目标毁伤效果',
              id: 6,
              img: generateImg('目标毁伤效果', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '突防条件变化风险',
              id: 7,
              img: generateImg('突防条件变化风险', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '防抗条件变化风险',
              id: 8,
              img: generateImg('防抗条件变化风险', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '气象条件变化风险',
              id: 9,
              img: generateImg('气象条件变化风险', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '总发射弹量',
              id: 10,
              img: generateImg('总发射弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '各波次发射弹量',
              id: 11,
              img: generateImg('各波次发射弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '各型号发射弹量',
              id: 12,
              img: generateImg('各型号发射弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '总被拦截弹量',
              id: 13,
              img: generateImg('总被拦截弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '各波次被拦截弹量',
              id: 14,
              img: generateImg('各波次被拦截弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '各型号发射弹量',
              id: 15,
              img: generateImg('各型号发射弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '各目标毁伤要求',
              id: 16,
              img: generateImg('各目标毁伤要求', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '各目标毁伤程度',
              id: 17,
              img: generateImg('各目标毁伤程度', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '目标重要性等级',
              id: 18,
              img: generateImg('目标重要性等级', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '目标发射弹量',
              id: 19,
              img: generateImg('目标发射弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          },
          {
            data: {
              name: '目标命中弹量',
              id: 20,
              img: generateImg('目标命中弹量', 'vertical'),
              'type': 'rectangle',
              color: randomColor()
            },
            classes: ['vertical']
          }
        ]
        let links = [
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 1, // the source node id (edge comes from this node)
              target: 2  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 1, // the source node id (edge comes from this node)
              target: 3  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 1, // the source node id (edge comes from this node)
              target: 4  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 2, // the source node id (edge comes from this node)
              target: 5  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 5, // the source node id (edge comes from this node)
              target: 10  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 5, // the source node id (edge comes from this node)
              target: 11  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 5, // the source node id (edge comes from this node)
              target: 12  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 5, // the source node id (edge comes from this node)
              target: 13// the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 5, // the source node id (edge comes from this node)
              target: 14  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 5, // the source node id (edge comes from this node)
              target: 15  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 3, // the source node id (edge comes from this node)
              target: 6  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 6, // the source node id (edge comes from this node)
              target: 16  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 6, // the source node id (edge comes from this node)
              target: 17  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 6, // the source node id (edge comes from this node)
              target: 18  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 6, // the source node id (edge comes from this node)
              target: 19  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 6, // the source node id (edge comes from this node)
              target: 20  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 4, // the source node id (edge comes from this node)
              target: 7  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 4, // the source node id (edge comes from this node)
              target: 8  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },
          {
            data: {
              // inferred as an edge because `source` and `target` are specified:
              source: 4, // the source node id (edge comes from this node)
              target: 9  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
            'classes': 'taxi'
          },

        ]

        elements = [
          ...items,
          ...links,
        ]

        let cy = this.$cytoscape({

          container: document.getElementById('cy'),

          elements,

          /*elements: [ // flat array of nodes and edges


            { // node nparent
              data: {id: 'n1', "type": "round-rectangle"}
            },
            { // node nparent
              data: {id: 'n2', "type": "rectangle"}
            },
            { // node nparent
              data: {id: 'n3', "type": "rectangle"}
            },
            { // node nparent
              data: {id: 'n4', "type": "rectangle"}
            },
            { // node nparent
              data: {id: 'n5', "type": "rectangle"}
            },
            { // node nparent
              data: {id: 'n6', "type": "rectangle"}
            },

            { // edge e1
              data: {
                id: 'e1',
                // inferred as an edge because `source` and `target` are specified:
                source: 'n1', // the source node id (edge comes from this node)
                target: 'n2'  // the target node id (edge goes to this node)
                // (`source` and `target` can be effectively changed by `eles.move()`)
              },
              "classes": "taxi"
            },
            { // edge e1
              data: {
                id: 'e2',
                // inferred as an edge because `source` and `target` are specified:
                source: 'n1', // the source node id (edge comes from this node)
                target: 'n3'  // the target node id (edge goes to this node)
                // (`source` and `target` can be effectively changed by `eles.move()`)
              },
              "classes": "taxi"
            },
            { // edge e1
              data: {
                id: 'e3',
                // inferred as an edge because `source` and `target` are specified:
                source: 'n2', // the source node id (edge comes from this node)
                target: 'n4'  // the target node id (edge goes to this node)
                // (`source` and `target` can be effectively changed by `eles.move()`)
              },
              "classes": "taxi"
            },
            { // edge e1
              data: {
                id: 'e4',
                // inferred as an edge because `source` and `target` are specified:
                source: 'n2', // the source node id (edge comes from this node)
                target: 'n5'  // the target node id (edge goes to this node)
                // (`source` and `target` can be effectively changed by `eles.move()`)
              },
              "classes": "taxi"
            },
            { // edge e1
              data: {
                id: 'e5',
                // inferred as an edge because `source` and `target` are specified:
                source: 'n3', // the source node id (edge comes from this node)
                target: 'n6'  // the target node id (edge goes to this node)
                // (`source` and `target` can be effectively changed by `eles.move()`)
              },
              "classes": "taxi"
            },


          ],*/


          // elements:[
          //   {
          //   "data": {
          //     "id": "n01",
          //     "type": "bezier"
          //   }
          // }, {
          //   "data": {
          //     "id": "n02"
          //   }
          // }, {
          //   "data": {
          //     "source": "n01",
          //     "target": "n02"
          //   },
          //   "classes": "bezier"
          // }, {
          //   "data": {
          //     "source": "n01",
          //     "target": "n02"
          //   },
          //   "classes": "bezier"
          // }, {
          //   "data": {
          //     "source": "n02",
          //     "target": "n01"
          //   },
          //   "classes": "bezier"
          // }, {
          //   "data": {
          //     "id": "n03"
          //   }
          // }, {
          //   "data": {
          //     "id": "n04",
          //     "type": "unbundled-bezier",
          //     "flipLabel": true
          //   }
          // }, {
          //   "data": {
          //     "source": "n03",
          //     "target": "n04"
          //   },
          //   "classes": "unbundled-bezier"
          // }, {
          //   "data": {
          //     "id": "n05",
          //     "type": "unbundled-bezier(multiple)"
          //   }
          // }, {
          //   "data": {
          //     "id": "n06"
          //   }
          // }, {
          //   "data": {
          //     "source": "n05",
          //     "target": "n06"
          //   },
          //   "classes": "multi-unbundled-bezier"
          // }, {
          //   "data": {
          //     "id": "n14"
          //   }
          // }, {
          //   "data": {
          //     "id": "n15",
          //     "type": "straight",
          //     "flipLabel": true
          //   }
          // }, {
          //   "data": {
          //     "source": "n14",
          //     "target": "n15"
          //   },
          //   "classes": "straight"
          // }, {
          //   "data": {
          //     "id": "n07",
          //     "type": "haystack"
          //   }
          // }, {
          //   "data": {
          //     "id": "n08"
          //   }
          // }, {
          //   "data": {
          //     "id": "e06",
          //     "source": "n08",
          //     "target": "n07"
          //   },
          //   "classes": "haystack"
          // }, {
          //   "data": {
          //     "source": "n08",
          //     "target": "n07"
          //   },
          //   "classes": "haystack"
          // }, {
          //   "data": {
          //     "source": "n08",
          //     "target": "n07"
          //   },
          //   "classes": "haystack"
          // }, {
          //   "data": {
          //     "source": "n08",
          //     "target": "n07"
          //   },
          //   "classes": "haystack"
          // }, {
          //   "data": {
          //     "id": "n09"
          //   }
          // }, {
          //   "data": {
          //     "id": "n10",
          //     "type": "segments",
          //     "flipLabel": true
          //   }
          // }, {
          //   "data": {
          //     "source": "n09",
          //     "target": "n10"
          //   },
          //   "classes": "segments"
          // }, {
          //   "data": {
          //     "id": "n11"
          //   }
          // }, {
          //   "data": {
          //     "id": "n12"
          //   }
          // }, {
          //   "data": {
          //     "id": "n13",
          //     "type": "taxi"
          //   }
          // }, {
          //   "data": {
          //     "source": "n13",
          //     "target": "n11"
          //   },
          //   "classes": "taxi"
          // }, {
          //   "data": {
          //     "source": "n13",
          //     "target": "n12"
          //   },
          //   "classes": "taxi"
          // }, {
          //   "data": {
          //     "id": "n16",
          //     "type": "loop",
          //     "flipLabel": true
          //   }
          // }, {
          //   "data": {
          //     "source": "n16",
          //     "target": "n16"
          //   },
          //   "classes": "loop"
          // }],

          /*layout: {
            name: 'preset'
          },*/

          /*      layout: {
                name: 'polywas'
              },*/

          layout: {
            name: 'dagre',

            // dagre algo options, uses default value on undefined
            nodeSep: undefined, // the separation between adjacent nodes in the same rank
            edgeSep: undefined, // the separation between adjacent edges in the same rank
            rankSep: undefined, // the separation between each rank in the layout
            // rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right,
            rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right,
            ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
            minLen: function (edge) {
              return 1
            }, // number of ranks to keep between the source and target of the edge
            edgeWeight: function (edge) {
              return 1
            }, // higher weight edges are generally made shorter and straighter than lower weight edges

            // general layout options
            fit: true, // whether to fit to viewport
            padding: 30, // fit padding
            spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
            nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
            animate: false, // whether to transition the node positions
            animateFilter: function (node, i) {
              return true
            }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            transform: function (node, pos) {
              return pos
            }, // a function that applies a transform to the final node position
            ready: function () {
              console.time('画图')
            }, // on layoutready
            stop: function () {
              console.timeEnd('画图')
            } // on layoutstop
          },

          /*              layout: {
                  name: 'random',

                  fit: true, // whether to fit to viewport
                  padding: 30, // fit padding
                  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                  animate: false, // whether to transition the node positions
                  animationDuration: 500, // duration of animation in ms if enabled
                  animationEasing: undefined, // easing of animation if enabled
                  animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
                  ready: undefined, // callback on layoutready
                  stop: undefined, // callback on layoutstop
                  transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
                },
      */
          // so we can see the ids
          style: [
            {
              'selector': 'node',
              'style': {
                'shape': 'data(type)',
                'text-valign': 'center',
                'text-halign': 'center',
                // 'content': 'data(id)',
                'background-image': 'data(img)',
                'color': 'red',
                'font-size': '30',
                'background-color': 'data(color)',
              }
            },
            {
              'selector': 'node.horizontal',
              'style': {
                'shape': 'data(type)',
                'height': '50',
                'width': '690',
                'text-valign': 'center',
                'text-halign': 'center',
                // 'content': 'data(name)',
              }
            },
            {
              'selector': 'node.vertical',
              'style': {
                'shape': 'data(type)',
                'height': '400',
                'width': '50',
                'text-valign': 'center',
                'text-halign': 'center',
                // 'content': 'data(name)',
              }
            },

            {
              'selector': 'edge',
              'style': {
                'width': 1
              }
            }, {
              'selector': 'edge.bezier',
              'style': {
                'curve-style': 'bezier',
                'control-point-step-size': 40
              }
            }, {
              'selector': 'edge.unbundled-bezier',
              'style': {
                'curve-style': 'unbundled-bezier',
                'control-point-distances': 120,
                'control-point-weights': 0.1
              }
            }, {
              'selector': 'edge.multi-unbundled-bezier',
              'style': {
                'curve-style': 'unbundled-bezier',
                'control-point-distances': [40, -40],
                'control-point-weights': [0.250, 0.75]
              }
            }, {
              'selector': 'edge.haystack',
              'style': {
                'curve-style': 'haystack',
                'haystack-radius': 0.5
              }
            }, {
              'selector': 'edge.segments',
              'style': {
                'curve-style': 'segments',
                'segment-distances': [40, -40],
                'segment-weights': [0.250, 0.75]
              }
            }, {
              'selector': 'edge.taxi',
              'style': {
                'curve-style': 'taxi',
                'taxi-direction': 'downward',
                // 'taxi-direction': 'leftward',
                'taxi-turn': 20,
                'taxi-turn-min-distance': 5,
                'line-color': 'cyan'
              }
            },
            {
              'selector': '#bird',
              'style': {
                'shape': 'rectangle',
                'height': '300',
                'width': '50',
                'background-image': 'data(img)',
                'background-position': '100',
              }
            }
          ]

        })

        function generateImg (name, mode) {
          console.time('画一张图片')

          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')

          if ('horizontal' == mode) {//水平排列
            canvas.width = 690
            canvas.height = 50
            ctx.fillStyle = 'rgba(0,0,0,0)'
            ctx.fillRect(0, 0, 50, 690)
            ctx.fillStyle = '#333'
            ctx.font = 'normal 30PT 黑体'
            let text = name
            let len = text.length

            let ppp = (13 - name.length) / 4
            let pw = ppp > 0 ? ppp * (50 + 30) + 30 : 0
            let xOff = 50
            for (let i = 0; i < len; i++) {
              let w = text.substr(i, 1)
              ctx.fillText(w, pw + (i + 1) * xOff, 40)
            }
          } else {//垂直排列
            canvas.height = 410
            canvas.width = 50
            ctx.fillStyle = 'rgba(0,0,0,0)'
            ctx.fillRect(0, 0, 50, 410)
            ctx.fillStyle = '#333'
            ctx.font = 'normal 30PT 黑体'
            let text = name
            let len = text.length

            let ppp = (8 - name.length) / 4
            let ph = ppp * (50 + 30)
            let yOff = 50
            for (let i = 0; i < len; i++) {
              let w = text.substr(i, 1)
              ctx.fillText(w, 5, ph + (i + 1) * yOff)
            }
          }

          let url = canvas.toDataURL('image/png')
          console.timeEnd('画一张图片')
          return url
        }
      },

      handleNodeClick (data, node) {

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
        this.getFilesData()
        this.addForm = {}
      },
      //取消新增
      cancelAddForm () {
        this.dialogAddFormVisible = false
      },
      //确认新增
      confirmAddForm () {
        this.saveTask()
        this.cancelAddForm()
      },

      //新增任务 promise
      postTask (data) {
        return this.axios.post('/task-info', data)
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

      //结束计算
      finish () {
        this.$confirm('此操作将结束分析评估计算并退出，是否确认结束？', '确认消息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认结束',
          cancelButtonText: '取消结束'
        })
          .then(() => {
            this.$router.push('/home')
          })
          .catch()
      },

      //开始添加计算p
      getComputed (data) {
        let {task_id, spec_sys_id} = data
        return this.axios2.post('/api/compute/add', [{task_id, spec_sys_id}])
      },
      //开始计算数据
      async getComputedData () {
        // let task_id = this.$store.state.theSelectedTaskId
        let task_id = 'C58FAD123E514117989F1F90FDD41F30'
        let spec_sys_id = this.selection
        let data = {task_id, spec_sys_id}

        let res = await this.getComputed(data)
        console.log('res',res)
        let {result, status} = res
        if (status !== 0) {//非0 失败
          this.$message({
            type: 'warning',
            message: result
          })
          return
        }

        let {detail} = JSON.parse(result)

        if (detail[0]) {
          let {
            compute_task_id,
            index_sys_id,
            reason,// "error input format",
            result,//"error"
            sn,
            status,
            task_id
          } = detail[0]
        }


      },

      //查看结果
      goResult () {
        //添加计算
        // this.getComputedData()

        // this.$router.push('/result')

        //开始计算
        let data = {
          // task_id:'C58FAD123E514117989F1F90FDD41F30',
          task_id:this.$store.state.theSelectedTaskId+'',
          spec_sys_id:this.selection
        }
        this.axios2.post('/api/compute/redo', data).then(
          res=>{
            let {result, status} = res
            if (status !== 0) {//非0 失败
              this.$message({
                type: 'warning',
                message: result
              })
              return
            }

            let {compute_task_id,task_id,spec_sys_id,status:message} = JSON.parse(result)

            this.$message({
              type: 'success',
              message: message
            })

            //轮询查状态
            this.queryComputedList(task_id,spec_sys_id,compute_task_id)
          }
        )

      },

      //轮询查状态
      queryComputedList(task_id,spec_sys_id,compute_task_id){

        let data = {task_id,spec_sys_id,compute_task_id}
        this.axios2.post('/api/compute/list', data).then(
          res=>{
            let {result, status} = res
            if (status !== 0) {//非0 失败
              this.$message({
                type: 'warning',
                message: result
              })
              return
            }

          }
        )

      },

      goToResult(){
        this.$router.push({path:'/result',name:'result',params:{title:this.title}})
      },

      goToHome(){
        this.$router.push('/home')
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
            width: 200px;
            margin-right: 10px;
          }

          .table-right {
            flex: 2;

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
  }
</style>


