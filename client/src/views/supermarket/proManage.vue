<template>
  <div class="app-container">
    <div class="page-header">
      <h2 class="page_title">产品列表</h2>
      <el-button type="primary" class="insert" @click="showAddModel">添加产品</el-button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        :border="true"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          width="80"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="产品名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.product_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="所属分类"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.icon_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="产品图片"
        >
          <template slot-scope="scope">
            <div style="text-align: center" @click="handlePictureCardPreview({url: scope.row.product_cover})">
              <img :src="scope.row.product_cover" style="width: 50px">
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="官方价（元）"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cost_price }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="非会员价（元）"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="会员价格（元）"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.vip_price }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row.status }}</span> -->
            <el-tag v-if="scope.row.status == 1" type="success" style="cursor: pointer" @click="changeStatusHandler(scope.row.id, scope.row.status)">已启用</el-tag>
            <el-tag v-else type="danger" style="cursor: pointer" @click="changeStatusHandler(scope.row.id, scope.row.status)">已暂停</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="供应商"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.business }}</span>
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
        class="pagination"
        background
        :current-page="pageOption.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageOption.num"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="添加产品" width="80%" :visible.sync="dialogFormVisible" @close="resetForm">
      <div class="dialog_content">
        <div class="left">
          <el-form :model="form">
            <el-form-item label="产品名称" :label-width="formLabelWidth">
              <el-input v-model="form.product_name" auto-complete="off" />
            </el-form-item>
            <el-form-item label="产品编号" :label-width="formLabelWidth">
              <el-input v-model="form.product_id" />
            </el-form-item>
            <el-form-item label="所属分类" :label-width="formLabelWidth">
              <el-select v-model="form.class_id" style="width:100%" clearable placeholder="请选择产品分类">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="进件价格" :label-width="formLabelWidth">
              <el-input v-model="form.input_price" auto-complete="off" />
            </el-form-item>
            <el-form-item label="官方价" :label-width="formLabelWidth">
              <el-input v-model="form.cost_price" auto-complete="off" />
            </el-form-item>
            <el-form-item label="非会员价" :label-width="formLabelWidth">
              <el-input v-model="form.price" auto-complete="off" />
            </el-form-item>
            <el-form-item label="会员价" :label-width="formLabelWidth">
              <el-input v-model="form.vip_price" auto-complete="off" />
            </el-form-item>
            <el-form-item label="供应商" :label-width="formLabelWidth">
              <el-input v-model="form.business" auto-complete="off" />
            </el-form-item>
            <el-form-item label="有效期" :label-width="formLabelWidth">
              <el-input v-model="form.quality_time" auto-complete="off" placeholder="（例如：24小时有效期）" />
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <p class="right_title">图片：</p>
          <el-upload
            v-if="dialogFormVisible"
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
          <p class="right_title margin_top">使用规则：</p>
          <tinymce v-if="dialogFormVisible" v-model="form.product_desc" :height="150" />
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitHandler(true)">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-dialog title="编辑产品" :visible.sync="editDialogFormVisible" destroy-on-close @close="resetForm">
      <div class="dialog_content">
        <div class="left">
          <el-form :model="form">
            <el-form-item label="产品名称" :label-width="formLabelWidth">
              <el-input v-model="form.product_name" auto-complete="off" />
            </el-form-item>
            <el-form-item label="产品编号" :label-width="formLabelWidth">
              <el-input v-model="form.product_id" />
            </el-form-item>
            <el-form-item label="所属分类" :label-width="formLabelWidth">
              <el-select v-model="form.class_id" style="width:100%" clearable placeholder="请选择产品分类">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="进件价格" :label-width="formLabelWidth">
              <el-input v-model="form.input_price" auto-complete="off" />
            </el-form-item>

            <el-form-item label="官方价" :label-width="formLabelWidth">
              <el-input v-model="form.cost_price" auto-complete="off" />
            </el-form-item>

            <el-form-item label="非会员价" :label-width="formLabelWidth">
              <el-input v-model="form.price" auto-complete="off" />
            </el-form-item>

            <el-form-item label="会员价" :label-width="formLabelWidth">
              <el-input v-model="form.vip_price" auto-complete="off" />
            </el-form-item>
            <el-form-item label="供应商" :label-width="formLabelWidth">
              <el-input v-model="form.business" auto-complete="off" />
            </el-form-item>
            <el-form-item label="有效期" :label-width="formLabelWidth">
              <el-input v-model="form.quality_time" auto-complete="off" placeholder="（例如：24小时有效期）" />
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <p class="right_title">图片：</p>
          <el-upload
            v-if="editDialogFormVisible"
            :action="baseUploaderUrl + '/admin/up_image'"
            :headers="headers"
            :file-list="product_cover_arr"
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
          <p class="right_title margin_top">使用规则：</p>
          <tinymce v-if="editDialogFormVisible" v-model="form.product_desc" :height="150" />
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitHandler(false)">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getProductList, getProductcate, addProduct, updateProduct, getProductById, changeStatus } from '@/api/product.js'
import { getToken } from '@/utils/auth'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        product_name: '',
        product_id: '',
        class_id: '',
        product_desc: '',
        price: '',
        input_price: '',
        cost_price: '',
        vip_price: '',
        business: '',
        product_cover: '',
        quality_time: ''
      },
      pageOption: {
        page: 1,
        num: 10
      },
      product_cover_arr: [],
      product_id: '',
      id: '',
      dialogImageUrl: '',
      dialogVisible: false,
      dialogFormVisible: false,
      editDialogFormVisible: false,
      formLabelWidth: '80px',
      tableData: [],
      options: [],
      total: null,
      baseUploaderUrl: process.env.VUE_APP_BASE_API,
      headers: {
        token: getToken()
      }
    }
  },
  mounted() {
    this.getProductListHandler()
    this.getProductcateHandler()
  },
  methods: {
    getProductListHandler() {
      const obj = {
        pageSize: this.pageOption.num,
        page: this.pageOption.page
      }
      getProductList(obj).then((res) => {
        this.tableData = res.data.data
        this.total = +res.data.pageInfo.allCount
      })
    },
    changeStatusHandler(id, status) {
      const text = status === 1 ? '确认下架该产品吗？' : '确认上架该产品吗？'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const obj = {
          id: id,
          status: status === 1 ? 0 : 1
        }
        changeStatus(obj).then(() => {
          this.$message({
            type: 'success',
            message: status === 1 ? '产品下架成功' : '产品上架成功'
          })
          this.getProductListHandler()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: status === 1 ? '取消产品下架' : '取消产品上架'
        })
      })
    },
    getProductByIdHandler(id) {
      const obj = {
        product_id: id
      }
      getProductById(obj).then((res) => {
        this.form.product_name = res.data.product_name
        this.form.class_id = res.data.class_id
        this.form.product_id = res.data.product_id
        this.form.product_desc = res.data.product_desc
        this.form.price = res.data.price
        this.form.input_price = res.data.input_price
        this.form.cost_price = res.data.cost_price
        this.form.vip_price = res.data.vip_price
        this.form.business = res.data.business
        this.form.product_cover = res.data.product_cover
        this.product_cover_arr = []
        this.product_cover_arr.push({ url: res.data.product_cover })
        this.form.quality_time = res.data.quality_time
        this.editDialogFormVisible = true
        setTimeout(() => {
          this.hide()
        }, 0)
      })
    },
    resetForm() {
      this.form.product_name = ''
      this.form.class_id = ''
      this.form.product_id = ''
      setTimeout(() => {
        this.form.product_desc = ''
      }, 20)
      this.form.price = ''
      this.form.input_price = ''
      this.form.cost_price = ''
      this.form.vip_price = ''
      this.form.business = ''
      this.form.product_cover = ''
      this.product_cover_arr = []
      this.form.quality_time = ''
    },
    getProductcateHandler() {
      const obj = {
        pid: 1
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
    submitHandler(isInsert) {
      const obj = {
        product_name: this.form.product_name,
        class_id: this.form.class_id,
        product_desc: this.form.product_desc,
        price: this.form.price,
        cost_price: this.form.cost_price,
        input_price: this.form.input_price,
        vip_price: this.form.vip_price,
        business: this.form.business,
        product_id: this.form.product_id,
        product_cover: this.form.product_cover,
        quality_time: this.form.quality_time
      }

      if (isInsert) {
        this.addProductHandler(obj)
      } else {
        this.updateProductHandler(obj)
      }
    },
    addProductHandler(obj) {
      addProduct(obj).then((res) => {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getProductListHandler()
      })
    },
    updateProductHandler(obj) {
      const updateObj = Object.assign({}, obj)
      updateObj.product_id = this.product_id
      updateObj.id = this.id
      updateProduct(updateObj).then((res) => {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success'
        })
        this.editDialogFormVisible = false
        this.tableData = []
        this.getProductListHandler()
      })
    },
    uploadSuccess(response, file, fileList) {
      this.form.product_cover = response.data.imgUrl
    },
    handleSizeChange(val) {
      this.pageOption.num = val
      this.getProductListHandler()
    },
    handleCurrentChange(val) {
      this.pageOption.page = val
      this.getProductListHandler()
    },
    handleEdit(index, row) {
      this.product_id = row.product_id
      this.id = row.id
      this.getProductByIdHandler(this.product_id)
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
      this.showUpload()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    showAddModel() {
      this.dialogFormVisible = true
      this.showUpload()
    },
    showUpload() {
      setTimeout(() => {
        document.querySelector('.el-upload').style.display = 'inline-block'
      }, 500)
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
    .left{
        width: 40%;
        float: left;
    }
    .dialog_content{
        overflow: hidden;
    }
    .right{
        padding-right: 10px;
        float: right;
        width: 55%;
        /* text-align: center; */
    }
    .right_title{
        margin-top: 0;
        font-size: 14px;
        color: #606266;
        font-weight: 700;
        text-align:left;
    }
    .margin_top{
            margin-top: 20px;
        }
    .pagination{
        margin-top: 15px;
        text-align: center
    }
</style>
