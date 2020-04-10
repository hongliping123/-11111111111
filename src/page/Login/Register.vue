<template>
  <div>
    <Head />
    <Banner title="欢迎注册蓝天白云油烟智能化管理平台账号" content="准备开启您的油烟智能化管理之旅"/>
    <div class="center-card">
      <div class="card-form">
        <p class="form-p">已有账号？<span class="login" @click="goLogin">立即登录</span></p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="margin-top:20px">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input v-model="ruleForm.password2" placeholder="确认密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="手机号码" type="number"></el-input>
          </el-form-item>
          <el-form-item prop="code" style="margin-top:30px">
            <el-input placeholder="请短信验证码" v-model="ruleForm.code">
              <template slot="append">
                <el-button @click="sendCode">{{timeCom}}</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="read">
              <el-checkbox v-model="isRead" @click="isRead = !isRead">我已阅读并接受以下条款：</el-checkbox>
              <a href="#">《蓝天白云-油烟智能化管理平台注册协议》</a>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="medium" style="width:100%">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Head from './../../components/Head'
import Banner from './../../components/Banner'
export default {
  data(){
    let nameCheck = (rule,value,callback) =>{
      if (value === '') {
          callback(new Error('请输入姓名'));
      } else if (!/^[\u4e00-\u9fa5]{2,6}$/.test(value)) {
          callback(new Error('请输入正确的姓名!'));
      } else {
          callback();
      }
    } 
    let passwordCheck1 = (rule,value,callback) =>{
      if (value === '') {
          callback(new Error('请输入密码'));
      } else if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(value)) {
          callback(new Error('请输入8-20位非纯数字或字母的密码!'));
      } else {
          callback();
      }
    }
    let passwordCheck2 = (rule,value,callback) =>{
      if (value === '') {
          callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
      } else {
          callback();
      }
    }
    return{
      ruleForm:{
        name:'',
        password:'',
        password2:'',
        mobile:'',
        code:'',
      },
      rules:{
        name: [
            // { required: true, message: '请输入姓名', trigger: 'blur' },
            { validator: nameCheck, trigger: 'blur' },
        ],
        password: [
            { validator: passwordCheck1, trigger: 'blur' },
        ],
        password2: [
            { validator: passwordCheck2,  trigger: 'blur' },
        ],
        mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        code:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      isRead:false,
      isSend:false,  //是否已经输入验证码
      isSendTime:0,  //输入验证码剩余时间
      time:'',
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
  methods:{
    submitForm(formName) {
      if(this.isRead){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let { name , password , password2 , mobile , code} = this.ruleForm
            const params = {
              userName:name,
              userMobile:mobile,
              userPassword:password,
              confirmPassword:password2,
              vcode:code,
            }
            this.$post('/org/user/register',params,(res)=>{
              this.$message.success('注册成功')
              this.$cookies.set('userInfo', res,'3h')
              this.$store.commit('userInfo',res)
              
              const params = {
                userId:this.$store.state.userInfo.userId
              }
              this.$post('/my/user/info',params,(res)=>{
                
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
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }else{
        this.$message('请同意注册协议')
      }
      
    },
    goLogin(){
      this.$router.push('/login')
    },
    sendCode(){
      if(!this.isSend){
        let reg = /^[1]([3-9])[0-9]{9}$/
        if (!reg.test(this.ruleForm.mobile)){
          this.$message('请输入正确的手机号')
          return
        }
        const params = {
          mobile:this.ruleForm.mobile
        }
        this.isSendTime = 60
        this.$post('/org/send/code',params,(res)=>{
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
  },
  components:{
    Head,
    Banner
  }
}
</script>

<style lang="scss" scoped>
.center-card{
  .card-form{
    width: 420px;
    margin:0 auto;
    text-align: center;
    margin-top: 10px;
    .login{
      color: #408fff;
      cursor: pointer;
    }
    .form-p{
      padding-top: 40px;
    }
    .read{
      display: flex;
      flex-direction: column;
      justify-content: f;
      align-items: end;
    }
  }
}
</style>