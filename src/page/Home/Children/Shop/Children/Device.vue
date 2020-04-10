<template>
  <div>
      <div class="content" style="display:flex;align-items:center;justify-content:space-between;width:1400px;flex-wrap:wrap">
        <div class="content-div" v-for="(item,index) in info.equipments" :key="index">
          <p style="font-size:16px">设备信息</p>
          <el-card style="width:640px;height:240px;margin-top:10px" >
            <div class="card-content">
              <!-- <img class="card-img" :src="item.equipmentImgurl" alt=""> -->
              <img class="card-img" src="/static/img/sb.png" alt="">
              <div>
                <p>设备编码：{{item.equipmentCoding}}</p>
                <p>设备型号：{{item.equipmentModel}}</p>
                <p>出厂日期：{{item.equipmentManufacDate}}</p>
                <p>安装日期：{{item.equipmentInstallDate}}</p>
                <p>MAC地址：{{item.equipmentMac}}</p>
                <p>设备状态：<span style="color:#408fff">{{item.equipmentStatus == 0 ? '正常' : '异常'}}</span></p>
              </div>
            </div>
          </el-card>
          <el-card style="width:1200px;height:240px;margin-top:10px" v-if="!info.equipments">
            <div class="card-content">
              <div>
                <p>该商家暂未安装油烟传感器</p>
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
  margin-bottom: 40px;
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