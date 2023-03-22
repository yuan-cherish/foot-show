<template>
    <div class="login_container" >
    <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
            <img src="../assets/logo.png" alt />
        </div>
        <span class="tittle">医生账户注册</span>
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
        <el-form-item prop="phone" label="手机号码">
            <el-input 
            v-model="loginForm.phone" 
            prefix-icon="el-icon-mobile-phone" 
            style="font-size: 15px;"
            placeholder="请输入手机号码"
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

        <!-- <el-form-item prop="footcode" label="鞋垫编号">
            <el-input
            v-model="loginForm.footcode"
            prefix-icon="el-icon-add-location"
            style="font-size: 15px;"
            placeholder="鞋垫编号"
            ></el-input>
        </el-form-item>  -->
        
        <!-- 按钮区域 -->
        <el-form-item class="btns">
            <el-button type="primary" @click="register('loginFormRef')" style="font-size: 20px;">注册</el-button>
            <el-button type="info" @click="resetLoginForm" style="font-size: 20px;">重置</el-button>
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
            phone: '',
            password: '',
            // footcode: '',
        },
        // 这是表单的验证规则对象
        loginFormRules: {
            // 验证用户名是否合法
            username: [
            // 必填，当文本框失去焦点时触发验证
                { required: true, message: '请输入登录名称', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
            ],
            phone: [
                { required: true, message: '联系电话不能为空', trigger: 'blur' },
                { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
            ],
            // 验证密码是否合法
            password: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            // footcode: [
            //     { required: true, message: '请输入鞋垫编号', trigger: 'blur'},
            //     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            // ],
            
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
                    paramsList.append('name', this.loginForm.username)
                    paramsList.append('password', this.loginForm.password)
                    paramsList.append('phone', this.loginForm.phone)
                    this.$axios
                        .post('/api/go/doctor/register', paramsList, {
                            headers: { 'content-type': 'application/x-www-form-urlencoded' }
                        }).then((res) => {
                            if (res.data.code == '0'){
                                this.$Message.success('注册成功')
                                father.$router.push('/login')
                            }else{
                                this.$Message.success('注册失败')
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
        width: 50%;
        height: 75%;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    
    .avatar_box {
        height: 140px;
        width: 140px;
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
        top: 25%;
        // bottom: 0;
        left: 7%;
        width: 90%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
    .tittle{
        font-size: 30px;
        width: 100%;
        text-align: center;
        position: relative;
        top: 10%;
        left: 38%;
    }
</style>
