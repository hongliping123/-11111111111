<template>
  <div class="banner">
    <h1>{{title}}</h1>
    <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  props:{
    title:String,
    content:String
  }
}
</script>

<style lang="scss" scoped>
.banner{
  height: 360px;
  width: 100%;
  @include bg('hb-zc0-min.png');
  @include flex(column);
  color: #fff;
  h1{
    font-size: 30px;
  }
  p{
    font-size: 16px;
    margin-top: 30px;
  }
}
</style>