<template>
  <div class="footer">
    <p>Copyright2012-2019 Sky&Clouds.All Rights Reserved.</p>
    <a href="javasript:">技术支持与意见反馈</a>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.footer{
  @include flex(column);
  margin-top: 60px;
  p{
    font-size: 14px;
  }
  a{
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>