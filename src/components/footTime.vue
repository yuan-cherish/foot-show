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
        <div class="layout-content-main">
            <Table class="table" height="300" size="large" stripe border :columns="table_columns" :data="table_data" ></Table>
            <div class="split">
                <Split>
                    <div slot="left" class="left_foot">
                        <div style="height:40px;width:100%;text-align:left;padding:10px;font-size:25px;">Left Foot</div>
                        <div class="left_foot_points">
                            <img class="img_left" src="../resource/left.jpg" alt="左脚">
                            <List style="opacity: 1;">
                            <ListItem class="pointsCi" v-bind:key=index v-for="(item,index) in left_points">
                                <li class="pointsLi"  :style="{'background-color': getColor(point)}" v-bind:key=index v-for="(point, index) in item"></li>
                            </ListItem>
                            </List>
                        </div>
                        
                        <highcharts class="left_charts" :options="left_chartOptions" ></highcharts>
                        
                    </div>
                    <div slot="right" class="right_foot">
                        <div style="height:40px;width:100%;text-align:left;padding:10px;font-size:25px;">Right Foot</div>
                        <div class="right_foot_points">
                            <img class="img_right" src="../resource/right.jpg" alt="右脚">
                            <List style="opacity: 1;">
                            <ListItem class="pointsCi" v-bind:key=index v-for="(item,index) in right_points">
                                <li class="pointsLi" :style="{'background-color': getColor(point)}" v-bind:key=index v-for="(point, index) in item"></li>
                            </ListItem>
                            </List>
                        </div>
                        <highcharts class="right_charts" :options="right_chartOptions" ></highcharts>
                    </div>
                </Split>
            
            </div>
        </div>
    </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import loadExporting from "highcharts/modules/exporting";
import exportExcel from "highcharts/modules/export-data.src";
loadExporting(Highcharts);
exportExcel(Highcharts);
export default {
    name: 'foot_vue',
    data() {
    return {
        spanLeft: 5,
        spanRight: 19,
        haveUpload: false,
        model: "0",
        file: '',
        uploadList: [],
        loadingStatus: false,
        playingStatus: false,
        time: 0,
        left_points: [],
        left_points: [
                    // [0, 0, 2144, 2061, 2088, 0],
                    // [0, 2036, 1996, 2019, 2094, 2005],
                    // [1957, 1928, 1946, 2054, 2077, 2087],
                    // [2106, 2087, 2100, 2100, 2106, 2002],
                    // [2031, 1990, 2054, 2034, 2040, 2041],
                    // [2046, 2048, 2116, 2084, 2004, 0],
                    // [2120, 2124, 2125, 2128, 1996, 0],
                    // [2046, 2025, 2095, 2050, 2058, 0],
                    // [2057, 2094, 2092, 2131, 2113, 0],
                    // [2038, 2002, 2007, 2007, 2035, 0],
                    // [2033, 2062, 2045, 2122, 2095, 0],
                    // [2097, 2118, 2118, 2116, 2009, 0],
                    // [2129, 2052, 2034, 2039, 2051, 0],
                    // [2051, 2050, 2102, 2060, 2003, 0],
                    // [0, 0, 2120, 0, 0, 0]
                    ],
        right_points: [],
        right_points:[
                    // [0, 2015, 2053, 2103, 0, 0],
                    // [2102, 2015, 2051, 2105, 2107, 0],
                    // [2090, 2091, 2168, 2184, 2134, 2092],
                    // [2135, 2106, 2015, 1989, 2058, 2068],
                    // [2046, 2034, 2005, 1998, 2054, 2084],
                    // [0, 2007, 2017, 2130, 2119, 2098],
                    // [0, 2090, 2002, 2025, 2097, 2102],
                    // [0, 2059, 2049, 2036, 2029, 2097],
                    // [0, 2113, 2038, 2043, 2008, 2000],
                    // [0, 2123, 2117, 2038, 2045, 2122],
                    // [0, 2128, 2100, 2092, 2054, 2049],
                    // [0, 2120, 2128, 2052, 2056, 2039],
                    // [0, 2032, 2003, 1997, 2054, 2058],
                    // [0, 2004, 2007, 2125, 2117, 2096],
                    // [0, 0, 0, 2093, 0, 0]
                    ],
        // playingTime: 0,
        timeOut: false,
        nowTime: 0,
//         left_sum: [[[1130, 2889, 6, 2874, 2907, 0, 0], [1825, 2894, 2904, 9, 2868, 2735, 11], [726, 2677, 2900, 8,
// 2870, 2904, 168], [4, 625, 1713, 0, 2101, 1742, 0], [5, 8, 11, 3, 9, 119, 0], [4, 5, 10, 4, 9, 6, 3], [3, 5, 10, 4, 2,
// 0, 1], [4, 5, 7, 2, 1, 0, 2], [3, 3, 8, 3, 2, 0, 1], [483, 11, 9, 2, 5, 0, 2], [0, 2, 9, 4, 8, 6, 2], [4, 6, 11, 3, 8,
// 6, 4], [4, 5, 10, 3, 9, 6, 2], [3, 6, 11, 2, 8, 6, 0], [5, 8, 4, 9, 0, 0, 0]], [[1116, 2889, 7, 2872, 2906, 0, 0],
// [1831, 2894, 2902, 9, 2869, 2732, 11], [744, 2695, 2901, 8, 2870, 2902, 179], [1, 651, 1773, 0, 2146, 1783, 0], [4, 8,
// 12, 3, 10, 128, 0], [5, 5, 9, 3, 8, 7, 3], [3, 5, 10, 4, 2, 0, 1], [4, 5, 7, 2, 1, 0, 2], [3, 3, 8, 3, 2, 0, 1], [483,
// 11, 9, 2, 5, 0, 2], [0, 2, 9, 4, 8, 6, 2], [4, 6, 11, 3, 8, 6, 4], [4, 5, 10, 3, 9, 6, 2], [3, 6, 11, 2, 8, 6, 0], [6,
// 9, 2, 8, 0, 0, 0]], [[1135, 2890, 8, 2874, 2906, 0, 0], [1847, 2894, 2902, 8, 2869, 2730, 11], [731, 2704, 2902, 9,
// 2869, 2902, 202], [0, 686, 1820, 0, 2207, 1833, 0], [4, 8, 12, 4, 10, 130, 0], [5, 6, 9, 3, 8, 7, 4], [4, 5, 10, 3, 9,
// 6, 2], [3, 6, 10, 3, 8, 5, 3], [4, 5, 8, 4, 6, 0, 1], [485, 11, 11, 3, 4, 0, 2], [0, 4, 7, 1, 2, 0, 1], [3, 3, 8, 3, 1,
// 0, 3], [2, 4, 9, 2, 9, 8, 2], [4, 5, 10, 4, 8, 6, 0], [5, 9, 3, 8, 0, 0, 0]]],
//         right_sum: [[[481, 2151, 2762, 1934, 2768, 0, 0], [11, 2735,
// 2768, 2768, 2768, 2769, 598], [0, 2078, 2270, 2764, 2768, 2771, 266], [0, 5, 325, 1652, 1931, 518, 0], [4, 4, 7, 10, 9,
// 8, 3], [3, 5, 8, 11, 9, 7, 3], [4, 7, 6, 10, 6, 5, 4], [4, 5, 7, 9, 9, 6, 4], [3, 6, 8, 8, 6, 4, 4], [196, 64, 7, 9, 9,
// 8, 3], [0, 2, 8, 11, 8, 8, 4], [5, 5, 7, 10, 9, 8, 4], [4, 5, 8, 11, 8, 7, 4], [4, 5, 7, 10, 8, 8, 0], [5, 7, 11, 10, 0,
// 0, 0]], [[481, 2151, 2762, 1934, 2768, 0, 0], [11, 2735, 2768, 2768, 2768, 2769, 598], [0, 2078, 2270, 2764, 2768, 2771,
// 266], [0, 5, 325, 1652, 1931, 518, 0], [4, 4, 8, 11, 9, 8, 4], [3, 5, 7, 11, 9, 6, 4], [4, 6, 8, 10, 9, 7, 3], [4, 6, 6,
// 10, 8, 5, 3], [3, 5, 8, 9, 6, 5, 3], [187, 64, 5, 11, 7, 6, 4], [0, 2, 8, 9, 9, 5, 3], [4, 4, 8, 11, 7, 8, 4], [4, 5, 8,
// 11, 8, 7, 4], [4, 5, 7, 10, 8, 8, 0], [5, 7, 11, 10, 0, 0, 0]], [[474, 2042, 2761, 1914, 2767, 0, 0], [11, 2737, 2767,
// 2768, 2769, 2768, 553], [0, 2047, 2254, 2763, 2768, 2770, 182], [0, 5, 315, 1640, 1898, 499, 0], [4, 5, 9, 10, 8, 7, 3],
// [4, 6, 7, 10, 9, 8, 3], [3, 5, 7, 10, 8, 6, 4], [4, 6, 7, 10, 9, 8, 4], [3, 5, 8, 11, 8, 7, 4], [194, 64, 8, 10, 9, 6,
// 5], [0, 0, 7, 9, 7, 5, 3], [3, 5, 9, 10, 7, 4, 3], [5, 6, 6, 9, 8, 6, 2], [2, 5, 8, 11, 8, 7, 0], [5, 7, 10, 9, 0, 0,
// 0]]],
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
        index: 0,
        left_chartOptions: {},
        left_chart_datas: [
            // [5.5187, 193.5684],
            // [9.5573, 175.6985],
            // [16.5863, 155.6762],
            // [13.8623, 142.6942],
            // [12.8853, 130.8527],
            // [11.8451, 115.8652],
            // [8.6973, 107.8852],
            // [5.8841, 86.6676],
            // [-2.1456, 72.3842],
            // [-5.1351, 65.8672]
        ],
        // left_chart_datas: [],
        right_chartOptions: {},
        right_chart_datas: [
            // [-2.070148001476659, 110.35201530355405], [-2.0509542963582863, 110.16666441702885], [-2.1335098641655885, 110.28905239327297], [-2.0643200214959863, 110.32892217781212], [-2.0541235027516995, 110.31138718031725], [-2.0783974121373454, 110.31694578292954], [-2.0664051743244967, 110.28776471062335], [-2.1115720877519633, 110.40658139723145], [-2.115204309163689, 110.34316820245547], [-2.052791919137575, 110.4150386356147], [-2.09505446637807, 109.95039608841584], [-2.09585570368583, 110.40035390400354], [-2.084922708981344, 110.36018756760025], [-2.0253159429682435, 109.94167206740117], [-2.089995036421931, 110.44507867941994]
        ],
        // left_chart_datas: [],
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
                name: '足印轴角 度',
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
        data_left_sum: [
            // [77.66666666666667, 2.3115384615384613, 2340, 0, 0, 77.66666666666667, 3.5496394897393237, 96.45036051026068, 55.79589572933998, 44.20410427066002],
            // [77.66666666666667, 2.3115384615384613, 2340, 0, 0, 77.66666666666667, 3.5496394897393237, 96.45036051026068, 55.79589572933998, 44.20410427066002]
        ],
        data_right_sum: [
            // [77.66666666666667, 2.3115384615384613, 2340, 0, 0, 77.66666666666667, 3.5496394897393237, 96.45036051026068, 55.79589572933998, 44.20410427066002],
            // [77.66666666666667, 2.3115384615384613, 2340, 0, 0, 77.66666666666667, 3.5496394897393237, 96.45036051026068, 55.79589572933998, 44.20410427066002]
        ]
    }
    },
    computed: {
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    created() {
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

        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        },

        getColor(point){
            switch(true){
                case (point==0):
                    return "#dcdee2"
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
            // this.mounted()
            // this.can_play = false
            this.playingStatus = !this.playingStatus
            const timer = setInterval(async ()=>{
                if(!this.playingStatus){
                    clearInterval(timer)
                }
                // console.log("调用一次mounted")
                await this.mounted()
            }, 1000)
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
            const paramsList = new URLSearchParams()
            paramsList.append('index', this.index)
            this.$axios.post('/api/python/get_foot_data', 
            paramsList,{
            headers: { 'content-type': 'application/x-www-form-urlencoded' }}
            ).then((res) => {
            // console.log(res)
            if (res.status == "200"){
                // console.log("请求串口数据")
                var temp_lenght = res.data.indexs.length
                this.index = res.data.indexs[temp_lenght - 1]
                this.left_sum = res.data.left_sum
                this.right_sum = res.data.right_sum
                this.left_chart_datas = res.data.cop_left_sum
                this.right_chart_datas = res.data.cop_right_sum
                this.data_left_sum = res.data.data_left_sum
                this.data_right_sum = res.data.data_right_sum
                this.time = temp_lenght
                // console.log("本次串口数据长度" + this.time)
                const sub_timer = setInterval(()=>{
                    this.left_points = this.left_sum[this.nowTime]
                    this.right_points = this.right_sum[this.nowTime]
                    for(var i=0;i<this.table_data.length; i++){
                        this.table_data[i]['left'] = this.data_left_sum[this.nowTime][i]
                        this.table_data[i]['right'] = this.data_right_sum[this.nowTime][i]
                    }
                    this.nowTime = this.nowTime + 1
                    // console.log("子定时器")
                    if (this.nowTime >= this.time){
                        this.nowTime = 0
                        clearInterval(sub_timer)
                    }
                }, 1000)
                this.getChart()
            }
        })

        }
    }
}
</script>
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
        // width: 1096px;
        // width: 90.6rem;
        width: 100%;
        height: 100%;
        min-height: 90%;
        margin: 10px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        width: 100%;
        height: 100%;
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
        height: 20%;
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
    .split{
        width: 100%;
        height: 545px;
        border: 5px solid #dcdee2;
    }
    .split-pane{
        padding: 10px;
    }
    .left_foot{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color:#aeceef;
        // margin-top: 2%;
        // margin-left: 2%;
        // margin-right: 2%;
    }
    .right_foot{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color: #aeceef;
        // margin-top: 2%;
        // margin-left: 2%;
        // margin-right: 2%;
    }
    
    .img_left{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 2%;
        left: 32.2%;
        // width: 33%;
        // max-width: 50rem;
        // height: 90%;
        // opacity: 0.2;
        width: 33%;
        height: 85%;
        // width:auto;
        // height:auto;
        // max-width:100%;
        // max-height:90%;
    }

    .img_right{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 2%;
        left: 32.2%;
        width: 33%;
        height: 85%;
        // width:auto;
        // height:auto;
        max-width:33%;
        max-height:90%;
        
        // opacity: 0.2;
    }
    .left_foot_points{
        padding: 1%;
        text-align: center;
        height: 100%;
        width: 30%;
        // border-bottom: 0cm solid #e8eaec;
    }
    .right_foot_points{
        padding: 1%;
        text-align: center;
        // height: 100%;
        width: 30%;
        border-bottom: 0cm solid #e8eaec;
    }
    .pointsLi{
        width: 25.5px;
        height: 27.5px;
        // width: 20%;
        margin: 0%;
        border-radius: 5%;
        border: 0.1px solid black;
    }
    
    .pointsCi{
        width: 145px;
        height: 25px;
        padding: 0;
        margin: 0%;
    }
    
    .left_charts{
        position: absolute;
        top: 7%;
        left: 38%
    }

    .right_charts{
        position: absolute;
        top: 7%;
        left: 38%
    }
    .ivu-table-large{
        padding: 0px;
        margin: 0px;
        bottom: 10px;
        font-size: 20px !important;
    }

</style>