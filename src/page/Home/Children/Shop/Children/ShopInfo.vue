<template>
  <div>
      <div class="content" style="display:flex;align-items:center;justify-content:space-between;width:1400px;flex-wrap:wrap">
        <div class="content-div">
          <p style="font-size:16px">商家信息</p>
          <el-card style="width:640px;height:240px;margin-top:10px">
            <div class="card-content" v-if="info.customer">
              <img class="card-img" :src="info.customer.doorway ? info.customer.doorway : 'https://production.ltby65.com/image/mrmtt.png'" alt="">
              <div>
                <p>商家名称：{{info.customer.customername}}</p>
                <p>商家地址：{{info.customer.address}}</p>
                <p>注册时间：{{info.customer.createTime}}</p>
                <p>联系人：{{info.customer.contactsname}}</p>
                <p>手机号：{{info.customer.contactsphone}}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.id = this.$route.query.customerId
    this.getInfo()
  },
  data(){
    return{
      id:0,
      info:{}
    }
  },
  methods:{
    getInfo(){
      const params = {
        customerId:this.id
      }
      this.$post('/com/base/info',params,(res)=>{
        this.info = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  // height: 740px;
}
.content-div{
  margin-top: 40px;
  margin-bottom:40px;
  .card-content{
    display: flex;
    align-items: center;
    .card-img{
      width: 180px;
      height: 180px;
    }
    div{
      height: 160px;
      @include flex(column,space-between,null);
      margin-left:30px;
    }
  }
}


</style>