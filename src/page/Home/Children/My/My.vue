<template>
  <div>
    <el-card style="height:600px">
      <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/index/my/myinfo">我的信息</el-menu-item>
        <el-menu-item index="/index/my/membermanage" v-if="userData.personnelType !== 'ORDINARY'">成员管理</el-menu-item>
        <el-menu-item index="/index/my/changepassword">修改密码</el-menu-item>
        <el-menu-item index="/index/my/changemobile">修改手机号</el-menu-item>
      </el-menu>
      <div class="line"></div>
      <router-view style="height: 520px;display: flex;justify-content: center;align-items: center;"/>
    </el-card>
    <Footer />
  </div>
 
</template>

<script>
import Footer from "@/components/Footer";
import { mapState } from 'vuex'
export default {
  data(){
    return{
      // menuActive:'/index/my/myinfo'
    }
  },
  components:{
    Footer
  },
  computed:{
    ...mapState(['userData'])
  },
  mounted(){
    console.log(this.$route);
    
  }
}
</script>

<style lang="scss" scoped>

</style>