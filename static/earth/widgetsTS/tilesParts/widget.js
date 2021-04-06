(function (window, mars3d) {
    //创建widget类，需要继承BaseWidget
    class MyWidget extends mars3d.widget.BaseWidget {


        //弹窗配置
        get view() {
            return {
                type: "window",
                url: "view.html",
                windowOptions: {
                    width: 270,
                    height: 500,
                    "position": {
                        "top": 70,
                        "bottom": 40,
                        "left": 15
                    }
                }
            }
        }


        //初始化[仅执行1次]
        create() {


        }
        //每个窗口创建完成后调用
        winCreateOK(opt, result) {
            this.viewWindow = result;
        }
        //打开激活
        activate() {


        }
        //关闭释放
        disable() {
            this.viewWindow = null;
            this.resetStyle();
        }
        getTreeUrl() {
            var url = this.config.layerCfg.url;
            url = url.substring(0, url.lastIndexOf('/') + 1) + this.config.layerCfg.scenetree;

            var that = this;
            $.ajax({
                url: url,
                dataType: 'json',
                success(scene) {
                    that.viewWindow.initSceneTree(scene);
                }
            });
        }
        resetStyle() {
            var layerWork = this.viewer.mars.getLayer(this.config.layerCfg);
            if (!layerWork) return;
            var tileset = layerWork.model;
            if (!tileset) return;
            tileset.style = undefined;
        }
        //定位
        locateNode(nodeid, nodesphere) {
            if (nodesphere[3] <= 0)
                return;


            var layerWork = this.viewer.mars.getLayer(this.config.layerCfg);
            var tileset = layerWork.model;
            var orginMatrixInverse = layerWork.orginMatrixInverse;

            //飞行过去 
            var center = new Cesium.Cartesian3(nodesphere[0], nodesphere[1], nodesphere[2]);
            if (orginMatrixInverse && tileset._root.transform) {
                var mat = Cesium.Matrix4.multiply(tileset._root.transform, orginMatrixInverse, new Cesium.Matrix4());
                center = Cesium.Matrix4.multiplyByPoint(mat, center, new Cesium.Cartesian3());
            }

            var sphere = new Cesium.BoundingSphere(center, nodesphere[3]);
            this.viewer.camera.flyToBoundingSphere(sphere, {
                duration: 0.5
            });

            //设置tileset的样式 
            tileset.style = new Cesium.Cesium3DTileStyle({
                color: {
                    conditions: [
                        ["${id} ==='" + nodeid + "'", "rgb(255, 255, 255)"],
                        ["true", "rgba(255, 200, 200,0.2)"]
                    ]
                }
            });

        }



    }


    //注册到widget管理器中。
    mars3d.widget.bindClass(MyWidget);

    //每个widet之间都是直接引入到index.html中，会存在彼此命名冲突，所以闭包处理下。
})(window, mars3d) 