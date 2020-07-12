<template>
  <div class="app-container">
    <div class="page-header">
      <h2 class="page_title">推广链接</h2>
      <el-button type="primary" class="insert" @click="dialogFormVisible = true">添加链接</el-button>
    </div>
    <div class="panel">
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
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="渠道名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="编码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="推广链接"
          width="400"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag type="success" class="tag" @click="transformStatus">{{ scope.row.date }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="添加时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
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

    <el-dialog title="添加链接" :visible.sync="dialogFormVisible">
      <div class="dialog_content">
        <el-form :model="form">
          <el-form-item label="推广人" :label-width="formLabelWidth">
            <el-select v-model="generalizePeople" style="width:100%" clearable placeholder="请选择推广人">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="推广页面" :label-width="formLabelWidth">
            <el-select v-model="generalizePage" style="width:100%" clearable placeholder="请选择推广页面">
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
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑渠道" :visible.sync="editDialogFormVisible">
      <div class="dialog_content">
        <el-form :model="form">
          <el-form-item label="渠道名称" :label-width="formLabelWidth">
            <el-input v-model="form.url" placeholder="渠道名称" auto-complete="off" />
          </el-form-item>
          <el-form-item label="登录账号" :label-width="formLabelWidth">
            <el-input v-model="form.des" placeholder="英文，数字组合" />
          </el-form-item>
          <el-form-item label="结算系数" :label-width="formLabelWidth">
            <el-input v-model="form.des" placeholder="结算系数" />
          </el-form-item>
          <el-form-item label="结算单价" :label-width="formLabelWidth">
            <el-input v-model="form.des" placeholder="结算单价" />
          </el-form-item>
          <el-form-item label="宜信编码" :label-width="formLabelWidth">
            <el-input v-model="form.des" placeholder="宜信编码" />
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.des" placeholder="备注" />
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
export default {
  data() {
    return {
      searchForm: {
        palce: ''
      },
      form: {
        url: '',
        des: ''
      },
      dialogFormVisible: false,
      editDialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 4,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      generalizePeople: '', // 推广人
      generalizePage: '' // 推广页面
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit(index, row) {
      this.editDialogFormVisible = true
      console.log(index, row)
    },
    handleDelete(index, row) {
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
    transformStatus() {
      this.$confirm('确定修改此状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
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
    .tag{
        cursor: pointer;
    }
    .dialog_content{
        width: 70%;
    }
    .pagination{
        margin-top: 15px;
        text-align: center
    }
</style>
