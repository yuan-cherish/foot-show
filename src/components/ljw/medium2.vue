<template>
    <div class="layout">
        <div class="layout-left">
            <div class="layout-left1">
                <div style="background: #000000; width: 200px; height: 30px;position: absolute;">
                    <Icon type="md-flag" style="position: absolute; top:20%; left: 168px;" size=24 color="#D3D3D3"/>
                </div>
                <div style="font-size: 14px; width: 80%; position: absolute; top: 6%; left: 2px; color:#FFFFFF">CT.2001225</div>
                <div style="font-size: 14px; width: 80%; left: 2%; top: 9%; position: absolute; color:#1E90FF">1. New Description</div>
                <div style="background: #003366; width: 20%; height: 100%;float: right;border-left: 1px solid #000;">
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
                <div style="background: #003366; width: 20%; height: 100%;float: right;border-left: 1px solid #000;">
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
                <div class="image-left">
                    <img src="../../resource/2.jpeg" alt=".." class="image" style="width: 605px; height: 320px; position: relative; top: 10px; left: 5px;">
                    <div style="background: white; width: 605px; height: 310px; position: relative; border: 2px solid #000; left:5px;top: 10px;">
                        <div style="background: #003366; width: 100%; height: 20px;position: absolute; border-bottom: 1px solid #000;">
                        <span style="font-size: 13px; color: white; position: relative; left: 2%;">病灶列表</span>
                        <Icon type="md-arrow-dropright" size=26 color="#D3D3D3" style="position: relative; left: 84%;"/>
                        </div>
                        <div style="background: #003366; width: 100%; height: 20px; position: absolute; top: 20px; border-bottom: 1px solid #000;">
                            <Icon type="md-checkbox" size=20 color="#1E90FF" style="position: relative; top: 5%; left: 2%;"/>
                            <Row type="flex" align="middle" justify="center" style="width: 80%; height: 20px; float: right;">
                                <Col align="center" span="4" style="font-size: 13px; color: white">显隐</Col>
                                <Col align="center" span="3" style="font-size: 13px; color: white">编号</Col>
                                <Col align="center" span="6" style="font-size: 13px; color: white">名称</Col>
                                <Col align="center" span="3" style="font-size: 13px; color: white">层面</Col>
                                <Col align="center" span="4" style="font-size: 13px; color: white">直径</Col>
                                <Col align="center" span="3" style="font-size: 13px; color: white">类型</Col>
                                <Col span="1"></Col>
                            </Row>
                        </div>
                        <div style="background: #003366; width: 100%; height: 20px;position: absolute; top: 40px; border-bottom: 1px solid #000;">
                            <Icon type="md-checkbox" size=20 color="#1E90FF" style="position: relative; top: 5%; left: 2%;"/>
                            <Row type="flex" align="middle" justify="center" style="width: 80%; height: 20px; float: right;">
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
                        <div style="background: #003366; width: 100%; height: 20px;position: relative; border-bottom: 1px solid #000; top: 63px; left: 0;">
                            <span style="font-size: 16px; color: white; position: relative; left: 2px;">病灶1</span>
                        </div>
                        <div style="background: #003366; width: 100%; height: 222px; position: relative; border-bottom: 1px solid #000; top: 63px;">
                            <el-form  :label-position="left" label-width="50px" size='mini'>
                                <el-form-item color="white" label="名称: " style="position: relative; width: 90%; height: 10px; top: 0px;" class="item">
                                    <el-input style="font-size: 10px; color: black;" placeholder="肺结节" ></el-input>
                                </el-form-item>
                                <el-form-item color="white" label="位置: " style="position: relative; width: 90%; height: 10px; top: 2px;" class="item">
                                    <el-input style="font-size: 10px; color: black;" placeholder="左肺上叶" ></el-input>
                                </el-form-item>
                                
                                <el-form-item color="white" label="大小: " style="position: relative; width: 90%; height: 10px; top: 6px;" class="item">
                                    <el-col :span="2" align="left" type="flex">
                                        <el-input style="width: 50px; font-size: 10px; color: black" placeholder="7"></el-input>
                                    </el-col>
                                    <el-col align="middle" type="flex" class="line" :span="2"><span style="color: white; font-size: 20px;">*</span></el-col>
                                    <el-col :span="2" align="right" type="flex">
                                        <el-input style="width: 45px; font-size: 10px; color: black" placeholder="5"></el-input>
                                    </el-col >
                                    <el-col :span="2" align="right" type="flex">
                                        <span style="color: white; font-size: 10px;">mm</span>
                                    </el-col>
                                    <el-col :span="16" align="right" type="flex">
                                    </el-col>
                                </el-form-item>
                                <el-form-item color="white" label="CT值: " style="position: absolute; width: 90%; height: 10px; top: 95px;" class="item">
                                    <el-input style="font-size: 10px; color: black;" placeholder="54HU" ></el-input>
                                </el-form-item>
                                <el-form-item color="white" label="类型: " style="position: absolute; width: 90%; height: 10px; top: 125px;" class="item">
                                    <el-input style="font-size: 10px; color: black;" placeholder="实性" ></el-input>
                                </el-form-item>
                                <el-form-item color="white" label="密度: " style="position: absolute; width: 90%; height: 10px; top: 155px;" class="item">
                                    <el-input style="font-size: 10px; color: black;" placeholder="均匀" ></el-input>
                                </el-form-item>
                                <el-form-item color="white" label="特征: " style="position: absolute; width: 90%; height: 10px; top: 185px;" class="item">
                                    <el-input style="font-size: 10px; color: black;" placeholder="" ></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div style="width: 58px; height: 223px; position: absolute; border: 2px solid black; top: 82px; left: 544px;">
                            <div class="box" style="position: absolute; top: 10px; left: 10%;">
                                <Icon type="md-add" style="position: relative; top:10%; left: 10px;" size=30 color="#D3D3D3"/>
                                <div class="title" style="left: 12px;">新增</div>
                            </div>
                            <div class="box" style="position: absolute; top: 80px; left: 10%;">
                                <Icon type="md-time" style="position: relative; top:10%; left: 10px;" size=30 color="#D3D3D3"/>
                                <div class="title">清除历史</div>
                            </div>
                            <div class="box" style="position: absolute; top: 160px; left: 10%;">
                                <Icon type="md-clipboard" style="position: relative; top:10%; left: 10px;" size=30 color="#D3D3D3"/>
                                <div class="title">生成报告</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-right">   
                    <img src="../../resource/3.jpeg" alt=".." class="image" style="width: 605px; height: 320px; position: relative; top: 10px; left: 5px;">
                    <div style="background: white; width: 605px; height: 310px; position: relative; border: 0px solid #000;left:5px;top: 10px;">
                        <div style="background: #003366; width: 605px; height: 155px; position: relative; border: 2px solid #000;">
                            <div>
                                <span style="position: relative; font-size: 18px; left: 2px; color: #1E90FF;">
                                    影像所见
                                </span>
                                <span style="position: relative; font-size: 16px; left: 285px; color: white;">
                                    文本报告
                                </span>
                                <Icon type="md-arrow-dropdown" size=26 color="white" style="position: relative; left: 280px; top: 0px;"></Icon>
                                <Button style="position: relative; left: 285px;" icon="md-qr-scanner" shape="circle">最大</Button>
                                <Button style="position: relative; left: 295px;" shape="circle">复制</Button>
                            </div>
                            <span style="position: relative; font-size: 16px; left: 6px; top: 10px; color: white;">
                                平扫肺窗显示双肺纹理清晰，走向和分布正常，肺野内未见明显异常密度。纵隔窗显示双肺门无增大，气管支气管通畅，纵隔未见肿大淋巴结。胸膜、肋骨及胸壁软组织未见异常。
                            </span>
                        </div>
                        <div style="background: #003366; width: 605px; height: 150px; position: relative; border: 2px solid #000; top: 5px;">
                            <div>
                                <span style="position: relative; font-size: 18px; left: 2px; color: #1E90FF;">
                                    复查后处理建议
                                </span>
                                <span style="position: relative; font-size: 16px; left: 285px; color: white;">
                                    文本报告
                                </span>
                                <Icon type="md-arrow-dropdown" size=26 color="white" style="position: relative; left: 280px; top: 0px;"></Icon>
                                <Button style="position: relative; left: 315px;" shape="circle">复制</Button>
                            </div>
                            <span style="position: relative; font-size: 16px; left: 6px; top: 10px; color: white;">
                                肺部CT扫描未见明显异常。
                            </span>
                        </div>
                    </div>
                </div>
            </div>
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

        }
    }
    }
</script>
<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #003366;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #003366;
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
        background: #003366;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border: 1px solid #000;
    }
    .layout-image{
        position: absolute;
        width: 1235px;
        height: 610px;
        /* background: #000; */
        left: 14%;
    }
    .image-left{
        float: left;
        width: 50%;
        height: 650px;
        background: white;
        border: 1px solid black
    }
    .image-right{
        float: right;
        width: 50%;
        height: 650px;
        background: white;
        border: 1px solid black
    }
    .image{
        position: relative;
        left: 80px;
        /* width: 80%; */
        height: 100%;
    }
    .layout-left{
        float: left;
        width: 200px;
        height: 650px;
        background: #003366;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
    }
    .layout-left1{
        float: left;
        width: 100%;
        height: 325px;
        background: #003366;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
        border: 1px solid #000
    }
    .layout-left2{
        float: left;
        width: 100%;
        height: 365px;
        background: #003366;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
        border: 1px solid #000;
    }
    .layout-right{

        float: right;
        width: 247px;
        height: 610px;
        background: #003366;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border: 1px solid #000;
    }
    .layout-copy{
        height: 50px;
        text-align: center;
        padding: 10px 0 20px;
        color: white;
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
