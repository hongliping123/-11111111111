<template>
  <div>
    <p v-if="!tableData.length" style="padding-top:20px">暂无清洗记录</p>
     <el-card style="width:1200px;margin:40px 0" v-if="tableData.length">
       
       <el-table
          
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="orderNo"
            label="清洗记录号"
            width="280">
          </el-table-column>
          <el-table-column
            prop="finshTime"
            label="清洗时间"
            width="220">
          </el-table-column>
          <el-table-column
            prop="pt"
            label="清洗平台"
            width="220">
            <!-- <template slot-scope="scope"> -->
            <template>
              <p>蓝天白云清洁平台</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="cleanitem"
            label="清洗项目数"
            width="240">
          </el-table-column>
          <!-- <el-table-column
            prop=""
            label="距离上次清洗间隔（月）"
            width="180">
          </el-table-column> -->
            <!-- <template slot-scope="scope"> -->
              <!-- <p>{{scope.row.cleanreport ? scope.row.cleanreport : '-'}}</p> -->
            <!-- </template> -->
          <el-table-column
            prop="cleanreport"
            label="操作"
            >
            <template slot-scope="scope">
              <a href="javascript:" @click="report(scope.row.cleanreport)" v-if="scope.row.cleanreport">查看清洗报告</a>
            </template>
          </el-table-column>
        </el-table>
     </el-card>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          tableData: [],
          id:''
        }
      },
      mounted(){
        
        this.id = this.$route.query.customerId
        console.log(this.$route.query.customerId);
        this.getRecord()
        // this.id = 130
      },
      methods:{
        getRecord(){
          const params = {
            customerId:this.id
          }
          this.$post('/com/clean/info',params,(res)=>{
            this.tableData = res
            
          })
        },
        report(url){
          const params = {
            file:url
          }
          this.$post('/org/ossurl',params,(res)=>{
            window.open(res, '_blank')
          })
        }
      }
    }
  </script>

<style>

</style>