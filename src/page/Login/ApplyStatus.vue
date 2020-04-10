<template>
  <div>
    <Head />
    <Banner v-if="status === 1" title="申请已提交-审核已成功" content="环保管理部门"/>
    <Banner v-if="status === 2" title="申请已提交-正在审核中" content="环保管理部门"/>  
    <Banner v-if="status === 3" title="申请已提交-审核已失败" content="环保管理部门"/>
    <div class="center-card">
      <div class="card-content">
         <p class="form-p">您申请注册/加入{{$store.state.userData.orgName}}</p>
         <div class="content">
           <div v-if="status === 1">
             <img src="/static/img/hb-11cg.png" alt="">
             <p>恭喜您，您的申请</p>
             <h1>审核成功</h1>
           </div>
           <div v-if="status === 2">
             <img src="/static/img/hb-12shz.png" alt="">
             <p>亲爱的用户，您的申请</p>
             <h1>正在审核中</h1>
           </div>
           <div v-if="status === 3">
             <img src="/static/img/hb-10sb.png" alt="">
             <p>很抱歉，您的申请</p>
             <h1>审核失败</h1>
             <span>失败原因：{{userData.auditDesc ? userData.auditDesc : '管理员不同意您加入该机构'}}</span>
           </div>
         </div>
           <el-button type="primary" v-if="status === 1" class="btn" @click="go('/index')">进入管理平台</el-button>
           <p class="btn-p" v-if="status === 2">联系电话：0731- 8224 4552</p>
           <el-button type="primary" v-if="status === 3" class="btn" @click="goApply">重新提交</el-button>
         
      </div>
    </div>
  </div>
</template>

<script>
import Head from './../../components/Head'
import Banner from './../../components/Banner'
import { mapState } from 'vuex';
export default {
  data(){
    return{
      status:0,
    }
  },
  components:{
    Head,
    Banner
  },
  computed:{
    ...mapState(['userData'])
  },
  mounted(){
    console.log(this.userData);
    
    const params = {
      userId:this.$store.state.userInfo.userId
    }
    this.$post('/my/user/info',params,(res)=>{
      this.$store.commit('userData',res)
      this.$cookies.set('userData', res,'3h')
      this.statusApply()
    })
    
  },
  methods:{ 
    goApply(){
      let url;
      this.$store.state.userData.personnelType === 'ADMIN' ? url = '/sanitation' : url = '/apply'
      this.$router.push(url)
    },
    reSubmit(){
      const params = {
        userId:this.$store.state.userInfo.userId,
        orgId:this.$store.state.userData.orgId,
      }
      this.$post('/inst/submit/again',params,(res)=>{
        this.$router.push('sanitation')
      })
    },
    go(router){
      this.$router.push(router)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active = 1
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    statusApply(){
      if (this.userData.personnelStatus === 'TO') this.status = 2
      if (this.userData.personnelStatus === 'NO') this.status = 3
      if (this.userData.personnelStatus === 'OK') this.status = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.center-card{
  display: flex;
  justify-content: center;
  .card-content{
    width: 700px;
    margin:0 auto;
    .form-p{
      margin-top: 40px;
      text-align: center;
      .login{
        color: #408fff;
        cursor: pointer; 
      }
    }
    .content{
      @include flex(null,space-between);
      margin-top: 50px;
      div{
        @include flex(column);
        width: 100%;
        img{
          width: 180px;
          height: 180px;
          border-radius: 50%;
        }
        p{
          margin-top: 30px;
          color: #666;
          font-size: 24px;
        }
        h1{
          font-size: 36px;
          margin-top: 20px;
        }
        span{
          margin-top: 20px;
          color: #cc0000;
          font-size: 18px;
        }
      }
      
    }
  }
}
.btn{
  width:420px;
  margin:0 auto;
  display:block;
  margin-top:40px
}
.btn-p{
  text-align: center;
  margin-top: 80px;
  color: #666666;
  font-size: 24px;
}
</style>