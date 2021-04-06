var EarthIsLoaded = ''

//系统 主入口

var viewer //地球对象

var request //url传入的参数

//地图
$(document).ready(function () {
  if (!mars3d.util.webglreport()) {
    toastr.error('系统检测到您当前使用的浏览器WebGL功能无效')
    layer.open({
      type: 1,
      title: '当前浏览器WebGL功能无效',
      skin: 'layer-mars-dialog animation-scale-up',
      resize: false,
      area: ['600px', '200px'], //宽高
      content: '<div style="margin: 20px;"><h3>系统检测到您使用的浏览器WebGL功能无效！</h3>  <p>1、请您检查浏览器版本，安装使用最新版chrome、火狐或IE11以上浏览器！</p> <p>2、WebGL支持取决于GPU支持，请保证客户端电脑已安装最新显卡驱动程序！</p><p>3、如果上两步骤没有解决问题，说明您的电脑需要更换了！</p></div>'
    })
  }

  //记录url传入参数
  request = haoutil.system.getRequest()
  if (window.top) {//有父级
    request = $.extend(request, haoutil.system.getRequest(window.top))
  }

  initUI()
  initMap()
})

function removeMask () {
  $('#mask').remove()
}

//初始化地图
function initMap () {
  var configfile = 'config/config.json' //默认地址
  if (request.config)//url传入地址
  {
    configfile = request.config
  }

  haoutil.loading.show()

  $.ajax({
    type: 'get',
    dataType: 'json',
    url: configfile,
    timeout: 0,
    success: function (data) {
      haoutil.loading.hide()
      setTimeout(removeMask, 3000)      //欢迎UI关闭处理

      //构造地球
      viewer = mars3d.createMap({
        id: 'cesiumContainer',
        data: data.map3d,
        serverURL: data.serverURL,
        //infoBox: false,     //是否显示点击要素之后显示的信息  【也可以在config.json中配置】
        //sceneMode: Cesium.SceneMode.SCENE2D,
      })

      //如果有xyz传参，进行定位
      if (haoutil.isutil.isNotNull(request.x)
        && haoutil.isutil.isNotNull(request.y)) {
        viewer.mars.centerAt(request, {duration: 0, isWgs84: true})
      }

      //开场动画
      // viewer.mars.openFlyAnimation()

      initWidget(viewer) //构造widget

      initWork(viewer) //项目的其他事项

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      haoutil.loading.hide()
      haoutil.alert(configfile + '文件加载失败！')
    }
  })

}

//初始化widget相关
function initWidget (viewer) {
  haoutil.loading.show()

  $.ajax({
    type: 'get',
    dataType: 'json',
    url: 'config/widget.json',
    timeout: 0,
    success: function (widgetCfg) {
      haoutil.loading.hide()

      //url如果有传参时的处理
      if (haoutil.isutil.isNotNull(request.widget)) {
        if (request.onlyStart) widgetCfg.widgetsAtStart = []
        widgetCfg.widgetsAtStart.push({
          uri: request.widget,
          name: request.name || '',
          windowOptions: {
            closeBtn: !request.onlyStart,
          },
          request: request
        })
        viewer.mars.centerAtHome({duration: 0})
      }

      //初始化widget管理器
      mars3d.widget.init(viewer, widgetCfg) //tip: 此方法有第3个参数支持定义父目录。

      if (lastWidgetItem) {
        activateWidget(lastWidgetItem)
        lastWidgetItem = null
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      haoutil.loading.hide()
      haoutil.alert('config/widget.json文件加载失败！')
    }
  })

  //widget相关事件监听
  // mars3d.widget.on(mars3d.widget.event.load, function (event) {
  //     console.log("引入加载了widget的js", event);
  // })
  // mars3d.widget.on(mars3d.widget.event.created, function (event) {
  //     console.log("创建了widet", event);
  // })
  mars3d.widget.on(mars3d.widget.event.activated, function (event) {
    console.log('激活了widget', event)
  })
  mars3d.widget.on(mars3d.widget.event.disabled, function (event) {
    console.log('释放了widget', event)
  })

}

//UI界面相关
function initUI () {
  haoutil.oneMsg('首次访问系统无缓存会略慢，请耐心等待！', 'load3d_tip')

}

//当前页面业务相关 --- 球的加载
function initWork (viewer) {
  EarthIsLoaded = 'ok'
  haoutil.oneMsg('如果未出现地球，是因为地形加载失败，请刷新重新加载！', 'terrain_tip')

//设置初始镜头
  viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(105,17,500000),
    orientation:{
      heading:Cesium.Math.toRadians(5),  //指向
      pitch:Cesium.Math.toRadians(-40),     //倾斜角
      roll:0.0,
    }
  })

  //针对不同终端的优化配置
  if (haoutil.system.isPCBroswer()) {
    // Cesium 1.61以后会默认关闭反走样，对于桌面端而言还是开启得好，
    viewer.scene.postProcessStages.fxaa.enabled = true

    //鼠标滚轮放大的步长参数
    viewer.scene.screenSpaceCameraController._zoomFactor = 2.0

    //IE浏览器优化
    if (window.navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
      viewer.targetFrameRate = 20        //限制帧率
      viewer.requestRenderMode = true    //取消实时渲染
    }

  } else {
    //鼠标滚轮放大的步长参数
    viewer.scene.screenSpaceCameraController._zoomFactor = 5.0

    //移动设备上禁掉以下几个选项，可以相对更加流畅
    viewer.requestRenderMode = true    //取消实时渲染
    viewer.scene.fog.enable = false
    viewer.scene.skyAtmosphere.show = false
    viewer.scene.globe.showGroundAtmosphere = false
  }

  // 禁用默认的实体双击动作。
  viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)

  //二三维切换不用动画
  if (viewer.sceneModePicker) {
    viewer.sceneModePicker.viewModel.duration = 0.0
  }

  //webgl渲染失败后，刷新页面
  //viewer.scene.renderError.addEventListener(function (scene, error) {
  //    window.location.reload();
  //});

  bindShowTilesParts()
  // 1 只有卫星 卫星不动
  // viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML1.czml'))

  // 2 只有卫星 没有连线 卫星在动
  // viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML2.czml'))

  // 3 卫星 和 连线 都有 都在动
  // viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/CZML3.czml'))

}
//bim构件的处理
function bindShowTilesParts () {
  //单击地图事件
  viewer.mars.on(mars3d.event.click, function (event) {
    var pick = viewer.scene.pick(event.position)
    // console.log(pick.id._attribute.style.id)  //拿到点的id
    // console.log(pick.primitive.id.position._value)       //笛卡尔坐标


    if (pick && Cesium.defined(pick.primitive) &&
      pick.primitive._config && pick.primitive._config.scenetree) {
      var tilesParts = 'widgetsTS/tilesParts/widget.js'

      if (mars3d.widget.isActivate(tilesParts)) {
        var parts = mars3d.widget.getClass(tilesParts)
        if (parts.config.layerCfg == pick.primitive._config) {
          return
        }//当前已激活,并且单击了相同模型时跳出
      }

      mars3d.widget.activate({
        name: pick.primitive._config.name + ' 构件',
        uri: tilesParts,
        layerCfg: pick.primitive._config,
        disableOther: false
      })
    }
  })
}
//绑定图层管理有2种添加方式
/**
 第1种是框架支持的配置信息的，按照下面方式添加
 var json = {
        "name": "自定义绑定图层",
        "type": "wms",
        "url": "http://data.marsgis.cn/geoserver/mars/wms",
        "layers": "mars:hfjy",
        "crs": "EPSG:4326",
        "parameters": {
            "transparent": "true",
            "format": "image/png"
        },
        "showClickFeature": true,
        "center": { "y": 31.743214, "x": 117.277097, "z": 47197.7, "heading": 0.3, "pitch": -78.8, "roll": 360 },
        "popup": "名称：{项目名称}<br />类型：{设施类型}<br />面积：{用地面积}亩<br />位置：{具体位置}",
        "visible": true,
        "flyTo": true
    };
 var layer = mars3d.layer.createLayer(viewer,json);
 bindToLayerControl(layer);
 **/

/** 第2种是完全自定义的，在回调方法中写自己相关代码，可参考widgetsTS\qyPoint\widgts.js代码
 bindToLayerControl({
    pid: 30,
    name: '企业',
    mydata:null, //自行赋值
    visible: true,
    onAdd: function () {//显示回调
        //这里把数据this.mydata添加到地图上
    },
    onRemove: function () {//隐藏回调
        //这里把数据this.mydata从地图上移除

    },
    onCenterAt: function (duration) {//定位回调

    },
});
 **/

//绑定图层管理
function bindToLayerControl (options) {
  var layer = viewer.mars.addOperationalLayer(options)
  if (!layer) return

  var manageLayersWidget = mars3d.widget.getClass('widgets/manageLayers/widget.js')
  if (manageLayersWidget) {
    manageLayersWidget.addOverlay(layer.config)
  }
  return layer
}

//取消绑定图层管理 ， 参数为bindToLayerControl返回的图层
function unbindLayerControl (layer) {
  viewer.mars.removeOperationalLayer(layer.config.id)

  var manageLayersWidget = mars3d.widget.getClass('widgets/manageLayers/widget.js')
  if (manageLayersWidget) {
    manageLayersWidget.removeLayer(layer.config.name)
  }
}

//外部页面调用
var lastWidgetItem

function activateWidget (item) {
  if (!viewer) {
    lastWidgetItem = item
    return
  }
  mars3d.widget.activate(item)
}

function disableWidget (item) {
  mars3d.widget.disable(item)
}

function activateFunByMenu (fun) {
  eval(fun)
}

function goHome () {
  mars3d.widget.disableAll()
  viewer.mars.centerAt();
}

function addPoints_zdpx (option) {
  // let {id,name,lon,lat,type} = option
  let {lat, lon,type,name,fragility,importance,id} = option
  // console.log(name)

  var entity2 = viewer.mars.draw.addFeature( 'label', {
    type: "Feature",
    properties: { style:  {
        "id": id,
        "text": name,      //内容
        "color": "#fff",      //颜色
        "opacity": 1,      //透明度
        "font_family": "楷体",      //字体 ,可选项：微软雅黑,宋体,楷体,隶书,黑体,
        "font_size": 20,      //字体大小
        "border": true,      //是否衬色
        "border_color": "#aaa",      //衬色颜色
        "border_width": 1,      //衬色宽度
        "background": false,      //是否背景
        "background_color": "#ffffff",      //背景颜色
        "background_opacity": 0.5,      //背景透明度
        "font_weight": "normal",      //是否加粗 ,可选项：bold(是),normal(否),
        "font_style": "normal",      //是否斜体 ,可选项：italic(是),normal(否),
        "pixelOffsetX": 15,      //横向偏移像素
        "pixelOffsetY": 55,      //纵向偏移像素
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 100000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        'disableDepthTestDistance':Number.POSITIVE_INFINITY,

      } },
    geometry: { type: "Point",coordinates: [lat,lon] }
  });

  var entity3 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/circle.png",      //图标 开发用
        "image": "/distLogin/static/svg/circle.png",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 90,      //width
        "height": 60,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        "horizontalOrigin": "CENTER",      //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
        // "verticalOrigin": "BOTTOM",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
        "verticalOrigin": "CENTER",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });

}



//电力设施
function add_electricity (option) {

  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/red.svg",      //图标 开发用
        "image": "/distLogin/static/svg/red.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 20,      //width
        "height": 25,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        "horizontalOrigin": "CENTER",      //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
        "verticalOrigin": "BOTTOM",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });
}
//石化设施
function add_petrifaction(option) {
  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/purple.svg",      //图标 开发用
        "image": "/distLogin/static/svg/purple.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 20,      //width
        "height": 25,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        "horizontalOrigin": "CENTER",      //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
        "verticalOrigin": "BOTTOM",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });
}
//通信设施
function add_communication(option) {
  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/yellow.svg",      //图标 开发用
        "image": "/distLogin/static/svg/yellow.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 20,      //width
        "height": 25,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        "horizontalOrigin": "CENTER",      //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
        "verticalOrigin": "BOTTOM",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });
}
//交通设施
function add_traffic(option) {
  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/green.svg",      //图标 开发用
        "image": "/distLogin/static/svg/green.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 20,      //width
        "height": 25,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        "horizontalOrigin": "CENTER",      //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
        "verticalOrigin": "BOTTOM",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });

}

// 标记等级进度条
function ImportanceBlue(option) {
  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/ImportanceBlue.svg",      //图标 开发用
        "image": "/distLogin/static/svg/ImportanceBlue.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 120,      //width
        "height": 30,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        'pixelOffset':new Cesium.Cartesian2(-5,-35),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        // 'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });
}
function ImportanceGreen(option) {
  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/ImportanceGreen.svg",      //图标 开发用
        "image": "/distLogin/static/svg/ImportanceGreen.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 120,      //width
        "height": 30,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        'pixelOffset':new Cesium.Cartesian2(-5,-35),
        // "horizontalOrigin": "CENTER",      //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
        // "verticalOrigin": "TOP",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        // 'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });
}
function ImportanceYellow(option) {
  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/ImportanceYellow.svg",      //图标 开发用
        "image": "/distLogin/static/svg/ImportanceYellow.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 120,      //width
        "height": 30,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        'pixelOffset':new Cesium.Cartesian2(-5,-35),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        // 'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });
}
function ImportanceRed(option) {
  let {id, name, lon, lat, type} = option
  var entity1 = viewer.mars.draw.addFeature( 'billboard', {
    type: "Feature",
    properties: { style:  {
        // "image": "/static/svg/ImportanceRed.svg",      //图标 开发用
        "image": "/distLogin/static/svg/ImportanceRed.svg",      //图标 打包用
        "opacity": 1,      //透明度
        "width": 120,      //width
        "height": 30,      //height
        "scale": 1,      //大小比例
        "rotation": 0,      //旋转角度
        'pixelOffset':new Cesium.Cartesian2(-5,-35),
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 10000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        // 'disableDepthTestDistance':Number.POSITIVE_INFINITY,
      }},
    geometry: { type: "Point", coordinates: [lat,lon] }
  });
}
// 标记重要性等级分数
function add_impscore (option) {
  let { lon, lat,imp} = option
  // console.log(imp)
  var entity20 = viewer.mars.draw.addFeature( 'label', {
    type: "Feature",
    properties: { style:  {
        "id": '55',
        "text":imp,      //内容
        "color": "#fff",      //颜色
        "opacity": 1,      //透明度
        "font_family": "楷体",      //字体 ,可选项：微软雅黑,宋体,楷体,隶书,黑体,
        "font_size": 1,      //字体大小
        "border": true,      //是否衬色
        "border_color": "#aaa",      //衬色颜色
        "border_width": 1,      //衬色宽度
        "background": false,      //是否背景
        "background_color": "#ffffff",      //背景颜色
        "background_opacity": 1,      //背景透明度
        "font_weight": "normal",      //是否加粗 ,可选项：bold(是),normal(否),
        "font_style": "normal",      //是否斜体 ,可选项：italic(是),normal(否),
        "pixelOffsetX": -40,      //横向偏移像素
        "pixelOffsetY": -46,      //纵向偏移像素
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 100000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        // 'disableDepthTestDistance':Number.POSITIVE_INFINITY,
        'eyeOffset':new Cesium.Cartesian3(0,0,-10),   //层级显示

      } },
    geometry: { type: "Point",coordinates: [lat,lon] }
  });
}
// 标记脆弱性等级分数
function add_fragscore (option) {
  let { lon, lat,fra} = option
  var entity20 = viewer.mars.draw.addFeature( 'label', {
    type: "Feature",
    properties: { style:  {
        "id": '55',
        "text":fra,      //内容
        "color": "#fff",      //颜色
        "opacity": 1,      //透明度
        "font_family": "楷体",      //字体 ,可选项：微软雅黑,宋体,楷体,隶书,黑体,
        "font_size": 1,      //字体大小
        "border": true,      //是否衬色
        "border_color": "#aaa",      //衬色颜色
        "border_width": 1,      //衬色宽度
        "background": false,      //是否背景
        "background_color": "#ffffff",      //背景颜色
        "background_opacity": 1,      //背景透明度
        "font_weight": "normal",      //是否加粗 ,可选项：bold(是),normal(否),
        "font_style": "normal",      //是否斜体 ,可选项：italic(是),normal(否),
        "pixelOffsetX": -40,      //横向偏移像素
        "pixelOffsetY": -46,      //纵向偏移像素
        "scaleByDistance": false,      //是否按视距缩放
        "scaleByDistance_far": 1000000,      //上限
        "scaleByDistance_farValue": 0.1,      //比例值
        "scaleByDistance_near": 1000,      //下限
        "scaleByDistance_nearValue": 1,      //比例值
        "distanceDisplayCondition": false,      //是否按视距显示
        "distanceDisplayCondition_far": 100000,      //最大距离
        "distanceDisplayCondition_near": 0,      //最小距离
        "clampToGround": false,      //是否贴地
        "visibleDepth": true,      //是否被遮挡
        // 'disableDepthTestDistance':Number.POSITIVE_INFINITY,
        'eyeOffset':new Cesium.Cartesian3(0,0,-10),   //层级显示

      } },
    geometry: { type: "Point",coordinates: [lat,lon] }
  });
}
function fly (option) {
  let {id, name, lon, lat, type} = option
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lat,lon,1000000),
  })
}


// 扩散圆
function spreadCircle(item,lat,lon) {
  console.log(lat,lon)
  showCircleScan() // 圆扩散
  function showCircleScan() {
    var cartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0);
    var scanColor = new Cesium.Color(0, 1, 0, 1);
    lastStage = addCircleScanPostStage(viewer, cartographicCenter, 20000, scanColor, 3000);
  }
  function addCircleScanPostStage(viewer, cartographicCenter, maxRadius, scanColor, duration) {
    var _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter);
    var _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1);

    var _CartograhpicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500);
    var _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartograhpicCenter1);
    var _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1);

    var _time = (new Date()).getTime();

    var _scratchCartesian4Center = new Cesium.Cartesian4();
    var _scratchCartesian4Center1 = new Cesium.Cartesian4();
    var _scratchCartesian3Normal = new Cesium.Cartesian3();


    var ScanPostStage = new Cesium.PostProcessStage({
      fragmentShader: getScanSegmentShader(),
      uniforms: {
        u_scanCenterEC: function () {
          var temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
          return temp;
        },
        u_scanPlaneNormalEC: function () {
          var temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
          var temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1);

          _scratchCartesian3Normal.x = temp1.x - temp.x;
          _scratchCartesian3Normal.y = temp1.y - temp.y;
          _scratchCartesian3Normal.z = temp1.z - temp.z;

          Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);

          return _scratchCartesian3Normal;
        },
        u_radius: function () {
          return maxRadius * (((new Date()).getTime() - _time) % duration) / duration;
        },
        u_scanColor: scanColor
      }
    });

    viewer.scene.postProcessStages.add(ScanPostStage);
    return ScanPostStage;
  }
  //扩散效果Shader
  function getScanSegmentShader() {
    var scanSegmentShader = "\n\
                    uniform sampler2D colorTexture;\n\
                    uniform sampler2D depthTexture;\n\
                    varying vec2 v_textureCoordinates;\n\
                    uniform vec4 u_scanCenterEC;\n\
                    uniform vec3 u_scanPlaneNormalEC;\n\
                    uniform float u_radius;\n\
                    uniform vec4 u_scanColor;\n\
                    \n\
                    vec4 toEye(in vec2 uv,in float depth)\n\
                    {\n\
                                vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n\
                                vec4 posIncamera = czm_inverseProjection * vec4(xy,depth,1.0);\n\
                                posIncamera = posIncamera/posIncamera.w;\n\
                                return posIncamera;\n\
                    }\n\
                    \n\
                    vec3 pointProjectOnPlane(in vec3 planeNormal,in vec3 planeOrigin,in vec3 point)\n\
                    {\n\
                                vec3 v01 = point - planeOrigin;\n\
                                float d = dot(planeNormal,v01);\n\
                                return (point-planeNormal * d);\n\
                    }\n\
                    float getDepth(in vec4 depth)\n\
                    {\n\
                                float z_window = czm_unpackDepth(depth);\n\
                                z_window = czm_reverseLogDepth(z_window);\n\
                                float n_range = czm_depthRange.near;\n\
                                float f_range = czm_depthRange.far;\n\
                                return (2.0 * z_window - n_range - f_range)/(f_range-n_range);\n\
                    } \n\
                    void main()\n\
                    {\n\
                                gl_FragColor = texture2D(colorTexture,v_textureCoordinates);\n\
                                float depth = getDepth(texture2D(depthTexture,v_textureCoordinates));\n\
                                vec4 viewPos = toEye(v_textureCoordinates,depth);\n\
                                vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz,u_scanCenterEC.xyz,viewPos.xyz);\n\
                                float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n\
                                if(dis<u_radius)\n\
                                {\n\
                                    float f = 1.0-abs(u_radius - dis )/ u_radius;\n\
                                    f = pow(f,4.0);\n\
                                    gl_FragColor = mix(gl_FragColor,u_scanColor,f);\n\
                                }\n\
                    } \n\ ";
    return scanSegmentShader;
  }
  viewer.scene.globe.depthTestAgainstTerrain = true; //开启深度检测
}

//画圆
function addCircle (item,lat,lon) {
  console.log(lat,lon)
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lat, lon),
    name: 'circle',
    ellipse: {
      semiMinorAxis: 20000.0,
      semiMajorAxis: 20000.0,
      // height: 200000.0,
      material: Cesium.Color.LIGHTBLUE.withAlpha(.5),
    },
  })
}

// 标记重要性等级
// function addImportantRank(option){
//   let {id,name,lon,lat,type} = option
//   var entity5 = viewer.mars.draw.addFeature( 'billboard', {
//     type: "Feature",
//     properties: { style:  {
//         // "image": "/static/svg/2900.svg",      //图标 开发用
//         // "image": "/distfxpg/static/svg/2900.svg",      //图标 打包用
//         "image": "/static/svg/red.svg",      //图标 开发用
//         // "image": "/distfxpg/static/svg/red.svg",      //图标 打包用
//         "opacity": 1,      //透明度
//         "width": 20,      //width
//         "height": 25,      //height
//         "scale": 1,      //大小比例
//         "rotation": 0,      //旋转角度
//         "horizontalOrigin": "CENTER",      //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
//         "verticalOrigin": "BOTTOM",      //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
//         "scaleByDistance": false,      //是否按视距缩放
//         "scaleByDistance_far": 1000000,      //上限
//         "scaleByDistance_farValue": 0.1,      //比例值
//         "scaleByDistance_near": 1000,      //下限
//         "scaleByDistance_nearValue": 1,      //比例值
//         "distanceDisplayCondition": false,      //是否按视距显示
//         "distanceDisplayCondition_far": 10000,      //最大距离
//         "distanceDisplayCondition_near": 0,      //最小距离
//         "clampToGround": false,      //是否贴地
//         "visibleDepth": true,      //是否被遮挡
//         'disableDepthTestDistance':Number.POSITIVE_INFINITY,
//       }},
//     geometry: { type: "Point", coordinates: [lon,lat] }
//   });
//   viewer.camera.flyTo({
//     destination: Cesium.Cartesian3.fromDegrees(lat,lon,1000000),
//   })
// }




// 标记脆弱性等级
// function addFragileRank(item,lat,lon){
//   let {level} = item
//   viewer.entities.add({
//     position: Cesium.Cartesian3.fromDegrees(lat,lon),
//     name: 'Green circle at height with outline',
//     label: {
//       text:'脆弱性:'+level+'级',
//       font: '16px sans-serif',
//       pixelOffset: new Cesium.Cartesian2(0, -60),
//       fillColor: Cesium.Color.YELLOW,
//       outlineColor: Cesium.Color.BLACK,
//       outlineWidth: 2,
//       style:Cesium.LabelStyle.TYPE_FILL_AND_OUTLINE,
//     },
//   })
//   viewer.camera.flyTo({
//     destination: Cesium.Cartesian3.fromDegrees(lat,lon,1000000),
//   })
// }

// 标记灾害异常
function disasterAbnormal(item,lat,lon){
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lat,lon),
    name: 'Green circle at height with outline',
    label: {
      // text:'脆:'+level,
      text:'异常警报',
      font: '10px sans-serif',
      pixelOffset: new Cesium.Cartesian2(0, -60),
      fillColor: Cesium.Color.YELLOW,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style:Cesium.LabelStyle.TYPE_FILL_AND_OUTLINE,
    },
  })
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lat,lon,1000000),
    // orientation:{
    //   heading:Cesium.Math.toRadians(5),  //指向
    //   pitch:Cesium.Math.toRadians(-40),     //倾斜角
    //   roll:0.0,
    // }
  })
}




// 清除实体信息
function removeAllEntities () {
  // viewer.entities.removeAll()
  viewer.mars.draw.removeAll()
  // console.log(999)
}
