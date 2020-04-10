<template>
  <div>
    <Head />
    <Banner title="请选择您的机构类型"/>
    <div class="center-card">
      <div class="card-content">
         <p class="form-p">已有管理机构？<span class="login" @click="goApply">申请加入</span></p>
         <div class="content">
           <div>
             <img src="/static/img/hb-5hb.png" alt="" @click="isSelect = true" v-if="!isSelect"/>
             <img src="/static/img/hb-7hb.png" alt="" v-else/>
             <p>地方环保监管部门</p>
           </div>
           <div>
             <img src="/static/img/hb-6cy.png" alt="" @click="selectFood()" v-if="isSelect"/>
             <img src="/static/img/hb-8cy.png" alt="" v-else/>
             <p>连锁餐饮管理企业</p>
           </div>
         </div>
           <el-button type="primary" class="btn" @click="go">确定</el-button>
         
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
      isSelect:true,
    }
  },
  components:{
    Head,
    Banner
  },
  methods:{
    selectFood(){
      this.$message('开放中，敬请期待...')
        return
      this.isSelect = false
    },
    go(){
      let url;
      // this.isSelect ? url ='./sanitation' : url = './food'
      this.isSelect ? url ='./sanitation' : url = './food'
      if(!this.isSelect){
        this.$message('暂未开放！')
        return
      }
      this.$router.push(url)
    },
    goBranch(url){
      this.$router.push(url)
    },
    goApply(){
      this.$router.push('./apply')
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
      margin-top: 100px;
      div{
        @include flex(column);
        img{
          width: 300px;
          height: 180px;
          cursor: pointer;
        }
        p{
          margin-top: 30px;
        }
      }
      
    }
  }
}
.btn{
  width:420px;
  margin:0 auto;
  display:block;
  margin-top:70px
}
</style>