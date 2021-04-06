<template>
  <el-container class="login-panel">
    <div class="tc"></div>
    <div class="tct"></div>
<!--    <div class="t-l-rep"></div>-->
<!--    <div class="t-r-rep"></div>-->

<!--    <div class="rt"></div>-->
<!--    <div class="r-rep"></div>-->
<!--    <div class="rb"></div>-->

<!--    <div class="bc"></div>-->
<!--    <div class="b-l-rep"></div>-->
<!--    <div class="b-r-rep"></div>-->

<!--    <div class="lt"></div>-->
<!--    <div class="l-rep"></div>-->
<!--    <div class="lb"></div>-->

    <div class="login-bg">
      <video class="item-video" muted="" :src="mp4" loop="loop" autoplay ></video>
    </div>

    <div class="main-panel">
      <div class="login-box shine-box">
        <el-form :model="ruleForm2" status-icon label-position="top" :rules="rules2" ref="ruleForm2" label-width="100px">

          <el-form-item label="设施类别"  >
            <el-select v-model="ruleForm2.region" placeholder="请选择设施类别：">
              <el-option label="按纲施训落统计分析" value="1"></el-option>
              <el-option label="院校教育质效分析" value="2"></el-option>
              <el-option label="部队安全管理分析" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-top: 20px; width: 100%; font-size: 20px;letter-spacing: 20px"
                       type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </el-container>
</template>

<script>

  export default {
    watch: {},
    components: {},
    computed:{
    },
    data(){
      var checkName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }
          setTimeout(() => {
            if (!value) {
              callback(new Error('用户名不能为空'));
            } else {
              callback();
            }
          }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        total: 100,
        pagesize: 7,
        page: 1,
        mp4:'/distfxpg/static/mp4/Rallye.mp4',
        ruleForm2: {
          pass: '',
          name: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ],


        },
        ruleForm2: {
          // name: '',
          region: '1',
          // date1: '',
          // date2: '',
          delivery: false,
          type: [],
          resource: '',
          // desc: ''
        },
      }
    },
    created () {
      this.init()
    },

    methods: {
      init () {
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
            // this.$message({
            //   type:'success',
            //   message:'登录成功!'
            // })
            let key = this.ruleForm2.region
            if(key == 1 && this.ruleForm2.name == 'test1' && this.ruleForm2.pass == 'test'  ){
              window.open(HOME_URL)
            }else if(key == 2 && this.ruleForm2.name == 'test2' && this.ruleForm2.pass == 'test' ){
              window.open(SCHOOL)
            } else if(key == 3 && this.ruleForm2.name == 'test3' && this.ruleForm2.pass == 'test' ){
              window.open(SAFETY)
            } else{
              // this.$router.replace('/home')
              this.$message({
                type:'error',
                message:'用户名或密码错误!'
              })

            }
         }else{
              console.log('error submit!!');
            // console.log(666)
            this.$message({
              type:'error',
              message:'用户名或密码错误!'
            })
              return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
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
  .login-panel {
    position: relative;
    background: #0c1a2d;

    .tc {
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 56px;
      background: url("../../../../static/img/bg/header3.png") no-repeat;
      background-position: center;
      background-size: 100% 60px;
    }

    .tct {
      position: absolute;
      z-index: 100;
      top: 0;
      left: 50%;
      right: 0px;
      width: 40%;
      height: 120px;
      transform: translateX(-50%);
      background: url("../../../../static/img/bg/header-login.png") no-repeat;
      background-position: center;
      background-size: 100% 100px;
    }

    .t-l-rep {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 59px;
      right: 1848.5px;
      height: 74px;
      background: url("../../../../static/img/bg/top-repeat.png") repeat;
      background-position: center;
    }

    .t-r-rep {
      position: absolute;
      z-index: 10;
      top: 0;
      right: 59px;
      left: 1848.5px;
      height: 74px;
      background: url("../../../../static/img/bg/top-repeat.png") repeat;
      background-position: center;
    }

    .lt {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      height: 153px;
      width: 59px;
      background: url("../../../../static/img/bg/left-top.png") no-repeat;
      background-position: center;
      background-size: 59px 153px;
    }

    .l-rep {
      position: absolute;
      z-index: 10;
      top: 153px;
      bottom: 64px;
      left: 0;
      width: 59px;
      background: url("../../../../static/img/bg/left-repeat.png") repeat;
      background-position: center;
      background-size: 59px 3px;
    }

    .lb {
      position: absolute;
      z-index: 10;
      bottom: 0;
      left: 0;
      height: 64px;
      width: 59px;
      background: url("../../../../static/img/bg/left-bottom.png") no-repeat;
      background-position: center;
      background-size: 59px 64px;
    }

    .rt {
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
      height: 153px;
      width: 59px;
      background: url("../../../../static/img/bg/right-top.png") no-repeat;
      background-position: center;
      background-size: 59px 153px;
    }

    .r-rep {
      position: absolute;
      z-index: 10;
      top: 153px;
      bottom: 64px;
      right: 0;
      width: 59px;
      background: url("../../../../static/img/bg/right-repeat.png") repeat;
      background-position: center;
      background-size: 59px 3px;
    }

    .rb {
      position: absolute;
      z-index: 10;
      bottom: 0;
      right: 0;
      height: 64px;
      width: 59px;
      background: url("../../../../static/img/bg/right-bottom.png") no-repeat;
      background-position: center;
      background-size: 59px 64px;
    }

    .bc {
      position: absolute;
      z-index: 10;
      bottom: 0;
      left: 71.5px;
      right: 71.5px;
      height: 36px;
      background: url("../../../../static/img/bg/bc.png") no-repeat;
      background-position: center;
      background-size: 1777px 36px;
    }

    .b-l-rep {
      position: absolute;
      z-index: 10;
      bottom: 0;
      left: 59px;
      right: 1848.5px;
      height: 36px;
      background: url("../../../../static/img/bg/bottom-repeat.png") repeat;
      background-position: center;
    }

    .b-r-rep {
      position: absolute;
      z-index: 10;
      bottom: 0;
      right: 59px;
      left: 1848.5px;
      height: 36px;
      background: url("../../../../static/img/bg/bottom-repeat.png") repeat;
      background-position: center;
    }

    .login-bg{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      overflow: hidden;
      .item-video{
        min-width: 100%;
        min-height: 100%;
      }
    }

    .main-panel {
      position: absolute;
      box-sizing: border-box;
      overflow: hidden;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;

      .login-box  {
        min-width:500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        padding: 20px;
        border-radius: 10px;
        background: radial-gradient( rgba(255,255,255,.3),rgba(0,0,0,.3)) !important;
      }
    }

  }

</style>
<style lang="scss">
  .login-panel{
    .el-form-item {
      margin-bottom: 20px !important;
    }
    .el-form--label-top .el-form-item__label{
      padding: 0!important;
    }
    .el-form-item__label{
      color: #ffffff!important;
    }
    .el-input__inner{
      color: #ffffff!important;
    }
  }
</style>
