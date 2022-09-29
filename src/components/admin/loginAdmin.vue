<template>
    <div class="login_container" >
    <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
            <img src="../../assets/logo.png" alt />
        </div>
        <span class="tittle">多模态人体健康监测系统后台管理系统</span>
        <!-- 登录表单区域 -->
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
        >
        <!-- 用户名 -->
        <el-form-item prop="username">
            <el-input 
            v-model="loginForm.username" 
            prefix-icon="iconfont icon-user" 
            style="font-size: 15px;"
            placeholder="请输入用户名"
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
            <!-- <el-button type="info" @click="register" style="font-size: 20px;">注册</el-button> -->
        </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        // 登录表单的数据绑定对象
        loginForm: {
            username: '',
            password: '',
        },
        // 这是表单的验证规则对象
        loginFormRules: {
            // 验证用户名是否合法
            username: [
            // 必填，当文本框失去焦点时触发验证
                { required: true, message: '请输入登录名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            // 验证密码是否合法
            password: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
            ]
        }
        }
    },
    methods: {
        // 点击重置按钮，重置登录表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
        },
        login(name) {
        const father = this
        this.$refs[name].validate((valid) => {
        if (valid) {
            const paramsList = new URLSearchParams()
            paramsList.append('username', this.loginForm.username)
            paramsList.append('password', this.loginForm.password)
            this.$axios
                .post('/api/java/user/login', paramsList,{
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }}
                )
                .then((res) => {
                if (res.data.code == '1') {
                    this.$Message.success('登录成功')
                    console.log(res.data)
                    // window.sessionStorage.setItem('user', JSON.stringify(res.data.data))
                    // console.log(JSON.parse(window.sessionStorage.getItem('user'))['userId'])
                    window.sessionStorage.setItem('user', JSON.stringify(res.data.data.user))
                    window.sessionStorage.setItem('token', res.data.data.token)
                    father.$router.push('/adminHome')
                }else{
                    this.$Message.error('用户名或密码输入错误')
                    console.log(res)
                }
            })
        } 
        })
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
        width: 450px;
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
        bottom: 0;
        width: 100%;
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
        top: 20%;
        left: 3%;
    }
</style>
