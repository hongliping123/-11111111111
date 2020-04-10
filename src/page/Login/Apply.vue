<template>
  <div class="apply">
    <Head />
    <Banner title="申请加入机构" content="搜索并选择已有机构申请加入"/>
    <div class="center-card">
      <div class="card-content">
        <p class="form-p">没有找到要加入的机构？<span class="login" @click="goAgency">立即注册机构</span></p>
        <div class="search">
          <el-input v-model="search" placeholder="请输入机构代码或名称" style="width:320px">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" style="margin-left:20px" @click="searchFun">搜索</el-button>
        </div>
         <el-table
            :data="tableData"
            style="width: 100%;margin-top:40px">
            <el-table-column
              prop="orgCode"
              label="机构代码"
              width="140">
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="机构名称"
              width="250">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="管理员姓名">
            </el-table-column>
            <el-table-column
              label="操作">
               <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="add(scope.row)"
                    type="primary" 
                  >申请加入</el-button>
                </template>
            </el-table-column>
          </el-table>
      </div>
    </div>


    <el-dialog title="加入机构申请" :visible.sync="isShowDialog">
      <div>
        <p class="dialog-p">您正在申请加入“{{addInfo.orgName}}【{{addInfo.orgCode}}】”<br/>请您输入该机构管理员{{addInfo.userName}}的完整姓名</p>
        <el-input v-model="adminName" placeholder="请输入管理员姓名" style="width:380px;margin-top:30px"></el-input>
      </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShowDialog = false">取 消</el-button>
      <el-button type="primary" @click="addAdmin()">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import Head from './../../components/Head'
import Banner from './../../components/Banner'
import { mapState } from 'vuex'
export default {
  data(){
    return{
      search:'',
      tableData: [],
      isShowDialog:false,
      adminName:'',
      trueAdminName:'',
      addInfo:{}
    }
  },
  components:{
    Head,
    Banner
  },
  computed:{
    ...mapState(['userInfo'])
  },            
  methods:{
    addAdmin(){
      if(!this.adminName){
        this.$message('请输入管理员姓名')
        return
      }
      const {orgId,userId} = this.addInfo
      const params = {
        orgId,
        userId:this.userInfo.userId,
        orgUserId:userId,
        userName:this.adminName
      }
      this.$post('/inst/submit/apply',params,(res)=>{
        this.isShowDialog = false
        this.$router.push('/applystatus')
      })
    },
    add(item){
      this.isShowDialog = true,
      this.addInfo = item
    },
    searchFun(){
      const params = {
        keyword:this.search,
        userId:this.userInfo.userId
      }
      console.log(this.$store.state)
      
      this.$post('/inst/name/search',params,(res)=>{
        this.tableData = res.data
        
      })
    },
    goAgency(){
      this.$router.push('./agency')
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

<style>
.apply .el-dialog{
  width: 420px;
}
</style>
<style lang="scss" scoped>
.dialog-p{
  font-size: 14px;
  line-height: 30px;
}
.center-card{
  display: flex;
  justify-content: center;
  height: 780px;
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
    .search{
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
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