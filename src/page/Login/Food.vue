<template>
  <div>
    <Head />
    <Banner title="机构信息登记 - 餐饮管理企业" content="建立机构后可对旗下的餐饮店铺进行管理"/>
    <div class="center-card">
      <div class="card-content">
        <p class="form-p">已有管理机构？<span class="login" @click="goApply">申请加入</span></p>
        <div class="content">
          <div class="content-left">
            <p class="content-title">管理员信息登记</p>
            <el-input v-model="name" class="content-left-input" placeholder="姓名" style="width:240px"></el-input>
            <el-input v-model="idCard" class="content-left-input" placeholder="身份证号" style="width:240px"></el-input>
          </div>
          <div class="content-mid"></div>
          <div class="content-right">
            <p class="content-title">机构信息登记</p>
            <el-input v-model="info" class="content-left-input" placeholder="机构信息" style="width:420px;margin-top:20px"></el-input>
            <div class="area">
              <p>工商营业执照</p>
              <el-upload
                class="upload-demo"
                :action="BASE_URL + '/org/upload'"
                :file-list="fileList"
                :on-success="uploadAreaSuccess"
                :on-remove="uploadAreaRemove"
                style="display:flex"
              >
                <el-button style="margin-right:10px">点击上传</el-button>
              </el-upload>
            </div>
            <div class="area">
              <p>其他证明材料(选填)</p>
              <el-upload
                class="upload-demo"
                :action="BASE_URL + '/org/upload'"
                :limit="1"
                :file-list="fileList"
                :on-success="uploadOtherSuccess"
                :on-remove="uploadOtherRemove"
                style="display:flex"
              >
                <el-button style="margin-right:10px">点击上传</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <!-- <div class="btn"> -->
          <el-button type="primary" class="content-btn" @click="submit">提交</el-button>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Head from './../../components/Head'
import Banner from './../../components/Banner'
import { regionData } from 'element-china-area-data'
export default {
  data(){
    return{
      name:'',
      idCard:'',
      options: regionData,
      selectedOptions: [],
      info:'',
      codeCertificate:'', //工商营业执照
      otherCertificate:'' //其他证明材料
    }
  },
  components:{
    Head,
    Banner
  },
  methods:{
    uploadAreaRemove(){
      this.codeCertificate = ''
    },
    uploadOtherRemove(){
      this.otherCertificate = ''
    },
    uploadAreaSuccess(res, file,fileList){
      console.log(res.data);
       if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      const params = {
        file:res.data
      }
      this.$post('/org/ossurl',params,(res)=>{
        this.codeCertificate = res        
      })
    },
    uploadOtherSuccess(res, file, fileList){
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      const params = {
        file:res.data
      }
      this.$post('/org/ossurl',params,(res)=>{
        this.otherCertificate = res        
      })
    },
    goApply(){
      this.$router.push('./apply')
    },
    submit(){
      const {info,idCard,name,codeCertificate,otherCertificate} = this
      if(!info || !idCard || !name || !codeCertificate){
        this.$message('请完整填写信息')
        return
      }
      const params = {
        orgName:info,
        userIdcard:idCard,
        userName:name,
        userId:this.$store.state.userInfo.userId,
        codeCertificate,
        otherCertificate,
        orgType:'COM'
      }
      this.$post('/inst/info/register',params,(res)=>{
        this.$message.success('注册成功')
        this.$router.push('/applystatus')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.center-card{
  display: flex;
  justify-content: center;
  .card-content{
    width: 780px;
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
      display: flex;
      align-items: center;
      // justify-content: space-between;
      .content-left{
        display: flex;
        flex-direction: column;
        width: 300px;
        .content-left-input{
          margin-top: 20px;
        }
      }
      .content-mid{
        margin-top: 40px;
        width: 2px;
        height: 280px;
        background-color: #eeeeee;
      }
      .content-right{
        width: 420px;
        margin-left: 60px;
        .area{
          display: flex;
          align-items: center;
          margin-top: 16px;
        }
        p{
          width: 140px;
          font-size: 14px;
        }
      }
    }
  }
}
.content-btn{
  width:420px;
  margin:0 auto;
  display:block;
  margin-top:70px
}
</style>