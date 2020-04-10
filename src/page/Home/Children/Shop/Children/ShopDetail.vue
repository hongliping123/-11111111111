<template>
<div>
  <el-card>
    <el-page-header @back="goBack" content="商家详情" title="返回商家列表">
    </el-page-header>
    <el-menu router :default-active="$route.matched[2].name" class="el-menu-demo" mode="horizontal" @select="changeMenuSelect">
      <el-menu-item index="kitchen" :route="{path:'/index/shopdetail/kitchen?customerId='+this.id}">厨房实况</el-menu-item>
      <el-menu-item index="shopinfo" :route="{path:'/index/shopdetail/shopinfo?customerId='+this.id}">商家信息</el-menu-item>    
      <el-menu-item index="device" :route="{path:'/index/shopdetail/device?customerId='+this.id}">设备信息</el-menu-item>    
      <el-menu-item index="record" :route="{path:'/index/shopdetail/record?customerId='+this.id}">清洗记录</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <router-view style="display: flex;justify-content: center;align-items: center;"/>
  </el-card>
  <Footer />
</div>

</template>

<script>
import Footer from "@/components/Footer";
export default {
  data(){
    return{
      id:0,
      active:this.$route.fullPath
    }
  },
  mounted(){
    this.id = this.$route.query.customerId
    this.active = this.$route.fullPath
    console.log(this.$route.fullPath);
    
    // console.log(this.$route);
  },
  components:{
    Footer
  },
  methods:{
    goBack(){
      this.$router.push({path:'/index/shop'})
    },
    changeMenuSelect(e){
      console.log(e);
      
      this.active = e
    }
  }
}
</script>

<style lang="scss" scoped>

</style>