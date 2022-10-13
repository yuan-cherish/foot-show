<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <Upload
                name="file"
                ref=upload
                type="drag"
                action="http://localhost:8088/get_csv_data"
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
            <Table class="table" height="300" size="large" stripe border :columns="table_columns" :data="table_data"> </Table>
            <div class="split">
                <Split>
                    <div slot="left" class="left_foot">
                        <div style="height:40px;width:100%;text-align:left;padding:10px;font-size:25px;">Left Foot</div>
                        <div class="left_foot_points">
                            <img class="img_left" src="../resource/left.jpg" alt="左脚">
                            <List style="opacity: 1;  width: 100%;">
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
                            <List style="opacity: 1; width: 100%;">
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
        left_points: [
            [0, 0, 13.0, 11.0, 11.0, 0],
            [0, 12.0, 12.0, 10.0, 12.0, 10.0],
            [13.0, 13.0, 11.0, 11.0, 8.0, 6.0],
            [14.0, 13.0, 12.0, 11.0, 10.0, 7.0],
            [516.0, 0.0, 9.0, 7.0, 12.0, 8.0],
            [10.0, 8.0, 5.0, 0.0, 1.0, 0],
            [10.0, 6.0, 4.0, 0.0, 1.0, 0],
            [100.0, 0.0, 6.0, 0.0, 1.0, 0],
            [55.0, 6.0, 1142.0, 8.0, 295.0, 0],
            [1019.0, 56.0, 74.0, 3142.0, 1090.0, 0],
            [3298.0, 3298.0, 3299.0, 2823.0, 245.0, 0],
            [3298.0, 3298.0, 3298.0, 3297.0, 3298.0, 0],
            [3296.0, 3297.0, 3297.0, 3298.0, 3298.0, 0],
            [154.0, 3265.0, 3296.0, 3297.0, 135.0, 0],
            [0, 0, 17.0, 0, 0, 0]
        ],
        right_points: [
            [0, 1.0, 4.0, 4.0, 0, 0],
            [3.0, 0.0, 2.0, 3.0, 1.0, 0],
            [0.0, 0.0, 4.0, 3.0, 4.0, 3.0],
            [297.0, 65.0, 2.0, 5.0, 1.0, 0.0],
            [4.0, 1.0, 3.0, 3.0, 4.0, 4.0],
            [0, 5.0, 4.0, 3.0, 3.0, 3.0],
            [0, 4.0, 3.0, 4.0, 5.0, 4.0],
            [0, 5.0, 0.0, 4.0, 4.0, 3.0],
            [0, 4.0, 0.0, 5.0, 5.0, 4.0],
            [0, 5.0, 0.0, 3.0, 3.0, 4.0],
            [0, 4.0, 5.0, 4.0, 3.0, 2.0],
            [0, 5.0, 3.0, 4.0, 3.0, 3.0],
            [0, 0.0, 0.0, 3.0, 5.0, 4.0],
            [0, 11.0, 36.0, 1.0, 377.0, 95.0],
            [0, 0, 0, 4.0, 0, 0]
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
        right_tables: []
    }
    },
    computed: {
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    created() {
        // this.mounted()
        // this.left_points = this.left_sum[0]
        // this.right_points = this.right_sum[0]
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
            this.left_sum = res.left
            this.right_sum = res.right
            this.time = res.time
            // this.created()
            // sessionStorage.setItem('left_sum', JSON.stringify(this.left_sum))
            // sessionStorage.setItem('right_sum', JSON.stringify(this.right_sum))
            // sessionStorage.setItem('time', this.time)
            this.left_points = this.left_sum[0]
            this.right_points = this.right_sum[0]
            this.left_cop = res.left_cop
            this.right_cop = res.right_cop
            this.left_chart_datas = this.left_cop[0]
            this.right_chart_datas = this.right_cop[0]
            this.left_tables = res.left_chart
            this.right_tables = res.right_chart
            this.can_play = true
            
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
                case (point < 8000):
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
                this.left_points = this.left_sum[this.nowTime]
                this.right_points = this.right_sum[this.nowTime]
                this.left_chart_datas = this.left_cop.slice(0, this.nowTime)
                this.right_chart_datas = this.right_cop.slice(0, this.nowTime)
                this.getChart()
                for(var i=0;i<this.table_data.length; i++){
                    this.table_data[i]['left'] = this.left_tables[this.nowTime][i]
                    this.table_data[i]['right'] = this.right_tables[this.nowTime][i]
                }
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
                },30)
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
        // width: 1096px;
        // width: 90.6rem;
        width: 100%;
        height: 100%;
        min-height: 90%;
        margin: 1%;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        width: 100%;
        height: 100%;
        padding: 1%;
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
        display: flex;
        // width: 100%;
        height: 545px;
        border: 1% solid #dcdee2;
    }
    .split-pane{
        display: flex;
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
        display: flex;
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
        display: flex;
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