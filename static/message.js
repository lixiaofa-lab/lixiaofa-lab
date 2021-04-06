window.onload = function () {
  //页面加载完成之后 给父元素发送加载完成的消息
  sendMsgToParent(
    'loaded',
    (move = {}),
    (data = ''),
    (call = ''),
    (target = 'parent')
  )
  //消息监听事件
  addEvent()
}
//收到系统消息
window.addEventListener('message', function (data) {
  console.log('123123123')
  console.log(data)
  console.log('456456456')
  if (!data.data.hasOwnProperty('fromServe')) return
  let type = data.data.type
  //如果消息类型为  调用方法以及切换风格
  if (type == 'callFunction') {
    messageForCall(data)
  } else if (type == 'changeStyle') {
    console.log('改变风格', data)
  } else if (type == 'dandao') {
    console.log('弹道计算', data)
  } else if (type == 'c2mpeEvent') {
    console.log('三维球加载完毕...', data)

    window.VUE_ENTITY.$message({type: 'success', message: '三维球加载完毕...'})

    // 0 获取地球window对象
    let {source: GLOBAL_WINDOW} = data
    window.GLOBAL_WINDOW = GLOBAL_WINDOW

    // 1 地球win上的方法隐藏工具球
    let toolGlobel = GLOBAL_WINDOW.document.querySelector('#mapNavTool')
    toolGlobel.parentElement.removeChild(toolGlobel)

    // 2 将左边的layer拖动条藏起来 .vsplitter
    GLOBAL_WINDOW.document.querySelectorAll('.vsplitter')[0].style.display = 'none'

    // 2 将控制界面的状态修改为可开启绘制状态 数据准备好之后不能直接开始画 要等画布准备好

    var IMainControl = GLOBAL_WINDOW.IMainControl
    var Cesium = GLOBAL_WINDOW.Cesium
    var sg = GLOBAL_WINDOW.sg
    var csView = GLOBAL_WINDOW.csView
    var GS_Point3D = GLOBAL_WINDOW.GS_Point3D

    let str = Date.now() + ''

    window.VUE_ENTITY.$store.commit('SET__GLOBAL__UTIL', str)

    // 3 卫星
    function showSatellite () {
      var csView = IMainControl.getViewManager().getView().getCsView()
      this._primitiveLayer = csView.addLayer(new sg.csview.PrimitiveLayer())
      var viewer = csView.getViewer()
      var scene = viewer.scene
      this._primitives = []
      this._positionProperties = []

      var t1 = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16))
      var t2 = Cesium.JulianDate.addSeconds(t1, 100 * 22, new Cesium.JulianDate())
      viewer.clock.startTime = t1.clone()
      viewer.clock.stopTime = t2.clone()
      viewer.clock.currentTime = t1.clone()
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP //Loop at the end
      viewer.clock.multiplier = 20
      viewer.clock.shouldAnimate = true

      for (var count = 0; count < 1; count++) {
        var positionProperty = new Cesium.SampledPositionProperty()
//卫星实时位置（经度、纬度是实时参数）
        var lon = Math.random() * 100.0 + 100.0
        var lat = -Math.random() * 40.0 + 40.0
        var lonstep = (lon - 100.0) / 20.0
        var latstep = (lat - 40.0) / 20.0
        for (var i = 0; i < 20; i++) {
          var pos = Cesium.Cartesian3.fromDegrees(100.0 + i * lonstep, 40.0 + i * latstep, 800000)
          positionProperty.addSample(Cesium.JulianDate.addSeconds(t1, 100 * i, new Cesium.JulianDate()), pos)
        }
        this._positionProperties.push(positionProperty)

//三维模型地址
        var position = Cesium.Cartesian3.fromDegrees(100.0, 40.0, 800000)
        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position)
        var satellite = new sg.cseffect.ScanSatellite({
          scene: scene,
          url: '/distfxpg/static/gltf/quickbird.gltf',
          modelMatrix: modelMatrix,
          height: 800000.0,
          radius: 800000.0
        })
        this._primitiveLayer.add(satellite)
        this._primitives.push(satellite)
      }

      var that = this
      var scratchPosition = new Cesium.Cartesian3()
      this._removePreUpdateListener = viewer.scene.preUpdate.addEventListener(function (scene, time) {
        for (var count = 0; count < that._primitives.length; count++) {
          var position = Cesium.Property.getValueOrUndefined(that._positionProperties[count], time, scratchPosition)
          if (!Cesium.defined(position)) {
            return undefined
          }
          var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, modelMatrix)
          that._primitives[count].modelMatrix = modelMatrix
        }
      })
    }

    // showSatellite()

    // 4 航迹
    class InterpolateDemo {
      constructor () {
        //三维视图
        this.viewer = IMainControl.getViewManager().getView().getCsView().getViewer()

        this.pointEntities = []

        this.viewer.scene.globe.enableLighting = true
        this.viewer.scene.globe.depthTestAgainstTerrain = true

        //Set bounds of our simulation time
        var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16))
        var stop = Cesium.JulianDate.addSeconds(start, 500, new Cesium.JulianDate())

        //Make sure viewer is at the desired time.
        this.viewer.clock.startTime = start.clone()
        this.viewer.clock.stopTime = stop.clone()
        this.viewer.clock.currentTime = start.clone()
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP //Loop at the end
        this.viewer.clock.multiplier = 1
        this.viewer.clock.shouldAnimate = true

        var property = new Cesium.SampledPositionProperty()
        //航迹起始点位置
        var wuhan = {
          lon: 109,
          lat: 19
        }
        //航迹终点位置
        var beijing = {
          lon: 116,
          lat: 40
        }
        var samplePositions = []
        samplePositions.push(Cesium.Cartesian3.fromDegrees(wuhan.lon, wuhan.lat, 1000))
        var stepCount = 5
        var lonstep = (beijing.lon - wuhan.lon) / (stepCount - 1)
        var latstep = (beijing.lat - wuhan.lat) / (stepCount - 1)
        for (var i = 1; i < stepCount - 1; i++) {
          samplePositions.push(Cesium.Cartesian3.fromDegrees(wuhan.lon + lonstep * i, wuhan.lat + latstep * i, 100000))
        }
        samplePositions.push(Cesium.Cartesian3.fromDegrees(beijing.lon, beijing.lat, 1000))
        for (var i = 0; i < samplePositions.length; i++) {
          var time = Cesium.JulianDate.addSeconds(start, i * 100, new Cesium.JulianDate())
          property.addSample(time, samplePositions[i])

          //Also create a point for each sample we generate.
          var entity = this.viewer.entities.add({
            position: samplePositions[i],
            point: {
              pixelSize: 8,
              color: Cesium.Color.TRANSPARENT,
              outlineColor: Cesium.Color.YELLOW,
              outlineWidth: 3
            }
          })
          this.pointEntities.push(entity)
        }

//三维模型地址
        var entity = this.viewer.entities.add({
          availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: start,
            stop: stop
          })]),
          position: property,
          orientation: new Cesium.VelocityOrientationProperty(property),
          model: {
            uri: '/distfxpg/static/gltf/Cesium_Air.gltf',
            minimumPixelSize: 64
          },
          //Show the path as a pink line sampled in 1 second increments.
          path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW
            }),
            width: 10
          }
        })
        this.planeEntity = entity
      }

      lockRoute () {
        this.viewer.trackedEntity = this.planeEntity
      }

      unlockRoute () {
        this.viewer.trackedEntity = undefined
        this.viewer.zoomTo(this.viewer.entities, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90)))
      }

      smooth () {
        this.planeEntity.position.setInterpolationOptions({
          interpolationDegree: 5,
          interpolationAlgorithm: Cesium.HermitePolynomialApproximation
        })
      }

      unsmooth () {
        this.planeEntity.position.setInterpolationOptions({
          interpolationDegree: 1,
          interpolationAlgorithm: Cesium.LinearApproximation
        })
      }

      destroy () {
        for (var i = 0; i < this.pointEntities.length; i++) {
          this.viewer.entities.remove(this.pointEntities[i])
        }
        this.planeEntity && this.viewer.entities.remove(this.planeEntity)
        this.viewer.trackedEntity = undefined
        this.viewer.clock.shouldAnimate = false
      }
    }

    /* var model = new InterpolateDemo()
     //航迹平滑
         model.smooth()*/

    // 5 热力图
    /* var csView = GLOBAL_WINDOW.csView;
     var olView = GLOBAL_WINDOW.olView;
     var _csHeatmapLayer,_olHeatmapLayer;
     Cesium.Resource.fetchJson({
       url: '/distfxpg/static/json/busstop2016.geojson'
     }).then(function (data) {
       var points = [];
       data.features.forEach(function (feature) {
         var point = {
           lng: feature.geometry.coordinates[0],
           lat: feature.geometry.coordinates[1],
           value: 0.05
         };
         points.push(point);
       });
       _csHeatmapLayer = csView.addLayer(new sg.csheatmap.HeatmapLayer({
         name: '热力图',
         points
       }));
       _olHeatmapLayer = olView.addLayer(new sg.olheatmap.HeatmapLayer({
         name: '热力图',
         points
       }));
     }).otherwise(function (error) {
       console.log(error)
     });*/

    // 6 动目标
    //*************************创建动目标图层（只有图层名称是参数）***************************************//

    // var date1 = new Date(2019, 6, 25, 8, 0, 0)
    // var date2 = new Date(2019, 6, 25, 8, 10, 0)

    /*

        var uniAnimationLayer = sg.IMainControl.getIUniLayerManager().addLayer('动目标图层', 'c2mpeMobileLayer')
        var guideVectorLayer = sg.IMainControl.getIUniLayerManager().addLayer('临时矢量图层', 'c2mpeVectorLayer')

        //创建动目标
        var uniMobile1 = sg.IMainControl.getIUniMobileManager().CreateMobile()

        // 0 模拟服务端的数据
        var timeItems = [
          {
            date:new Date(2019, 6, 25, 8, 0, 0),
            position:[110.48, 21.19, 100]
          },
          {
            date:new Date(2019, 6, 25, 8, 10, 0),
            position:[119.11, 25.77, 100]
          },
          {
            date:new Date(2019, 6, 25, 8, 20, 0),
            position:[119.11, 34.77, 100]
          },
        ]

        // 1 模拟前端收到的数据
        var webItems=[]

        let count=0;

        // 启动动目标
        getsome()

        // 2 模拟消息推送
        function getsome(){
          // 3 得到一帧消息
          let frameData = timeItems[count++]
          // 4 存到本地
          webItems.push(frameData)

          if(webItems.length==1){
            // 5 拿到基第一帧数据的时候 初始化动目标
            initTheItemByTimePoints(frameData)

          }else if (webItems.length>1){
            // 6 从第二帧到之后的每一帧 都给动目标压数据
            doPushTimePoints(webItems[webItems.length-2],frameData)
          }

          if(webItems.length<timeItems.length){
            setTimeout(getsome,2000)
          }
        }

        // 初始化动目标
        function initTheItemByTimePoints(firstItem){
          var date3 = new Date(2020, 6, 25, 8, 10, 0)
          //设置动目标时间段
          //     uniAnimationLayer.setTimeScope(date1, date2)
          uniAnimationLayer.setTimeScope(firstItem.date, date3)
          //动目标速度
          uniAnimationLayer.setSpeed(10.0)
          //动目标的起飞点
          uniAnimationLayer.setCurrentTime(firstItem.date)
          //动目标是否循环播放
          uniAnimationLayer.setLoop(true)
          uniAnimationLayer.start()
          //创建动目标
          uniAnimationLayer.AddMobile(uniMobile1)

          //二维动目标军标代号
          uniMobile1.setJbCode(200)
          //萨比为三维动目标模型
          // uniMobile1.setSymbolName('/distfxpg/static/gltf/Cesium_Air.gltf')
          uniMobile1.setSymbolName('/distfxpg/static/gltf/daodan.gltf')
          //三维动目标模型显示大小
          uniMobile1.getCsMobile().getModel().setMinimumPixelSize(64)
          //动目标属性--批号
          uniMobile1.setBatch('ZG-000001')
          //动目标轨迹点数量
          // uniMobile1.setDisplayTrackCount(5000)
          //动目标轨迹路线--可以将所有的轨迹放在一维数组中，例如[[110,39,1],[112,39,2],[113,39,3],[114,39,4],[115,39,5],...]

          uniMobile1.getCsMobile().setMaxTrackPointsCount(500)
          uniMobile1.setDisplayTrackCount(500)
          uniMobile1.getCsMobile().setTrackLineColor("red");
          uniMobile1.setTrackWidth(2)
          uniMobile1.set3dTraceMode('fire')
          // uniMobile1.set3dTraceMode('extrude')
          // uniMobile1.set3dTraceMode('ribbon')



        }

        // 给动目标压数据
        function doPushTimePoints(oldItem,newItem){

          var t1 = Cesium.JulianDate.fromDate(oldItem.date)
          var t2 = Cesium.JulianDate.fromDate(newItem.date)

          var totalSeconds = Cesium.JulianDate.secondsDifference(t2, t1)

          var trackPoints1 = generateTrackPoints(csView.getViewer().scene, [
            oldItem.position,
            newItem.position,
          ], 100)

          console.log('trackPoints1:'+trackPoints1)

          for (var i = 0; i < trackPoints1.length; i++) {
            var time = Cesium.JulianDate.addSeconds(t1, i * (totalSeconds / (trackPoints1.length - 1)), new Cesium.JulianDate())
            var date = Cesium.JulianDate.toDate(time)
            console.log('date : ',date)
            console.log('trackPoints1[i] : ',trackPoints1[i])
            uniMobile1.addPoint(date, trackPoints1[i])
          }



        }

        //设置动目标时间段
        //     uniAnimationLayer.setTimeScope(date1, date2)
        //     uniAnimationLayer.setTimeScope(date1, date3)
        //动目标速度
        //     uniAnimationLayer.setSpeed(1.0)
        // //动目标的起飞点
        //     uniAnimationLayer.setCurrentTime(date1)
        // //动目标是否循环播放
        //     uniAnimationLayer.setLoop(true)
        //     uniAnimationLayer.start()
        // {
        //创建动目标
        // var uniMobile1 = sg.IMainControl.getIUniMobileManager().CreateMobile()

        // uniAnimationLayer.AddMobile(uniMobile1)
        // //二维动目标军标代号
        // uniMobile1.setJbCode(200)
        // //萨比为三维动目标模型
        // uniMobile1.setSymbolName('/distfxpg/static/gltf/Cesium_Air.gltf')
        // //三维动目标模型显示大小
        // uniMobile1.getCsMobile().getModel().setMinimumPixelSize(64)
        // //动目标属性--批号
        // uniMobile1.setBatch('ZG-000001')
        // //动目标轨迹点数量
        // uniMobile1.setDisplayTrackCount(5000)
        //动目标轨迹路线--可以将所有的轨迹放在一维数组中，例如[[110,39,1],[112,39,2],[113,39,3],[114,39,4],[115,39,5],...]
        // var t1 = Cesium.JulianDate.fromDate(date1)
        // var t2 = Cesium.JulianDate.fromDate(date2)
        // var totalSeconds = Cesium.JulianDate.secondsDifference(t2, t1)
        //
        // var trackPoints1 = generateTrackPoints(csView.getViewer().scene, [
        //   [119.48, 26.19, 100],
        //   [120.47, 26.45, 10000],
        //   [121.11, 24.77, 100]
        // ], 100)

        // for (var i = 0; i < trackPoints1.length; i++) {
        //   var time = Cesium.JulianDate.addSeconds(t1, i * (totalSeconds / (trackPoints1.length - 1)), new Cesium.JulianDate())
        //   var date = Cesium.JulianDate.toDate(time)
        //   // console.log('date : ',date)
        //   // console.log('trackPoints1[i] : ',trackPoints1[i])
        //   uniMobile1.addPoint(date, trackPoints1[i])
        // }
        // }

        //工具函数（直接粘贴即可）
        function generateTrackPoints (scene, coords, maxTrackPointsCount) {
          var trackPoints = []
          if (coords.length > 2) {
            var positions = []
            for (var i = 0; i < coords.length; i++) {
              var position = Cesium.Cartesian3.fromDegrees(coords[i][0], coords[i][1], coords[i][2])
              positions.push(position)
            }
            trackPoints = sg.csutils.InterpolationTool.LagrangePolynomialApproximation(positions, maxTrackPointsCount, 5)
          } else {
            var positions = []
            var heights = []
            for (var i = 0; i < coords.length; i++) {
              var position = Cesium.Cartesian3.fromDegrees(coords[i][0], coords[i][1], coords[i][2])
              positions.push(position)
              heights.push(coords[i][2])
            }

            var minDistance = 50000
            var surfacePositions = Cesium.PolylinePipeline.generateCartesianArc({
              positions: positions,
              minDistance: minDistance,
              height: heights
            })

            trackPoints = surfacePositions
          }

          var gsPoints = []
          for (var i = 0, n = trackPoints.length; i < n; i++) {
            var gsPoint = sg.GS_Point3D.fromCartesian(trackPoints[i])
            gsPoints.push(gsPoint)
          }
          return gsPoints
        }
    */

  } else {
    sendMsgDown(data.data)
  }
})

//执行方法以及回调
function messageForCall (data) {
  let curName = window.location.href,
    _callBack = window[data.data.message.callback]
  //收到消息之后 执行 对应的方法；如果没有对应的方法继续 分发消息
  if (data.data.toServe == 'all' || curName.includes(data.data.toServe)) {
    if (_callBack) {
      _callBack(data.data.message.data)
    } else {
      console.error(
        window.location.href,
        '当前没有此方法:',
        data.data.message.callback
      )
    }
  } else {
    //没有继续分发消息
    sendMsgDown(data.data)
  }
}

//往下发送消息
function sendMsgDown (data) {
  let ele = document.querySelectorAll('iframe')
  if (ele.length > 0) {
    for (let i = 0; i < ele.length; i++) {
      sendMsgToChild(
        ele[i].contentWindow,
        data.fromServe,
        data.toServe,
        data.message,
        data.type,
        data.move
      )
    }
  }
}

/**
 *  将消息分发到当前的子firame
 *
 * @param {*} msgUrl  iframe window
 * @param {string} [target='all']   接受消息地址
 * @param {*} [msg={}]    消息内容
 * @param {string} [type='']   消息类型
 * @param {string} [reCall='']
 */
function sendMsgToChild (
  msgUrl,
  fromServe,
  target = 'all',
  msg = {},
  type = '',
  move = {}
) {
  msgUrl.postMessage(
    {
      fromServe: fromServe, //当前网页地址
      toServe: target,
      type: type,
      message: '_msg', //交互具体内容
      move: {} //移动元素
    },
    '*'
  )
}

/**
 * 给父元素发送消息的地方
 * @param {String} type     类型
 * @param {Object} move     拖动元素信息
 * @param {String} data     发送的信息
 * @param {String} call     调用方法名称
 * @param {String} target   接受消息地址  all 所有的iframe接受消息
 *
 * ============消息类型================
 * startedMove    开始移元素
 *
 * movingFinish   元素拖动完毕
 *
 * callFunction   调用方法
 *
 * loaded         iframe 加载完毕
 *
 * changeStyle    切换风格
 *
 *
 */
function sendMsgToParent (
  type = 'callFunction',
  move = {},
  data = '',
  call = '',
  target = 'all'
) {
  let parent = window
  let ele = document.querySelector('[src="' + target + '"]')
  if (window.opener) {
    parent = window.opener
  } else if (target != 'parent' && ele) {
    parent = ele.contentWindow
  } else if (window.top) {
    parent = window.top
  } else if (window.parent) {
    parent = window.parent
  }
  parent.postMessage(
    {
      toServe: 'parent', //所有消息往 父元素发送消息
      fromServe: window.location.href,
      type: type, //消息类型
      message: {
        //发送消息
        callback: call, //调用方法名称
        data: data, //发送数据
        targetSrc: target //接受消息地址
      },
      move: move //拖拽元素的配置信息
    },
    '*'
  )
}

/** ===================================以下为拖动元素相关方法=================================== */
function allowDrop (ev) {
  ev.preventDefault()
}

//开始拖动元素
function drag (ev) {
  let dataLisu = new Date().getTime()
  ev.target.dataset.lisu = dataLisu
  ev.dataTransfer.setData(
    'lisu',
    JSON.stringify({
      dataLisu: dataLisu,
      target: window.location.href,
      el: ev.target.outerHTML,
      x: ev.clientX - ev.target.offsetLeft,
      y: ev.clientY - ev.target.offsetTop
    })
  )
  sendMsgToParent('startedMove', {
    target: window.location.href,
    dataLisu: dataLisu,
    x: ev.clientX - ev.target.offsetLeft,
    y: ev.clientY - ev.target.offsetTop
  })
}

//元素拖拽完成
function drop (ev) {
  ev.preventDefault()
  let data = JSON.parse(ev.dataTransfer.getData('lisu'))
  if (data.target == window.location.href) {
    try {
      let node = document.querySelector('[data-lisu="' + data.dataLisu + '"')
      node.style.position = 'absolute'
      node.style.top = ev.clientY - data.y + 'px'
      node.style.left = ev.clientX - data.x + 'px'
      ev.target.appendChild(node)
    } catch (e) {
      console.log(e)
    }
  } else {
    let dataLisu = new Date().getTime()
    ev.target.dataset.lisu = dataLisu
    sendMsgToParent('movingFinish', {
      target: window.location.href,
      dataLisu: dataLisu,
      x: ev.clientX,
      y: ev.clientY
    })
    //拖拽完成之后重新给元素添加可拖拽事件
    setTimeout(function () {
      addEvent()
    }, 20)
  }
}

//拖放元素
function addEvent () {
  let dragEle = document.querySelectorAll('.drag')
  for (let i = 0; i < dragEle.length; i++) {
    //添加一个标识；禁止重复添加
    if (!dragEle[i].dataset.hasOwnProperty('lgjbefore')) {
      dragEle[i].setAttribute('draggable', true)
      dragEle[i].dataset.lgjbefore = 'yes'
      dragEle[i].addEventListener('dragstart', function (event) {
        drag(event)
      })
    }
  }

  let dropEle = document.querySelectorAll('.drop')
  for (let i = 0; i < dropEle.length; i++) {
    if (!dropEle[i].dataset.hasOwnProperty('lgjbefore')) {
      dropEle[i].dataset.lgjbefore = 'yes'
      dropEle[i].addEventListener('drop', function (event) {
        drop(event)
      })
      dropEle[i].addEventListener('dragover', function (event) {
        allowDrop(event)
      })
    }
  }
}
