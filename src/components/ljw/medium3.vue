<template>
    <div class="layout">
        <div class="layout-left">
            <div class="layout-left1">
                <div style="background: #000000; width: 200px; height: 30px;position: absolute;">
                    <Icon type="md-flag" style="position: absolute; top:20%; left: 168px;" size=24 color="#D3D3D3"/>
                </div>
                <div style="font-size: 14px; width: 80%; position: absolute; top: 6%; left: 2px; color:#FFFFFF">CT.2001225</div>
                <div style="font-size: 14px; width: 80%; left: 2%; top: 9%; position: absolute; color:#1E90FF">1. New Description</div>
                <div style="background: #464c5b; width: 20%; height: 100%;float: right;border-left: 1px solid #000;">
                    <Icon type="ios-color-wand" style="position: absolute; top:7%; left: 168px;" size=26 color="#D3D3D3"/>
                    <Icon type="ios-color-filter-outline" style="position: absolute; top:11%; left: 168px;" size=26 color="#D3D3D3"/>
                    <Icon type="ios-trash" style="position: absolute; top:15%; left: 168px;" size=26 color="#D3D3D3"></Icon>
                </div>
            </div>
            <div class="layout-left2">
                <div style="background: #000000; width: 200px; height: 30px;position: absolute;">
                </div>
                <div style="font-size: 14px; width: 159px; position: absolute; top: 44%; left: 0px; color:#FFFFFF; padding: 5px">
                    <Icon type="md-eye" size=20 color="#D3D3D3"/>
                    No Description
                </div>
                <div style="font-size: 14px; width: 159px; height: 30px; left: 0px; top: 356px; position: absolute; color:#FFFFFF; background-color:#1E90FF; padding: 5px">
                    <Icon type="md-eye" size=20 color="#D3D3D3"/>
                    name_1
                </div>
                <div style="background: #464c5b; width: 20%; height: 100%;float: right;border-left: 1px solid #000;">
                    <Icon type="ios-create-outline" style="position: absolute; top: 356px; left: 168px;" size=26 color="#D3D3D3"/>
                    <Icon type="md-add" style="position: absolute; top: 386px; left: 168px;" size=26 color="#D3D3D3"/>
                    <Icon type="md-move" style="position: absolute; top: 416px; left: 168px;" size=26 color="#D3D3D3"></Icon>
                    <Icon type="ios-trash" style="position: absolute; top: 446px; left: 168px;" size=26 color="#D3D3D3"></Icon>
                </div>
            </div>
        </div>
        <div style="height: 700px">
            <div class="layout-header">
                <Icon type="md-contacts" style="position: relative; top:10%; left: 20px;" size=26 color="#D3D3D3"/>
                <Icon type="ios-share" style="position: relative; top:10%; left: 40px;" size=26 color="#D3D3D3"/>
                <Icon type="md-book" style="position: relative; top:10%; left: 60px;" size=26 color="#D3D3D3"/>
                <Icon type="ios-folder-outline" style="position: relative; top:10%; left: 80px;" size=26 color="#D3D3D3"/>
                <Icon type="md-albums" style="position: relative; top:10%; left: 100px;" size=26 color="#D3D3D3"/>
                <Icon type="md-document" style="position: relative; top:10%; left: 120px;" size=26 color="#D3D3D3"/>
                <Icon type="ios-log-out" style="position: relative; top:10%; left: 140px;" size=26 color="#D3D3D3"/>
                <Icon type="md-images" style="position: relative; top:10%; left: 160px;" size=26 color="#D3D3D3"/>
                <Icon type="md-create" style="position: relative; top:10%; left: 180px;" size=26 color="#D3D3D3"/>
                <Icon type="md-brush" style="position: relative; top:10%; left: 200px;" size=26 color="#D3D3D3"/>
                <Icon type="md-contacts" style="position: relative; top:10%; left: 220px;" size=26 color="#D3D3D3"/>
                <Icon type="ios-undo-outline" style="position: relative; top:10%; left: 240px;" size=26 color="#D3D3D3"/>
                <Icon type="ios-share-alt-outline" style="position: relative; top:10%; left: 260px;" size=26 color="#D3D3D3"/>
                <Icon type="md-search" style="position: relative; top:10%; left: 280px;" size=26 color="#D3D3D3"/>
                <Icon type="ios-link" style="position: relative; top:10%; left: 300px;" size=26 color="#D3D3D3"/>
                <Icon type="ios-pie" style="position: relative; top:10%; left: 320px;" size=26 color="#D3D3D3"/>
                <Icon type="md-refresh" style="position: relative; top:10%; left: 340px;" size=26 color="#D3D3D3"/>
                <Icon type="md-open" style="position: relative; top:10%; left: 360px;" size=26 color="#D3D3D3"/>
                <Icon type="md-options" style="position: relative; top:10%; left: 380px;" size=26 color="#D3D3D3"/>
                <Icon type="md-information" style="position: relative; top:10%; left: 400px;" size=26 color="#D3D3D3"/>
            
            </div>
            <div class="layout-image">
                <img src="../../resource/Result1.png" alt=".." class="image1">
                <img src="../../resource/Result2.png" alt=".." class="image2">
                <!-- <el-image :src="require('~@/1.png')">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image> -->
            </div>
            <!-- <div class="layout-right">
                <div style="background: #161823; width: 250px; height: 20px;position: absolute; border-bottom: 1px solid #000;">
                    <span style="font-size: 13px; color: white">病灶列表</span>
                    <Icon type="md-arrow-dropright" size=26 color="#D3D3D3" style="position: relative; left: 170px;"/>
                </div>
                <div style="background: #161823; width: 250px; height: 30px;position: absolute; top: 62px; border-bottom: 1px solid #000;">
                    <Icon type="md-checkbox" size=20 color="#1E90FF" style="float: left; position: relative; top: 20%;"/>
                    <Row type="flex" align="middle" justify="center" style="width: 220px; height: 30px; float: right;">
                        <Col align="center" span="4" style="font-size: 13px; color: white">显隐</Col>
                        <Col align="center" span="3" style="font-size: 13px; color: white">编号</Col>
                        <Col align="center" span="6" style="font-size: 13px; color: white">名称</Col>
                        <Col align="center" span="3" style="font-size: 13px; color: white">层面</Col>
                        <Col align="center" span="4" style="font-size: 13px; color: white">直径</Col>
                        <Col align="center" span="3" style="font-size: 13px; color: white">类型</Col>
                        <Col span="1"></Col>
                    </Row>
                </div>
                <div style="background: #177cb0; width: 250px; height: 30px;position: absolute; top: 93px; border-bottom: 1px solid #000;">
                    <Icon type="md-checkbox" size=20 color="#1E90FF" style="float: left; position: relative; top: 20%;"/>
                    <Row type="flex" align="middle" justify="center" style="width: 220px; height: 30px; float: right;">
                        <Col align="center" span="4" style="font-size: 13px; color: white">
                            <Icon type="md-eye" size=10 color="#D3D3D3"/>
                        </Col>
                        <Col align="center" span="3" style="font-size: 13px; color: white"></Col>
                        <Col align="center" span="6" style="font-size: 13px; color: white;">肺结节</Col>
                        <Col align="center" span="3" style="font-size: 13px; color: white">142</Col>
                        <Col align="center" span="4" style="font-size: 13px; color: white">7</Col>
                        <Col align="center" span="3" style="font-size: 13px; color: white">实性</Col>
                        <Col span="1"></Col>
                    </Row>
                </div>
                <div style="background: #161823; width: 250px; height: 20px;position: absolute; border-bottom: 1px solid #000; top:124px;">
                    <span style="font-size: 13px; color: white">病灶1</span>
                </div>
                <div style="background: #5b6270; width: 250px; height: 420px;position: absolute; border-bottom: 1px solid #000; top:145px;">
                    <el-form label-width="70px" style="width: 230px; height: 337px;" size='mini'>
                        <el-form-item color="white" label="名称: " style="position: relative; top: 20px;" class="item">
                            <el-input style="font-size: 14px; color: black" placeholder="肺结节"></el-input>
                        </el-form-item>
                        <el-form-item color="white" label="位置: " style="width: 180px; position: relative; top: 20px;" class="item">
                            <el-select style="font-size: 14px; color: black" placeholder="左肺上叶"></el-select>
                        </el-form-item>
                        <el-form-item color="white" label="大小: " style="position: relative; top: 20px;" class="item">
                            <el-col :span="11" align="left" type="flex">
                                <el-input style="width: 50px; font-size: 14px; color: black" placeholder="7"></el-input>
                            </el-col>
                            <el-col align="middle" type="flex" class="line" :span="2"><span style="color: white; font-size: 20px;">*</span></el-col>
                            <el-col :span="9" align="right" type="flex">
                                <el-input style="width: 45px; font-size: 14px; color: black" placeholder="5"></el-input>
                            </el-col >
                            <el-col :span="2" align="right" type="flex">
                                <span style="color: white; font-size: 10px;">mm</span>
                            </el-col>
                        </el-form-item>
                        <el-form-item color="white" label="CT值: " style="position: relative; top: 20px;" class="item">
                            <el-input style="width: 130px; font-size: 14px; color: black" placeholder="54HU"></el-input>
                        </el-form-item>
                        <el-form-item color="white" label="类型: " style="position: relative; top: 20px;" class="item">
                            <el-input style="font-size: 14px; color: black" placeholder="实性"></el-input>
                        </el-form-item>
                        <el-form-item color="white" label="密度: " style="position: relative; top: 20px;" class="item">
                            <el-input style="font-size: 14px; color: black" placeholder="均匀"></el-input>
                        </el-form-item>
                        <el-form-item color="white" label="特征: " style="position: relative; top: 20px;" class="item">
                            <el-input style="font-size: 14px; color: black" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item color="white" label="备注 : " style="position: relative; top: 20px;" class="item">
                            <el-input style="font-size: 14px; color: black" placeholder=""></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="background: #5b6270; width: 250px; height: 83px; position: absolute; border-bottom: 1px solid #000; top:567px;">
                    <div class="box" style="position: absolute; top: 20px; left: 10%;">
                        <Icon type="md-add" style="position: relative; top:10%; left: 10px;" size=30 color="#D3D3D3"/>
                        <div class="title" style="left: 12px;">新增</div>
                    </div>
                    <div class="box" style="position: absolute; top: 20px; left: 40%;">
                        <Icon type="md-time" style="position: relative; top:10%; left: 10px;" size=30 color="#D3D3D3"/>
                        <div class="title">清除历史</div>
                    </div>
                    <div class="box" style="position: absolute; top: 20px; left: 70%;">
                        <Icon type="md-clipboard" style="position: relative; top:10%; left: 10px;" size=30 color="#D3D3D3"/>
                        <div class="title">生成报告</div>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="layout-copy">
            2022 &copy; SHU
        </div>
    </div>
</template>
<script>
    export default {
        data() {
        return {
            // src: '/Users/yuan/VSProject/foot-show/src/components/ljw/1.png'
        }
    }
    }
</script>
<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #5b6270;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-header{
        
        height: 40px;
        /* width: 80%; */
        /* position: relative; */
        /* left: 20%; */
        /* align-self: center; */
        background: #5b6270;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border: 1px solid #000;
    }
    .layout-image{
        position: absolute;
        width: 1600px;
        height: 610px;
        background: #000;
        left: 14%;
        border: 1px solid #000
    }
    .image1{
        position: absolute;
        left: 2px;
        /* width: 80%; */
        top: 10%;
        height: 75%;
    }
    .image2{
        position: absolute;
        left: 40%;
        /* width: 80%; */
        top: 10%;
        height: 75%;
    }
    .layout-left{
        float: left;
        width: 200px;
        height: 650px;
        background: #464c5b;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
    }
    .layout-left1{
        float: left;
        width: 100%;
        height: 325px;
        background: #464c5b;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
        border: 1px solid #000
    }
    .layout-left2{
        float: left;
        width: 100%;
        height: 325px;
        background: #464c5b;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
        border: 1px solid #000;
    }
    .layout-right{

        float: right;
        width: 247px;
        height: 610px;
        background: #464c5b;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border: 1px solid #000;
    }
    .layout-copy{
        height: 50px;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .item .el-form-item__label{
        color: white;
    }
    .line{
        color: white;
        align-content: center;
    }
    .box{
        width: 50px;
        height: 30px;
    }
    .title {
        position: relative;
        color: white;
        font-size: 6px;
    }
    
</style>
