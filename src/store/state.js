const state = {

  //超图加载完成
  theFrameLoadState:0,

  //超图点击的实体的ID
  theCesiumClickEntityId:'',

  //查询的分类
  queryClassList:{},

  /**实体列表合集*/
  theEntitiesLists:[],

  /**选中的分类列表*/
  theCheckdNodes:[],

  /**控制按钮状态*/
  theControllBtnsState:1,// 1 显示标牌 2 显示重要性 3 显示区域 4 显示脆弱性

  /**控制open的新窗口数据*/
  theOpenWindowData:'',



  //重要性设施选择状态
  theSelectedImportanceClassType:1,

  //脆弱性设施选择状态
  theSelectedFragilityClassType:1,

  // 登陆页面设施类别选项
  // theSelectedLoginClassType:1,

  // 设备基本信息
  equipmentInfo:"",






}

export default state

