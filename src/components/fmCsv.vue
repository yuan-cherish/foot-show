<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <Upload
                name="file"
                ref=upload
                type="drag"
                action="/api/csv/get_csv_eight"
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
                    <p style="font-size:18px;">点击或将文件拖拽到这里上传,只支持csv文件（单文件上传）</p>
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
        <div class="layout-content-main">
            <div class="split">
                <Split>
                    <div slot="left" class="left_foot">
                        <div style="height:40px;width:100%;text-align:left;padding:10px;font-size:25px;">Left Foot</div>
                        <div class="left_foot_points">
                            <img class="img_left" src="../resource/left.jpg" alt="左脚">
                            <List style="opacity: 1; width: 100%; position: relative;top: 80px;left: 10px;">
                            <ListItem class="pointsCi" v-bind:key=index v-for="(item,index) in left_points">
                                <li class="pointsLi"  :style="{'background-color': getColor(point)}" v-bind:key=index v-for="(point, index) in item"></li>
                            </ListItem>
                            </List>
                        </div>
                        <!-- <highcharts class="left_charts" :options="left_chartOptions" ></highcharts> -->
                    </div>
                    <div slot="right" class="right_foot">
                        <div style="height:40px;width:100%;text-align:left;padding:10px;font-size:25px;">Right Foot</div>
                        <div class="right_foot_points">
                            <img class="img_right" src="../resource/right.jpg" alt="右脚">
                            <List style="opacity: 1; width: 100%; position: relative;top: 80px;left: 10px;">
                                <ListItem class="pointsCi" v-bind:key=index v-for="(item,index) in right_points">
                                    <li class="pointsLi" :style="{'background-color': getColor(point)}" v-bind:key=index v-for="(point, index) in item"></li>
                                </ListItem>
                            </List>
                        </div>
                        <!-- <highcharts class="right_charts" :options="right_chartOptions" ></highcharts> -->
                    </div>
                </Split>
            </div>
            <div class="splitM">
                <Split>
                    <div slot="left">
                        <img v-bind:class="left_tui_class" v-bind:src=leftSrc alt="左腿">
                        <div id="left_1" v-bind:class="left_1_class"></div>
                        <div id="left_2" v-bind:class="left_2_class"></div>
                        <div id="left_3" v-bind:class="left_3_class"></div>
                        <div id="left_4" v-bind:class="left_4_class"></div>
                    </div>
                    <div slot="right">
                        <img v-bind:class="right_tui_class" v-bind:src=rightSrc alt="右腿">
                        <div id="right_1" v-bind:class="right_1_class"></div>
                        <div id="right_2" v-bind:class="right_2_class"></div>
                        <div id="right_3" v-bind:class="right_3_class"></div>
                        <div id="right_4" v-bind:class="right_4_class"></div>
                    </div>
                </Split>
        </div>
            <Table class="table" height="800" size="large" stripe border :columns="table_columns" :data="table_data"> </Table>
            <div class="chartsM">
                <highcharts class="charts" :options="chartOptions1" ></highcharts>
                <highcharts class="charts" :options="chartOptions2" ></highcharts>
            </div>
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
        haveUpload: false,
        model: "0",
        file: '',
        uploadList: [],
        loadingStatus: false,
        playingStatus: false,
        time: 0,
        left_points: [
            // [0, 2895.0], [2773.0, 2776.0], [2801.0, 0], [2753.0, 0], [2997.0, 3058.0], [2986.0, 0]
        ],
        right_points: [
            // [2895.0, 0], [2773.0, 2776.0], [0, 2801.0], [0, 2753.0], [2997.0, 3058.0], [0, 2986.0]
        ],
        playingTime: 0,
        timeOut: false,
        nowTime: 1,
        left_sum: [],
        right_sum: [],
        can_play: false,
        color: [
        '#373290', 
        '#0068b7',
        '#049fe8',
        '#008568',
        '#019a44',
        '#8bc21f',
        '#fff100',
        '#f9be00',
        '#f18300',
        '#e94e2f',
        '#e70012',
        'c4143a'
        ],
        left_chartOptions: {},
        left_chart_datas: [
        ],
        right_chartOptions: {},
        right_chart_datas: [],
        left_cop: [],
        right_cop: [],
        table_columns: [
            {
                title: ' ',
                key: 'name',
                align: "center",
            },
            {
                title: '左脚',
                key: 'left',
                align: "center",
            },
            {
                title: '右脚',
                key: 'right',
                align: "center",
            },
        ],
        table_data: [
            {
                name: '最大压强 gr/cm2',
                left: '0',
                right: '0'
            },
            {
                name: '平均压强 g/cm2',
                left: '0',
                right: '0'
            },
            {
                name: '面积 cm2',
                left: '0',
                right: '0'
            },
            {
                name: '足印长度 mm',
                left: '0',
                right: '0'
            },
            {
                name: '压力中心连线增量 mm',
                left: '0',
                right: '0'
            },
            {
                name: '前足负荷比 %',
                left: '0',
                right: '0'
            },
            {
                name: '后足负荷比 %',
                left: '0',
                right: '0'
            },
            {
                name: '负荷比 左内侧 %',
                left: '0',
                right: '0'
            },
            {
                name: '负荷比 左外侧 %',
                left: '0',
                right: '0'
            },
        ],
        left_tables: [],
        right_tables: [],
        // 光电
        chartOptions1: {},
        chartOptions2: {},
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
        color_m: [
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
        this.getChart_m()
        this.leftSrc = this.left_imgs[0]
        this.rightSrc = this.right_imgs[0]
        this.getChart()
    },
    mounted(){
        this.getChart()
    },
    methods: {
        getChart() {
            var template1 = {
                chart: {
                    type: 'spline',
                    zoomType: 'xy',
                    width: 140,
                    height: 400,
                    backgroundColor: 'rgba(0,0,0,0)',
                },
                title: {
                text: ""
                },
                xAxis: {
                    title: {
                        text: ""
                    },
                    lineColor: 'red',
                    enabled: false,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    lineWidth :2,
                    tickWidth:0,
                    labels: {
                        enabled: false
                    },
                    min: -27,
                    max: 27,
                    tickInterval: 0
                },
                yAxis: {
                    title: {
                        text: ""
                    },
                    lineWidth :2,
                    lineColor: 'red',
                    gridLineWidth: 0,
                    labels: {
                        enabled: false,
                    },
                    min: 0,
                    max: 210,
                    offset: -50,
                    tickInterval: 0
                },
                legend: {
                    enabled: false,
                },
                credits: {
                enabled: false
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 3,
                        }
                    }
                    
                },
                series: [
                {
                    color: 'rgb(136, 0, 0)',
                    data: this.left_chart_datas
                }
                ]
            };
            var template2 = {
                chart: {
                    type: 'spline',
                    zoomType: 'xy',
                    width: 140,
                    height: 400,
                    backgroundColor: 'rgba(0,0,0,0)',
                },
                title: {
                text: ""
                },
                xAxis: {
                    title: {
                        text: ""
                    },
                    lineColor: 'red',
                    enabled: false,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    lineWidth :2,
                    tickWidth:0,
                    labels: {
                        enabled: false
                    },
                    min: -27,
                    max: 27,
                    tickInterval: 0
                },
                yAxis: {
                    title: {
                        text: ""
                    },
                    lineWidth :2,
                    lineColor: 'red',
                    gridLineWidth: 0,
                    labels: {
                        enabled: false,
                    },
                    min: 0,
                    max: 210,
                    offset: -50,
                    tickInterval: 0
                },
                legend: {
                    enabled: false,
                },
                credits: {
                enabled: false
                },
                plotOptions: {
                scatter: {
                        marker: {
                            radius: 2,
                        }
                }
                },
                series: [
                {   
                    color: 'rgb(136, 0, 0)',
                    data: this.right_chart_datas
                }
                ]
            };
            this.left_chartOptions = template1;
            this.right_chartOptions = template2;
        },
        getChart_m() {
            var template1 = {
                chart: {
                    type: 'line',
                    zoomType: 'xy',
                    maxWidth: 300,
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
                },
                legend: {
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
                },
                legend: {
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
            this.left_sum = res.left
            this.right_sum = res.right
            this.time = res.time
            this.left_points = this.left_sum[0]
            this.right_points = this.right_sum[0]
            this.can_play = true
            // 光电
            this.left_data = res.left_data
            this.right_data = res.right_data
            this.left_1.push(this.left_data[0][0])
            this.left_2.push(this.left_data[0][1])
            this.left_3.push(this.left_data[0][2])
            this.left_4.push(this.left_data[0][3])
            this.right_1.push(this.right_data[0][0])
            this.right_2.push(this.right_data[0][1])
            this.right_3.push(this.right_data[0][2])
            this.right_4.push(this.right_data[0][3])
            this.changeColor()
            this.getChart_m()
        },

        getColor(point){
            switch(true){
                case (point==0):
                    // return "#dcdee2"
                    return "#ADCEEF"
                case (point < 10):
                    return this.color[0]
                case (point < 50):
                    return this.color[1]
                case (point < 100):
                    return this.color[2]
                case (point < 500):
                    return this.color[3]
                case (point < 800):
                    return this.color[4]
                case (point < 1100):
                    return this.color[5]
                case (point < 1400):    
                    return this.color[6]
                case (point < 1800):
                    return this.color[7]
                case (point < 2200):
                    return this.color[8]
                case (point < 2400):
                    return this.color[9]
                case (point < 2800):
                    return this.color[10]
                default:
                    return this.color[11]
            }
            
        },
        play(){
            this.mounted()
            this.getChart()
            this.getChart_m()
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
                if (this.timeOut) {
                    clearInterval(timer)
                }
                this.left_points = this.left_sum[this.nowTime]
                this.right_points = this.right_sum[this.nowTime]
                // 光电
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
                // this.left_chart_datas = this.left_cop.slice(0, this.nowTime)
                // this.right_chart_datas = this.right_cop.slice(0, this.nowTime)
                this.changeColor()
                this.getChart_m()
                this.getChart()
                // for(var i=0;i<this.table_data.length; i++){
                //     this.table_data[i]['left'] = this.left_tables[this.nowTime][i]
                //     this.table_data[i]['right'] = this.right_tables[this.nowTime][i]
                // }
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
                    // 光电
                    this.left_1.length = 0
                    this.left_2.length = 0
                    this.left_3.length = 0
                    this.left_4.length = 0
                    this.right_1.length = 0
                    this.right_2.length = 0
                    this.right_3.length = 0
                    this.right_4.length = 0
                    this.charts_xmin = 0
                    this.charts_xmax = 100
                    this.getChart_m()
                }
                },30)
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
                this.leftSrc = this.left_imgs[3]
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
                document.getElementById("left_1").style.background= this.color[2];
            }else if(this.left_4[this.left_4.length-1] > 1.36){
                this.leftSrc = this.left_imgs[4]
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
                this.rightSrc = this.right_imgs[0]
                document.getElementById("right_4").style.background= this.color[0];
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
                this.rightSrc = this.right_imgs[3]
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
                document.getElementById("right_1").style.background= this.color[2];
            }else if(this.right_4[this.right_4.length-1] > 1.36){
                this.rightSrc = this.right_imgs[4]
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
                this.leftSrc = this.left_imgs[3]
                this.left_1_class = "left_13"
                this.left_2_class = "left_23"
                this.left_3_class = "left_33"
                this.left_4_class = "left_43"
                this.right_1_class = "right_13"
                this.right_2_class = "right_23"
                this.right_3_class = "right_33"
                this.right_4_class = "right_43"
                
                console.log(this.leftSrc)
            }else if(this.left_4[this.left_4.length-1] > 1.36){
                
                this.left_tui_class = "left_tui4"
                this.right_tui_class = "right_tui4"
                this.leftSrc = this.left_imgs[4]
                this.left_1_class = "left_14"
                this.left_2_class = "left_24"
                this.left_3_class = "left_34"
                this.left_4_class = "left_44"
                this.right_1_class = "right_14"
                this.right_2_class = "right_24"
                this.right_3_class = "right_34"
                this.right_4_class = "right_44"
                
            }else{
                
                this.left_tui_class = "left_tui"
                this.right_tui_class = "right_tui"
                this.leftSrc = this.left_imgs[0]
                this.left_1_class = "left_1"
                this.left_2_class = "left_2"
                this.left_3_class = "left_3"
                this.left_4_class = "left_4"
                this.right_1_class = "right_1"
                this.right_2_class = "right_2"
                this.right_3_class = "right_3"
                this.right_4_class = "right_4"
                
            }
            
            if (this.right_4[this.right_4.length-1] > 1.365){
                
                    this.left_tui_class = "left_tui3"
                    this.right_tui_class = "right_tui3"
                    this.rightSrc = this.right_imgs[3]
                    this.left_1_class = "left_13"
                    this.left_2_class = "left_23"
                    this.left_3_class = "left_33"
                    this.left_4_class = "left_43"
                    this.right_1_class = "right_13"
                    this.right_2_class = "right_23"
                    this.right_3_class = "right_33"
                    this.right_4_class = "right_43"
                    
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
        },
        rowClassName() {
            return "demo-table-error-row";
        }
    }
    
}
</script>
<style lang="less" scoped>

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        width: 100%;
        height: 100%;
        min-height: 90%;
        margin: 10px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        width: 1390px;
        height: 100%;
        // padding: 10px;
    }
    .layout-menu-left{
        background: #464c5b;
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
    .split{
        float: left;
        // display: flex;
        // width: 100%;
        width: 700px;
        height: 535px;
        // border: 1% solid #dcdee2;
    }
    .split-pane{
        display: flex;
        // padding: 10px;
    }
    .left_foot{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color:#aeceef;
    }
    .right_foot{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color: #aeceef;
    }
    
    .img_left{
        display: flex;
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 15%;
        left: 29.2%;
        width: 43%;
        height: 70%;
    }

    .img_right{
        display: flex;
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 15%;
        left: 29.2%;
        width: 43%;
        height: 70%;
    }
    .left_foot_points{
        padding: 1%;
        text-align: center;
        height: 100%;
        width: 30%;
    }
    .right_foot_points{
        padding: 1%;
        text-align: center;
        width: 30%;
        border-bottom: 0cm solid #e8eaec;
    }
    .pointsLi{
        width: 50.5px;
        height: 50.5px;
        // width: 20%;
        margin: 0%;
        border-radius: 5%;
        border: 0.1px solid black;
    }
    
    .pointsCi{
        width: 80px;
        height: 50.5px;
        padding: 0;
        margin: 0%;
    }
    
    .left_charts{
        position: absolute;
        top: 7%;
        left: 36%
    }

    .right_charts{
        position: absolute;
        top: 7%;
        left: 36%
    }
    .ivu-table-large{
        padding: 0px;
        margin: 0px;
        bottom: 10px;
        font-size: 20px !important;
    }
    .ivu-table-row{
        height: 100px !important;
    }
    .table{
        float: left;
        width: 700px;
    }
    .tableM{
        padding: 0px;
        margin: 0px;
        bottom: 10px;
    }
    .splitM{
        float: right;
        height: 525px;
        width: 670px;
        // widows: 40%;
        border: 5px solid #dcdee2;
        background: #CED0CD;
    }
    .left_tui{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 10%;
        left: 15%;
        width:auto;
        height:auto;
        max-width:60%;
    }
    .left_tui4{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 15%;
        left: 0%;
        width:auto;
        height:auto;
        max-width:100%;
        transform: rotate(270deg);
    }
    .left_tui3{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 10%;
        left: 0%;
        width:auto;
        height:auto;
        max-width:100%;
        transform: rotate(270deg);
    }
    .right_tui{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 10%;
        left: 15%;
        width:auto;
        height:auto;
        max-width:68%;
    }
    .right_tui4{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 15%;
        left: 0%;
        width:auto;
        height:auto;
        max-width:100%;
        transform: rotate(90deg);
    }
    .right_tui3{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 10%;
        left: 0%;
        // width: 33%;
        // height: 90%;
        width:auto;
        height:auto;
        max-width:100%;
        transform: rotate(90deg);
        // max-height:100%;
        // opacity: 0.2;
    }
    .left_1{
        position: absolute;
        top: 30%;
        left: 35.2%;
        width: 15%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(3deg);
    }
    .left_2{
        position: absolute;
        top: 31%;
        left: 51%;
        width: 5%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_3{
        position: absolute;
        top: 58.5%;
        left: 50%;
        width: 4%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(175deg);
    }
    .left_4{
        position: absolute;
        top: 61%;
        left: 54%;
        width: 3%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(173deg);
    }
    .left_13{
        position: absolute;
        top: 30%;
        left: 40.5%;
        width: 12%;
        height: 15%;
        background: #FFE4C4;
    }
    .left_23{
        position: absolute;
        top: 29%;
        left: 52.5%;
        width: 5%;
        height: 10%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_33{
        position: absolute;
        top: 36%;
        left: 67%;
        width: 4%;
        height: 12%;
        background: #FFE4C4;
        transform: rotate(100deg);
    }
    .left_43{
        position: absolute;
        top: 37%;
        left: 62.5%;
        width: 4%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(100deg);
    }
    .left_14{
        position: absolute;
        top: 30%;
        left: 40%;
        width: 12.5%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(0deg);
    }
    .left_24{
        position: absolute;
        top: 30%;
        left: 53%;
        width: 5%;
        height: 10%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .left_34{
        position: absolute;
        top: 45.5%;
        left: 61.5%;
        width: 2.5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(135deg);
    }
    .left_44{
        position: absolute;
        top: 46.5%;
        left: 68%;
        width: 2%;
        height: 19%;
        background: #FFE4C4;
        transform: rotate(135deg);
    }
    .right_1{
        position: absolute;
        top: 30%;
        left: 45.3%;
        width: 15%;
        height: 22%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_2{
        position: absolute;
        top: 30%;
        left: 39%;
        width: 5%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_3{
        position: absolute;
        top: 60%;
        left: 42%;
        width: 5%;
        height: 17%;
        background: #FFE4C4;
        transform: rotate(8deg);
    }
    .right_4{
        position: absolute;
        top: 60%;
        left: 36%;
        width: 5%;
        height: 20%;
        background: #FFE4C4;
        transform: rotate(8deg);
    }
    .right_13{
        position: absolute;
        top: 30%;
        left: 48.3%;
        width: 11%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_23{
        position: absolute;
        top: 30%;
        left: 45%;
        width: 3%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_33{
        position: absolute;
        top: 40.5%;
        left: 35.5%;
        width: 4%;
        height: 10%;
        background: #FFE4C4;
        transform: rotate(80deg);
    }
    .right_43{
        position: absolute;
        top: 36%;
        left: 31%;
        width: 4%;
        height: 15%;
        background: #FFE4C4;
        transform: rotate(80deg);
    }
    .right_14{
        position: absolute;
        top: 30%;
        left: 50%;
        width: 11%;
        height: 20%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_24{
        position: absolute;
        top: 32%;
        left: 46.7%;
        width: 3%;
        height: 10%;
        background: #FFE4C4;
        transform: rotate(1deg);
    }
    .right_34{
        position: absolute;
        top: 45.5%;
        left: 40.5%;
        width: 2.5%;
        height: 14%;
        background: #FFE4C4;
        transform: rotate(50deg);
    }
    .right_44{
        position: absolute;
        top: 43%;
        left: 35.5%;
        width: 3%;
        height: 18%;
        background: #FFE4C4;
        transform: rotate(50deg);
    }
    .chartsM{
        float: right;
        width: 600px;
    }
</style>