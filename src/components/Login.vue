<template>
    <div class="login_container" >
    <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
            <img src="../assets/logo.png" alt />
        </div>
        <span class="tittle">多模态人体健康监测系统登陆</span>
        <!-- 登录表单区域 -->
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
        >
        <!-- 电话号码 -->
        <el-form-item prop="phone">
            <el-input 
            v-model="loginForm.phone" 
            prefix-icon="iconfont icon-user" 
            style="font-size: 15px;"
            placeholder="请输入手机号码"
            ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
            <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            style="font-size: 15px;"
            placeholder="请输入密码"
            show-password
            ></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
            <el-button type="primary" @click="login('loginFormRef')" style="font-size: 20px;">登录</el-button>
            <!-- <el-button type="info" @click="resetLoginForm" style="font-size: 20px;">重置</el-button> -->
            <el-button type="info" @click="register" style="font-size: 20px;">注册</el-button>
        </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        loginForm: {
            phone: '',
            password: '',
        },
        loginFormRules: {
            // 验证用户名是否合法
            phone: [
                { required: true, message: '联系电话不能为空', trigger: 'blur' },
                { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
            ],
            // 验证密码是否合法
            password: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
            ],
        }
        }
    },
    methods: {
        // 点击重置按钮，重置登录表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
        },
        register(){
            this.$router.push('/register')
        },
        login(name) {
            const father = this
            this.$refs[name].validate((valid) => {
            if (valid) {
                const paramsList = new URLSearchParams()
                paramsList.append('phone', this.loginForm.phone)
                paramsList.append('password', this.loginForm.password)
                this.$axios
                    .post("/api/go/doctor/login", paramsList,{
                        headers: { 
                            'content-type': 'application/x-www-form-urlencoded', 
                            }}
                    )
                    .then((res) => {
                    if (res.data.code == '0') {
                        this.$Message.success('登录成功')
                        // console.log(res)
                        window.sessionStorage.setItem('doctor', JSON.stringify(res.data.data.DoctorId))
                        window.sessionStorage.setItem('token', res.data.token)
                        father.$router.push('/Home')
                    }else{
                        this.$Message.error('电话号码或密码输入错误')
                        console.log(res)
                    }
                })
            } 
            })
            // if(this.loginForm.username == "admin" || this.loginForm.password == "admin"){
            //     window.sessionStorage.setItem('token', "token")
            //     this.$Message.success('登录成功')
            //     this.$router.push('/Home')
            // }else{
            //     this.$Message.error('用户名或密码输入错误')
            // }
        },
        
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
        width: 550px;
        height: 350px;
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
        left: 10%;
        bottom: 0;
        width: 80%;
        // padding: 0 20px;
        box-sizing: border-box;
        // height: 100%;
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
        top: 20%;
        left: 20%;
    }
</style>
