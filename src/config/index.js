let taskStatusDictionary = {
  occupy:-1,//已占用
    newtask:0,//新建
    startsimulation:1,//开始仿真
    suspend:2,//已暂停
    stop:3,//已停止
    finish:4,//已仿真完毕
    startassess:5,//开始分析评估
    finishassess:6,//评估完成
}

module.exports = {
  taskStatusDictionary
}
