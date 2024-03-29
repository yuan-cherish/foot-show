<template>
    <div class="form">
        <Form :model="formItem" :label-width="140" label-position="left" ref="formItem" :rules="ruleValidate">
            <FormItem label="姓名" prop="name">
                <Input size="large" v-model="formItem.name" placeholder="输入测试者姓名" class="name"></Input>
            </FormItem>
            <FormItem label="联系电话" prop="phone">
                <Input size="large" v-model="formItem.phone" :maxlength="11" show-word-limit placeholder="输入联系电话" class="name" ></Input>
            </FormItem>
            <FormItem label="性别" prop="gender">
                <RadioGroup v-model="formItem.gender">
                    <Radio label="男">男</Radio>
                    <Radio label="女">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="年龄" prop="age">
                <Input type="number" size="large" v-model="formItem.age"  class="height"/>
            </FormItem>
            <FormItem label="身高" prop="height">
                <Input type="number" size="large" v-model="formItem.height" placeholder="cm" class="height"/>
            </FormItem>
            <FormItem label="体重" prop="weight">
                <Input type="number" size="large" v-model="formItem.weight" placeholder="kg" class="height"/>
            </FormItem>
            
            <FormItem label="病症描述" prop="desc">
                <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入症状描述" class="desc"></Input>
            </FormItem>
            <FormItem size="large" label="视频录制">
                <Button size="large" icon="ios-cloud-upload-outline" @click="dialogVisible = true" type="primary" style="margin-left: 0px; font-size:18px">小程序上传</Button>
            </FormItem>
            <FormItem>
                <Button size="large" type="primary" @click="submit('formItem')" style="margin-left: 0px; font-size:20px">提交</Button>
                <Button size="large" @click="resetForm" style="margin-left: 8px; font-size:20px">清空</Button>
            </FormItem>
        </Form>
    
    <el-dialog
        title="请扫描下方二维码进入微信小程序"
        :visible.sync="dialogVisible"
        :modal="false"
        append-to-body
        width="50%" 
        style=" text-align: center;"
        > 
        <el-image :src="require(`../resource/wx.jpg`)"  width="80%"></el-image>
        <span slot="footer" class="dialog-footer">
            <Button size="large" type="primary" @click="dialogVisible = false">关 闭</Button>
        </span>
    </el-dialog>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    name: '',
                    phone: null,
                    gender: '',
                    age: null,
                    height: null,
                    weight: null,
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '联系电话不能为空', trigger: 'blur' },
                        { type: 'string', min: 11, max: 11, message: '长度为11位', trigger: 'blur' }
                        // { type: 'number', message: '输入正确的手机号', trigger: 'blur', transform(value){
                        //     var myreg = /^[1][3, 4, 5, 7, 9][0-9][9]$/;
                        //     if (!myreg.test(value)){
                        //         return false
                        //     } else {
                        //         return Number(value)
                        //     }
                        // }}
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '选择一个性别', trigger: 'change' }
                    ],
                    height: [
                        { required: true, message: "请输入身高", trigger: "blur" },
                    ],
                    weight: [
                        { required: true, message: "请输入体重", trigger: "blur" },
                    ],
                    
                    desc: [
                        { required: true, message: '请输入患者的信息', trigger: 'blur' },
                        { type: 'string', min: 10, message: '不少于20字', trigger: 'blur' }
                    ]
                },
                dialogWidth: "",    
                boxWidth: "",
                dialogVisible: false,
            }
        },
        methods: {
            onLoadImg: function (e) {
                var img = e.target;
                var width = 0;
                if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
                    width = img.width;
                }
                this.boxWidth= width + 'px';
                this.dialogWidth = width + 140 + 'px';
            },

            // 点击重置按钮，重置登录表单
            resetForm() {
                this.$refs.formItem.resetFields()
            },

            submit(name){
                const father = this
                const paramsList = new URLSearchParams()
                paramsList.append('PatientName', this.formItem.name)
                paramsList.append('PatientAge', this.formItem.age)
                paramsList.append('PatientGender', this.formItem.gender)
                paramsList.append('PatientPhone', this.formItem.phone)
                paramsList.append('PatientHeight', this.formItem.height)
                paramsList.append('PatientWeight', this.formItem.weight)
                paramsList.append('PatientDesc', this.formItem.desc)
                var doctor = window.sessionStorage.getItem("doctor")
                paramsList.append('DoctorId', doctor)
                this.$axios
                    .post('/api/go/patient/create', paramsList, {
                        headers: { 'content-type': 'application/x-www-form-urlencoded' }
                    }).then((res) => {
                        if (res.data.code == '0'){
                            this.$Message.success('提交成功')
                            this.$router.push('/footCsv')
                        }else{
                            this.$Message.success("提交失败")
                        }
                    })
            },
        }
    }
</script>
<style>
    .form {
        position: relative;
        left: 40px;
    }
    .ivu-form-item-label {
        font-size: 20px !important;
    }
    .ivu-input-number-input{
        font-size: 20px !important;
    }
    .dialog-footer{
        position: relative;
        right: 30px;
    }
    .ivu-input {
        font-size: 18px !important;
    }
    .name {
        width: 40% !important;
    }
    .height{
        width: 20% !important;
    }
    .desc {
        width: 80% !important;
    }
    .ivu-radio-wrapper {
        font-size: 18px !important;
    }

</style>