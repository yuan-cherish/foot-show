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
        <div class="imges_block">
            <Row justify="center">
                <Col span="8">
                    <span style="position: relative; font-size: 26px; left: 30%;">左侧视图</span>
                </Col>
                <Col span="8">
                    <span style="position: relative; font-size: 26px; left: 30%;">正视图</span>
                </Col>
                <Col span="8">
                    <span style="position: relative; font-size: 26px; left: 40%;">右侧视图</span>
                </Col>
                
            </Row>
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
        playingStatus: false,
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
        nowTime: 0,
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
        play(){
            console.log("开始接收")
            this.playingStatus = !this.playingStatus
            const timer = setInterval(async ()=>{
                if(!this.playingStatus){
                    clearInterval(timer)
                }
                // console.log("调用一次mounted")
                await this.mounted()
            }, 1000)
        },
        mounted(){
            const paramsList = new URLSearchParams()
            paramsList.append('index', this.index)
            this.$axios.post('http://192.168.1.28:5002/get_data', 
            paramsList,{
            headers: { 'content-type': 'application/x-www-form-urlencoded' }}
            ).then((res) => {
            // console.log(res)
            if (res.status == "200"){
                // console.log("请求串口数据")
                var temp_lenght = res.data.indexs.length
                this.index = res.data.indexs[temp_lenght - 1]
                this.data_sum = res.data.jizhu_sum
                this.time = temp_lenght
                var small_time = Math.floor(1000/temp_lenght)
                // console.log("本次串口数据长度" + this.time)
                const sub_timer = setInterval(()=>{
                    for(var i=0;i<this.table_data.length; i++){
                        this.table_data[i]['data'] = this.data_sum[this.nowTime][i]
                    }
                    this.changecolor()
                    this.nowTime = this.nowTime + 1
                    // console.log("子定时器")
                    if (this.nowTime >= this.time){
                        this.nowTime = 0
                        clearInterval(sub_timer)
                    }
                }, 10)
                this.getChart()
            }
        })

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
        background-color: red;
        width: 40px;
        height: 40px;
        top: 25%;
        left: 25%;
    }
    .div1_2{
        position: absolute;
        background-color: red;
        width: 40px;
        height: 40px;
        top: 78%;
        left: 23%;
    }

    .div2_1{
        position: absolute;
        background-color: red;
        width: 40px;
        height: 40px;
        top: 23%;
        left: 20%;
    }
    .div2_2{
        position: absolute;
        background-color: red;
        width: 40px;
        height: 40px;
        top: 73%;
        left: 15%;
    }

    .div3_1{
        position: absolute;
        background-color: red;
        width: 40px;
        height: 40px;
        top: 13%;
        left: 60%;
    }
    .div3_2{
        position: absolute;
        background-color: red;
        width: 40px;
        height: 40px;
        top: 50%;
        left: 50%;
    }
    .div3_3{
        position: absolute;
        background-color: red;
        width: 40px;
        height: 40px;
        top: 50%;
        left: 58%;
    }
    .div3_4{
        position: absolute;
        background-color: red;
        width: 40px;
        height: 40px;
        top: 73%;
        left: 60%;
    }
</style>