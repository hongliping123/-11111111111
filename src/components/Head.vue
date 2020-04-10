<template>
  <div class="head">
    <div class="w90">
      <div class="head-left">
        <img src="/static/img/hb-zc-logo-min.png" alt="">
        <p>油烟智能化管理平台</p>
      </div>
      <a class="head-right" href="/login">返回首页</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.head{
  height: 60px;
  width: 100%;
  background-color: #408fff;
	// opacity: 0.8;
  .w90{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .head-left{
      display: flex;
      align-items: center;
      img{
        width: 120px;
        // height: 28px;
      }
      p{
        margin-left: 20px;
      }
    }
    .head-right{
      font-size: 14px;
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>