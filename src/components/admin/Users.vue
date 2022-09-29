<template>
<div>
    <!-- 用户列表区域 -->
        <el-table 
        :data="userlist" 
        :border="true" 
        :stripe="true" 
        :header-cell-style="{fontSize: '20px'}" 
        :cell-style="cellStyle"
        >
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column label="用户名" prop="userName" align="center"></el-table-column>
            <el-table-column label="年龄" prop="userAge" align="center"></el-table-column>
            <el-table-column label="性别" prop="userSex" align="center"></el-table-column>
            <el-table-column label="身高" prop="userHeight" align="center"></el-table-column>
            <el-table-column label="体重" prop="userWeight" align="center"></el-table-column>
            <el-table-column label="鞋码" prop="userFootage" align="center"></el-table-column>
            <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
                <!--修改按钮-->
                <el-button
                type="primary"
                icon="el-icon-edit"
                size="medium"
                @click="showEditDialog(scope.row.userId)"
                ></el-button>
                <!--删除按钮-->
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                @click="removeUserById(scope.row.userId)"
                ></el-button>
            </template>
        </el-table-column>
        </el-table>
        
        <!--分页区域-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>

            <!-- 修改用户的对话框 -->
            <el-dialog
            title="修改用户信息"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
            >
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                <el-input v-model="editForm.userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userSex">
                <el-input v-model="editForm.userSex"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="userAge">
                <el-input v-model="editForm.userAge"></el-input>
                </el-form-item>
                <el-form-item label="体重" prop="userWeight">
                <el-input v-model="editForm.userWeight"></el-input>
                </el-form-item>
                <el-form-item label="身高" prop="userHeight">
                <el-input v-model="editForm.userHeight"></el-input>
                </el-form-item>
                <el-form-item label="鞋码" prop="userFootage">
                <el-input v-model="editForm.userFootage"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo('editFormRef')">确 定</el-button>
            </span>
            </el-dialog>
        </div>
</template>

<script>
export default {
    data(){
        return {
            queryInfo: {
                query: '',
                // 当前的页数
                pagenum: 1,
                // 当前每一页显示多少条数据
                pagesize: 5
            },
            userlist: [],
            selectRoleId: '',
            total: 0,
            // 控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            // 查询到的用户信息对象
            editForm: {
            },
            editId: '',
            // 修改表单的验证规则对象
            editFormRules: {
                // userName: [
                // // 必填，当文本框失去焦点时触发验证
                //     { required: true, message: '请输入登录名称', trigger: 'blur' },
                //     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
                // ],
                userFootage: [
                    { required: true, message: '请输入鞋垫编号', trigger: 'blur'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                userSex: [
                    { required: true,}
                ],
                userAge: [
                    { required: true, message: '请输入出生日期', trigger: 'blur'}
                ],
                userHeight: [
                    { required: true, message: '请输入身高', trigger: 'blur'},
                    { message: '请输入数字格式', trigger: 'blur', type: 'number', transform: (value) => Number(value)}
                ],
                userWeight: [
                    { required: true, message: '请输入体重', trigger: 'blur'},
                    { message: '请输入数字格式', trigger: 'blur', type: 'number', transform: (value) => Number(value)}
                ],
                userFootage: [
                    { required: true, message: '请输入足底尺码', trigger: 'blur'},
                    { message: '请输入数字格式', trigger: 'blur', type: 'number', transform: (value) => Number(value)}
                ]
            },
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        // 监听pagesize 改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },

        // 监听页码值改变的事件
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        async getUserList(){
            await this.$axios
                .get('/api/java/user/getAll/' + this.queryInfo.pagenum + "/" + this.queryInfo.pagesize, {
                    headers: {
                        // 'token': window.sessionStorage.getItem('token')
                    }
                })
                .then((res) => {
                    console.log(res)
                    if (res.status !== 200) {
                        return this.$message.error('获取用户列表失败！')
                    }else{
                        this.userlist = res.data.data.list
                        this.total = res.data.data.total
                    }
                })
            },
            cellStyle({row, column, rowIndex, columnIndex}){
                return {
                    'font-size': '18px',
                    'text-align': 'center',
                    'height': '80px',
                }
        },
        // 根据ID删除对应的用户信息
        async removeUserById(id) {
            // 弹框询问用户是否删除数据
                const confirmRsult = await this.$confirm(
                    '此操作将永久删除该用户, 是否继续?',
                    '提示',
                    {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }
                ).catch(err => err)
                // 如果用户确认删除，则返回字符串 confirm 取消则返回 cancel
                // console.log(confirmRsult)
                if (confirmRsult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }
                await this.$axios.delete('/api/java/user/delete/' + id)
                .then((res) => {
                    if (res.status !== 200){
                        return this.$message.error('删除用户失败!')
                    }else{
                        this.$message.success('删除用户成功')
                    this.getUserList()
                    }
                })
        },
        showEditDialog(){

        },
        // 展示编辑用户的对话框
        async showEditDialog(id) {

            await this.$axios.get('/api/java/user/getUserById/' + id)
            .then((res) => {
                if (res.status !== 200){
                    this.$message.error('查询用户信息失败')
                }else{
                    console.log(res)
                    this.editForm = res.data.data
                    this.editDialogVisible = true
                    this.editId = res.data.data.userId
                }
            })
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        // 修改用户信息并提交
        editUserInfo(name) {
            const father = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const paramsList = new URLSearchParams()
                    paramsList.append('userName', this.editForm.userName)
                    paramsList.append('userSex', this.editForm.userSex)
                    paramsList.append('userAge', this.editForm.userAge)
                    paramsList.append('userWeight', this.editForm.userWeight)
                    paramsList.append('userHeight', this.editForm.userHeight)
                    paramsList.append('userFootage', this.editForm.userFootage)
                    this.$axios.put('/api/java/user/update/' + this.editId, paramsList, {
                            headers: { 'content-type': 'application/x-www-form-urlencoded' }
                    }).then((res) => {
                        if (res.status == 200){
                            this.$message.success('修改用户数据成功')
                            this.editDialogVisible = false
                            this.getUserList()
                        }else{
                            return this.$message.error('修改用户数据失败')
                        }
                    })
                }
            })
        },
    }
    
}
</script>
<style lang="less" scoped>
</style>
