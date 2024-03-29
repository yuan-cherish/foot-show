<template>
    <div :class="window=='default'?'layout1':'layout2'">
        <Row type="flex" >
            <i-col>
                <div class="layout-header">
                    <Menu 
                    mode="horizontal" 
                    theme="light" 
                    :active-name="activeName"
                    @on-select="turnUrl"
                    width="auto" >
                        <MenuItem name="/userMessage" to="/userMessage">
                            <Icon type="ios-construct" />
                            用户信息
                        </MenuItem>
                        <Submenu name="1">
                            <template #title>
                                <Icon type="ios-navigate" />
                                足底压力
                            </template>
                            <MenuItem name="/footCsv" to="/footCsv">离线显示</MenuItem>
                            <MenuItem name="/footTime" to="/footTime">实时显示</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template #title>
                                <Icon type="ios-body" />
                                脊柱压力
                            </template>
                            <MenuItem name="/spinalCsv" to="/spinalCsv">离线显示</MenuItem>
                            <MenuItem name="/spinalTime" to="/spinalShow">实时显示</MenuItem>
                            </Submenu>
                        <Submenu name="3">
                            <template #title>
                                <Icon type="ios-pulse" />
                                肌肉收缩
                            </template>
                            <MenuItem name="/muscleCsv" to="/muscleCsv">离线显示</MenuItem>
                            <MenuItem name="/muscleShow" to="/muscleShow">实时显示</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template #title>
                                <Icon type="ios-timer-outline" />
                                足底肌肉同步
                            </template>
                            <MenuItem name="/fmCsv" to="/fmCsv">实时显示</MenuItem>
                            <!-- <MenuItem name="/fmTime" to="/fmTime">实时显示</MenuItem> -->
                        </Submenu>
                        
                        <el-button type="info" @click="logout" class="logout" size="large">退出</el-button>
                        <el-button type="Primary" @click="changeWindow" class="window" size="large">切换窗口</el-button>
                    </Menu>
                    
                </div>
                
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
        activeName: "/userMessage",
        tittle: "",
        appCode: "",
        window: "default",
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
            }else if (e == '/spinalCsv'){
                this.tittle = "批量脊柱压力显示"
            }else if (e == '/spinalTime'){
                this.tittle = "实时脊柱压力显示"
            }else if (e == '/muscleCsv'){
                this.tittle = "批量肌肉收缩显示"
            }else if (e == '/muscleShow'){
                this.tittle = "实时肌肉收缩显示"
            }
            window.sessionStorage.setItem('activePath', this.activeName)
            this.$router.path = e
        },
        changeWindow(){
            console.log(this.window)
            if (this.window == "default"){
                this.window = "large"
            } else{
                this.window = "default"
            }
        },
        // appStart(e){
        //     this.appCode = e[0]
        //     // return this.$message.success("启动 " + this.appCode + "号app")
        //     this.$axios.get('/api/csv/appStart/' + this.appCode, {
        //         headers: {
        //                 // 'token': window.sessionStorage.getItem('token')
        //         }
        //     })
        //     .then((res) => {
        //         // return this.$message.success(res['data'])
        //         // console.log(res['data'])
        //     })
        // },
        mounted(){
        }
    },
    
}
</script>
<style lang="less" scoped>
    .layout1{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        zoom: 100%;
    }
    .layout2{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        zoom: 50%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        // min-height: 600px;
        width: 100%;
        margin: 0px;
        overflow: hidden;
        background: #fff;
        border-radius: 0px;
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
        background: #2C8CF0;
        
    }
    .layout-header{
        width: 1410px;
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
        left: 32%;
        top: 5%;
        background-color: #2C8CF0;
        font-size: 20px;
        bottom: 10%;
    }
    .window{
        position: relative;
        left: 32%;
        top: 5%;
        background-color: #2CB6F5;
        font-size: 20px;
        bottom: 10%;
    }

</style>