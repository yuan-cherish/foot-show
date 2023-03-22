<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <Button type="primary" 
                    size="large" 
                    icon="ios-cloud-upload-outline" 
                    @click="play"
                    :loading="loadingStatus"
                    id="upload_button"
                    >
                    <span v-if="!playingStatus" style="font-size:18px;">开始接收数据</span>
                    <span v-if="playingStatus" style="font-size:18px;">暂停接受</span>
            </Button>
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
        color: [
            "#F4A460",
            "#FFE4C4",
            "#FF4500"
        ],
        index: 0,
        nowTime: 0,
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
        play(){
            this.playingStatus = !this.playingStatus
            const timer = setInterval(async ()=>{
                if(!this.playingStatus){
                    clearInterval(timer)
                }
                // console.log("调用一次mounted")
                await this.mounted()
            }, 1000)
            // console.log("开始接收")
        },
        mounted(){
            const paramsList = new URLSearchParams()
            paramsList.append('index', this.index)
            this.$axios.post('http://192.168.1.28:5002/get_light_data', 
            paramsList,{
            headers: { 'content-type': 'application/x-www-form-urlencoded' }}
            ).then((res) => {
            // console.log(res)
            if (res.status == "200"){
                // console.log("请求串口数据")
                console.log(res)
                var temp_lenght = res.data.indexs.length
                this.index = res.data.indexs[temp_lenght - 1]
                this.left_data = res.data.left_light_sum
                this.right_data = res.data.right_light_sum
                this.time = temp_lenght
                // this.created()
                // sessionStorage.setItem('left_sum', JSON.stringify(this.left_sum))
                // sessionStorage.setItem('right_sum', JSON.stringify(this.right_sum))
                // sessionStorage.setItem('time', this.time)
                

                // console.log("本次串口数据长度" + this.time)
                const sub_timer = setInterval(()=>{
                    this.left_1.push(this.left_data[this.nowTime][0])
                    this.left_2.push(this.left_data[this.nowTime][1])
                    this.left_3.push(this.left_data[this.nowTime][2])
                    this.left_4.push(this.left_data[this.nowTime][3])
                    this.right_1.push(this.right_data[this.nowTime][0])
                    this.right_2.push(this.right_data[this.nowTime][1])
                    this.right_3.push(this.right_data[this.nowTime][2])
                    this.right_4.push(this.right_data[this.nowTime][3])
                    this.changeColor()
                    this.nowTime = this.nowTime + 1
                    // console.log("子定时器")
                    if (this.nowTime >= this.time){
                        this.nowTime = 0
                        clearInterval(sub_timer)
                    }
                }, 100)
                
                this.getChart()
            }
        })
            this.left_1.push(Math.random() + 2)
            this.left_2.push(Math.random() + 2)
            this.left_3.push(Math.random() + 2)
            this.left_4.push(Math.random() + 2)
            if(this.left_1.length >= this.charts_xmax){
                this.charts_xmin = this.charts_xmin + 1
                this.charts_xmax = this.charts_xmax + 1
                this.getChart()
            }
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
        height: 350px;
        // width: 100%;
        width: 1290px;
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
        max-width:26%;
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
        max-width:57%;
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
        max-width:57%;
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
        max-width:30%;
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
        max-width:57%;
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
        max-width:57%;
        transform: rotate(90deg);
        // max-height:100%;
        // opacity: 0.2;
    }
    .left_1{
        position: absolute;
        top: 22%;
        left: 41.2%;
        width: 8%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(3deg);
    }
    .left_2{
        position: absolute;
        top: 23.5%;
        left: 49.5%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_3{
        position: absolute;
        top: 55.5%;
        left: 48.5%;
        width: 2%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(175deg);
    }
    .left_4{
        position: absolute;
        top: 58%;
        left: 51%;
        width: 2%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(173deg);
    }
    .left_13{
        position: absolute;
        top: 35%;
        left: 34.5%;
        width: 11%;
        height: 22%;
        background: #FFE4C4;
    }
    .left_23{
        position: absolute;
        top: 35%;
        left: 45.5%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_33{
        position: absolute;
        top: 51%;
        left: 52.5%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(100deg);
    }
    .left_43{
        position: absolute;
        top: 46.5%;
        left: 53.5%;
        width: 2%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(100deg);
    }
    .left_14{
        position: absolute;
        top: 30%;
        left: 34%;
        width: 11%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(0deg);
    }
    .left_24{
        position: absolute;
        top: 30%;
        left: 45%;
        width: 4%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_34{
        position: absolute;
        top: 55.5%;
        left: 47.5%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(135deg);
    }
    .left_44{
        position: absolute;
        top: 54.5%;
        left: 50.5%;
        width: 2%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(135deg);
    }
    .right_1{
        position: absolute;
        top: 25%;
        left: 46.3%;
        width: 12%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_2{
        position: absolute;
        top: 24%;
        left: 44%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_3{
        position: absolute;
        top: 54%;
        left: 46%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(8deg);
    }
    .right_4{
        position: absolute;
        top: 58%;
        left: 43.5%;
        width: 2%;
        height: 20%;
        background: #FFE4C4;
        transform: rotate(8deg);
    }
    .right_13{
        position: absolute;
        top: 35%;
        left: 47.3%;
        width: 12%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_23{
        position: absolute;
        top: 34%;
        left: 44.3%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_33{
        position: absolute;
        top: 51.5%;
        left: 40.5%;
        width: 2.5%;
        height: 14%;
        background: #FFE4C4;
        transform: rotate(80deg);
    }
    .right_43{
        position: absolute;
        top: 47%;
        left: 37%;
        width: 2%;
        height: 18%;
        background: #FFE4C4;
        transform: rotate(80deg);
    }
    .right_14{
        position: absolute;
        top: 30%;
        left: 48.6%;
        width: 12%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_24{
        position: absolute;
        top: 32%;
        left: 45.3%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_34{
        position: absolute;
        top: 53.5%;
        left: 43.5%;
        width: 2.5%;
        height: 14%;
        background: #FFE4C4;
        transform: rotate(50deg);
    }
    .right_44{
        position: absolute;
        top: 53.5%;
        left: 39.5%;
        width: 2%;
        height: 18%;
        background: #FFE4C4;
        transform: rotate(50deg);
    }
</style>