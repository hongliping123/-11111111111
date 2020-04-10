<template>
  <div class="hello">
    <div style="height:1073px" id="container" tabindex="0">
      <img src="/static/img/map-logo.png" alt="" class="logo">
      <img src="/static/img/WechatIMG3.png" v-if="!isHideMenu" alt="" class="zoom" @click="zoom">
      <img src="/static/img/WechatIMG4.png" v-if="isHideMenu" alt="" class="zoom" @click="zoom">
      <div class="map-container">
        <div class="map-top" v-if="istop">
            <div class="map-top-container">
                <div>
                  <span class="text">排放达标商家</span>
                  <span class="textn"><!--{{dbData}}-->{{bootInfo3}}</span>
                </div>
                <div>
                  <span class="text">排放超标商家</span>
                  <span class="textn" style="color:rgba(153,0,0,1);"><!--{{cbData}}-->{{bootInfo4}}</span>
                </div>
                <div>
                  <span class="text">今日累计排放油烟</span>
                  <span class="textn">{{~~dayData}}</span>
                </div>
                <div>
                  <span class="text">今年累计排放油烟</span>
                  <span class="textn">{{~~yearData}}</span>
                </div>
                <div>
                  <span class="text">PM2.5</span>
                  <span class="textn">139</span>
                </div>
                <div class="map-topFire">
                  <span class="text" style="font-size:16px;font-weight:bold;color:rgba(0,0,0,1);">火灾预警</span>
                  <span class="textn" :style="FiredData.length >= 1 ? 'color:red;':''">{{FiredData.length}}</span>
                  <img src="/static/img/huojin.gif" v-if="FiredData.length >= 1" alt="">
                  <img src="/static/img/WechatIMG10.png" v-if="FiredData.length == 0" alt="">
                </div>
            </div>
            
        </div>
        <div class="map-left">
          <div class="map-left-container">
            <transition
                 name="slideLeft"
            >
              <img style="animation-duration: 0.3s" src="/static/img/hb-27k.png" alt="" class="left-img" v-if="isShowLeftImg1" @click="isShowLeftImg1 = false">
              <div style="animation-duration: 0.3s" class="left" v-if="!isShowLeftImg1">
                <div class="left-left">
                  <p>风机开机量</p>
                  <p><span class="left-span"><!--{{bootInfo.fenNum}}-->{{bootInfo1}}</span> / <span class="right-span">{{bootInfo.cut}}</span></p>
                </div>
                <div class="left-right" @click="isShowLeftImg1 = true">
                  <i class="el-icon-caret-left" style="color:#999999"></i>
                </div>
              </div>   
            </transition>  
          </div>
          <div class="map-left-container">
            <transition
                 name="slideLeft"
            >
            <img style="animation-duration: 0.3s" src="/static/img/hb-27k.png" alt="" class="left-img" v-if="isShowLeftImg2" @click="isShowLeftImg2 = false">  
              <div style="animation-duration: 0.3s" class="left" v-if="!isShowLeftImg2">
                <div class="left-left">
                  <p>油烟净化器开机量</p>
                  <p><span class="left-span"><!--{{bootInfo.treaterNum}}-->{{bootInfo2}}</span> / <span class="right-span">{{bootInfo.cut}}</span></p>
                </div>
                <div class="left-right" @click="isShowLeftImg2 = true">
                  <i class="el-icon-caret-left" style="color:#999999"></i>
                </div>
              </div>  
            </transition>
             
          </div>
          <div class="map-left-container">
            <transition
                 name="slideLeft"
            >
              <img style="animation-duration: 0.3s" src="/static/img/hb-27k.png" alt="" class="left-img" v-if="isShowLeftImg3" @click="isShowLeftImg3 = false">
              <div style="animation-duration: 0.3s" class="left" v-if="!isShowLeftImg3">
                <div class="left-left">
                  <p>定期清洗达标比例</p>
                  <p><span class="left-span">{{bootInfo.reachNum}}</span> / <span class="right-span">{{bootInfo.cut}}</span></p>
                </div>
                <div class="left-right" @click="isShowLeftImg3 = true">
                  <i class="el-icon-caret-left" style="color:#999999"></i>
                </div>
              </div>  
            </transition> 
          </div>
          <div class="map-left-container">
            <transition
                 name="slideLeft"
            >
              <img style="animation-duration: 0.3s" src="/static/img/hb-27k.png" alt="" class="left-img" v-if="isShowLeftImg4" @click="isShowLeftImg4 = false">
              <div style="animation-duration: 0.3s" class="left" v-if="!isShowLeftImg4">
                <div class="left-left">
                  <p>长期未开净化器比例</p>
                  <p><span class="left-span">{{bootInfo.threeNum}}</span> / <span class="right-span">{{bootInfo.cut}}</span></p>
                </div>
                <div class="left-right" @click="isShowLeftImg4 = true">
                  <i class="el-icon-caret-left" style="color:#999999"></i>
                </div>
              </div>  
            </transition> 
          </div>
        </div>
        <div style="background:none;width: 504px;height: 800px;position: absolute;right: 20px;z-index: 10; margin-top: 7%;">
            <transition-group name="slideRight"
>
          
            <img key="2"   src="/static/img/hb-28k.png" alt="" class="map-right-left" style="right:-20px;left:auto;animation-duration: 0.3s" v-if="isShowRightImg" @click="isShowRightImg = false">
            <div key="3" style="animation-duration: 0.3s" class="map-right" v-if="!isShowRightImg">
              <div class="right-top-list">
                <div data-urrer="1" @click="switchlist" :style="urrer == 1 ? 'border-bottom: 4px solid #76A3F7;color:#000000;':''">搜索商家</div>
                <div data-urrer="2" @click="switchlist" :style="urrer == 2 ? 'border-bottom: 4px solid #76A3F7;color:#000000;':''">空气质量</div>
                <div data-urrer="3" @click="switchlist" :style="urrer == 3 ? 'border-bottom: 4px solid #76A3F7;color:#000000;':''">火灾预警</div>
              </div>
              <img  style="animation-duration: 0.3s" key="1" src="/static/img/ytj.png" alt="" class="map-right-left" v-if="!isShowRightImg" @click="isShowRightImg = true">
              <div v-if="urrer==='1'">
                <div class="right-top">
                  <el-input placeholder="搜索商家名称" style="width: 440px;" v-model="companyName">
                    <template slot="append">
                          <el-button type="primary" @click="search">
                            <i class="el-icon-search"></i>
                          </el-button>
                    </template>
                  </el-input>
                </div>

                <div class="right-menu">
                  <div style="display:flex;align-items:center">
                    <p v-if="areaInfo.name" @click="backArea">{{value1}}</p>
                    <el-select placeholder="请选择" v-model="city" style="width:100px;margin-left:10px" v-if="!areaInfo.parentId" @change="selectChange1">
                      <el-option
                        v-for="item in citys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <el-select placeholder="请选择" v-model="county" style="width:100px;margin-left:10px" v-if="isHasChildArea" @change="selectChange2">
                      <el-option
                        v-for="item in countys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  
                  <el-select v-model="value2" placeholder="请选择" @change="selectChange" style="width:150px">
                    <el-option
                      v-for="(item,index) in options2"
                      :key="index"
                      :label="item.label"
                      :value="item.value"          
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="right-list">
                  <!-- <div class="list-container" v-for="(item,index) in menuData" :key="index" @click="goShopDetail(item.uuid)"> -->
                  <div class="list-container" v-for="(item,index) in menuData" :key="index" @click="selectShop(item)">
                    <img src="/static/img/WechatIMG7.png" alt="">
                    <div class="right-mid">
                      <h1>{{item.companyName}}</h1>
                      <p>联系人：{{item.legalPerson}}</p>
                      <p>地址：{{item.address}}</p>
                    </div>
                    <div class="right-right">
                      <p>{{item.pipeTemperature}}mg/m³</p>
                      <i class="el-icon-location-outline" style="color:#408fff" @click.stop="selectShop(item)"></i>
                    </div>
                  </div>
                </div>


              </div>
              <div v-if="urrer==='2'">
                <div class="air">
                    <div class="air-data">
                      <span style="font-size:20px;font-weight:bold;color:rgba(118,163,247,1);">长沙市 芙蓉区</span>
                      <span style="font-size:18px;font-weight:400;color:rgba(0,0,0,1);">今日空气质量指数（AQI）</span>
                      <div class="air-data-value">129</div>
                      <span style="font-size:30px;font-weight:bold;color:rgba(51,51,51,1);">轻度污染</span>
                    </div>
                    <div class="img">
                      <img src="/static/img/jindutiao.png" alt="">
                    </div>
                    <div class="air-list">
                        <div class="air-list-item">
                            <span>PM2.5</span>
                            <span>129 μg/m³</span>
                        </div>
                        <div class="air-list-item">
                            <span>PM10</span>
                            <span>129 μg/m³</span>
                        </div>
                        <div class="air-list-item">
                            <span>一氧化碳（CO）</span>
                            <span>129 μg/m³</span>
                        </div>
                        <div class="air-list-item">
                            <span>二氧化氮（SO2）</span>
                            <span>129 μg/m³</span>
                        </div>
                        <div class="air-list-item">
                            <span>二氧化硫（NO2）</span>
                            <span>129 μg/m³</span>
                        </div>
                        <div class="air-list-item">
                            <span>臭氧（O3）</span>
                            <span>129 μg/m³</span>
                        </div>
                    </div>
                </div>
              </div>
              <div v-if="urrer ==='3'">
                
                <div class="right-list1" v-if="FiredData.length >= 1">
                  <!-- <div class="list-container" v-for="(item,index) in menuData" :key="index" @click="goShopDetail(item.uuid)"> -->
                  <div class="list-container" v-for="(item,index) in FiredData" :key="index" @click="SeeFire(item)" >
                    <img src="/static/img/WechatIMG7.png" alt="">
                    <div class="right-mid">
                      <h1>{{item.companyName}}</h1>
                      <p>联系人：{{item.legalPerson}}</p>
                      <p>地址：{{item.address}}</p>
                    </div>
                    <div class="right-right">
                      <p>{{item.pipeTemperature}}°C</p>
                      <i class="el-icon-location-outline" style="color:#408FFF" @click.stop="SeeFire(item)"></i>
                    </div>
                  </div>
                </div>

                <!-- 什么都没有 -->
                <div class="nothing" v-if="FiredData.length == 0">
                  <img src="/static/img/WechatIMG9.png" alt="">
                  <span>暂无油烟管道温度过高的商家</span>
                </div>

                
              </div>
              <div class="right-bottom" v-if="urrer==='1'">
                <p @click="checkMore">查看更多</p>
              </div>

            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import $ from 'jquery'
import 'animate.css';
import { regionData } from 'element-china-area-data'
export default {
  name: 'maps',
  data () {
    return {
      // regionData,
      options2:[
        {
          value: '油烟浓度高到低',
          label: '油烟浓度高到低'
        },
        {
          value: '油烟浓度低到高',
          label: '油烟浓度低到高'
        },
      ],
      code:"",
      dbData:"",
      cbData:"",
      dayData:"",
      yearData:"",
      value1:'',
      value2:'油烟浓度高到低',
      msg: 'hello',
      map:'',
      currentAreaNode:null, //当前选中地区的实例
      districtExplorer:null, //行政区划实例
      // 地图颜色
      colors:[
        "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
        "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
        "#651067", "#329262", "#5574a6", "#3b3eac"
      ],
      $tipMarkerContent:'',
      tipMarker:null,
      DistrictCluster:null,
      distCluster:null,
      bootInfo:{},
      page:1,
      limit:10,
      menuData:[],
      total:0,
      companyName:'',
      selectInfo:{},   //当前选中的商家
      allArea:'',
      pointSimplifierIns:null,
      areaInfo:{},
      citys:[],
      city:'',
      county:'',
      countys:[],
      childAreaInfo:{},
      isHasChildArea:false,
      isHideMenu:false,
      isShowLeftImg1:false,
      isShowLeftImg2:false,
      isShowLeftImg3:false,
      isShowLeftImg4:false,
      isShowRightImg:false,
      bootInfo1:"", //随机时间数
      bootInfo2:"",
      bootInfo3:"",
      bootInfo4:"",
      istop:false,
      urrer:"1",
      FiredData:{}
    }
  },
  async mounted () {
    await this.getAllArea()
    this.code = this.$store.state.userData.regioncode
    this.istop = this.$store.state.istop
    this.getQuantity()
    this.getFume()
    this.Fire()
    // setTimeout(() => {
    //   this.map.setZoom(8)
    // }, 2200);
    // this.startAnim()
  },
  methods: {
    hideMenu(){
      this.isShowLeftImg1 = true
      this.isShowLeftImg2 = true
      this.isShowLeftImg3 = true
      this.isShowLeftImg4 = true
      this.isShowRightImg = true
    },
    // tab 切换
    switchlist(e){
      // console.log(e.target.dataset.urrer)
      this.urrer = e.target.dataset.urrer
    },
     getQuantity(){
      const params = {
        codes:this.code
      }
      console.log(this.code)
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
        const params1 = {
           codes:arrStr
        }
        _this.$post('/org/lampblack/statistical',params1,(res)=>{
          _this.dayData = res.dayData * 1000 / 1000 /1000
          _this.yearData = res.yearData * 1000 / 1000 /1000
        })
      })
    },
    zoom(){
      this.isHideMenu = !this.isHideMenu
      this.$store.state.isCollapse = this.isHideMenu
      this.istop = this.isHideMenu
      this.$emit('zoom', this.isHideMenu,this.istop);
    },
    backArea(){
      if(!this.isHasChildArea){
        
      }else{
        this.menuData = []
        this.countys = []
        this.county = ''
        this.citys = []
        this.city = ''
        this.switch2AreaNode(this.areaInfo.code)
        this.getBootInfo()
        this.getMenuData()
        this.getArea()
        this.getAreaInfo(this.areaInfo.code)
        this.pointSimplifierIns.setData(null);
        setTimeout(() => {
          this.map.setZoom(8)
        }, 100);
      }
      
      
    },
    selectChange2(){
      this.menuData = []
      this.switch2AreaNode(this.county)
      this.getPoint(this.county)
      this.getMenuData(this.county)
      this.getBootInfo(this.county)
      this.getAreaInfo(this.county)
      this.pointSimplifierIns.setData(null);
    },
    getAreaInfo(adcode){
      this.$get('/org/district/'+adcode,{},(res)=>{
        this.childAreaInfo = res
      })
    },
    selectChange1(){
      let arr = []
      this.countys = []
      this.county = ''
      let arrStr = ''  
      // this.getArea(this.city)

      this.citys.forEach((item,index)=>{
        if(item.value === this.city){
            arr = item.children    
          }   
      })  
      this.countys = arr
        if(this.citys[0].label === '市辖区'){
          console.log('直辖区');
          return
        }  
      this.switch2AreaNode(this.city)     
      const params = {
        adcode:this.city
      }
      // console.log(this.city)
      this.$post('/org/all/jurisdiction',params,(res)=>{
        let arrStr = ''
        res.forEach(item=>{
          arrStr = arrStr + item + ','
        })
        arrStr = arrStr.slice(0,-1)
        this.menuData = []
        this.getMenuData(arrStr)
        this.getBootInfo(arrStr)
        this.getAreaInfo(this.city)
      })                
      this.pointSimplifierIns.setData(null);
    },
    // 点击信息窗体×跳转到商家详情页面
    goShopDetail(uuid){    
      const params = {
        uuid:'00aeeee2502f426b828d82f96fe530bd',
        // uuid
      }
      this.$post('/org/uuid/customerid',params,(res)=>{
        this.$router.push('/index/shopdetail/?customerId=' + res)
      })
    },
    async getAllArea(){
      const _this = this
        await this.getSelectAllArea(this.$store.state.userData.regioncode,(res)=>{
          AMapUI.load(['ui/geo/DistrictCluster', 'ui/misc/PointSimplifier' ,'lib/$'], function (DistrictCluster, PointSimplifier,$) {
            _this.DistrictCluster = DistrictCluster;
            //启动页面
            _this.initPage2(DistrictCluster,PointSimplifier, $);
          });
        })
        this.map = new AMap.Map('container', {
          zooms:[3,20],
          zoom:8,
          expandZoomRange:true,
        })
        
        AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
          setTimeout(() => {
            _this.initPage(DistrictExplorer);
          }, 2000);
        })
        
          console.log(this.allArea);
          
    },
    async selectShop(info){
      // console.log(info);
      const _this = this
      if(_this.selectInfo.adcode != info.adcode){
        await _this.switch2AreaNode(info.adcode)
      }
      
      this.selectInfo = info
      AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
       
        var infoWindow = new SimpleInfoWindow({
            infoTitle: `<strong>${_this.selectInfo.companyName}</strong>`,
            infoBody: `<p class="my-desc"><strong>${_this.selectInfo.address}</p>`,
            //基点指向marker的头部位置
            offset: new AMap.Pixel(0, 0)
        });
        
        // 跳转到商家详情页
        // infoWindow.get$Container().on('click', function(event) {            
        //     _this.goShopDetail(info.uuid)
            
        // });
        function openInfoWin() {
            infoWindow.open(_this.map, [info.lng,info.lat]);
        }
        _this.map.panTo([info.lng,info.lat]);
        // _this.map.setZoom(18)        
        openInfoWin();
        _this.getAreaInfo(info.adcode)
        _this.getPoint(info.adcode)
      })
    },
    // 查看火警
    SeeFire(info){
      console.log(info)
      let _this = this
      AMapUI.loadUI(['overlay/SimpleMarker'],function(SimpleMarker) {
        new SimpleMarker({
            // iconLabel: '1',
            //自定义图标地址
            iconStyle: '../../static/img/huo.gif',
            //设置基点偏移
            offset: new AMap.Pixel(-19, -30),
            map: _this.map,
            showPositionPoint: true,
            position: [info.lng,info.lat],
            zIndex: 100
        });
        // 定位到地图
         _this.map.panTo([info.lng,info.lat]);
         _this.getAreaInfo(info.adcode)
         _this.getPoint(info.adcode)
      })
    },
    getArea(areacode = this.$store.state.userData.regioncode){
      
      this.$get('/org/district/'+areacode,{},(res)=>{
        console.log(res);
        this.value1 = res.name + res.suffix
        this.areaInfo = res
        if(!this.childAreaInfo.code){
          this.childAreaInfo = res
        }
        regionData.forEach(item=>{
            // if(item.value == this.areaInfo.code){
            //   this.citys = item.children
            //     console.log(item.children);
            // }
            if(item.value == this.areaInfo.code.substr(0,2) + '0000'){
              this.citys = item.children
                console.log(item.children);
            }
        })
        this.citys.forEach(item=>{
          if(item.value === this.areaInfo.code){
            this.countys = item.children
          }
        })
        console.log(this.areaInfo.code.substr(0,2) + '0000');
        
      })
      this.$post('/org/next/addr',{adcode:areacode},(res)=>{
        if(res.length){
          this.isHasChildArea = true
        }
      })
    },
    selectChange(val){
      this.page = 1
      this.menuData = []
      // this.getMenuData()
      console.log(this.childAreaInfo);
      
      this.getSelectAllArea(this.childAreaInfo.code)
    },
    search(){
      this.page = 1
      this.menuData = []
      // this.getMenuData()
      this.getSelectAllArea(this.childAreaInfo.code)
    },
    checkMore(){
      this.page = this.page + 1
      this.getMenuData()
    },
    getSelectAllArea(adcode = this.$store.state.userData.regioncode,callback){
      const params = {
        adcode
      }
      this.$post('/org/all/jurisdiction',params,(res)=>{
        let arr = ''
        res.forEach(item=>{
          arr = arr + item + ','
        })
        arr = arr.slice(0,-1)
        this.allArea = arr
        this.getBootInfo(arr)
        this.getMenuData(arr)
        this.getArea()
        this.getAreaInfo(adcode)
        if(callback) callback()
      })
    },
    getMenuData(codes = this.allArea){
      const params = {
        codes,
        orderby:this.value2 === '油烟浓度高到低' ? 'desc' : 'asc',
        limit:this.limit,
        page:this.page,
        companyName:this.companyName
      }
      this.$post('/org/company/list',params,(res)=>{
        this.menuData.push(...res.data)
        this.total = res.total
      })
    },
    getBootInfo(codes = this.allArea){
      const params = {
        codes
      }
      this.$post('/org/boot/info',params,(res)=>{
        this.bootInfo = res
        // res.cut区域管辖商家
        this.$emit('gettotal', res.cut);
        setInterval(() => {
          let sum = res.cut
          let randomNum1 = 0
          randomNum1 = Math.ceil(Math.random() * ((sum % 100) - sum + 1) + sum);
          this.bootInfo3 = randomNum1
          this.bootInfo4 = res.cut - randomNum1
        }, 10000);
        setInterval(() => {
          let sum = this.bootInfo.cut
          let randomNum1 = 0
          // 获取系统当前时间
          let now = new Date()
          //  系统当前时间格式化
          let hour = now.getHours()
          if( hour <=  9 ){
            randomNum1 = Math.ceil(Math.random() * 100);
          }else{
            randomNum1 = Math.ceil(Math.random() * sum);
          }
          // console.log(randomNum1)
          this.bootInfo1 = randomNum1
        }, 2000);

        setInterval(() => {
          let sum = this.bootInfo.cut
          let randomNum1 = 0
          // 获取系统当前时间
          let now = new Date()
          //  系统当前时间格式化
          let hour = now.getHours()
          if( hour <=  9 ){
            randomNum1 = Math.ceil(Math.random() * 100);
          }else{
            randomNum1 = Math.ceil(Math.random() * sum);
          }
          // console.log(randomNum1)
          this.bootInfo2 = randomNum1
        }, 2000);
      })
    },
 
    initPage2(DistrictCluster,PointSimplifier, $) {
      const {map} = this
      const _this = this
      _this.pointSimplifierIns = new PointSimplifier({
        map: map, //所属的地图实例
        zIndex: 110,
        autoSetFitView: false, //禁止自动更新地图视野
        getPosition: function(item) {
            // console.log(item);
            return item.position;
        },
        getHoverTitle: function(dataItem, idx) {    //在这里设置点的返回内容
            return idx + ': ' + dataItem.dataItem.companyName;
            // return 1232131
            // console.log(dataItem,idx);
            
        },
        //使用GroupStyleRender
        renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
        renderOptions: {
            //点的样式
            pointStyle: {
                width: 10,
                height: 10,
                fillStyle: 'rgba(0, 0, 0, 1)'
            },
               getGroupId: function(item, idx) {
                    //溶度区间分组
                    return item.dataItem.sootConcentration
                },
                groupStyleOptions: function(gid) {
                    // console.log(gid)
                    return {
                        pointStyle: {
                            fillStyle: gid < 2 ? "green" : "red"
                        }
                    };
                },

            hoverTitleStyle: {
                position: 'top'
            }
        },

        
      });
      var distCluster = new DistrictCluster({
        map: map, //所属的地图实例
        zIndex: 11,
        topAdcodes: [this.$store.state.userData.regioncode],
        areaNodeCacheLimit:10,
        // topAdcodes: this.allArea,
        getPosition: function (item) {
          if (!item) {
            return null;
          }          
          var parts = item.myItem.split(',');
          //返回经纬度
          // console.log([parseFloat(parts[0]), parseFloat(parts[1])]);

          return [parseFloat(parts[0]), parseFloat(parts[1])];
        },
         renderOptions: {
           getFeatureStyle: function(feature, dataItems) {
              return {
                  fillStyle: 'rgba(0,0,0,0)'
              };         
          }
         }
        
      });
      _this.distCluster = distCluster;
      const params = {
        codes:_this.allArea
      }
      
      let arr = []
      // 辖区商家列表信息
      _this.$post('/org/jurisdiction/info',params,(res)=>{ 
        let arr = []
        res.forEach(item=>{
          item.myItem = `${item.lng},${item.lat}`
          arr.push(`${item.lng},${item.lat}`)
          // console.log(item.myItem)
        })
        // console.log(res)
        _this.distCluster.setData(res);
        // _this.distCluster.setData(res);
        // currentAdcode = 510112
            //获取该节点的聚合信息
        distCluster.getClusterRecord(_this.$store.state.userData.regioncode, function(error, result) { 
            // console.log(result.dataItems)
          //设置数据
          if(!_this.isHasChildArea){

            _this.pointSimplifierIns.setData(result.dataItems);
          }
          // 
          
        })
      });
      var currentAdcode = null;

      //监听区划面的点击
      distCluster.on('featureClick', function(e, feature) {
        
            currentAdcode = feature.properties.adcode;
            console.log(feature.properties.adcode);        
            //获取该节点的聚合信息
            distCluster.getClusterRecord(currentAdcode, function(error, result) {
              console.log(result);

                //currentAdcode已经更新，有新的点击
                if (result.adcode !== currentAdcode) {
                    return;
                }
                //设置数据
                // _this.pointSimplifierIns.setData(result.dataItems);
            })
        });           

    },
   
    getPoint(currentAdcode){   //将批量点添加至地图   
        const _this = this
        //获取该节点的聚合信息
        // console.log("我是聚合信息"+currentAdcode);
        _this.getBootInfo(currentAdcode)
        _this.distCluster.getClusterRecord(currentAdcode, function(error, result) {      
          // console.log("我是点信息"  +  result.adcode);
              
            //currentAdcode已经更新，有新的点击
            if (result.adcode != currentAdcode) {
                return;
            }
            //设置数据

          _this.pointSimplifierIns.setData(result.dataItems);
      })
    },
    initPage(DistrictExplorer) {
      const _this = this
      //创建一个实例
      _this.districtExplorer = new DistrictExplorer({
        eventSupport: true, //打开事件支持
        drillDown: true,    // 开启鼠标单击下钻功能，前提要求开启 eventSupport 配置来支持鼠标事件
        map: _this.map, //关联的地图实例
      });
      //鼠标hover提示内容
      _this.$tipMarkerContent = $('<div class="tipMarker top"></div>');

      _this.tipMarker = new AMap.Marker({
        content: _this.$tipMarkerContent.get(0),
        offset: new AMap.Pixel(0, 0),
        bubble: true
      });
      var adcode = this.$store.state.userData.regioncode; //全国的区划编码
      _this.districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            console.error(error);
            return;
          }
          //绘制载入的区划节点
          _this.renderAreaNode(_this.districtExplorer, areaNode);
      });
      _this.districtExplorer.on('featureMouseout featureMouseover', function(e, feature) {        
           _this.toggleHoverFeature(feature, e.type === 'featureMouseover',
           e.originalEvent ? e.originalEvent.lnglat : null);
            
      });
      
      _this.districtExplorer.on('featureClick', function (e, feature) {

        console.log(feature.properties.adcode);
        // feature.properties.adcode 获取邮政编码
        _this.Fire(feature.properties.adcode)
        if(feature.properties.level === 'district'){  //如果是最下级的行政区则显示点
          _this.getPoint(feature.properties.adcode)
        }
        var props = feature.properties;
        //如果存在子节点
        // if (props.childrenNum > 0) {
        //切换聚焦区域
        // _this.switch2AreaNode(props.adcode);
        _this.switch2AreaNode(props.adcode);
        // }
      });
      //监听鼠标在feature上滑动 
        // console.log(districtExplorer)
      // _this.districtExplorer.on('featureMousemove', (e, feature)=> {
          // console.log( xe, feature);
            //更新提示位置
            // _this.tipMarker.setPosition(e.originalEvent.lnglat);
        // });
      _this.switch2AreaNode(this.$store.state.userData.regioncode)
    },

    // 查询火警预警列表
    Fire(adcode){
       let  _this = this
      const params = {
        codes: adcode == undefined || adcode == "" ? this.code : adcode
      }
      this.$post('/org/fire/warning',params,(res)=>{
        _this.FiredData = res
      })
    },
    //根据Hover状态设置相关样式
      toggleHoverFeature(feature, isHover, position) {
          const {tipMarker,map,districtExplorer,$tipMarkerContent} = this
              tipMarker.setMap(isHover ? map : null);

              if (!feature) {
                return;
              }

              var props = feature.properties;

              if (isHover) {

                //更新提示内容
                $tipMarkerContent.html(props.adcode + ': ' + props.name);
                //更新位置
                tipMarker.setPosition(position || props.center);
              }

              $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').toggleClass('hover', isHover);

              //更新相关多边形的样式
              var polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
              for (var i = 0, len = polys.length; i < len; i++) {

                polys[i].setOptions({
                  fillOpacity: isHover ? 0.5 : 0.2
                });
              }
            },
    switch2AreaNode(adcode, callback){
      const _this = this
      if (this.currentAreaNode && ('' + this.currentAreaNode.getAdcode() === '' + adcode)) {
        return;
      }

      this.loadAreaNode(adcode, function (error, areaNode) {

        if (error) {

          if (callback) {
            callback(error);
          }

          return;
        }

        currentAreaNode = window.currentAreaNode = areaNode;

        //设置当前使用的定位用节点
        _this.districtExplorer.setAreaNodesForLocating([currentAreaNode]);

        _this.refreshAreaNode(areaNode);

        if (callback) {
          callback(null, areaNode);
        }
      });
    },
    //切换区域后刷新显示内容
    refreshAreaNode(areaNode) {
      this.districtExplorer.setHoverFeature(null);
      this.renderAreaPolygons(areaNode);
      //更新选中节点的class
      var $nodeEles = $('#area-tree').find('h2');
      $nodeEles.removeClass('selected');
      var $selectedNode = $nodeEles.filter('h2[data-adcode=' + areaNode.getAdcode() + ']').addClass('selected');
      //展开下层节点
      $selectedNode.closest('li').removeClass('hide-sub');
      //折叠下层的子节点
      $selectedNode.siblings('ul.sublist').children().addClass('hide-sub');
      
    },
    //绘制某个区域的边界
    renderAreaPolygons(areaNode) {
      //更新地图视野
      const {colors,districtExplorer,map} = this
      map.setBounds(areaNode.getBounds(), null, null, true);

      //清除已有的绘制内容
      districtExplorer.clearFeaturePolygons();

      //绘制子区域
      districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
        // 填充色
        var fillColor = colors[i % colors.length];
        // 线颜色
        var strokeColor = colors[colors.length - 1 - i % colors.length];

        return {
          cursor: 'default',
          bubble: true,
          strokeColor: strokeColor, //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: fillColor, //填充色
          fillOpacity: 0.35, //填充透明度
        };
      });

      //绘制父区域
      districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: 'black', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 1, //线宽
        fillColor: areaNode.getSubFeatures().length ? null : colors[0], //填充色
        fillOpacity: 0.35, //填充透明度
      });
      
    },
    loadAreaNode(adcode, callback){
      const _this = this
      this.districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
        if (error) {
          if (callback) {
            callback(error);
          }
          console.error(error);
          return;
        }
        _this.renderAreaPanel(areaNode);
        if (callback) {
          callback(null, areaNode);
        }
      });
    },
    //填充某个节点的子区域列表
    renderAreaPanel(areaNode) {
      var props = areaNode.getProps();
      var $subBox = $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').siblings('ul.sublist');
      if (!$subBox.length) {
        //父节点不存在，先创建
        this.renderAreaPanelNode($('#area-tree'), props);
        $subBox = $('#area-tree').find('ul.sublist');
      }
      if ($subBox.attr('data-loaded') === 'rendered') {
        return;
      }
      $subBox.attr('data-loaded', 'rendered');
      var subFeatures = areaNode.getSubFeatures();
      //填充子区域
      for (var i = 0, len = subFeatures.length; i < len; i++) {
        this.renderAreaPanelNode($subBox, areaNode.getPropsOfFeature(subFeatures[i]), this.colors[i % this.colors.length]);
      }
    },
    renderAreaPanelNode(ele, props, color) {
      var $box = $('<li/>').addClass('lv_' + props.level);
      var $h2 = $('<h2/>').addClass('lv_' + props.level).attr({
        'data-adcode': props.adcode,
        'data-level': props.level,
        'data-children-num': props.childrenNum || void (0),
        'data-center': props.center.join(',')
      }).html(props.name).appendTo($box);

      if (color) {
        $h2.css('borderColor', color);
      }

      //如果存在子节点
      if (props.childrenNum > 0) {

        //显示隐藏
        $('<div class="showHideBtn"></div>').appendTo($box);

        //子区域列表
        $('<ul/>').addClass('sublist lv_' + props.level).appendTo($box);

        $('<div class="clear"></div>').appendTo($box);

        if (props.level !== 'country') {
          $box.addClass('hide-sub');
        }
      }

      $box.appendTo(ele);
    },
    renderAreaNode(districtExplorer, areaNode) {
      const _this = this     
      //清除已有的绘制内容
      districtExplorer.clearFeaturePolygons();
      //just some colors
      var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];
      //绘制子级区划
      districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
          var fillColor = colors[i % colors.length];
          var strokeColor = colors[colors.length - 1 - i % colors.length];
          let obj = {
            cursor: 'pointer',
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.35, //填充透明度
          }
          // debugger
          return obj
          // }                  
      });      
      //绘制父区域
        districtExplorer.renderParentFeature(areaNode, {
          cursor: 'pointer',
          bubble: true,
          strokeColor: 'black', //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: null, //填充色
          fillOpacity: 0.35, //填充透明度
        });
      //更新地图视野以适合区划面
      _this.map.setFitView(districtExplorer.getAllFeaturePolygons());
      // this.map.setZoom(7)
    }
  }
}
</script>
<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
html,
body{
width:100%;
height:100%;
margin:0px;
padding:0;
font-size:13px;
}
ul,
li{
padding:0;
margin:0;
list-style:none;
}
#outer-box{
height:100%;
padding-right:300px;
}
#container{
height:100%;
width:100%;
}
#panel{
position:absolute;
top:0;
bottom:0;
right:0;
height:100%;
overflow:auto;
width:300px;
z-index:999;
border-left:1px solid #eaeaea;
background:#fff;
}
.scrollbar1::-webkit-scrollbar-track{
-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
background-color:#fff;
}
.scrollbar1::-webkit-scrollbar{
width:6px;
background-color:#fff;
}
.scrollbar1::-webkit-scrollbar-thumb{
background-color:#aaa;
}
.clear{
clear:both;
}
.tipMarker{
color:#555;
background-color:rgba(255,254,239,0.8);
border:1px solid #7E7E7E;
padding:2px 6px;
font-size:12px;
white-space:nowrap;
display:inline-block;
}
.tipMarker:before,
.tipMarker:after{
content:'';
display:block;
position:absolute;
margin:auto;
width:0;
height:0;
border:solid transparent;
border-width:5px 5px;
}
.tipMarker.top{
transform:translate(-50%,-110%);
}
.tipMarker.top:before,
.tipMarker.top:after{
bottom:-9px;
left:0;
right:0;
border-top-color:rgba(255,254,239,0.8);
}
.tipMarker.top:before{
bottom:-10px;
border-top-color:#7E7E7E;
}
#area-tree h2{
display:inline-block;
font-weight:500;
font-size:13px;
padding:3px 5px;
margin:0;
border:1px solid #2ca02c;
border-width:1px 3px;
cursor:pointer;
}
#area-tree h2:hover,
#area-tree h2.hover,
#area-tree h2.selected{
background:#3366cc;
color:#fff;
}
#area-tree h2.lv_outside{
border-color:#666;
padding:3px 10px;
}
#area-tree h2.lv_country{
border-color:#d62728;
padding:3px 27px;
margin:5px 0;
}
#area-tree h2.lv_province{
border-color:#ff7f0e;
padding:3px 10px;
}
#area-tree h2.lv_district{
border-color:#dd4477
}
#area-tree ul{
margin-left:23px;
clear:both;
}
#area-tree li{
float:left;
margin:5px 5px 0 0;
font-size:12px;
}
#area-tree li.lv_province{
margin:5px 5px 5px 0;
}
.showHideBtn{
display:inline-block;
position:relative;
width:20px;
height:20px;
overflow:hidden;
vertical-align:middle;
margin:0;
cursor:pointer;
}
@-webkit-keyframes rotate-forever{
0%{
-webkit-transform:rotate(0deg);
}
100%{
-webkit-transform:rotate(360deg);
}
}
.loading > .showHideBtn{
-webkit-animation:1s ease-in-out infinite rotate-forever;
}
.showHideBtn:after{
content:'';
position:absolute;
width:0;
height:0;
top:4px;
left:4px;
border:solid rgba(0,0,0,0);
border-width:10px 6px;
border-top-color:#aaa;
transition-property:all;
transition-duration:.2s;
}
.hide-sub .showHideBtn:after{
transform-origin:50% 20%;
transform:rotate(-90deg);
}
.hide-sub > ul{
display:none;
}
</style>
<style lang="scss" scoped>
.map-container{
  .map-top{
    width:1500px;
    height:80px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 7px 1px rgba(0, 0, 0, 0.2);
    border-radius:15px;
    position: relative;
    top: 20px;
    // left: 311px;
    z-index: 10;
    margin: 0 auto;
    display: flex;
    .map-top-container{
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      div{
        display: flex;
        align-items: center;
      }
      .map-topFire>img{
        margin-left: 20px;
        margin-bottom: 9px;
      }
      .text{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(0,0,0,1);
        line-height:17px;
        margin-right: 9px;
      }
      .textn{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(0,102,0,1);
        line-height:17px;
      }
    }
  }
  .map-left{
    position: absolute;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    left: 20px;
      .map-left-container{
        position: relative;
        height: 120px;
        margin-top: 30px;
        width: 240px;
        .left-img{
          position: absolute;
          left: -20px;
          top: 0;
        }
        .left{  
          width: 240px;
          height: 120px;
          background-color: #ffffff;
          box-shadow: 0px 0px 10px 0px rgba(7, 1, 3, 0.2);
          border-radius: 20px 0px 20px 0px;
          
          display: flex;
          align-items: center;
          justify-content: space-between;
          // position: relative;
          
          .left-left{
            width: 100%;
            align-items: center;
            height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
              font-size: 20px;
            }
            .left-span{
              color: #33cc33;
            }
            .right-span{
              color: #408fff;
            }
          }
          .left-right{
            height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-left: 1px solid #ccc;
            padding-right: 10px;
            i{
              font-size: 10px;
              padding-left: 10px;
            }
          }
        }
      }
  }
  .map-right{
    width: 504px;
    height: 860px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px 
      rgba(7, 1, 3, 0.2);
     
  }
  .map-right-left{
    position: absolute;
    left: -24px;
    top: 42%;
  }
  .right-menu{
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    width: 440px;
  }
  .right-top{
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }

  .right-top-list{
    height: 60px;
    border-bottom: 1px solid #CCCCCC;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right-top-list>div{
    height: 100%;
    width: 33%;
    text-align: center;
    line-height: 60px;
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
    box-sizing: border-box;
  }
  .air{
    padding: 33px;
    box-sizing: border-box;
    .air-data{
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .air-data-value{
        width:160px;
        height:80px;
        background:rgba(254,136,0,1);
        border-radius:12px;
        text-align: center;
        line-height: 80px;
        font-size:48px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
    }
    .air-list-item{
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #CCCCCC;
    }
    .img{
      padding: 20px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      img{
        height: 36px;
        width: 402px;
      }
    }
    
  }
  .right-list{ 
    overflow-x: scroll;
    height: 620px;
    margin-top: 20px;
    .list-container:first-child{
      margin-top: 0
    }
    .list-container{
      margin:0 auto;
      width: 440px;
      height: 100px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 20px;
      img{
        width: 80px;
	      height: 80px;
      }
      .right-mid{
        margin-left: 20px;
        h1{
          font-size: 18px;
          color: #408fff;
          @include ellipsis;
          width: 280px;
        }
        p{
          margin-top: 10px;
          @include ellipsis;
          width: 280px;
        }
      }
      .right-right{
        i{
          font-size: 20px;
          display: flex;
          justify-content: flex-end;
          margin-top: 25px;
        }
      }
      
    }
  }

  .right-list1{ 
    overflow-x: scroll;
    height: 746px;
    margin-top: 20px;
    .list-container:first-child{
      margin-top: 0
    }
    .list-container{
      margin:0 auto;
      width: 440px;
      height: 100px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 20px;
      img{
        width: 80px;
	      height: 80px;
      }
      .right-mid{
        margin-left: 20px;
        h1{
          font-size: 18px;
          color: #408fff;
          @include ellipsis;
          width: 280px;
        }
        p{
          margin-top: 10px;
          @include ellipsis;
          width: 280px;
        }
      }
      .right-right{
        p{
          color: #FF3333;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:bold;
        }
        i{
          font-size: 20px;
          display: flex;
          justify-content: flex-end;
          margin-top: 25px;
        }
      }
      
    }
  }

  .nothing{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,153,255,1);
    line-height:48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 746px;
  }
  .nothing>img{
    width:88px;
    height:84px;
    opacity:0.7;
  }
  .right-bottom{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    p{
      // font-size: 16px;
      color: #666;
    }
  }
}
.zoom{
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 999;
}
.logo{
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 999;
}
</style>