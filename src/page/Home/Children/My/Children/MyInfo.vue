<template>
  <div>
    <!-- <el-card style="height:350px;width:600px;margin:0 auto"> -->
      <div class="card-container">
        <div>
          <p>姓名</p>
          <p>{{userData.userName}}</p>
        </div>
        <div>
          <p>身份证号码</p>
          <p>{{userData.userIdcard}}</p>
        </div>
        <div>
          <p>手机号码</p>
          <p>{{userData.userMobile}}<router-link to="/index/my/changemobile">修改手机号</router-link></p>
          
        </div>
        <div>
          <p>{{$store.state.userData.personnelType === 'ADMIN' ? '管理机构' : '所在机构'}}</p>
          <p>{{userData.orgName}}</p>
        </div>
        <div>
          <p>机构代码</p>
          <p class="tag-read">{{userData.orgCode}}<a href="javascript:" @click="copy" v-clipboard:copy="userData.orgCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</a></p>
          
        </div>
        <div>
          <p>登记日期</p>
          <p>{{userData.createTime}}</p>
        </div>
        <div>
          <p style="border-bottom:1px solid #ccc">认证状态</p>
          <p style="border-bottom:1px solid #ccc">{{userData.personnelStatus === 'OK' ? '已认证' : '未认证'}}</p>
        </div>
      </div>
    <!-- </el-card> -->
  </div>
</template>

<script>

export default {
  methods:{
    copy(){
      
    },
    onCopy(){
      this.$message.success('复制成功')     
    },
    onError(){
      this.$message.error('复制失败')  
    }
  },
  data(){
    return{
      userData:{}
    }
  },
  mounted(){
    const params = {
      userId:this.$store.state.userInfo.userId
    }
    this.$post('/my/user/info',params,(res)=>{
      this.userData = res
    })
  }
}
</script>

<style lang="scss" scoped>
.card-container{
  div{
    @include flex;
    // margin:30px 0;
    a{
      margin-left: 20px;
      text-decoration: underline;
    }
    p{
      height: 40px;
      border: solid 1px #cccccc;
      // text-align: center;
      line-height: 40px;
    }
    p:first-child{
      width: 150px;
      border-bottom: none;
      border-right:none;
      padding-left: 40px;
    }
    p:last-child{
      width: 480px;
      border-bottom: none;
      padding-left: 40px;
    }
  }
  div:first-child{
    margin-top: 8px;
  }
  div:nth-child(odd){
    background: #f0f3fa
  }
}
</style>