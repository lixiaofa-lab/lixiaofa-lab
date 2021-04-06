<template>

  <div class="tree-aside-panel">
    <el-tree
      ref="asideTree"
      :data="entityList"
      :expand-on-click-node="false"
      node-key="id"
      default-expand-all
      @node-click="handleNodeClick"
      show-checkbox
      @check="handleCheckChange"
      :props="defaultProps"
    ></el-tree>
  </div>

</template>

<script>

  export default {

    data () {
      return {
        leafsMap: new Map(),
        entityList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },

    created () {
      this.init()
    },

    methods: {
      init () {
        this.getData()
      },
      getData () {
        this.axios.get(`${HTTP_PRO_SOUTH_SERVER_PATH}/menu-tree/tree`).then((res) => {
          let {code, data, msg} = res
          this.entityList = data
          /**获取叶子节点对应的实体数据*/
          this.loadLeafData(data)
        })
      },
      loadLeafData (arr) {

        //递归拿到左右叶子
        let leafs = []

        function recursion (item) {

          let {children, id} = item
          if (Array.isArray(children) && children.length > 0) {
            for (let i = 0, len = children.length; i < len; i++) {
              recursion(children[i])
            }
          } else {
            leafs.push([id, {item, data: null}])
          }

        }

        for (let i = 0, len = arr.length; i < len; i++) {
          recursion(arr[i])
        }

        this.leafsMap = new Map(leafs)
        let keys = [...this.leafsMap.keys()]

        let promiseArr = Array.from(keys, item => {
          return this.axios.get(`${HTTP_PRO_SOUTH_SERVER_PATH}/index/item/${item}`)
        })

        Promise.all(promiseArr).then(res => {
          //格式化
          this.formatLeafData(res)
        })

      },

      //格式化实体数据
      formatLeafData (resArr) {

        let keys = [...this.leafsMap.keys()]

        let keysMap = new Map(
          [
            ['4', ['ID', 'BDMC', 'BSJD', 'BSWD', 'BSGC', '1']],
            ['5', ['ID', 'BDMC', 'BSJD', 'BSWD', 'BSGC', '1']],
            ['6', ['ID', 'BDMC', 'BSDJD', 'BSDWD', 'BSDGD', '2']],
            ['7', ['ID', 'BDFH', 'BSDJD', 'BSDWD', 'BSDGD', '2']],
            ['19', ['ID', 'MC', 'JD', 'WD', 'GC', '3']],
            ['20', ['ID', 'MC', 'JD', 'WD', 'GC', '3']],
            ['21', ['ID', 'MC', 'JD', 'WD', 'GC', '4']],
            ['22', ['ID', 'MC', 'JD', 'WD', 'GC', '4']],
            ['12', ['ID', 'MC', 'JD', 'WD', 'GC', '5']],
            ['13', ['ID', 'MC', 'JD', 'WD', 'GC', '5']],
            ['14', ['ID', 'MC', 'JD', 'WD', 'GC', '5']],
            ['15', ['ID', 'MC', 'JD', 'WD', 'GC', '5']],
            ['16', ['ID', 'MC', 'JD', 'WD', 'GC', '5']],
            ['17', ['ID', 'MC', 'JD', 'WD', 'GC', '6']],
            ['18', ['ID', 'MC', 'JD', 'WD', 'GC', '6']]
          ]
        )

        let arr = Array.from(keys, (item, index) => {

          let res = resArr[index]
          let {code, data} = res
          if (code == 0) {

            let [id, name, lon, lat, alt,classtype] = keysMap.get(item)

            // 敌方 6 7
            // 我方 4 5 19 ...
            let dw = 'w'
            if (item == 6 || item == 7) {
              dw = 'd'
            }

            // 需要重要性的 除了 4 5 6 7 没有重要性 剩下的 19 20 21 22 ... 18 都有重要性
            let hasZYX = true
            if (item == 4 || item == 5 || item == 6 || item == 7) {
              hasZYX = false
            }

            Array.from(data, iii => {
              iii['id'] = iii[id]
              iii['dw'] = dw
              iii['hasZYX'] = hasZYX
              iii['name'] = iii[name]
              iii['lon'] = iii[lon]
              iii['lat'] = iii[lat]
              iii['alt'] = iii[alt]
              iii['classtype'] = classtype
              iii['classAndId'] = `${item}_class_${iii[id]}_class_${iii[name]}`
            })

          }

          return [item, data]

        })

        /**保存实体集合*/
        this.$store.commit('SET_THEENTITIESLISTS', arr)

      },

      handleNodeClick (data, node) {
        // let {alt, id, lat, lon, label} = data
      },
      handleCheckChange (data, checked, indeterminate) {

        let {checkedNodes} = checked
        let arr = checkedNodes.filter((item) => {
          let {children} = item
          if (children && children.length > 0) {
            return false
          } else {
            return true
          }
        })

        this.$store.commit('SET_THECHECKDNODES', arr)

        if (window.AAASSSDDD) {
          window.AAASSSDDD.VUE_ENTITY.$store.commit('SET_THEOPENWINDOWDATA', arr)
        }
        if (window.AAASSSFFF) {
          window.AAASSSFFF.VUE_ENTITY.$store.commit('SET_THEOPENWINDOWDATA', arr)
        }

        // if (checked) {
        //   this.getEntityList(data.id)
        // }
      },

    }

  }

</script>

<style scoped lang="scss">
  .tree-aside-panel {
    width: 100%;
    height: 100%;
    overflow: auto;

    .el-tree {
      display: inline-block;
      min-width: 100%;
    }
  }
</style>
<style lang="scss">
  .tree-aside-panel {

    .el-tree {
      background-color: transparent !important;
      color: #ffffff;
      font-size: 14px !important;
      font-family: "Microsoft YaHei" !important;
    }

    .el-tree-node__content:hover {
      background-color: rgba(255, 255, 255, .2) !important;
    }

    .el-tree-node:focus > .el-tree-node__content {
      background-color: rgba(255, 255, 255, .3) !important;
    }

    .el-tree-node__content {
      border-bottom: 1px solid #173257 !important;
      background-color: transparent !important;
    }

  }
</style>

