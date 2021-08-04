<template>
  <div class="article_container">
    <div class="data-container">
      <div class="list-box">
        <el-table
          v-loading="loading"
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="content"
            label="时间轴内容"
            show-overflow-tooltip
          />
          <el-table-column
            prop="imageUrl"
            label="缩略图"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="jioinImgUrl(scope.row.imageUrl)">查看缩略图</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="日期"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.recovery"
                v-waves
                size="mini"
                type="primary"
                icon="el-icon-back"
                circle
                @click="recoveryDelete(scope.row._id)"
              />

              <el-button
                v-else
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
        <div v-if="total" class="pagination-box">
          <el-pagination
            background
            :current-page="1"
            :page-sizes="[8, 20, 30, 40]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <el-dialog
      title="缩略图"
      :visible.sync="imgdialogVisible"
      width="30%"
      center
    >
      <img :src="imageUrl" alt="" style="display:block;margin: 0 auto;max-width:100%">
    </el-dialog>

    <el-dialog
      title="编辑时间轴"
      :visible.sync="editdialogVisible"
      width="80%"
    >
      <v-edit :edit="true" :time-obj="timeObj" :edit-id="editId" @changeEditdialogVisible="changeEditdialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getList, delTime } from '@/api/time'
import VEdit from './insert.vue'
export default {
  directives: {
    waves
  },
  components: {
    VEdit
  },
  data() {
    return {
      imgdialogVisible: false,
      editdialogVisible: false,
      imageUrl: '',
      loading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 8
      },
      tableData: [],
      timeObj: {},
      editId: '',
      total: ''
    }
  },
  mounted() {
    this.initTimeLineList()
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.initTimeLineList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.initTimeLineList()
    },
    handleEdit(id) {
      this.editdialogVisible = true
      this.editId = id
      getList({ id }).then((res) => {
        if (res.code === 200) {
          this.timeObj = res.data
        }
      })
    },
    handleDelete(id) {
      // console.log(id)
      this.$confirm('确定永久删除该记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTime({ id }).then((res) => {
          if (res.code === 200) {
            this.initTimeLineList()
            this.$notify({
              type: 'success',
              title: '成功',
              message: res.message
            })
          } else {
            this.$notify({
              type: 'error',
              title: '失败',
              message: res.message
            })
          }
        })
      })
    },
    changeEditdialogVisible() {
      this.editdialogVisible = false
      this.initTimeLineList()
    },
    jioinImgUrl(url) {
      this.imgdialogVisible = true
      this.imageUrl = url
    },
    initTimeLineList() {
      const params = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum
      }
      getList(params).then((res) => {
        if (res.code === 200) {
          this.tableData = this.tableData.concat(res.data.data)
          this.total = res.data.count
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-container{
  background: #ddd;
  margin: 0 15px;
  .filter-box{
    padding: 5px;
    background: #fff;
    margin-bottom: 5px;
    .el-button{
      padding: 5px 10px;
    }
    .cate-filter-box{
      .el-select{
        width: 100%;
      }
    }
  }
  .list-box{
    padding: 5px;
    background: #fff;
    .el-tag{
      height: 20px;
      line-height: 18px;
    }
    .el-tag+.el-tag{
      margin-left: 10px;
    }
  }
  .pagination-box{
    margin: 30px 0;
    text-align: center;
  }
}
</style>
