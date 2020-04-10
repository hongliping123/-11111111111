<template>
  <div>
    <div class="content">
      <div class="input">
        <p>登录密码</p>
        <el-input placeholder="请输入登录密码" style="width: 420px;" v-model="password" type="password"></el-input>
      </div>
        <div class="input">
          <p>新手机号码</p>
          <el-input placeholder="请输入新手机号码" style="width: 420px;" v-model="mobile" type="number"></el-input>
        </div>
      <div class="input">
        <p>验证码</p>
        <el-input placeholder="请输入验证码" style="width: 420px;" v-model="vcode" type="number">
          <template slot="append">
            <el-button @click="sendCode()">{{timeCom}}</el-button>
          </template>
        </el-input>
      </div>
      <el-button type="primary" style="width:190px;margin-top:40px" @click="change">确认修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      password:'',
      vcode:'',
      isSend:false,  //是否已经输入验证码
      isSendTime:0,  //输入验证码剩余时间
      time:'',
      mobile:'',
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
    sendCode(){
      if(!this.isSend){
        let reg = /^[1]([3-9])[0-9]{9}$/;
        if(this.mobile === ""){
          this.$message('请输入电话号码')
          return
        }
        if (!reg.test(this.mobile)){
          this.$message('请输入正确的手机号')
          return
        }
        let mobiles = this.$store.state.userInfo.userMobile;
        if(mobiles==this.mobile){
          this.$message('手机号与原来手机号相同');
          return
        }
        const params = {
          mobile:this.mobile
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
    change(){
      if(this.password==''){
        this.$message.warning(`请输入密码！`);
        return
      }
      if(this.mobile==''){
        this.$message.warning(`请输入手机号码！`);
        return
      }
      if(this.vcode==''){
        this.$message.warning(`请输入验证码！`);
        return
      }
      const params = {
        userId:this.$store.state.userInfo.userId,
        userPassword:this.password,
        mobile:this.mobile,
        vcode:this.vcode
      }
      this.$post('/my/update/mobile',params,(res)=>{
        this.$message.success('修改成功')
        this.$router.push('/index/my')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  @include flex(column);
  .input{
    width: 540px;
    @include flex(null,space-between);
    margin:20px 0 ;
  }
}
</style>