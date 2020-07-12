<template>
  <div class="app-container">
    <div class="page-header">
      <h2 class="page_title">二级分类列表</h2>
      <el-button type="primary" class="insert" @click="dialogFormVisible = true">添加二级分类</el-button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        :border="true"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          width="50"
          type="index"
        />

        <el-table-column
          label="分类名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.icon_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="分类图标"
        >
          <template slot-scope="scope">
            <div style="text-align: center" @click="handlePictureCardPreview({url: scope.row.icon_logo})">
              <img :src="scope.row.icon_logo" style="width: 50px">
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            />
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="false"
        class="pagination"
        background
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="添加二级分类" :visible.sync="dialogFormVisible">
      <div class="dialog_content">
        <el-form ref="addForm" :model="form" :rules="rules">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="icon_name">
            <el-input v-model="form.icon_name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="所属分类" :label-width="formLabelWidth" prop="class_id">
            <el-select v-model="form.class_id" style="width:100%" clearable placeholder="请选择父级分类">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="icon图片" :label-width="formLabelWidth" prop="icon_logo">
            <el-upload
              v-if="ishide"
              :action="baseUploaderUrl + '/admin/up_image'"
              :headers="headers"
              list-type="picture-card"
              :limit="1"
              :auto-upload="true"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :on-change="hide"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddForm">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑推广页" :visible.sync="editDialogFormVisible">
      <div class="dialog_content">
        <el-form :model="form" :rules="rules">
          <el-form-item label="链接地址" :label-width="formLabelWidth">
            <el-input v-model="form.url" auto-complete="off" />
          </el-form-item>
          <el-form-item label="页面描述" :label-width="formLabelWidth">
            <el-input v-model="form.des" type="textarea" />
          </el-form-item>

        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProductcate, addProductCate } from '@/api/product.js'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      form: {
        icon_name: '',
        class_id: '',
        icon_logo: ''
      },
      rules: {
        icon_name: [
          { required: true, message: '请填写分类名称', trigger: 'blur' }
        ],
        class_id: [
          { required: true, message: '请选择父级分类', trigger: 'blur' }
        ],
        icon_logo: [
          { required: true, message: '请上传logo图片', trigger: 'blur' }
        ]
      },
      ishide: true,
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      dialogFormVisible: false,
      editDialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      currentPage: 1,
      baseUploaderUrl: process.env.VUE_APP_BASE_API,
      headers: {
        token: getToken()
      }
    }
  },
  mounted() {
    this.getProductcateHandler()
    this.getProductcateLevelHandler()
  },
  methods: {
    submitAddForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addProductCateHandler()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addProductCateHandler() {
      const obj = {
        icon_name: this.form.icon_name,
        class_id: this.form.class_id,
        icon_logo: this.form.icon_logo
      }
      addProductCate(obj).then((res) => {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getProductcateLevelHandler()
      })
    },
    getProductcateHandler() {
      const obj = {
        pid: 0
      }
      getProductcate(obj).then((res) => {
        res.data.map((item) => {
          this.options.push({
            label: item.icon_name,
            value: item.class_id
          })
        })
      })
    },
    getProductcateLevelHandler() {
      const obj = {
        pid: 1
      }
      getProductcate(obj).then((res) => {
        this.tableData = res.data
      })
    },
    uploadSuccess(response, file, fileList) {
      this.form.icon_logo = response.data.imgUrl
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit(index, row) {
      return
      this.editDialogFormVisible = true
      console.log(index, row)
    },
    handleDelete(index, row) {
      return
      console.log(index, row)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      setTimeout(() => {
        document.querySelector('.el-upload').style.display = 'inline-block'
      }, 500)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    hide() {
      document.querySelector('.el-upload').style.display = 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
    .page_title{
        line-height: 40px;
    }
    .insert{
        float: right;
    }
    .content{
        padding: 15px;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
    }
    .dialog_content{
        width: 70%;
    }
    .pagination{
        margin-top: 15px;
        text-align: center
    }
</style>
