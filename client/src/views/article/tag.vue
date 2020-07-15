<template>
  <div>
    <el-row>
      <el-col :lg="5" :md="5" :sm="24" :xs="24" class="tag-left">
        <p>添加标签</p>
        <div class="form-box">
          <el-form ref="dataForm" :rules="rules" :model="Form" label-position="top">
            <el-form-item label="标签名称：" prop="name" :inline-message="true">
              <el-input v-model="Form.name" placeholder="标签名称" />
            </el-form-item>
            <el-form-item label="标签别名：" prop="alias" :inline-message="true">
              <el-input v-model="Form.alias" placeholder="标签别名（字母，下划线）" />
            </el-form-item>
          </el-form>
          <el-button type="primary" class="submit" icon="el-icon-check" size="medium" @click="submit">添加标签</el-button>
        </div>
      </el-col>
      <el-col :lg="17" :md="17" :sm="24" :xs="24" class="tag-right">
        <p>标签列表</p>
        <div class="tag-list">
          <el-table
            ref="multipleTable"
            v-loading="loading"
            border
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              label="ID"
              width="55"
            >
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="标签名称"
              show-overflow-tooltip
            />
            <el-table-column
              prop="alias"
              label="标签别名"
              show-overflow-tooltip
            />
            <el-table-column
              prop="article_num"
              label="文章数量"
              show-overflow-tooltip
            />
            <el-table-column
              label="创建时间"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.creat_time|formatTime }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button
                  v-waves
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEdit(scope.row._id)"
                />
                <el-button
                  v-waves
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(scope.row._id)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="total" class="pagination-box">
          <el-pagination
            background
            :current-page="1"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
      <div class="tag-edit">
        <div class="form-box">
          <el-form ref="dataForm2" :rules="editrules" :model="editForm" label-position="top">
            <el-form-item label="标签名称：" prop="name" :inline-message="true">
              <el-input v-model="editForm.name" placeholder="标签名称" />
            </el-form-item>
            <el-form-item label="标签别名：" prop="alias" :inline-message="true">
              <el-input v-model="editForm.alias" placeholder="标签别名（字母，下划线）" />
            </el-form-item>
          </el-form>
          <el-button type="primary" class="submit" icon="el-icon-check" size="medium" @click="editsubmit">修改标签</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import articleApi from '@/api/article'
import waves from '@/directive/waves'
export default {
  directives: {
    waves
  },
  data() {
    return {
      loading: true,
      tableData: [
        {
          _id: 1,
          name: 'javascript',
          alias: 'js',
          article_num: '6',
          creat_time: 1536292842438
        }
      ],
      Form: {
        name: '',
        alias: ''
      },
      editForm: {
        name: '',
        alias: ''
      },
      rules: {
        name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
        alias: [{ required: true, message: '请输入标签别名', trigger: 'blur' }]
      },
      editrules: {
        name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
        alias: [{ required: true, message: '请输入标签别名', trigger: 'blur' }]
      },
      multipleSelection: [],
      listQuery: {
        page: 1,
        limit: 5
      },
      total: null,
      dialogFormVisible: false,
      id: ''
    }
  },
  mounted() {
    // this.initTagList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.initTagList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.initTagList()
    },
    submit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          articleApi.tagInsert(this.Form).then((res) => {
            if (res.data.code === 0) {
              this.$notify({
                type: 'success',
                title: '成功',
                message: '标签添加成功'
              })
              this.$refs.dataForm.resetFields()
              this.initTagList()
            } else if (res.data.code === -1) {
              this.$notify({
                type: 'error',
                title: '失败',
                message: res.data.message
              })
            }
          })
        }
      })
    },
    editsubmit() {
      this.$refs.dataForm2.validate((valid) => {
        if (valid) {
          articleApi.editOneTag(this.id, this.editForm).then((res) => {
            if (res.data.code === 0) {
              this.dialogFormVisible = false // 关闭弹窗
              this.$refs.dataForm2.resetFields() // 重置表单
              this.initTagList()
              this.$notify({
                type: 'success',
                title: '成功',
                message: res.data.message
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    initTagList() {
      articleApi.getTaglist(this.listQuery).then((res) => {
        if (res.data.code === 0) {
          this.tableData = res.data.tagList
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    getOneTag(id) {
      articleApi.getOneTag({ _id: id }).then((res) => {
        if (res.data.code === 0) {
          this.editForm.name = res.data.tagobj.name
          this.editForm.alias = res.data.tagobj.alias
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit(id) {
      this.id = id
      this.getOneTag(id)
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.$confirm('确定永久删除该记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.delTag({ _id: id }).then((res) => {
          if (res.data.code === 0) {
            this.initTagList()
            this.$notify({
              type: 'success',
              title: '成功',
              message: res.data.message
            })
          } else {
            this.$notify({
              type: 'error',
              title: '失败',
              message: res.data.message
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-left,.tag-edit{
  margin: 0 15px;
  background: #fff;
  p{
    line-height: 38px;
    background: #eee;
    color: #333;
    padding-left: 8px;
  }
  .form-box{
    padding: 0 20px;
    background: #fff;
    .el-form-item{
      margin-bottom: 0;
      .el-form-item__label{
        label.el-form-item__label{
          line-height: 26px;
        }
      }
    }
    .submit{
      display: block;
      margin: 30px auto 20px auto;
      width: 90%;
    }
  }
}
.tag-edit{
  width: 80%;
  margin: 0 auto;
}
.tag-right{
  margin: 0 10px;
  background: #fff;
  p{
    line-height: 38px;
    background: #eee;
    color: #333;
    padding-left: 8px;
  }
  .pagination-box{
    margin: 30px 0;
    text-align: center;
  }
}
</style>
