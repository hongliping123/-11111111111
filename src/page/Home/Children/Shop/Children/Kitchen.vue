/*在.vue中引入*/
<template>
  <div class="box kitchen">
    <div class="content" v-if="overview.monthSoot" style="overflow-x:auto">
      <div class="content-div">
      <p>实况概览</p>
      <el-card style="width:1200px;margin-top:20px;">
        <div class="card-1">
          <div>
            <el-progress :color="monthSoot" :format="format10" :text-inside="true" :stroke-width="20" :percentage="(overview.monthSoot * 10)" style="width:200px;" stroke-linecap="square"></el-progress>
            <p>近一个月日均油烟浓度(mg/m³)</p>
          </div>
          <div>
            <h1 v-bind:class="configValue">{{overview.configValue}}个月</h1>
            <p>历史最大清洗间隔</p>
          </div>
          <div>
            <h1 style="color:#999999">{{overview.finshTime}}</h1>
            <p>最近清洗时间</p>
          </div>
          <div>
            <h1 style="color:#ff9900">{{overview.nextTime}}</h1>
            <p>下次清洗建议日期</p>
          </div>
        </div>
      </el-card>
      </div>
      <div class="content-div">
        <p>厨房实况（实时数据）</p>
        <el-card style="width:1200px;margin-top:20px">
          <div class="card-top">
            <div>
              <p>油烟净化器状态</p>
              <el-switch
                v-model="info.treaterStatus"
                active-value="1"
                disabled
                inactive-value="0"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </div>
            <div>
              <p>油烟浓度(mg/m³)</p>
              <el-progress color="#66cc00" :text-inside="true" :stroke-width="20" :format="format10" :percentage="info.sootConcentration * 10" style="width:200px" stroke-linecap="square"></el-progress>
            </div>
            <div>
              <p>油烟净化器工作电流  {{info.treaterCurrent}}ah</p>
            </div>
          </div>
          <div class="card-bottom">
            <div>
              <p>管道温度(℃)</p>
              <div class="prog">
                <span>0</span>
                <el-progress :color="pipeTemperature" :text-inside="true" :stroke-width="20" :format="format" :percentage="info.pipeTemperature" style="width:200px" stroke-linecap="square"></el-progress>
                <span class="l">100</span>
              </div>
            </div>
            <div>
              <p>管道湿度(%)</p>
              <div class="prog">
                <span>0</span>
                  <el-progress :color="pipeHumidity" :text-inside="true" :stroke-width="20" :format="format" :percentage="info.pipeHumidity" style="width:200px" stroke-linecap="square"></el-progress>
                <span class="l">100</span>
              </div>
              
            </div>
            <div>
              <p>管道风速(米/秒)</p>
              <div class="prog">
                <span>0</span>
                  <el-progress color="#2FCFCD" :text-inside="true" :stroke-width="20" :format="format2" :percentage="info.pipeWindspeed * 5" style="width:200px" stroke-linecap="square"></el-progress>
                <span class="l">20</span>
              </div>
            </div>
            <div>
              <p>环境温度(℃)</p>
              <div class="prog">
                <span>0</span>
                  <el-progress color="#8ACEFF" :text-inside="true" :stroke-width="20" :format="format" :percentage="info.envTemperature" style="width:200px" stroke-linecap="square"></el-progress>
                <span class="l">100</span>
              </div>
            </div>
            <div>
              <p>环境湿度(%)</p>
              <div class="prog">
                <span>0</span>
                  <el-progress color="#D5965D" :text-inside="true" :stroke-width="20" :format="format" :percentage="info.envHumidity" style="width:200px" stroke-linecap="square"></el-progress>   
                <span class="l">100</span>
              </div>
            </div>
            <div>
              <p>管道内外压力差(Pa)</p>
              <div class="prog">
                <span>0</span>
                  <el-progress color="#D696FF" :text-inside="true" :stroke-width="20" :format="format3" :percentage="info.pipeInoutPa*0.5" style="width:200px" stroke-linecap="square"></el-progress>
                <span class="l">200</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="content-div">
        <p>一天的油烟浓度走势</p>
        <el-card style="width:1200px;margin-top:20px">
          <e-charts :options="polar1"></e-charts>
        </el-card>
      </div>

      <div class="content-div">
        <p>近一个月油烟浓度走势</p>
        <el-card style="width:1200px;margin-top:20px">
          <e-charts :options="polar"></e-charts>
        </el-card>
      </div>

    </div>
    
  </div>
</template>

<script>
//如果你不在乎打包大小，直接引入全部代码可以快速无忧展开
import ECharts from "vue-echarts"

//如果你不在乎打包大小，以下是优化引入打包的代码
//（上面的全部代码引入import应注释掉）
// import ECharts from "vue-echarts/components/ECharts.vue";

import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/polar";

export default {
  mounted(){
    var myDate = new Date();
    // for(let i = 30; i > 0; i --){
    //   var lw = new Date(myDate - 1000 * 60 * 60 * 24 * i);//最后一个数字30可改，30天的意思
    //   var lastM = lw.getMonth()+1;
    //   var lastD = lw.getDate()+1;
    //   var startdate=(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD);//三十天之前日期
    //   this.dateList.push(startdate)
    //   this.polar.xAxis.data = this.dateList
    // }
    this.id = this.$route.query.customerId
    this.getInfo()   
    this.getOverView()   
    this.getTrend()
    this.getTrend1()
  },
  components: {
    ECharts: ECharts
  },
  data() {
    return {
      format(percentage) {
        return percentage;
      },
      format2(percentage) {
        return percentage/5;
      },
      format3(percentage) {
        return percentage*2;
      },
      format10(percentage) {
        return (percentage /10).toFixed(2);
      },
      overview:{},
      info:{},
      dateList:[],
      switchStatus:false,
      // 折现图月
      polar: {
        legend: {
          data:['油烟浓度'],
          bottom: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '近一月油烟浓度走势',
          subtext: '数据来源：ltby65.com',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap : false,
          splitLine:{
               show:true    //去掉网格线
            }
        },
        yAxis: {
            type: 'value',
            name: '油烟浓度',
            // min: '',
            // max: '',
            axisLabel: {
                formatter: '{value} mg/m³'
            },           
        },
        series: [{
            name: '油烟浓度',
            data: [],
            type: 'line',
            symbolSize:10
        }]
      },
      // 折线图天
      polar1: {
        legend: {
          data:['油烟浓度'],
          bottom: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '一天的油烟浓度走势',
          subtext: '数据来源：ltby65.com',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap : false,
          splitLine:{
               show:true    //去掉网格线
            }
        },
        yAxis: {
            type: 'value',
            name: '油烟浓度',
            // min: '',
            // max: '',
            axisLabel: {
                formatter: '{value} mg/m³'
            },           
        },
        series: [{
            name: '油烟浓度',
            data: [],
            type: 'line',
            symbolSize:10
        }],
      },
      trend:[]
    };
  },
  methods:{
    getInfo(){
      const params = {
        customerId:this.id
      }
      this.$post('/com/kitchen/info',params,(res)=>{
        if(res){
          this.info = res;
          let  pipeTemperature = res.pipeTemperature<31?'#66CC00':res.pipeTemperature>30&&res.pipeTemperature<71?'#FF9300':'#FF5860';  //管道温度
          this.pipeTemperature = pipeTemperature;pipeHumidity
          let  pipeHumidity = res.pipeHumidity<11?'#66CC00':res.pipeHumidity>10&&res.pipeHumidity<21?'#FF9300':'#FF5860';  //管道温度
          this.pipeHumidity = pipeHumidity;
        }
        
      })
    },
    getOverView(){
      const params = {
        customerId:this.id
      }
      this.$post('/com/kitchen/overview',params,(res)=>{
        this.overview = res;
        let a = 6;
        let  configValue = res.configValue<5?'green':res.configValue>4&&res.configValue<7?'orange':'red';  //历史最大清洗间隔
        this.configValue = configValue;
        let  monthSoot = res.monthSoot<2?'#66CC00':res.monthSoot>1.99&&res.monthSoot<3?'#FF9300':'#FF5860';  //近一个月油烟浓度
        this.monthSoot = monthSoot;
      })
    },
    getTrend(){
      const params = {
        customerId:this.id
      }
      this.$post('/com/kitchen/trend',params,(res)=>{
        console.log(res);
        this.trend = res
        let sootArr = []
        let timeArr = []
        if(res){
          res.forEach(item=>{
            sootArr.push(item.soot)
            timeArr.push(item.time)
          })
          let sortArr = sootArr
          sortArr.sort((a,b)=>{
            return a-b;
          })
          let min = sortArr[0]
          let max = sortArr[sortArr.length - 1]
          console.log(min);
          // this.polar.yAxis.min = 0
          // this.polar.yAxis.max = 3.0
          this.polar.xAxis.data = timeArr
          this.polar.series[0].data = sootArr
        }
        
      })
    },

    getTrend1(){
      const params = {
        customerId:this.id
      }
      this.$post('/com/day/trend',params,(res)=>{
        console.log(res);
        this.trend = res
        let sootArr = []
        let timeArr = []
        if(res){
          res.forEach(item=>{
            sootArr.push(item.soot)
            timeArr.push(item.time)
          })
          let sortArr = sootArr
          sortArr.sort((a,b)=>{
            return a-b;
          })
          let min = sortArr[0]
          let max = sortArr[sortArr.length - 1]
          console.log(min);
          // this.polar.yAxis.min = 0
          // this.polar.yAxis.max = 3.0
          this.polar1.xAxis.data = timeArr
          this.polar1.series[0].data = sootArr
        }
        
      })
    },
  }
};
</script>
<style lang="scss">
.kitchen{
  .el-progress-bar__innerText{
    color: #333;
  }
}
</style>
<style lang="scss" scoped>
.card-bottom{
  @include flex(null,space-around,null,wrap);
  padding-bottom: 10px;
  div{
    width: 300px;
    p{
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }
  .prog{
    display: flex;
    align-items: center;
    span{
      padding-right:10px
    }
    .l{
      padding-left: 10px;
    }
  }
}
.card-top{
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  border-bottom: 1px solid #eeeeee;
  width: 1100px;
  margin:0 auto;
  div{
    @include flex();
    p{
      padding-right: 20px;
    }
  }
}
.card-1{
  display: flex;
  justify-content: space-around;
  div{
    @include flex(column);
    h1{
      font-size: 20px;
    }
    p{
      margin-top: 15px;
      font-size: 14px;
      color: #000
    }
  }
}
.echarts{
  width: 1100px;
  height: 400px;
}
.content-div{
  margin-top: 40px;
  .card-content{
    display: flex;
    align-items: center;
  }
}
.green{
  color: #66CC00;
}
.orange{
  color: #FF9300;
}
.red{
  color: #FF5860;
}
</style>