const mutations = {

  //超图加载完成
  SET_THEFRAMELOADSTATE (state,data) {
    state.theFrameLoadState  = data
  },

  //超图点击的实体的ID
  SET_THECESIUMCLICKENTITYID (state,data) {
    state.theCesiumClickEntityId  = data
  },

  //
  //查询的分类
  SET_THEQUERYCLASSLIST (state,data) {
    state.queryClassList  = data
  },

  /**实体列表合集*/
  SET_THEENTITIESLISTS (state,data) {
    state.theEntitiesLists  = data
  },

  /**选中的分类列表*/
  SET_THECHECKDNODES (state,data) {
    state.theCheckdNodes  = data
  },

  /**控制按钮状态*/
  // 1 显示标牌 2 显示重要性 3 显示区域 4 显示脆弱性
  SET_THECONTROLLBTNSSTATE (state,data) {
    state.theControllBtnsState  = data
  },



  /**控制open的新窗口数据*/
  SET_THEOPENWINDOWDATA (state,data) {
    state.theOpenWindowData  = data
  },

   /**重要性设施选择状态*/
  SET_THESELECTEDIMPORTANCECLASSTYPE (state,data) {
    state.theSelectedImportanceClassType  = data
  },

  /**脆弱性设施选择状态*/
  SET_THESELECTEDFRAGILITYCLASSTYPE (state,data) {
    state.theSelectedFragilityClassType  = data
  },


  /**登陆设施选择状态*/
  // SET_THESELECTEDLOGINCLASSTYPE (state,data) {
  //   state.theSelectedLoginClassType  = data
  // },

  // 设备基本信息
  SET_EQUIPMENTINFO (state,data) {
    state.equipmentInfo  = data
  },












}



export default mutations

