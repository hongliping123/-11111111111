<template>
  <div class="login">
    <div class="content">
      <div class="content-left"></div>
      <div class="content-right">
        <div class="content-right-width">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="密码登录" name="1">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="margin-top:20px">
                <el-form-item prop="mobile">
                  <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" type="number" @input="mobileInput"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <drag-verify
                  :width="300"
                  :height="40"
                  text="拖动滑块完成验证"
                  :circle="false"
                  successText="验证成功"
                  background="#f6f6f6"
                  progressBarBg="#99ccff"
                  textSize="14px"
                  completedBg="#99ccff"
                  @passcallback="passcallback"
                  handlerIcon="el-icon-arrow-right"
                  successIcon="el-icon-check"
                  v-if="isShowVer"
                >
                </drag-verify>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" size="medium" style="margin-top:30px;width:100%">登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="手机登录" name="2">
              <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" class="demo-ruleForm" style="margin-top:20px">
                <el-form-item prop="mobile">
                  <el-input v-model="ruleForm2.mobile" placeholder="请输入手机号码" type="number" @input="mobileInput"></el-input>
                </el-form-item>
                <drag-verify
                  :width="300"
                  :height="40"
                  text="拖动滑块完成验证"
                  :circle="false"
                  successText="验证成功"
                  background="#f6f6f6"
                  progressBarBg="#99ccff"
                  textSize="14px"
                  completedBg="#99ccff"
                  @passcallback="passcallback2"
                  handlerIcon="el-icon-arrow-right"
                  successIcon="el-icon-check"
                  ref="verif"
                  v-if="isShowVer"
                >
                </drag-verify>
                <el-form-item prop="code" style="margin-top:20px">
                  <el-input placeholder="请输入短信验证码" v-model="ruleForm2.code">
                    <template slot="append">
                      <el-button @click="sendCode">{{timeCom}}</el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm2('ruleForm2')" size="medium" style="margin-top:10px;width:100%">登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div class="content-bottom">
            <a href="./register">立即注册</a>
            <a href="./forgot" style="color:#666">忘记密码</a>
          </div>
        </div>
      </div>
      <img src="/static/img/hb-2zm.png" alt="" class="abs-img">
    </div>
    
  </div>
</template>

<script>
import dragVerify from 'vue-drag-verify'

export default {
  data(){
    return{
      ruleForm:{
        mobile:'',
        password:''
      },
      ruleForm2:{
        mobile:'',
        code:''
      },
      activeName:'1',   
      rules:{
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      isVer:false,
      isVer2:false,
      isSend:false,  //是否已经输入验证码
      isSendTime:0,  //输入验证码剩余时间
      time:'',
      isShowVer:true,
    }
  },
  computed:{
    timeCom(){
      if(!this.isSend){
        return '获取验证码'
      }else{
        return `剩余${this.isSendTime}秒`
      } 
    },
  },
  components:{
    dragVerify
  },
  methods:{
    mobileInput(e){
      this.ruleForm.mobile = e
      this.ruleForm2.mobile = e
      console.log(e);
      
    },
    handleClick(tab, event) {
      this.isShowVer = false
      setTimeout(() => {
        this.isShowVer = true
      }, 1);
      const {ruleForm,ruleForm2} = this
      // if(ruleForm.mobile){
      //   ruleForm2.mobile = ruleForm.mobile
      // }
      // if(ruleForm2.mobile){
      //   ruleForm.mobile = ruleForm2.mobile
      // }
      this.isVer = false
      this.isVer2 = false
    },
    sendCode(){
      if(!this.isSend){
        if(!this.isVer2){
          this.$message('请先完成验证')
          return
        }
        let reg = /^[1]([3-9])[0-9]{9}$/
        if (!reg.test(this.ruleForm2.mobile)){
          this.$message('请输入正确的手机号')
          return
        }
        const params = {
          mobile:this.ruleForm2.mobile
        }
        this.isSendTime = 60
        this.$post('/org/login/vcode',params,(res)=>{
          this.$message.success('发送成功')
          this.time = setInterval(()=>{
            this.isSendTime --
            if(this.isSendTime === 0){
              this.isSend = false
              clearInterval(this.time)
              this.isSendTime = 60
            }
          },1000)
          this.isSend = true
        })   
      }else{
        this.$message.warning(`请等待${this.isSendTime}秒！`)
      }
    },
    passcallback(){
      this.isVer = true
    },
    passcallback2(){
      this.isVer2 = true
    },
    submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.isVer){
            this.$message('请先完成验证')
            return
          }
          let {mobile,password} = this.ruleForm
          const params = {
            userMobile:mobile,
            userPassword:password
          }
          this.$post('/org/user/login',params,(res)=>{
            
            this.$cookies.set('userInfo', res,'3h')
            this.$store.commit('userInfo',res)
            
            const params1 = {
              userId:this.$store.state.userInfo.userId
            }
            this.$post('/my/user/info',params1,(res)=>{
              
              this.$store.commit('userData',res)
              this.$cookies.set('userData', res,'3h')
              if(!res.orgCode){
                this.$router.push('/agency')
                return
              }
              if(res.personnelStatus === 'OK'){
                this.$message.success('登录成功')
                this.$router.push('/index')
              }else if(res.personnelStatus === 'CANCELLED'){
                this.$message('账号已被注销')
                this.$cookies.remove('userInfo')
                this.$cookies.remove('userData')
                this.$store.commit('userInfo','')
                this.$store.commit('userData','')
                // this.$router.push('/login')
                return
              }else{
                this.$message.success('登录成功')
                this.$router.push('/applystatus')
              }
              
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm2(formName2) {      
      this.$refs[formName2].validate((valid) => {
        if (valid) {
          if(!this.isVer2){
            this.$message('请先完成验证')
            return
          }
          let {mobile,code} = this.ruleForm2
          const params = {
            userMobile:mobile,
            vcode:code
          }
          this.$post('/org/quick/login',params,(res)=>{
            this.$message.success('登录成功')
            this.$cookies.set('userInfo', res,'3h')
            this.$store.commit('userInfo',res)
          })
          const params1 = {
              userId:this.$store.state.userInfo.userId
            }
            this.$post('/my/user/info',params1,(res)=>{
              
              this.$store.commit('userData',res)
              this.$cookies.set('userData', res,'3h')
              if(!res.orgCode){
                this.$router.push('/agency')
                return
              }
              if(res.personnelStatus === 'OK'){
                this.$router.push('/index')
              }else{
                this.$router.push('/applystatus')
              }
              
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.abs-img{
  margin: auto;
  display: block;
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  
}
.content{
  width: 900px;
  height: 580px;
  background: #fff;
  box-shadow: 6.6px 4.6px 16.6px 1.4px rgba(102, 102, 102, 0.35);
  border-radius: 8px 32px 8px 32px;
  @include abs(0,0,0,0);
  @include flex(null,space-between);
  margin: auto;
  .content-left{
    height: 100%;
    width: 450px;
    @include bg('hb-3zc.png');
    border-radius:8px 0 0 32px;
  }
  .content-right{
    height: 100%;
    width: 50%;
    @include flex;
    .content-right-width{
      width: 300px;
      margin-top: 60px;
      margin-bottom: 105px;
      .content-bottom{
        @include flex(null,space-between)
      }
    }
  }
}
.login{
  @include bg('hb-1bj.png');
  background-size:cover;
  height: 100%;
  width: 100%;
}
</style>