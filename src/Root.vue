<template>
  <div id="root" class="root">
    <router-view class="router-container"></router-view>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .root {
    width: 100%;
    height: 100%;
    /*width: 1660px;*/
    /*max-width: 1660px;*/
    /*min-width: 1660px;*/
    /*height: 780px;*/
    /*max-height: 780px;*/
    /*min-height: 780px;*/
    /*box-sizing: border-box;*/
    /*padding: 0;*/
    /*margin: 0;*/

    .router-container{
      width: 100%;
      height: 100%;
    }

  }
</style>
<style lang="scss">

  ul, li, dl, dd, dt {
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }

  .el-button--primary {
    background: darkcyan !important;
    outline: darkcyan !important;
    border-color: darkcyan !important;
  }

  .el-button--primary:focus, .el-button--primary:hover {
    background: #00c5c5 !important;
  }


  /*树*/
  /*  .el-tree {
      background: transparent!important;

      .hover-show-child {
      }
    }


    .el-tree-node__expand-icon {
      !*color: #ffffff;*!
    }

    .el-tree-node > .el-tree-node__children {
      background: transparent!important;
    }

    .el-tree-node__content:hover {
      background: #2b8090!important;
      color: #ffffff!important;
    }

    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background-color: #268f90!important;
    }


    .el-tree-node:focus > .el-tree-node__content {
      background-color: transparent!important;
    }*/


  /*输入框*/
  .el-form-item__label {
    font-size: 16px !important;
    color: darkcyan !important;
  }

  .el-form-item {
    margin-bottom: 10px !important;
  }

  .el-input__inner, .el-textarea__inner {
    /*border: 1px solid darkcyan!important;*/
    background-color: transparent !important;
    border-radius: 2px !important;
  }

  .el-checkbox__inner {
    border: 1px solid darkcyan !important;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: darkcyan !important;
    border-color: darkcyan !important;
  }

  .el-select {
    width: 100% !important;
  }

  /*滑块*/
  .el-slider__runway {
  }

  /*蒙版*/
  .el-loading-mask {
    background: rgba(255, 255, 255, .2) !important;
  }

  .el-dialog__header {
    background: #b7dcdb !important;
  }

  .v-modal{
    z-index: 10!important;
  }

  .zhibiao-svg{

    .joint-link.joint-theme-default .connection-wrap:hover {
      opacity: .4;
      stroke-opacity: .4;
      display: none;
    }
    .joint-link:hover .marker-vertices, .joint-link:hover .marker-arrowheads, .joint-link:hover .link-tools{
      display: none;
    }

    .joint-link.joint-theme-default .marker-arrowhead{
      display: none;
    }
    .joint-link.joint-theme-default .connection-wrap{
      cursor: auto;
    }
    .link-tools{
      display: none;
    }
    .joint-element{
      cursor: pointer;
    }

  }

  /*loading*/
  .el-loading-spinner i,.el-loading-spinner .el-loading-text{
    color: cyan!important;
  }

</style>
