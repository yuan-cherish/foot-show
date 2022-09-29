<template>
    <div class="login_container" >
    <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
            <img src="../assets/logo.png" alt />
        </div>
        <span class="tittle">注册</span>
        <!-- 登录表单区域 -->
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            class="login_form"
            label-width="80px"
        >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
            <el-input 
            v-model="loginForm.username" 
            prefix-icon="iconfont icon-user" 
            style="font-size: 15px;"
            placeholder="用户名"
            ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
            <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            style="font-size: 15px;"
            placeholder="密码"
            show-password
            ></el-input>
        </el-form-item>

        <el-form-item prop="footcode" label="鞋垫编号">
            <el-input
            v-model="loginForm.footcode"
            prefix-icon="el-icon-add-location"
            style="font-size: 15px;"
            placeholder="鞋垫编号"
            ></el-input>
        </el-form-item> 
        <el-form-item prop="sex" label="性别">
            <el-radio v-model="loginForm.sex" label="1">男</el-radio>
            <el-radio v-model="loginForm.sex" label="2">女</el-radio> 
        </el-form-item>
        <el-form-item prop="age" label=出生日期> 
            <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="changeAge"
            v-model="birthday"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="身高" prop="height">
            <el-input 
            v-model="loginForm.height" 
            style="font-size: 15px;"
            placeholder="身高"
            >
            <template slot="append">cm</template>
            </el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
            <el-input 
            v-model="loginForm.weight" 
            style="font-size: 15px;"
            placeholder="体重"
            >
            <template slot="append">kg</template>
            </el-input>
        </el-form-item>
        <el-form-item label="鞋码" prop="footage">
            <el-input 
            v-model="loginForm.footage" 
            style="font-size: 15px;"
            placeholder="鞋码"
            >
            <template slot="append">码</template>
            </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
            <el-button type="primary" @click="register('loginFormRef')" style="font-size: 20px;">注册</el-button>
            <el-button type="info" @click="resetLoginForm" style="font-size: 20px;">重置</el-button>
            <!-- <el-button type="info" @click="register" style="font-size: 20px;">注册</el-button> -->
        </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        var checkname = (rule, value, callback) => {
        if (value != "") {
            if(this.nameRules()){
                callback(new Error("用户名已存在，请重新输入"))
            }else{
                callback()
            }
        
        }
            callback();
        };
        return {
        // 登录表单的数据绑定对象
        loginForm: {
            username: '',
            password: '',
            footcode: '',
            sex: '1',
            age: '',
            weight: '',
            height: '',
            footage: ''
        },
        birthday: "",
        // 这是表单的验证规则对象
        loginFormRules: {
            // 验证用户名是否合法
            username: [
            // 必填，当文本框失去焦点时触发验证
                { required: true, message: '请输入登录名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
                { validator: checkname, trigger: "blur" },
            ],
            // 验证密码是否合法
            password: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            footcode: [
                { required: true, message: '请输入鞋垫编号', trigger: 'blur'},
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            sex: [
                { required: true,}
            ],
            age: [
                { required: true, message: '请输入出生日期', trigger: 'blur'}
            ],
            height: [
                { required: true, message: '请输入身高', trigger: 'blur'},
                { message: '请输入数字格式', trigger: 'blur', type: 'number', transform: (value) => Number(value)}
            ],
            weight: [
                { required: true, message: '请输入体重', trigger: 'blur'},
                { message: '请输入数字格式', trigger: 'blur', type: 'number', transform: (value) => Number(value)}
            ],
            footage: [
                { required: true, message: '请输入足底尺码', trigger: 'blur'},
                { message: '请输入数字格式', trigger: 'blur', type: 'number', transform: (value) => Number(value)}
            ]
        }
        }
    },
    methods: {
        // 点击重置按钮，重置登录表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
        },
        register(name){
            const father = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const paramsList = new URLSearchParams()
                    paramsList.append('userName', this.loginForm.username)
                    paramsList.append('password', this.loginForm.password)
                    // paramsList.append('footcode', this.loginForm.footcode)
                    paramsList.append('userSex', this.loginForm.sex)
                    paramsList.append('userAge', this.loginForm.age)
                    paramsList.append('userWeight', this.loginForm.weight)
                    paramsList.append('userHeight', this.loginForm.height)
                    paramsList.append('userFootage', this.loginForm.footage)
                    this.$axios
                        .post('/api/java/user/register', paramsList, {
                            headers: { 'content-type': 'application/x-www-form-urlencoded' }
                        }).then((res) => {
                            if (res.data.code == '1'){
                                this.$Message.success('注册成功')
                                father.$router.push('/login')
                            }else{
                                this.$Message.success('注册失败')
                            }
                        })
                }
            })
        },
        
        changeAge(e){
            var date = new Date()
            var year = date.getFullYear()
            var ayear = e.substring(0, 4)
            this.loginForm.age = year - Number(ayear)
            console.log(this.loginForm.age)
        },
        //验证用户名是否存在
        nameRules() {
            // const paramsList = new URLSearchParams()
            // paramsList.append('username', this.loginForm.username)
            this.$axios.get('/api/java/user/rules/' + this.loginForm.username)
            .then((res) => {
                if(res.data.code == '1'){
                    return false
                }else{
                    this.$message.error("用户名已存在，请重新输入!")
                    this.loginForm.name = ""
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>

    .login_container {
        background-color: #2b4b6b;
        height: 100vh;
        width: 100%;
    }

    .login_box {
        width: 50%;
        height: 95%;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    
        .avatar_box {
            height: 150px;
            width: 150px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
                img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
                }
        }
    }

    .login_form {
        position: absolute;
        top: 18%;
        // bottom: 0;
        width: 90%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
    .tittle{
        font-size: 25px;
        width: 100%;
        text-align: center;
        position: relative;
        top: 10%;
        left: 46%;
    }
</style>
