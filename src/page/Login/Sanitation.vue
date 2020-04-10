<template>
  <div class="sanitation">
    <Head />
    <Banner title="机构信息登记 - 环保监管部门" content="建立机构后可对区域内的餐饮单位进行管理"/>
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
            <p class="content-title" style="margin-bottom:20px">机构信息登记</p>
            <el-input v-model="info" class="content-left-input" placeholder="机构名称" style="width:420px"></el-input>
            <div class="area">
              <p style="width:100px">管辖区域</p>
              <!-- <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                style="width:100%"
              >
              </el-cascader> -->
              <el-select v-model="province" style="width:110px;margin-right:10px" placeholder="请选择" @change="selectChange1">
                <el-option
                  v-for="item in provinces"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="city" style="width:110px;margin-right:10px" placeholder="请选择" @change="selectChange2">
                <el-option
                  v-for="item in citys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="county" style="width:110px" placeholder="请选择" @change="selectChange3">
                <el-option
                  v-for="item in countys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <a href="javascript:" style="width:40px;text-align:end;font-size:13px" @click="clean">清空</a>
            </div>
            <div class="area">
              <p>组织机构代码证</p>
              <el-upload
                class="upload-demo"
                :action="BASE_URL + '/org/upload'"
                :file-list="fileList"
                :on-success="uploadAreaSuccess"
                :on-remove="uploadAreaRemove"
                :before-upload="beforeUpload"
                style="display:flex"
                accept="image/jpeg,image/png,image/jpg,image/bmp,image/webp"
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
                :before-upload="beforeUpload"
                style="display:flex"
                accept="image/jpeg,image/png,image/jpg,image/bmp,image/webp"
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
      provinces: [],
      province: '',
      citys:[],
      city:'',
      countys:[],
      county:'',
      fileList:[],
      codeCertificate:'', //组织机构代码证
      otherCertificate:'' //其他证明材料
    }
  },
  components:{
    Head,
    Banner
  },
  mounted(){
    console.log(regionData);
    
    console.log(this.$store.state.userData)
    this.name = this.$store.state.userData.userName
    this.provinces = regionData
    
    
  },
  methods:{
    clean(){
      this.county = ''
      this.city = ''
      this.province = ''
      this.countys = []
      this.citys = []
    },
    selectChange1(e){
      console.log(e);
      
      let arr = []
      this.countys = []
      console.log(12312);
      
      this.county = ''
      this.citys = []
      this.city = ''
      
      this.provinces.forEach((item,index)=>{
        if(item.value === this.province){
          arr = item.children
        }   
      })
      this.citys = arr
    },
    selectChange2(){
      let arr = []
      this.countys = []
      this.county = ''      
      this.citys.forEach((item,index)=>{
        if(item.value === this.city){
          arr = item.children
        }   
      })      
      this.countys = arr
    },
    selectChange3(){
      // let arr = []
      // this.citys = []
      // this.city = ''
      // this.provinces.forEach((item,index)=>{
      //   if(item.value === this.province){
      //     arr = item.children
      //   }   
      // })
      // this.citys = arr
    },
    beforeUpload(file){
      let fileImg = ['image/jpeg','image/png','image/jpg','image/webp','image/bmp']
      if(!fileImg.includes(file.type)){
        this.$message.warning('上传文件的格式不正确，请重新上传！');
        return false;
      }
    },
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
      const {info,idCard,name,codeCertificate,otherCertificate,province,city,county} = this
      let regioncode = county
      if(!county){
        regioncode = city
        if(!city){
          regioncode = province
        }
      }      
      if(!info || !idCard || !name || !regioncode || !codeCertificate){
        this.$message('请完整填写信息')
        return
      }
      const params = {
        orgName:info,
        userIdcard:idCard,
        userName:name,
        userId:this.$store.state.userInfo.userId,
        regioncode,
        codeCertificate,
        orgType:'INS',
        otherCertificate,
        orgId:this.$store.state.userData.orgId
      }
      this.$post('/inst/info/register',params,(res)=>{
        this.$message.success('注册成功')
        this.$router.push('/applystatus')
      })
    }
  }
}
</script>

<style lang="scss">
.sanitation{
  .el-upload-list__item-name{
    @include ellipsis;
    width: 100px;
  }
}
</style>
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
        margin-left: 40px;
        .area{
          display: flex;
          align-items: center;
          margin-top: 16px;
        }
        p{
          width: 140px;
          font-size: 14px;
          // margin-bottom: 20px;
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