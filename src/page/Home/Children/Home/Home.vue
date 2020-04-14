<template>
  <div>
    <el-card v-if="!isHideMenu">
      <div class="box-card">
        <p v-if="this.dateInfo.city">今日天气：{{dateInfo.city}}，{{dateInfo.data[0].wea}}，气温{{dateInfo.data[0].tem2}}~{{dateInfo.data[0].tem1}}，{{dateInfo.data[0].win[0]}}{{dateInfo.data[0].win_speed}}，当前温度{{dateInfo.data[0].tem}}</p>
        <p>{{userData.orgName}}，今天是{{year}}年{{month}}月{{day}}日　{{weekday}}</p>
      </div>
    </el-card>
    <!-- <el-card style="margin-top:20px" v-if="!isHideMenu">
      <el-collapse accordion v-model="coll">
          <el-collapse-item title="数据统计" name="coll">
            <div class="card-div">
              <div class="card-left">
                  <div class="home-menu">
                    <div class="my-home-menu">
                      <div>区域管辖商家</div>
                      <h1>{{shopNum}}</h1>
                      <p>家</p>
                    </div>
                    <div class="my-home-menu" style="background:#eafaea">
                      <div style="background:#33cc33">排放达标商家</div>
                      <h1 style="color:#006600">{{bootInfo1}}</h1>
                      <p>家</p>
                    </div>
                    <div class="my-home-menu" style="background:#ffefef">
                      <div style="background:#ff6666">排放超标商家</div>
                      <h1 style="color:#660000">{{bootInfo2}}</h1>
                      <p>家</p>
                    </div>
                  </div>
                  <p class="mini-title">排放油烟量/清洗垃圾量【单位：千克】</p>
                  <div class="card-menu">
                    <div v-for="(item,index) in cardList" :key="index">
                      <h1 :class="'card-menu-h1-' + index">{{~~item.number}}</h1>
                      <p>{{item.title}}</p>
                    </div>
                  </div>
              </div>
              <div class="card-righ" v-if="this.dateInfo.city">
                <e-charts :options="options"></e-charts>
                <p style="color: #ff9900;font-size: 20px;text-align: center;margin-top: -47px;">{{dateInfo.data[0].air_level}}</p>
                <span style="width: 200px;display: block;margin: 0 auto;">{{dateInfo.data[0].air_tips}}</span>
              </div>
            </div>
            
        </el-collapse-item>
        
      </el-collapse>          
    </el-card> -->
    <Map style="margin-top:20px" @gettotal="gettotal" @zoom="zoom" id="map" ref="map"/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import ECharts from "vue-echarts"
import Map from "@/components/Map"
import "echarts/lib/chart/gauge";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/polar";
import "echarts/lib/component/toolbox";
import { mapState } from 'vuex'

export default {
  data(){
    return{
      shopNum:0,
      year:'',
      month:'',
      day:'',
      weekday:'',
      coll:'coll',
      ip:'',
      dateInfo:{},
      cardList:[
        {
          number:0,
          title:'今日累计排放油烟'
        },
        {
          number:0,
          title:'本月累计排放油烟'
        },
        {
          number:0,
          title:'今年累计排放油烟'
        },
        {
          number:10.652,
          title:'今日累计清洗垃圾'
        },
        {
          number:10.652,
          title:'本月累计清洗垃圾'
        },
        {
          number:10.652,
          title:'今年累计清洗垃圾'
        },
      ],
      options:{
         
          series: [
              {
                  min: 0,
                  max: 300,
                  startAngle: 180, //开始角度 左侧角度
                  endAngle: 0, //结束角度 右侧
              // radius:50,
                  name: '业务指标',
                  type: 'gauge',
                  data: [
                    {value: 50}
                  ],
                  splitLine:{
                    show:false,
                    },
                    axisTick:{
                      show:false,
                      
                    },
                    axisLabel:{
                      inside:false,
                      // show:false,
                      rotate:45,
                      distance:-55
                  },
                  pointer:{
                    width:3,//指针的宽度
                    length:'70%'
                  },
                  axisLine: {
                      // show:true,
                      // 属性lineStyle控制线条样式
                      lineStyle: {
                          width: 25,
                          color:[
                            [0.2,'#9cca7f'],[0.4,'#f9da65'],[0.6, '#f29f39'],[0.8, '#db555e'],[1, '#ba3779  '],
                          ]
                      }
                  },
              }
          ]
      },
      options1:{
        series: [{
            name: '业务指标',
            type: 'gauge',
            // startAngle:180,
            // endAngle:0,
            // radius:50,
            axisLine: {
              // show:true,
              // 属性lineStyle控制线条样式
              lineStyle: {
                  width: 15,
                  color:[
                    [0.2,'#9cca7f'],[0.4,'#f9da65'],[0.6, '#f29f39'],[0.8, '#db555e'],[1, '#ba3779  '],
                  ]
              }
            },
            splitLine:{
                show:false,
            },
            axisTick:{
                show:false,
            },
            axisLabel:{
                show:false,
            },
            pointer:{
                length:'40px',
                width:'3px',
            },
            detail: {formatter:'{value}%'},
            data: [
                {value: [1,2,3,3]}
            ]
        }]
      },
      code:'',
      dbData:0,
      cbData:0,
      isHideMenu:false,
      bootInfo1:"", //随机数
      bootInfo2:""
    }
  },
  components:{
    Footer,
    ECharts,
    Map
  },
  computed:{
    ...mapState(['userData'])
  },
  mounted(){    
    const _this = this
    this.code = this.$store.state.userData.regioncode
    this.getDate()
    this.getFume()
    this.getGarba()
    this.getQuantity()
    document.addEventListener("fullscreenchange", function (e) {
      if (document.fullscreenElement) {
        console.log('进入全屏')
        
      } else {
        _this.isHideMenu = false
        _this.$refs.map.isHideMenu = false
        _this.$refs.map.istop = false
        _this.$store.state.isCollapse = false
        let c = document.getElementById('container')
        c.classList.remove("my-screen-h")
        console.log('退出全屏')
      }
    })
    
  },
  methods:{
    zoom(flag){
      let map = document.getElementById('map')
      let c = document.getElementById('container')
      this.isHideMenu = flag
      console.log(flag)
      if(this.isHideMenu){
        this.$refs.map.hideMenu() // 方法2:直接调用
        c.classList.add("my-screen-h")
        
        this.requestFullScreen(map)
      }else{
        // c.classList.remove("my-screen-h")
        this.exitFullscreen()
      }
    },
    requestFullScreen(de) {
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    },
    exitFullscreen() {
      let de = document
      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }
    },
    gettotal(total){
      // console.log(total);
      this.shopNum = total

        setInterval(() => {
          let sum = this.shopNum 
          let randomNum1 = 0
          randomNum1 = Math.ceil(Math.random() * ((sum % 100) - sum + 1) + sum);
          this.bootInfo1 = randomNum1
          this.bootInfo2 = this.shopNum - randomNum1
        }, 10000);
        // console.log(random)
        
    },
    getQuantity(){
      const params = {
        codes:this.code
      }
      this.$post('/org/let/quantity',params,(res)=>{
        this.dbData = res.dbData
        this.cbData = res.cbData
      })
    },
    getFume(){
      let _this = this
      const params = {
        adcode:this.code
      }
      _this.$post('/org/all/jurisdiction',params,(res)=>{
       let arrStr = []
        res.forEach(item=>{
          arrStr += item + ','
        })
        // arrStr = arrStr.slice(0,-1)
        // console.log(arrStr)
        const params1 = {
           codes:arrStr
        }
        _this.$post('/org/lampblack/statistical',params1,(res)=>{
        _this.cardList[0].number = (res.dayData * 1000) / 1000 / 1000
        _this.cardList[1].number = (res.monthData * 1000) / 1000 / 1000
        _this.cardList[2].number = (res.yearData * 1000) / 1000 / 1000
      })
      })
    },
    getGarba(){
      const params = {
        codes:this.code
      }
      this.$post('/org/garbage/statistical',params,(res)=>{
        this.cardList[3].number = res.dayData
        this.cardList[4].number = res.monthData
        this.cardList[5].number = res.yearData
      })
    },
    getDate(){
      const date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1 
      this.day = date.getDate()
      let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      this.weekday = weekday[date.getDay()]
      this.$get('https://www.tianqiapi.com/api/?version=v1&appid=45162918&appsecret=Bq9qylzp',{},(res)=>{
        this.dateInfo = res
        this.options.series[0].data[0].value = res.data[0].air
        // this.options.series[0].data[0].name = res.data[0].air_level
        console.log(this.options.series[0].data[0].value);
        
      },{
        baseUrl:true
      })
    }
  }
}
</script>

<style>
.my-screen-h{
  height: 100%!important;
}
</style>
<style lang="scss" scoped>

.echarts{
  width: 260px;
  height: 200px;
  margin:auto;
}
.card-div{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .card-left{
    width: 1200px;
  }
}
.card-menu{
  display: flex;
  justify-content: space-between;
  div{
    width: 180px;
    height: 100px;
    background-color: #f9f9f9;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
      font-size: 30px;
      color: #33cc33;
    }
    .card-menu-h1-1{
      color: #ff9900
    }
    .card-menu-h1-2{
      color: #ff3333
    }
    p{
      color: #666666;
      font-size: 14px;
    }
  }
}
.mini-title{
  color: #999999;
  font-size: 14px;
  margin:15px 0 ;
}
.box-card{
  display: flex;
  justify-content: space-between;
}
.home-menu{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .my-home-menu{
    width: 330px;
    height: 60px;
    background-color: #ecf4ff;
    border-radius: 30px;
    display: flex;
    align-items: center;
    div{
      width: 180px;
      height: 40px;
      background-color: #408fff;
      border-radius: 20px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
      margin-left: 12px;
    }
    h1{
      font-size: 28px;
      color: #003366;
      margin-left: 10px;
    }
    p{
      font-size: 14px;
      margin-left: 6px;
      margin-top: 10px;
    }
  }
}

</style>