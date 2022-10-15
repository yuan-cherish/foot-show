<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex" >
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu 
                :unique-opened="true"
                :active-name="activeName" 
                theme="light" width="auto" 
                style="top:60px; background:#aeceef"
                accordion
                @on-select="turnUrl"
                @on-open-change="appStart"
                >
                    <Submenu name="1">
                        <template #title>
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">足底压力</span>
                        </template>
                        <Menu-item name="/footCsv" to="/footCsv">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">批量足底数据显示</span>
                        </Menu-item>
                        <Menu-item name="/footTime" to="/footTime">
                            <Icon type="ios-keypad" :size="iconSize"></Icon>
                            <span class="layout-text">实时足底数据显示</span>
                        </Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template #title>
                            <Icon type="ios-body" :size="iconSize"></Icon>
                            <span class="layout-text">脊柱压力</span>
                        </template>
                        <Menu-item name="/spinalCsv" to="/spinalCsv">
                            <Icon type="ios-body" :size="iconSize"></Icon>
                            <span class="layout-text">批量脊柱压力显示</span>
                        </Menu-item>
                        <Menu-item name="/spinalCsv" to="/spinalShow">
                            <Icon type="ios-body" :size="iconSize"></Icon>
                            <span class="layout-text">实时脊柱压力显示</span>
                        </Menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template #title>
                            <Icon type="ios-pulse" :size="iconSize"></Icon>
                            <span class="layout-text">肌肉收缩显示</span>
                        </template>
                        <Menu-item name="/muscleCsv" to="/muscleCsv">
                            <Icon type="ios-pulse" :size="iconSize"></Icon>
                            <span class="layout-text">批量肌肉收缩显示</span>
                        </Menu-item>
                        <Menu-item name="/muscleShow" to="/muscleShow">
                            <Icon type="ios-pulse" :size="iconSize"></Icon>
                            <span class="layout-text">实时肌肉收缩显示</span>
                        </Menu-item>
                    </Submenu>
                    
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <!-- <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button> -->
                    <div style="padding: 0%;width:80%;">
                        <span class="tittle">{{tittle}}</span>
                    </div>
                    <el-button type="info" @click="logout" class="logout" size="large">退出</el-button>
                </div>
                <!-- <div class="layout-breadcrumb">
                    <Breadcrumb-item v-if="model=='0'">批量数据展示</Breadcrumb-item>
                    <Breadcrumb-item v-if="model=='1'">实时数据展示</Breadcrumb-item>
                </div> -->
                
                <div id="app" class="layout-content">
                    
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2022 &copy; SHU
                </div>
            </i-col>
        </Row>
    </div>
    
</template>

<script>
// 创建路由实例对象
export default {
    name: 'app',
    data() {
    return {
        spanLeft: 5,
        spanRight: 19,
        model: "0",
        activeName: "/footCsv",
        tittle: "批量显示足底压力",
        appCode: "",
    }   
    },
    computed: {
        iconSize () {
            return this.spanLeft === 5 ? 20 : 24;
        }
    },
    created() {
        if (window.sessionStorage.getItem('activePath') != null){
            this.activeName = window.sessionStorage.getItem('activePath')
        }
        // console.log(this.activeName)
    },
    methods: {

        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
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
        turnUrl(e){
            this.activeName = e
            if (e == "/footCsv"){
                this.tittle = "批量显示足底压力"
            }else if (e == '/footTime'){
                this.tittle = "实时动态显示足底压力"
            }else if (e == '/spinalShow'){
                this.tittle = "脊柱传感器数据显示"
            }else{
                this.tittle = "肌肉收缩状态光电传感器数据显示"
            }
            window.sessionStorage.setItem('activePath', this.activeName)
            this.$router.path = e
        },
        appStart(e){
            this.appCode = e[0]
            // return this.$message.success("启动 " + this.appCode + "号app")
            this.$axios.get('/api/csv/appStart/' + this.appCode, {
                headers: {
                        // 'token': window.sessionStorage.getItem('token')
                }
            })
            .then((res) => {
                return this.$message.success(res['data'])
            })
        },
        mounted(){
        }
    },
    
}
</script>
<style lang="less" scoped>
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
        // background: #464c5b;
        // background: #aeceef;
        background: #2C8CF0;
        
    }
    .layout-header{
        height: 80px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border: 0em;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        // background: #2C8CF0;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
        
    }
    .layout-text{
        font-size: 18px;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .split{
        height: 500px;
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
        background-color:#dcdee2;
        // margin-top: 2%;
        // margin-left: 2%;
        // margin-right: 2%;
    }
    .right_foot{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        background-color: #dcdee2;
        // margin-top: 2%;
        // margin-left: 2%;
        // margin-right: 2%;
    }
    .left_foot_points{
        padding: 5px;
        text-align: center;
        height: 100%;
        width: 50%;
        border-bottom: 0cm solid #e8eaec;
        // align-content: center;
    }
    .img_left{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 2%;
        left: 34%;
        width: 33%;
        height: 450px;
        // opacity: 0.2;
    }
    .img_right{
        z-index: 1;
        position: absolute;
        padding: 0%;
        top: 2%;
        left: 34%;
        width: 33%;
        height: 450px;
        
        // opacity: 0.2;
    }
    .left_foot_points{
        padding: 5px;
        text-align: center;
        height: 100%;
        width: 30%;
        // border-bottom: 0cm solid #e8eaec;
    }
    .right_foot_points{
        padding: 5px;
        text-align: center;
        height: 100%;
        width: 33%;
        // border-bottom: 0cm solid #e8eaec;
    }
    .pointsLi{
        width: 80px;
        height: 25px;
        margin: 0%;
        border-radius: 5%;
        border: 0.1px solid black;
    }
    .pointsCi{
        height: 24px;
        padding: 0;
        margin: 0%;
    }
    .tittle{
        position: absolute;
        font-size: 25px;
        left: 30px;
        top: 30px;
        margin: 0%;
        padding: 0%;
    }
    .logout{
        position: relative;
        left: 90%;
        background-color: #2C8CF0;
        font-size: 20px;
        bottom: 10%;
    }

</style>