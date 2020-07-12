<template>
    <div class="app-container">
        <div class="page-header">
            <h2 class="page_title">实时数据统计</h2>
            <el-button type="primary" @click="redirect" class="insert">实时数据明细</el-button>
        </div>
        <div class="panel">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item style="width: 120px;">
                    <el-input  placeholder="渠道名称" clearable v-model="searchForm.palce" ></el-input>
                </el-form-item>

                <el-form-item>
                     <el-date-picker
                        v-model="searchForm.date"
                        type="daterange"
                        align="center"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div class="rightBox">
                <el-button type="primary" icon="el-icon-search">查询</el-button>
            </div>      
        </div>
        <div class="content">
            <el-table
                :data="tableData"
                 v-loading="listLoading"
                :border="true"
                style="width: 100%">
                <el-table-column
                label="序号"
                width="50">
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
                label="UV"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="注册"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="有效"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="无效"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="系数"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="结算量"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="单价"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="结算金额"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
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
                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    circle
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            listLoading: false,
            searchForm: {
                palce: '',
                date: ''
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
            selectedOptions: [],
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
                currentPage: 4
        }
    },
    methods: {
        redirect() {
            this.$router.push('realtime')
        },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit(index, row) {
          this.editDialogFormVisible = true
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleChange(value) {
        console.log(value);
      },
      handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    },
    mounted() {
       
    },
}
</script>

<style lang="scss" scoped>
    .page_title{
        line-height: 40px;
    }
    .panel{
        position: relative;
        width: 80%;
        margin-top: 20px;
        .rightBox{
            position: absolute;
            top: 30%;
            right: -22%;
            transform: translate(0,-50%);
        }
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
