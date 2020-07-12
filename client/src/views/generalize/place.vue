<template>
  <div class="app-container">
    <div class="page-header">
      <h2 class="page_title">渠道管理</h2>
      <el-button type="primary" class="insert" @click="dialogFormVisible = true">添加渠道</el-button>
    </div>
    <div v-if="false" class="panel">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchForm.palce" placeholder="渠道名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
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
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="渠道名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.channel_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="CODE"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.channel_code }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="年卡价格（元）"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.y_price }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="季卡价格（元）"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.s_price }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="月卡价格（元）"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.m_price }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="添加时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="120">
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
        v-if="total"
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

    <el-dialog title="添加渠道" :visible.sync="dialogFormVisible">
      <div class="dialog_content">
        <el-form ref="addForm" :model="form" :rules="rules">
          <el-form-item label="渠道名称" :label-width="formLabelWidth" prop="channel_name">
            <el-input v-model="form.channel_name" placeholder="请输入渠道名称" auto-complete="off" />
          </el-form-item>
          <el-form-item label="年卡价格" :label-width="formLabelWidth" prop="y_price">
            <el-input v-model="form.y_price" placeholder="请输入年卡会员价格" type="tel" @blur="validatePrice(1)" />
          </el-form-item>
          <el-form-item label="季卡价格" :label-width="formLabelWidth" prop="s_price">
            <el-input v-model="form.s_price" placeholder="请输入季卡会员价格" type="tel" @blur="validatePrice(2)" />
          </el-form-item>
          <el-form-item label="月卡价格" :label-width="formLabelWidth" prop="m_price">
            <el-input v-model="form.m_price" placeholder="请输入月卡会员价格" type="tel" @blur="validatePrice(3)" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddForm">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑渠道" :visible.sync="editDialogFormVisible">
      <div class="dialog_content">
        <el-form ref="addForm" :model="form" :rules="rules">
          <el-form-item label="渠道名称" :label-width="formLabelWidth" prop="channel_name">
            <el-input v-model="form.channel_name" placeholder="请输入渠道名称" auto-complete="off" />
          </el-form-item>
          <el-form-item label="年卡价格" :label-width="formLabelWidth" prop="y_price">
            <el-input v-model="form.y_price" placeholder="请输入年卡会员价格" type="tel" @blur="validatePrice(1)" />
          </el-form-item>
          <el-form-item label="季卡价格" :label-width="formLabelWidth" prop="s_price">
            <el-input v-model="form.s_price" placeholder="请输入季卡会员价格" type="tel" @blur="validatePrice(2)" />
          </el-form-item>
          <el-form-item label="月卡价格" :label-width="formLabelWidth" prop="m_price">
            <el-input v-model="form.m_price" placeholder="请输入月卡会员价格" type="tel" @blur="validatePrice(3)" />
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
import { addChannel, getChannelList } from '@/api/channel.js'
export default {
  data() {
    return {
      searchForm: {
        palce: ''
      },
      form: {
        channel_name: '',
        y_price: '',
        s_price: '',
        m_price: ''
      },
      pageOption: {
        num: 10,
        page: 1
      },
      total: null,
      rules: {
        channel_name: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' }
        ],
        y_price: [
          { required: true, message: '请输入年卡会员价格', trigger: 'blur' }
        ],
        s_price: [
          { required: true, message: '请输入季卡会员价格', trigger: 'blur' }
        ],
        m_price: [
          { required: true, message: '请输入月卡会员价格', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      editDialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      currentPage: 4
    }
  },
  mounted() {
    this.getChannelListHandler()
  },
  methods: {
    submitAddForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addChannelHandler()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addChannelHandler() {
      const obj = {
        channel_name: this.form.channel_name,
        y_price: this.form.y_price,
        s_price: this.form.s_price,
        m_price: this.form.m_price
      }
      addChannel(obj).then((res) => {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success'
        })
        this.dialogFormVisible = false
      })
    },
    validatePrice(n) {
      const reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
      if (n == 1) {
        if (this.form.y_price && !reg.test(this.form.y_price)) {
          this.$notify.error({
            title: '错误',
            message: '金额格式错误，请重新输入'
          })
          this.form.y_price = ''
        }
      }

      if (n == 2) {
        if (this.form.s_price && !reg.test(this.form.s_price)) {
          this.$notify.error({
            title: '错误',
            message: '金额格式错误，请重新输入'
          })
          this.form.s_price = ''
        }
      }

      if (n == 3) {
        if (this.form.m_price && !reg.test(this.form.m_price)) {
          this.$notify.error({
            title: '错误',
            message: '金额格式错误，请重新输入'
          })
          this.form.m_price = ''
        }
      }
    },
    getChannelListHandler() {
      const obj = {
        is_all: 1,
        num: this.pageOption.num,
        page: this.pageOption.page
      }
      getChannelList(obj).then((res) => {
        this.tableData = res.data.data
        this.total = res.data.pageInfo.count
      })
    },
    handleSizeChange(val) {
      this.pageOption.num = val
      this.getChannelListHandler()
    },
    handleCurrentChange(val) {
      this.pageOption.page = val
      this.getChannelListHandler()
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
    }
  }
}
</script>

<style lang="scss" scoped>
    .page_title{
        line-height: 40px;
    }
    .panel{
        margin-top: 20px;
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
