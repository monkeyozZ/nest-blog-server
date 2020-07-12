<template>
    <div class="app-container">
        <div class="page-header">
            <h2 class="page_title">贷超产品点击明细</h2>
            <el-button type="primary" @click="redirect" class="insert">查看点击统计</el-button>
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

                <el-form-item>
                    <el-select v-model="searchForm.car" clearable placeholder="请选择广告渠道">
                        <el-option
                        v-for="item in advOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="searchForm.car" clearable placeholder="请选择页面">
                        <el-option
                        v-for="item in pageOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
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
                label="广告名称"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="访问ip"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="点击时间"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="来源"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
                advOptions: [{
                    value: '选项1',
                    label: '无汽车'
                    }, {
                    value: '选项2',
                    label: '有汽车，还贷中'
                    }, {
                    value: '选项3',
                    label: '有汽车，无房贷'
                    }],
                pageOptions: [{
                    value: '选项1',
                    label: '结果页'
                    }, {
                    value: '选项2',
                    label: '贷超页'
                    }],
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
