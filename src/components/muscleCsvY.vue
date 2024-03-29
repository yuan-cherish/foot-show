<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <Upload
                name="file"
                ref=upload
                type="drag"
                action="http://localhost:8088/get_csv_muscle"
                :format="['csv']"
                :default-file-list="uploadList"
                :before-upload="handleBeforeUpload"
                :on-remove="removeFile"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                v-if="model=='0'"
                >
                <div style="padding: 5px 0">
                    <Icon type="ios-cloud-upload" size="50" style="color: #3399ff"></Icon>
                    <p style="font-size:18px;">点击或将文件拖拽到这里上传,只支持cvs文件（单文件上传）</p>
                </div>
            </Upload>
            <Button type="primary" 
                    size="large" 
                    icon="ios-cloud-upload-outline" 
                    v-if="haveUpload"
                    @click="upload"
                    :loading="loadingStatus"
                    id="upload_button"
                    >
                    <span v-if="!loadingStatus" style="font-size:18px;">上传文件</span>
                    <span v-if="loadingStatus" style="font-size:18px;">处理数据</span>
            </Button>
            <Button type="success" 
                    shape="circle" 
                    icon="ios-cloud-play-outline" 
                    v-if="can_play"
                    @click="play"
                    :loading="playingStatus"
                    style="font-size:18px;">
                    播放数据
            </Button>
            <Button type="primary" 
                    shape="circle" 
                    icon="ios-cloud-play-outline" 
                    @click="dotimeOut"
                    v-if="playingStatus"
                    style="margin-left: 2%;"
                    >
                    <span v-if="!timeOut" style="font-size:18px;">暂停播放</span>
                    <span v-if="timeOut" style="font-size:18px;">继续播放</span>
            </Button>
            <Progress v-if="playingStatus" :percent="playingTime" status="active"></Progress>
        </div>
        <div class="split">
            <Split>
                <div slot="left">
                    <img v-bind:class="left_tui_class" :src=leftSrc alt="左腿">
                    <div id="left_1" v-bind:class="left_1_class"></div>
                    <div id="left_2" v-bind:class="left_2_class"></div>
                    <div id="left_3" v-bind:class="left_3_class"></div>
                    <div id="left_4" v-bind:class="left_4_class"></div>
                </div>
                <div slot="right">
                    <img v-bind:class="right_tui_class" :src=rightSrc alt="右腿">
                    <div id="right_1" v-bind:class="right_1_class"></div>
                    <div id="right_2" v-bind:class="right_2_class"></div>
                    <div id="right_3" v-bind:class="right_3_class"></div>
                    <div id="right_4" v-bind:class="right_4_class"></div>
                </div>
            </Split>
        </div>
        <div>
            <highcharts class="charts" :options="chartOptions1" ></highcharts>
            <highcharts class="charts" :options="chartOptions2" ></highcharts>
        </div>
    </div>
</template>
<script>
import L0 from '../resource/ps/L0.png'
import L1 from '../resource/ps/L1.png'
import L2 from '../resource/ps/L2.png'
import R0 from '../resource/ps/R0.png'
import R1 from '../resource/ps/R1.png'
import R2 from '../resource/ps/R2.png'

import LL1 from '../resource/ps/1L1.png'
import LL2 from '../resource/ps/1L2.png'
import RR1 from '../resource/ps/1R1.png'
import RR2 from '../resource/ps/1R2.png'
export default {
    data() {
    return {
        model: "0",
        playingStatus: false,
        chartOptions1: {},
        chartOptions1: {},
        loadingStatus: false,
        // [13934, 12503, 17177, 19658, 17031,
        //                         13934, 12503, 17177, 19658, 17031,
        //                         13934, 12503, 17177, 19658, 17031,
        //                         13934, 12503, 17177, 19658, 17031,
        //                         13934, 12503, 17177, 19658, 0],
        
        // [23934, 22503, 27177, 29658, 27031,
        //                         23934, 22503, 27177, 29658, 27031,
        //                         23934, 22503, 27177, 29658, 27031,
        //                         23934, 22503, 27177, 29658, 27031,
        //                         23934, 22503, 27177, 29658],
        // left_data1:[],
        // left_data2: [],
        // left_data3: [],
        // left_data4:[],
        left_data: [],
        left_1: [],
        left_2: [],
        left_3: [],
        left_4: [],
        right_data: [],
        right_1: [],
        right_2: [],
        right_3: [],
        right_4: [],
        charts_xmin: 0,
        charts_xmax: 100,
        timeOut: false,
        playingStatus: false,
        haveUpload: false,
        file: '',
        uploadList: [],
        loadingStatus: false,
        time: 0,
        playingTime: 0,
        timeOut: false,
        nowTime: 1,
        can_play: false,
        color: [
            "#F4A460",
            "#FFE4C4",
            "#FF4500"
        ],
        left_imgs: [
            L0,L1,L2,LL1,LL2
        ],
        right_imgs: [
            R0,R1,R2,RR1,RR2
        ],
        leftSrc: "",
        rightSrc: "",
        left_tui_class: "left_tui",
        right_tui_class: "right_tui",
        left_1_class: "left_1",
        left_2_class: "left_2",
        left_3_class: "left_3",
        left_4_class: "left_4",
        right_1_class: "right_1",
        right_2_class: "right_2",
        right_3_class: "right_3",
        right_4_class: "right_4",

    }
    },
    created() {
        this.getChart()
        this.leftSrc = this.left_imgs[0]
        this.rightSrc = this.right_imgs[0]
    },
    mounted(){
        this.getChart()
    },
    methods: {
        getChart() {
            var template1 = {
                chart: {
                    type: 'line',
                    zoomType: 'xy',
                    maxWidth: 300,
                    // style: {
                    //     fontSize: "20px"
                    // }
                    // marginRight: 120,
                    // events : {
                    //     load: function() {}
                    // }
                },
                title: {
                    text: "人体腿部骨骼肌收缩示意图（左腿）",
                    style: {
                        fontSize:'25px'
                    }
                    
                },
                xAxis: {
                    title: {
                        text: "时间(s)",
                        style: {
                            fontSize:'20px'
                        }
                    },
                    labels: {
                        style: {
                            fontSize:'15px'
                        }
                    },
                    min: this.charts_xmin,
                    max: this.charts_xmax,
                    tickInterval: 6
                },
                yAxis: {
                    title: {
                        text: "电压(v)",
                        style: {
                            fontSize:'20px'
                        },
                        min: 1.3,
                        max: 1.45,
                    },
                    labels: {
                        style: {
                            fontSize:'15px'
                        }
                    },
                    // min: 0,
                    // max: 210,
                    // tickInterval: 0
                },
                legend: {
                    // enabled: false,
                    align: 'right', //水平方向位置
                    verticalAlign: 'top', //垂直方向位置
                    x: 0, //距离x轴的距离
                    y: 20, //距离Y轴的距离
                    itemStyle: {
                        fontSize:'20px' 
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
						label: {
                            connectorAllowed: false
						},
						// pointStart: 2010
                }
                },
                series: [
                    {
                        name: '比目鱼肌',
                        data: this.left_1,
                        color: 'black',
                        marker: {
                            radius:0,
                            lineWidth:0,
                            lineColor:'#fba845',
                            fillColor:'#fba845',
                            states:{
                                hover:{
                                    enabled:false
                                }
                            }
                        }
                    }, 
                    {
                        name: '腓股长肌',
                        data: this.left_2,
                        color: 'blue',
                        marker: {
                            radius: 0
                        }
                    }, 
                    {
                        name: '股二头肌',
                        data: this.left_3,
                        color: 'red',
                        marker: {
                            radius: 0
                        }
                    }, 
                    {
                        name: '股四头肌',
                        data: this.left_4,
                        color: 'green',
                        marker: {
                            radius: 0
                        }
                    }, 
                ],
                responsive: {
				rules: [{
						condition: {
								maxWidth: 500
						},
						chartOptions: {
								legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
								}
						}
                }]
            }
            };
            var template2 = {
                chart: {
                    type: 'line',
                    zoomType: 'xy',
                    maxWidth: 300,
                    // style: {
                    //     fontSize: "20px"
                    // }
                    // marginRight: 120,
                    // events : {
                    //     load: function() {}
                    // }
                },
                title: {
                    text: "人体腿部骨骼肌收缩示意图（右腿）",
                    style: {
                        fontSize:'25px'
                    }
                    
                },
                xAxis: {
                    title: {
                        text: "时间(s)",
                        style: {
                            fontSize:'20px'
                        }
                    },
                    labels: {
                        style: {
                            fontSize:'15px'
                        }
                    },
                    min: this.charts_xmin,
                    max: this.charts_xmax,
                    tickInterval: 6
                },
                yAxis: {
                    title: {
                        text: "电压(v)",
                        style: {
                            fontSize:'20px'
                        },
                        min: 2,
                        max: 3,
                    },
                    labels: {
                        style: {
                            fontSize:'15px'
                        }
                    },
                    // min: 0,
                    // max: 210,
                    // tickInterval: 0
                },
                legend: {
                    // enabled: false,
                    align: 'right', //水平方向位置
                    verticalAlign: 'top', //垂直方向位置
                    x: 0, //距离x轴的距离
                    y: 20, //距离Y轴的距离
                    itemStyle: {
                        fontSize:'20px' 
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
						label: {
                            connectorAllowed: false
						},
						// pointStart: 2010
                }
                },
                series: [
                    {
                        name: '比目鱼肌',
                        data: this.right_1,
                        color: 'black',
                        marker: {
                            radius:0,
                            lineWidth:0,
                            lineColor:'#fba845',
                            fillColor:'#fba845',
                            states:{
                                hover:{
                                    enabled:false
                                }
                            }
                        }
                    }, 
                    {
                        name: '腓股长肌',
                        data: this.right_2,
                        color: 'blue',
                        marker: {
                            radius: 0
                        }
                    }, 
                    {
                        name: '股二头肌',
                        data: this.right_3,
                        color: 'red',
                        marker: {
                            radius: 0
                        }
                    }, 
                    {
                        name: '股四头肌',
                        data: this.right_4,
                        color: 'green',
                        marker: {
                            radius: 0
                        }
                    }, 
                ],
                responsive: {
				rules: [{
						condition: {
								maxWidth: 500
						},
						chartOptions: {
								legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
								}
						}
                }]
            }
            };
            this.chartOptions1 = template1;
            this.chartOptions2 = template2;
        },
        handleBeforeUpload (file) {   //上传前钩子
            let size = file.size / 1024 / 1024
            let type = file.name
            if(type.includes('.csv') || type.includes('.CSV') ){
                if(size <= 10){
                this.file = file
                this.uploadList = [{    //用于表单的已上传文件显示
                    'name': file.name,
                    'url': '',
                    'size': file.size
                }]
                this.haveUpload = true
                return false;
                }else{
                this.$Message.error('只支持10M以内大小的文件,请重新上传');
                return false
                }
            }else{
                this.$Message.error('只支持.csv文件类型,请重新上传');
                return false
            }       
        },
        removeFile(){   //移除已上传文件;
            this.file = ''
            this.uploadList = []
        },
        handleFormatError () {
            this.$Notice.warning({
                title: '文件类型',
                desc: '文件类型错误,请选择.csv'
            });
        },
        upload(){ // 上传文件
            this.loadingStatus = true
            this.$refs.upload.post(this.file)
            this.haveUpload = true;
            // this.file = '';
            // this.uploadList = []
            this.$Message.success("上传成功")
        },
        handleSuccess(res){
            this.$Message.success("处理数据成功")

            this.haveUpload = false
            this.loadingStatus = false
            console.log(res)
            this.left_data = res.left_data
            this.right_data = res.right_data
            this.time = res.time
            // this.created()
            // sessionStorage.setItem('left_sum', JSON.stringify(this.left_sum))
            // sessionStorage.setItem('right_sum', JSON.stringify(this.right_sum))
            // sessionStorage.setItem('time', this.time)
            this.left_1.push(this.left_data[0][0])
            this.left_2.push(this.left_data[0][1])
            this.left_3.push(this.left_data[0][2])
            this.left_4.push(this.left_data[0][3])
            this.right_1.push(this.right_data[0][0])
            this.right_2.push(this.right_data[0][1])
            this.right_3.push(this.right_data[0][2])
            this.right_4.push(this.right_data[0][3])
            this.can_play = true
            
        },
        play(){
            this.mounted()
            this.getChart()
            // this.can_play = false
            this.playingStatus = true
        },
        dotimeOut(){
            if (this.timeOut){
                this.timeOut = false
                this.mounted()
            }else{
                this.timeOut = true
            }
        },
        mounted(){
            // var index = 1
            const timer = setInterval(()=>{
                // this.playingStatus=true
                if (this.timeOut) {
                    clearInterval(timer)
                }
                this.left_1.push(this.left_data[this.nowTime][0])
                
                this.left_2.push(this.left_data[this.nowTime][1])
                this.left_3.push(this.left_data[this.nowTime][2])
                this.left_4.push(this.left_data[this.nowTime][3])
                this.right_1.push(this.right_data[this.nowTime][0])
                this.right_2.push(this.right_data[this.nowTime][1])
                this.right_3.push(this.right_data[this.nowTime][2])
                this.right_4.push(this.right_data[this.nowTime][3])
                if(this.left_1.length >= this.charts_xmax){
                    this.charts_xmin = this.charts_xmin + 1
                    this.charts_xmax = this.charts_xmax + 1
                }
                // this.changeImge()
                this.changeColor()
                this.getChart()
                console.log(this.leftSrc)
                this.playingTime = Math.round(100*this.nowTime / this.time)
                this.nowTime = this.nowTime + 1
                if (this.nowTime >= this.time){
                    clearInterval(timer)
                    this.timer = null
                    this.playingStatus=false
                    this.playingTime = 0
                    this.$Message.success("播放结束")
                    console.log("定时器结束")
                    this.timeOut = false
                    this.nowTime = 0
                }
                },100)
        },
        changeColor(){
            if (this.left_1[this.left_1.length-1] > 1.365){
                this.leftSrc = this.left_imgs[1]
                document.getElementById("left_4").style.background= this.color[2];
            }else if (this.left_1[this.left_1.length-1] > 1.36){
                this.leftSrc = this.left_imgs[2]
                document.getElementById("left_4").style.background= this.color[1];
            }else{
                this.leftSrc = this.left_imgs[0]
                document.getElementById("left_4").style.background= this.color[0];
            }

            if (this.left_2[this.left_2.length-1] > 1.354){
                document.getElementById("left_3").style.background= this.color[2];
            }else if (this.left_2[this.left_2.length-1] > 1.34){
                document.getElementById("left_3").style.background= this.color[1];
            }else{
                document.getElementById("left_3").style.background= this.color[0];
            }
            
            if (this.left_3[this.left_3.length-1] < 1.41){
                document.getElementById("left_2").style.background= this.color[2];
            }else{
                document.getElementById("left_2").style.background= this.color[0];
            }

            if (this.left_4[this.left_4.length-1] > 1.365){
                this.left_tui_class = "left_tui3"
                this.right_tui_class = "right_tui3"
                this.left_1_class = "left_13"
                this.left_2_class = "left_23"
                this.left_3_class = "left_33"
                this.left_4_class = "left_43"
                this.right_1_class = "right_13"
                this.right_2_class = "right_23"
                this.right_3_class = "right_33"
                this.right_4_class = "right_43"
                this.leftSrc = this.left_imgs[3]
                document.getElementById("left_1").style.background= this.color[2];
            }else if(this.left_4[this.left_4.length-1] > 1.36){
                this.left_tui_class = "left_tui4"
                this.right_tui_class = "right_tui4"
                this.left_1_class = "left_14"
                this.left_2_class = "left_24"
                this.left_3_class = "left_34"
                this.left_4_class = "left_44"
                this.right_1_class = "right_14"
                this.right_2_class = "right_24"
                this.right_3_class = "right_34"
                this.right_4_class = "right_44"
                this.leftSrc = this.left_imgs[4]
                document.getElementById("left_1").style.background= this.color[1];
            }else{
                this.left_tui_class = "left_tui"
                this.right_tui_class = "right_tui"
                this.left_1_class = "left_1"
                this.left_2_class = "left_2"
                this.left_3_class = "left_3"
                this.left_4_class = "left_4"
                this.right_1_class = "right_1"
                this.right_2_class = "right_2"
                this.right_3_class = "right_3"
                this.right_4_class = "right_4"
                // this.leftSrc = this.left_imgs[0]
                document.getElementById("left_1").style.background= this.color[0];
            }
            
            if (this.right_1[this.right_1.length-1] > 1.365){
                this.rightSrc = this.right_imgs[1]
                document.getElementById("right_4").style.background= this.color[2];
            }else if (this.right_1[this.right_1.length-1] > 1.36){
                this.rightSrc = this.right_imgs[2]
                document.getElementById("right_4").style.background= this.color[1];
            }else{
                document.getElementById("right_4").style.background= this.color[0];
                    this.rightSrc = this.right_imgs[0]
            }

            if (this.right_2[this.right_2.length-1] > 1.354){
                document.getElementById("right_3").style.background= this.color[2];
            }else if (this.right_2[this.right_2.length-1] > 1.34){
                document.getElementById("right_3").style.background= this.color[1];
            }else{
                document.getElementById("right_3").style.background= this.color[0];
            }
            
            if (this.right_3[this.right_3.length-1] < 1.41){
                document.getElementById("right_2").style.background= this.color[2];
            }else{
                document.getElementById("right_2").style.background= this.color[0];
            }

            if (this.right_4[this.right_4.length-1] > 1.365){
                this.left_tui_class = "left_tui3"
                    this.right_tui_class = "right_tui3"
                    this.left_1_class = "left_13"
                    this.left_2_class = "left_23"
                    this.left_3_class = "left_33"
                    this.left_4_class = "left_43"
                    this.right_1_class = "right_13"
                    this.right_2_class = "right_23"
                    this.right_3_class = "right_33"
                    this.right_4_class = "right_43"
                    this.rightSrc = this.right_imgs[3]
                document.getElementById("right_1").style.background= this.color[2];
            }else if(this.right_4[this.right_4.length-1] > 1.36){
                this.left_tui_class = "left_tui4"
                    this.right_tui_class = "right_tui4"
                    this.left_1_class = "left_14"
                    this.left_2_class = "left_24"
                    this.left_3_class = "left_34"
                    this.left_4_class = "left_44"
                    this.right_1_class = "right_14"
                    this.right_2_class = "right_24"
                    this.right_3_class = "right_34"
                    this.right_4_class = "right_44"
                    this.rightSrc = this.right_imgs[4]
                document.getElementById("right_1").style.background= this.color[1];
            }else{
                this.left_tui_class = "left_tui"
                    this.right_tui_class = "right_tui"
                    this.left_1_class = "left_1"
                    this.left_2_class = "left_2"
                    this.left_3_class = "left_3"
                    this.left_4_class = "left_4"
                    this.right_1_class = "right_1"
                    this.right_2_class = "right_2"
                    this.right_3_class = "right_3"
                    this.right_4_class = "right_4"
                    // this.rightSrc = this.right_imgs[0]
                document.getElementById("right_1").style.background= this.color[0];
            }
            
        },
        changeImge(){
            if (this.left_4[this.left_4.length-1] > 1.365){
                this.left_tui_class = "left_tui3"
                this.right_tui_class = "right_tui3"
                this.left_1_class = "left_13"
                this.left_2_class = "left_23"
                this.left_3_class = "left_33"
                this.left_4_class = "left_43"
                this.right_1_class = "right_13"
                this.right_2_class = "right_23"
                this.right_3_class = "right_33"
                this.right_4_class = "right_43"
                this.leftSrc = this.left_imgs[3]
                console.log(this.leftSrc)
            }else if(this.left_4[this.left_4.length-1] > 1.36){
                
                this.left_tui_class = "left_tui4"
                this.right_tui_class = "right_tui4"
                this.left_1_class = "left_14"
                this.left_2_class = "left_24"
                this.left_3_class = "left_34"
                this.left_4_class = "left_44"
                this.right_1_class = "right_14"
                this.right_2_class = "right_24"
                this.right_3_class = "right_34"
                this.right_4_class = "right_44"
                this.leftSrc = this.left_imgs[4]
            }else{
                
                this.left_tui_class = "left_tui"
                this.right_tui_class = "right_tui"
                this.left_1_class = "left_1"
                this.left_2_class = "left_2"
                this.left_3_class = "left_3"
                this.left_4_class = "left_4"
                this.right_1_class = "right_1"
                this.right_2_class = "right_2"
                this.right_3_class = "right_3"
                this.right_4_class = "right_4"
                this.leftSrc = this.left_imgs[0]
            }
            
            if (this.right_4[this.right_4.length-1] > 1.365){
                
                    this.left_tui_class = "left_tui3"
                    this.right_tui_class = "right_tui3"
                    this.left_1_class = "left_13"
                    this.left_2_class = "left_23"
                    this.left_3_class = "left_33"
                    this.left_4_class = "left_43"
                    this.right_1_class = "right_13"
                    this.right_2_class = "right_23"
                    this.right_3_class = "right_33"
                    this.right_4_class = "right_43"
                    this.rightSrc = this.right_imgs[3]
            }else if(this.left_4[this.left_4.length-1] > 1.36){
                
                    this.left_tui_class = "left_tui4"
                    this.right_tui_class = "right_tui4"
                    this.left_1_class = "left_14"
                    this.left_2_class = "left_24"
                    this.left_3_class = "left_34"
                    this.left_4_class = "left_44"
                    this.right_1_class = "right_14"
                    this.right_2_class = "right_24"
                    this.right_3_class = "right_34"
                    this.right_4_class = "right_44"
                    this.rightSrc = this.right_imgs[4]
            }else{
                
                    this.left_tui_class = "left_tui"
                    this.right_tui_class = "right_tui"
                    this.left_1_class = "left_1"
                    this.left_2_class = "left_2"
                    this.left_3_class = "left_3"
                    this.left_4_class = "left_4"
                    this.right_1_class = "right_1"
                    this.right_2_class = "right_2"
                    this.right_3_class = "right_3"
                    this.right_4_class = "right_4"
                    this.rightSrc = this.right_imgs[0]
            }
        }
    }
}
</script>
<style lang="less">
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 600px;
        margin: 10px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .table{
        padding: 0px;
        margin: 0px;
        bottom: 10px;
    }
    .ivu-table-large{
        font-size: 20px !important;
    }
    .split{
        height: 550px;
        width: 100%;
        // widows: 40%;
        border: 5px solid #dcdee2;
        background: #CED0CD;
    }
    
    .left_tui{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 1%;
        left: 34%;
        // width: 33%;
        // height: 90%;
        width:auto;
        height:auto;
        max-width:40%;
        // max-height:90%;
        // opacity: 0.2;
    }
    .left_tui4{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 10%;
        left: 15%;
        // width: 33%;
        // height: 90%;
        width:auto;
        height:auto;
        max-width:80%;
        transform: rotate(270deg);
        // max-height:90%;
        // opacity: 0.2;
    }
    .left_tui3{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 10%;
        left: 15%;
        // width: 33%;
        // height: 90%;
        width:auto;
        height:auto;
        max-width:80%;
        transform: rotate(270deg);
        // max-height:90%;
        // opacity: 0.2;
    }
    .right_tui{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 0.5%;
        left: 34%;
        // width: 33%;
        // height: 90%;
        width:auto;
        height:auto;
        max-width:46%;
        // max-height:100%;
        // opacity: 0.2;
    }
    .right_tui4{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 8%;
        left: 20%;
        // width: 33%;
        // height: 90%;
        width:auto;
        height:auto;
        max-width:80%;
        transform: rotate(90deg);
        // max-height:100%;
        // opacity: 0.2;
    }
    .right_tui3{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 8%;
        left: 20%;
        // width: 33%;
        // height: 90%;
        width:auto;
        height:auto;
        max-width:80%;
        transform: rotate(90deg);
        // max-height:100%;
        // opacity: 0.2;
    }
    .left_1{
        position: absolute;
        top: 22%;
        left: 46.5%;
        width: 11%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(3deg);
    }
    .left_2{
        position: absolute;
        top: 23%;
        left: 58%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_3{
        position: absolute;
        top: 53.5%;
        left: 57.5%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(175deg);
    }
    .left_4{
        position: absolute;
        top: 56%;
        left: 60.5%;
        width: 2%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(173deg);
    }
    .left_13{
        position: absolute;
        top: 30%;
        left: 46.5%;
        width: 11%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(3deg);
    }
    .left_23{
        position: absolute;
        top: 35%;
        left: 58%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_33{
        position: absolute;
        top: 44.5%;
        left: 65.5%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(100deg);
    }
    .left_43{
        position: absolute;
        top: 42.5%;
        left: 75.5%;
        width: 2%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(100deg);
    }
    .left_14{
        position: absolute;
        top: 30%;
        left: 42.5%;
        width: 11%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_24{
        position: absolute;
        top: 30%;
        left: 55%;
        width: 5%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_34{
        position: absolute;
        top: 48.5%;
        left: 60.5%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(135deg);
    }
    .left_44{
        position: absolute;
        top: 48.5%;
        left: 65.5%;
        width: 2%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(140deg);
    }
    .right_1{
        position: absolute;
        top: 22%;
        left: 54.3%;
        width: 12%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_2{
        position: absolute;
        top: 24%;
        left: 51%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_3{
        position: absolute;
        top: 53.5%;
        left: 52.5%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(8deg);
    }
    .right_4{
        position: absolute;
        top: 56%;
        left: 49.5%;
        width: 2%;
        height: 20%;
        background: #FFE4C4;
        transform: rotate(8deg);
    }
    .right_13{
        position: absolute;
        top: 30%;
        left: 58.3%;
        width: 12%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_23{
        position: absolute;
        top: 30%;
        left: 55.3%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_33{
        position: absolute;
        top: 45.5%;
        left: 46.5%;
        width: 2.5%;
        height: 14%;
        background: #FFE4C4;
        transform: rotate(80deg);
    }
    .right_43{
        position: absolute;
        top: 41%;
        left: 45%;
        width: 2%;
        height: 18%;
        background: #FFE4C4;
        transform: rotate(80deg);
    }
    .right_14{
        position: absolute;
        top: 30%;
        left: 60.3%;
        width: 12%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_24{
        position: absolute;
        top: 30%;
        left: 57.3%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_34{
        position: absolute;
        top: 48.5%;
        left: 52.5%;
        width: 2.5%;
        height: 14%;
        background: #FFE4C4;
        transform: rotate(50deg);
    }
    .right_44{
        position: absolute;
        top: 48.5%;
        left: 46.5%;
        width: 2%;
        height: 18%;
        background: #FFE4C4;
        transform: rotate(50deg);
    }
</style>