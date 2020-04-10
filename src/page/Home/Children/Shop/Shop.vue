<template>
  <div>
    <el-card>
      <el-card style="width:90%;margin:0 auto">
        <div class="card-top">
          <div class="card-top-left">
            <div class="left-content">
              <p>商家名称</p>
              <el-input placeholder="请输入商家名称" style="width:200px" v-model="comName"></el-input>
            </div>
            <div class="left-content">
              <p>商家地址</p>
              <el-input placeholder="请输入商家地址" style="width:200px" v-model="comAddr"></el-input>
            </div>
            <div class="left-content">
              <p>联系人</p>
              <el-input placeholder="请输入联系人姓名" style="width:200px" v-model="comlxr"></el-input>
            </div>
            <div class="left-content">
              <p>联系人手机</p>
              <el-input placeholder="请输入联系人手机号码" style="width:200px" v-model="comPhone"></el-input>
            </div>
          </div>
          <div class="card-top-right">
            <el-button type="primary" @click="query">查询</el-button>
          </div>
        </div>  
      </el-card>
      <el-card style="width:90%;margin:0 auto;margin-top:20px">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="num"
            label="序号"
            width="60%">
          <template slot-scope="scope">
            <p class="address">{{(page-1)*limit+(scope.$index + 1)}}</p>
          </template>
          </el-table-column>
          <el-table-column
            label="商家名称"
            width="260">
            <template slot-scope="scope">
              <router-link :to="{path:'/index/shopdetail',query:{customerId:scope.row.custId}}">{{scope.row.customername}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="商家地址"
            width="250">
            <template slot-scope="scope">
              <p class="address">{{scope.row.address}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="contactsname"
            label="联系人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="contactsphone"
            label="联系人手机"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="time"
            label="最近清洗时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="date"
            label="清洗报告"
            width="100">
          <template slot-scope="scope">
              <a href="javascript:" @click="report(scope.row.attachmentUrl)" v-if="scope.row.attachmentUrl">清洗报告</a>
          </template>
          </el-table-column>
          <el-table-column
            label="油烟浓度（mg/m³）"
            >
            <template slot-scope="scope" style="">
              <div style="display:flex" v-if="scope.row.soot">
                 <div class="color" :style="colorCom(scope.row.soot)"></div>
                 <!-- <div class="color"></div> -->
                <p style="padding-left:10px;width: 116px">{{scope.row.soot.toFixed(2)}}</p>
              </div>
              <div style="display:flex" v-if="!scope.row.soot">
                 <p>--</p>
              </div>
             
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"  
          @current-change="currentChange"
          :total="total">
        </el-pagination>
      </div>
      
    </el-card>
    <Footer/>
  </div>
  
</template>

<script>
import Footer from "@/components/Footer";

export default {
  data(){
    return{
      comName:'',
      comAddr:'',
      comlxr:'',
      comPhone:'',
      tableData: [
      ],
      total:0,
      page:1,
      limit:10,
      loading: true
    }
  },
  computed:{
    colorCom(num){
      return function(num) {
        if(num>=3){
          return 'background:#ff3333'
        }
        if(num>=2 && num<3){
          return 'background:#ff9900'
        }
        if(num<2){
          return 'background:#33cc00'
        }
      }
    }
  },
  components:{
    Footer
  },
  methods:{
    currentChange(page){
      this.page = page 
      this.getShopList()
    },
    report(url){
      const params = {
        file:url
      }
      this.$post('/org/ossurl',params,(res)=>{
        window.open(res, '_blank')
      })
    },
    query(){
      let {page,limit,comName,comAddr,comlxr,comPhone} = this
      page = 1
      const params = {
        // userId:this.$store.state.userInfo.userId,
        userId:5,
        page,
        limit,
        comName,
        comAddr,
        comlxr,
        comPhone
      }
      this.loading = true
      this.$post('/com/base/list',params,(res)=>{
        this.tableData = res.data
        this.total = res.total
        this.loading = false
      }) 
    },
    getShopList(){
      let {page,limit,comName,comAddr,comlxr,comPhone} = this
      const params = {
        page,
        limit,
        comName,
        comAddr,
        comlxr,
        comPhone,
        // userId:this.$store.state.userInfo.userId,
        userId:5,
      }
      this.loading = true
      this.$post('/com/base/list',params,(res)=>{
        this.tableData = res.data
        this.total = res.total
        this.loading = false
      })
    }
  },
  mounted(){
    console.log(this.$route);
    this.getShopList()
  }
}
</script>

<style lang="scss" scoped>
.address{
  @include ellipsis;
}
.color{
  width: 80px;
	height: 20px;
	// background-color: #33cc00;
	border-radius: 10px;
}
.card-top{
  @include flex(null,space-between);
  flex-wrap: wrap;
  margin-top: 10px;
  .card-top-left{
    @include flex(null,space-between,);
    flex-wrap: wrap;
    .left-content{
      width: 300px;
      margin: 10px 0;
      @include flex();
      flex-wrap: wrap;
      margin-left: 20px;
      p{
        font-size: 14px;
        margin-right: 20px;
      }
    }
  }
}
</style>