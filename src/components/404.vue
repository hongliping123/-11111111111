<template>
  <div class="lost">
    <div class="btn">
      <el-button type="primary" plain round @click="index">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    index(){
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="scss" scoped>
.lost{  
  @include bg('404.png');
  height: 100%;
  background-size: 1920px 1080px;
  margin: 0 auto
}
.btn{
    position: absolute;
    left: 900px;
    top: 0;
    margin-top: 580px;
}
</style>