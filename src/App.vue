<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    if(!this.$cookies.get('userInfo')){
      // this.$router.push('/login')
    }else{
      this.$store.commit('userInfo',this.$cookies.get('userInfo'))
      this.$store.commit('userData',this.$cookies.get('userData'))
    }
  }
}
</script>

<style>
html,body,#app{
width:100%;
height: 100%;
margin:0;
padding:0;
overflow-x: hidden;  

}
::-webkit-scrollbar {display:none}

</style>
