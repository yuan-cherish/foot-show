<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <Upload
                name="file"
                ref=upload
                type="drag"
                action="http://localhost:8088/get_csv_spnal"
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
        <div class="imges_block">
            <Row justify="center">
                <Col span="8">
                    <span style="position: relative; font-size: 26px; left: 30%;">左面视图</span>
                </Col>
                <Col span="8">
                    <span style="position: relative; font-size: 26px; left: 30%;">正面视图</span>
                </Col>
                <Col span="8">
                    <span style="position: relative; font-size: 26px; left: 40%;">右面视图</span>
                </Col>
                
            </Row>
            <Row justify="center">
                <Col span="8">
                    <div id="div1_1" class="div1_1"></div>
                    <div id="div1_2" class="div1_2"></div>
                    <img src="../resource/ji1.jpg" class="ji1" alt="">
                </Col>
                <Col span="8">
                    <div id="div2_1" class="div2_1"></div>
                    <div id="div2_2" class="div2_2"></div>
                    <img src="../resource/ji2.jpg" class="ji2" alt="">
                </Col>
                <Col span="8">
                    <div id="div3_1" class="div3_1"></div>
                    <div id="div3_2" class="div3_2"></div>
                    <div id="div3_3" class="div3_3"></div>
                    <div id="div3_4" class="div3_4"></div>
                    <img src="../resource/ji3.jpg" class="ji3" alt="">
                </Col>
            </Row>
            
        </div>
        <div class="layout-content-main">
            <Table height="350" size="large" stripe border :columns="table_columns" :data="table_data" class="table"></Table>
        </div>
        <div>
            <highcharts class="charts" :options="chartOptions1" ></highcharts>
            <highcharts class="charts" :options="chartOptions2" ></highcharts>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
        model: "0",
        haveUpload: false,
        file: '',
        uploadList: [],
        loadingStatus: false,
        playingStatus: false,
        playingTime: 0,
        timeOut: false,
        nowTime: 0,
        can_play: false,
        table_columns: [
            {
                title: ' ',
                key: 'name',
                align: "center",
            },
            {
                title: '实时数据',
                key: 'data',
                align: "center",
            },
            {
                title: '每时平均数据',
                key: 'hour',
                align: "center",
            },
            {
                title: '每日平均数据',
                key: 'day',
                align: "center",
            },

        ],
        table_data: [
            {
                name: '1号传感器压力',
                data: '0',
                hour: '0',
                day: '0'
            },
            {
                name: '2号传感器压力',
                data: '0',
                hour: '0',
                day: '0'
            },
            {
                name: '3号传感器压力',
                data: '0',
                hour: '0',
                day: '0'
            },
            {
                name: '4号传感器压力',
                data: '0',
                hour: '0',
                day: '0'
            },
            {
                name: '5号传感器压力',
                data: '0',
                hour: '0',
                day: '0'
            },
            // {
            //     name: '一个小时内的平均压力',
            //     data: '0',
            // },
            // {
            //     name: '一天内的压力数据',
            //     data: '0',
            // },
        ],
        chartOptions1: {},
        chartOptions2: {},
        data_sum: [],
        loadingStatus: false,
        index: 0,
        colors: [
            "#FFDEAD",
            "#F4A460",
            "#FF4500"
        ]
    }
    },
    created() {
        this.getChart()
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
                },
                title: {
                    text: "每小时各传感器平均压力",
                    style: {
                        fontSize:'25px'
                    }
                    
                },
                xAxis: {
                    title: {
                        text: "时间(h)",
                        style: {
                            fontSize:'20px'
                        }
                    },
                    labels: {
                        style: {
                            fontSize:'15px'
                        }
                    },
                    min: 1,
                    max: 24,
                    tickInterval: 1
                },
                yAxis: {
                    title: {
                        text: "每小时平均压力/(N)",
                        style: {
                            fontSize:'20px'
                        }
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
                        name: '1号传感器',
                        data: [0, 13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658],
                        color: 'red'
                    }, 
                    {
                        name: '2号传感器',
                        data: [0, 23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658],
                        color: 'orange'
                    }, 
                    {
                        name: '3号传感器',
                        data: [0, 33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658],
                        color: 'yellow'
                    }, 
                    {
                        name: '4号传感器',
                        data: [0, 43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658],
                        color: 'green'
                    }, 
                    {
                        name: '5号传感器',
                        data: [0, 53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658],
                        color: 'blue'
                    }, 
                    // {
                    //     name: '一天内的压力数据',
                    //     data: [0, 24916, 24064, 29742, 29851, 32490]
                    // },
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
                },
                title: {
                    text: "每天各传感器平均压力",
                    style: {
                        fontSize:'25px'
                    }
                    
                },
                xAxis: {
                    title: {
                        text: "时间(day)",
                        style: {
                            fontSize:'20px'
                        }
                    },
                    labels: {
                        style: {
                            fontSize:'15px'
                        }
                    },
                    min: 1,
                    max: 14,
                    tickInterval: 1
                },
                yAxis: {
                    title: {
                        text: "每天平均压力/(N)",
                        style: {
                            fontSize:'20px'
                        }
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
                        name: '1号传感器',
                        data: [0, 13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658, 17031,
                                13934, 12503, 17177, 19658],
                        color: 'red'
                    }, 
                    {
                        name: '2号传感器',
                        data: [0, 23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658, 27031,
                                23934, 22503, 27177, 29658],
                        color: 'orange'
                    }, 
                    {
                        name: '3号传感器',
                        data: [0, 33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658, 37031,
                                33934, 32503, 37177, 39658],
                        color: 'yellow'
                    }, 
                    {
                        name: '4号传感器',
                        data: [0, 43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658, 47031,
                                43934, 42503, 47177, 49658],
                        color: 'green'
                    }, 
                    {
                        name: '5号传感器',
                        data: [0, 53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658, 57031,
                                53934, 52503, 57177, 59658],
                        color: 'blue'
                    }, 
                    // {
                    //     name: '一天内的压力数据',
                    //     data: [0, 24916, 24064, 29742, 29851, 32490]
                    // },
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
            this.data_sum = res.data_sum
            this.time = res.time
            // this.created()
            // sessionStorage.setItem('left_sum', JSON.stringify(this.left_sum))
            // sessionStorage.setItem('right_sum', JSON.stringify(this.right_sum))
            // sessionStorage.setItem('time', this.time)
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
            const timer = setInterval(()=>{
                // this.playingStatus=true
                if (this.timeOut) {
                    clearInterval(timer)
                }
                for(var i=0;i<this.table_data.length; i++){
                    this.table_data[i]['data'] = this.data_sum[this.nowTime][i]
                }
                this.getChart()
                this.changecolor()
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
                },300)

        },
        changecolor(){
            if (this.table_data[0]['data'] < 1000){
                document.getElementById("div1_2").style.background= this.colors[0];
                document.getElementById("div2_2").style.background= this.colors[0];
                document.getElementById("div3_4").style.background= this.colors[0];
            }else if(this.table_data[0]['data'] < 3000){
                document.getElementById("div1_2").style.background= this.colors[1];
                document.getElementById("div2_2").style.background= this.colors[1];
                document.getElementById("div3_4").style.background= this.colors[1];
            }else{
                document.getElementById("div1_2").style.background= this.colors[2];
                document.getElementById("div2_2").style.background= this.colors[2];
                document.getElementById("div3_4").style.background= this.colors[2];
            }

            if (this.table_data[1]['data'] < 1000){
                document.getElementById("div1_1").style.background= this.colors[0];
                document.getElementById("div2_1").style.background= this.colors[0];
            }else if(this.table_data[1]['data'] < 3000){
                document.getElementById("div1_1").style.background= this.colors[1];
                document.getElementById("div2_1").style.background= this.colors[1];
            }else{
                document.getElementById("div1_1").style.background= this.colors[2];
                document.getElementById("div2_1").style.background= this.colors[2];
            }

            if(this.table_data[2]['data'] < 1000){
                document.getElementById("div3_1").style.background= this.colors[0];
            }else if (this.table_data[2]['data'] < 3000){
                document.getElementById("div3_1").style.background= this.colors[1];
            }else{
                document.getElementById("div3_1").style.background= this.colors[2];
            }

            if(this.table_data[3]['data'] < 1000){
                document.getElementById("div3_2").style.background= this.colors[0];
            }else if (this.table_data[3]['data'] < 3000){
                document.getElementById("div3_2").style.background= this.colors[1];
            }else{
                document.getElementById("div3_2").style.background= this.colors[2];
            }

            if(this.table_data[4]['data'] < 1000){
                document.getElementById("div3_3").style.background= this.colors[0];
            }else if (this.table_data[4]['data'] < 3000){
                document.getElementById("div3_3").style.background= this.colors[1];
            }else{
                document.getElementById("div3_3").style.background= this.colors[2];
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
        width: 1125px;
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
    .imges_block{
        height: 400px;
        width: 1125px;
        margin: 5px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .ji1{
        width: 80%;
        position: relative;
        top: 5%;
    }
    .ji2{
        position: relative;
        width: 73%;
        left: 7%;
        top: 5%;
    }
    .ji3{
        position: relative;
        width: 83%;
        left: 14.5%;
        top: 5%;
    }
    .div1_1{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 25%;
        left: 25%;
    }
    .div1_2{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 78%;
        left: 23%;
    }

    .div2_1{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 23%;
        left: 20%;
    }
    .div2_2{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 73%;
        left: 15%;
    }

    .div3_1{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 13%;
        left: 60%;
    }
    .div3_2{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 50%;
        left: 50%;
    }
    .div3_3{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 50%;
        left: 58%;
    }
    .div3_4{
        position: absolute;
        background-color: #FFDEAD;
        width: 40px;
        height: 40px;
        top: 73%;
        left: 60%;
    }
</style>