<template>
  <div>
    <Head />
    <Banner title="找回密码-验证手机号码" content="忘记密码？请不要担心，验证手机号码重置即可"/>
    <div class="center-card">
      <div class="card-content">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="第一步" description="验证手机号码"></el-step>
          <el-step title="第二步" description="重置密码"></el-step>
        </el-steps>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="margin-top:20px" v-if="active === 0">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="手机号码" type="number"></el-input>
          </el-form-item>
          <el-form-item prop="code" style="margin-top:30px">
            <el-input placeholder="请短信验证码" v-model="ruleForm.code" type="number">
              <template slot="append">
                <el-button @click="sendCode">{{timeCom}}</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="medium" style="width:100%">下一步</el-button>
          </el-form-item>
        </el-form>

        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="margin-top:20px" v-if="active === 1">
          <el-form-item prop="password">
            <el-input v-model="ruleForm2.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input v-model="ruleForm2.password2" placeholder="确认密码" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm2('ruleForm2')" size="medium" style="width:100%">提交</el-button>
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
    return{
      ruleForm:{
        mobile:'',
        code:''
      },
      ruleForm2:{
        password:'',
        password2:''
      },
      active: 0,
      rules:{
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        code:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        password2:[
          { required: true, message: '请输入确认密码', trigger: 'blur' },
        ],
      },
      isSend:false,  //是否已经输入验证码
      isSendTime:0,  //输入验证码剩余时间
      time:'',
      uuid:''
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
    Head,
    Banner
  },
  methods:{
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          let {mobile,code} = this.ruleForm
          const params ={
            userMobile:mobile,
            vcode:code
          }
          this.$post('/org/user/retrieve',params,(res)=>{
            this.active = 1
            this.uuid = res
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm2(formName) {      
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let {password,password2} = this.ruleForm2
          const params ={
            uuid:this.uuid,
            userPassword:password,
            confirmPassword:password2
          }
          this.$post('/org/retrieve/pwd',params,(res)=>{
            this.$message.success('修改成功')
            this.$router.push('./login')
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
.center-card{
  display: flex;
  align-items: center;
  justify-content: center;
  .card-content{
    width: 420px;
    margin:0 auto
  }
}
</style>