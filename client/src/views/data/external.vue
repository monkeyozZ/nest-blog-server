<template>
    <div class="app-container">
        <div class="page-header">
            <h2 class="page_title">外部数据</h2>
            <el-button type="primary" @click="redirect" class="insert">外部数据统计</el-button>
        </div>
        <div class="panel">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item style="width: 120px;">
                    <el-input  placeholder="渠道名称" clearable v-model="searchForm.palce" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-cascader
                        :options="options"
                        clearable
                        v-model="selectedOptions"
                        :props="{
                            value: 'name',
                            label: 'name'
                        }"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item style="width:90px;margin-right:0">
                    <el-input  placeholder="贷款金额" clearable v-model="searchForm.moneyStart" ></el-input>
                </el-form-item>
                <span style="display:inline-block;line-height:40px;">一</span>
                <el-form-item style="width:90px;">
                    <el-input  placeholder="贷款金额" clearable v-model="searchForm.moneyEnd" ></el-input>
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
                <el-form-item style="width:130px;">
                    <el-input  placeholder="姓名或手机号" clearable v-model="searchForm.palce" ></el-input>
                </el-form-item>
                <el-form-item style="width:120px;">
                    <el-input  placeholder="手机型号" clearable v-model="searchForm.palce" ></el-input>
                </el-form-item>
                <el-form-item style="width:150px;">
                    <el-select v-model="searchForm.home" clearable placeholder="请选择房产情况">
                        <el-option
                        v-for="item in homeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:150px;">
                    <el-select v-model="searchForm.car" clearable placeholder="请选择车产情况">
                        <el-option
                        v-for="item in carOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:120px;">
                    <el-select v-model="searchForm.profession" clearable placeholder="请选择职业">
                        <el-option
                        v-for="item in professionOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:135px;">
                    <el-select v-model="searchForm.salary" clearable placeholder="工资发放形式">
                        <el-option
                        v-for="item in salaryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:135px;">
                    <el-select v-model="searchForm.social" clearable placeholder="社保公积金">
                        <el-option
                        v-for="item in socialOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:170px;">
                    <el-select v-model="searchForm.guarantee" clearable placeholder="人寿保单">
                        <el-option
                        v-for="item in guaranteeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:135px;">
                    <el-select v-model="searchForm.weilidai" clearable placeholder="微粒贷">
                        <el-option
                        v-for="item in weilidaiOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:160px;">
                    <el-select v-model="searchForm.worktime" clearable placeholder="工作时间">
                        <el-option
                        v-for="item in worktimeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="rightBox">
                <el-button type="primary" icon="el-icon-search">查询</el-button>
                <el-button type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
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
                label="渠道所属"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="姓名"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="性别"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="手机号"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="出生日期"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="省份"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="城市"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="贷款（万元）"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="信用卡"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="名下房产"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="名下车辆"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="职业"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="工资发放形式"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="月收入"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="社保公积金"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="工作时间"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="人寿保单"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="微粒贷"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="申请日期"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
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
import address from '../../../public/area/address'
export default {
    data() {
        return {
            listLoading: false,
            searchForm: {
                palce: '',
                moneyStart: '',
                moneyEnd: '',
                date: '',
                home: '',
                car: '',
                profession: '',
                salary: '',
                social: '',
                guarantee: '',
                weilidai: '',
                worktime: '',
            },
            options: address,
            downloadLoading: false,
            homeOptions: [{
            value: '选项1',
            label: '无房产'
            }, {
            value: '选项2',
            label: '有房产，还贷中'
            }, {
            value: '选项3',
            label: '有房产，无房贷'
            }],
            carOptions: [{
            value: '选项1',
            label: '无汽车'
            }, {
            value: '选项2',
            label: '有汽车，还贷中'
            }, {
            value: '选项3',
            label: '有汽车，无房贷'
            }],
            professionOptions: [{
            value: '选项1',
            label: '上班族'
            }, {
            value: '选项2',
            label: '公务员'
            }, {
            value: '选项3',
            label: '私营业主'
            }],
            salaryOptions: [{
            value: '选项1',
            label: '银行卡发放'
            }, {
            value: '选项2',
            label: '现金发放'
            }],
            socialOptions: [{
            value: '选项3',
            label: '无社保'
            }, {
            value: '选项1',
            label: '缴费未满一年'
            }, {
            value: '选项2',
            label: '缴费一年以上'
            }],
            guaranteeOptions: [{
            value: '选项3',
            label: '无保单'
            }, {
            value: '选项1',
            label: '年缴保费2400以上'
            }, {
            value: '选项2',
            label: '年缴保费2400以下'
            }],
            weilidaiOptions: [{
            value: '选项3',
            label: '有'
            }, {
            value: '选项1',
            label: '无'
            }],
            worktimeOptions: [{
            value: '选项3',
            label: '现单位6个月以内'
            }, {
            value: '选项1',
            label: '现单位6-12个月'
            }, {
            value: '选项2',
            label: '现单位12-24个月'
            }],
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
            this.$router.push('externalStatistics')
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
            top: 40%;
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
