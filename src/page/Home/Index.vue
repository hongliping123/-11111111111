<template>
  <div>
    <el-container>
      <el-aside :style="!isCollapse ? 'width:240px' : 'width:64px'">
          
          <el-menu router :default-active="$route.matched[1].name" class="el-menu-vertical-demo" :collapse="isCollapse" :style="!isCollapse ? 'width:240px' : ''">
            <el-menu-item style="padding:0">
              <div class="menu-header" :style="!isCollapse ? 'width:240px' : ''">
                <img src="/static/img/hb-zc-logo-min.png" alt="" v-if="!isCollapse">
                <i class="el-icon-s-fold" v-if="!isCollapse" @click="$store.state.isCollapse = !$store.state.isCollapse"></i>
                <i class="el-icon-s-unfold" v-if="isCollapse" @click="$store.state.isCollapse = !$store.state.isCollapse"></i>
              </div>
            </el-menu-item>
            
            <el-menu-item index="home" :route="{path:'/index/home'}">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="shop" :route="{path:'/index/shop'}">
              <i class="el-icon-s-shop"></i>
              <span slot="title">商家</span>
            </el-menu-item>
            <el-menu-item index="my" :route="{path:'/index/my'}">
              <i class="el-icon-s-custom"></i>
              <span slot="title">我的</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px;display:flex;justify-content:space-between;font-size:18px">
          <div class="header-left">
            油烟智能化管理平台
          </div>
          <div class="header-right">
            <p>2019-11-29   16:20:34</p>
            <p>你好，{{userInfo.userName}}</p>
            <p @click="exitLogin"><i class="el-icon-monitor" style="margin-right: 10px;font-size:18px"></i>安全退出</p>
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>  
      </el-container>

       
      <!-- <el-container> -->
        
      <!-- </el-container> -->
      
    </el-container>

    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // isCollapse: false,
    };
  },
  computed:{
    ...mapState(['isCollapse']),
    userInfo(){
      return this.$store.state.userInfo //用data接收 
    }
    
  },
  methods: {
    exitLogin(){
      this.$alert('您是否确认退出？', '退出登录', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(action);
          if(action === 'confirm'){
            let {token,userId} = this.userInfo      
            const params = {
              token:token,
              userId:userId
            }
            this.$post('/org/user/logout',params,(res)=>{
                this.$cookies.remove('userInfo')
                this.$cookies.remove('userData')
                this.$store.commit('userInfo','')
                this.$store.commit('userData','')
                this.$router.push('/login')
            })
          }
          
        }
      });
      
      
    },
  },
  mounted(){
    console.log(this.$route.matched[1].name);
    
  }
}
</script>

<style lang="scss" scoped>
.el-menu-item{
  height: 60px;
  line-height: 60px;
}
.menu-header{
  width: 64px;
	height: 60px;
  background-color: #408fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  img{
    width: 120px;
	  height: 30px;
  }
  i{
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
}
.header-right{
  display: flex;
  align-items: center;
  p{
    padding: 0 20px;
    border-right:1px solid #fff;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
  }
  p:last-child{
    border:none;
    cursor: pointer;
  }
}
el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header {
    background-color: #5199ff;
    color: #fff;
    line-height: 60px;
  }
</style>