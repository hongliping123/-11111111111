<template>
  <div>
    <el-card>
       <el-table
        :data="tableData"
        style="width: 1000px">
        <el-table-column
          prop="userName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="手机号码"
          width="240">
        </el-table-column>
        <el-table-column
          prop="personnelType"
          label="角色"
          width="200">
          <template slot-scope="scope">
            <p>{{scope.row.personnelType === 'ORDINARY' ? '普通成员' : '管理员'}}</p>
          </template>
        </el-table-column>
          
        <el-table-column
          prop="personnelStatus"
          label="状态"
          width="200"
        >
          <template slot-scope="scope">
            <p :style="{color: scope.row.personnelStatus === 'OK'  ? '#408fff' : '#ff9900'}">{{scope.row.personnelStatus === 'OK' ? '已审核' : '待审核'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="danger" v-if="scope.row.personnelStatus === 'OK' && scope.row.personnelType !== 'ORDINARY'" @click="transfer(scope.row)" :disabled="tableData.length<=1">转让管理员</el-button>
            <el-button type="primary" v-if="scope.row.personnelStatus !== 'OK' && scope.row.personnelType === 'ORDINARY'" @click="check(scope.row)">成员审核</el-button>
            <el-button type="warning" v-if="scope.row.personnelStatus === 'OK' && scope.row.personnelType === 'ORDINARY'" @click="unBind(scope.row)">成员解除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="转让管理员"
      :visible.sync="dialogVisible"
      width="20%"
    >
      <div style="display:flex;align-items:center">
        <p style="margin-right:10px">请选择要转让的成员</p>
        <el-select v-model="transferValue" placeholder="请选择">
          <el-option
            v-for="(item,index) in options" :key="index"
            v-if="item.userId !== $store.state.userData.userId"
            :label="item.userName"
            :value="item.userId">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferOne">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData: [],
      dialogVisible:false,
      options:[],
      transferValue:''
    }
  },
  methods:{
    transferOne(){
      const params = {
        userId:this.$store.state.userInfo.userId,
        orgId:this.$store.state.userData.orgId,
        uid:this.transferValue,
      }
      this.$post('/my/user/transfer',params,(res)=>{
        this.$message.success('转让成功')
        this.$router.push('/index/my')
      })
    },
    transfer(){
      this.dialogVisible = true
      const params = {
        orgId:this.$store.state.userData.orgId,
        userId:this.$store.state.userInfo.userId,
      }
      this.$post('/my/user/persons',params,(res)=>{
        this.options = res
      })
    },
    check(item){
      this.$confirm(`您确定要【${item.userName}-${item.userMobile}】审核通过，加入本机构吗？`, '成员审核', {
          confirmButtonText: '确定',
          cancelButtonText: '拒绝',
          type: 'warning'
        }).then(() => {
          this.checkAjax(item,'OK',(res)=>{
            this.$message.success('添加成功')
            this.getList()
          })
        }).catch(() => {
          this.checkAjax(item,'NO',(res)=>{
            this.$message('拒绝成功')
            this.getList()
          })         
        });
    },
    unBind(item){
      this.$confirm(`您确定要解除【${item.userName}-${item.userMobile}】，让其退出本机构吗?`, '成员解除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            orgId:this.$store.state.userData.orgId,
            uid:item.userId,
            userId:this.$store.state.userInfo.userId
          }
          this.$post('/my/user/unbind',params,(res)=>{
            this.$message.success('解除成功')
            this.getList()
          })
        }).catch(() => {
             
        });
    },
    checkAjax(item,status,fun){
      const params = {
        userId:this.$store.state.userInfo.userId,
        orgId:this.$store.state.userData.orgId,
        uid:item.userId,
        status
      }
      this.$post('/my/user/audit',params,(res)=>{
          fun()
      })
    },
    // unBind(orgId,uid){
      
    // },
    getList(){
      const params = {
        orgId:this.$store.state.userData.orgId,
        userId:this.$store.state.userInfo.userId
      }
      this.$post('/my/user/manager',params,(res)=>{
        this.tableData = res.data
      })
    }
  },
  mounted(){
    this.getList()
  }
}
</script>

<style>

</style>