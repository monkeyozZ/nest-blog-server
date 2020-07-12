<template>
  <div class="app-container">
    <div class="page-header">
      <h2 class="page_title">推广链接管理</h2>
      <el-button type="primary" class="insert" @click="dialogFormVisible = true">添加推广链接</el-button>
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
          label="渠道名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.channel_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="渠道码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.channel_code }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="页面地址"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.page_url }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="添加时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
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

    <el-dialog title="添加推广页" :visible.sync="dialogFormVisible">
      <div class="dialog_content">
        <el-form ref="addForm" :model="form" :rules="rules">
          <el-form-item label="渠道名称" :label-width="formLabelWidth" prop="channel_name">
            <el-select v-model="form.channel_name" style="width:100%" clearable placeholder="请选择渠道">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import { addChannelLink, getChannelList, getChannelLinkList } from '@/api/channel.js'
export default {
  data() {
    return {
      form: {
        channel_name: ''
      },
      rules: {
        channel_name: [
          { required: true, message: '请选择渠道', trigger: 'blur' }
        ]
      },
      options: [],
      dialogFormVisible: false,
      editDialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      currentPage: 1
    }
  },
  mounted() {
    this.getChannelListHandler()
    this.getChannelLinkListHandler()
  },
  methods: {
    submitAddForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addChannelLinkHandler()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addChannelLinkHandler() {
      const obj = {
        channel_name: this.form.channel_name
      }
      addChannelLink(obj).then((res) => {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success'
        })
        this.dialogFormVisible = false
      })
    },
    getChannelListHandler() {
      const obj = {
        is_all: 0,
        num: 1000,
        page: 1
      }
      getChannelList(obj).then((res) => {
        res.data.map((item) => {
          this.options.push({
            value: item,
            label: item
          })
        })
      })
    },
    getChannelLinkListHandler() {
      getChannelLinkList().then((res) => {
        this.tableData = res.data
      })
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
