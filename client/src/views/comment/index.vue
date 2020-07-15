<template>
  <div class="comment_container">
    <div class="data-container">
      <el-row class="filter-box">
        <el-col :xs="{span: 16}" :sm="{span: 14}" :md="{span: 10}" :lg="{span: 8}">
          <el-radio-group v-model="filterobj.condition">
            <el-radio-button label="1">全部</el-radio-button>
            <el-radio-button label="2">垃圾评论</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <div class="list-box">
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
            label="文章标题"
            width="200"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.article.title ? scope.row.article.title : '' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="评论内容"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-html="markedhtml(scope.row.content)" />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="昵称"
            width="100"
            show-overflow-tooltip
          />
          <el-table-column
            prop="email"
            label="个人邮箱"
            width="100"
            show-overflow-tooltip
          />
          <el-table-column
            prop="like"
            label="获赞"
            width="80"
            show-overflow-tooltip
          />
          <el-table-column
            prop="status"
            label="子评论数/详情"
            width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              ({{ scope.row.reply_comment.length }})/
              <el-button
                v-waves
                size="mini"
                type="primary"
                icon="el-icon-view"
                circle
                @click="handleShowChildren(scope.row.reply_comment)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="日期"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.creat_time | formatTime }}
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
                v-else-if="filterobj.condition === '2'"
                v-waves
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.row._id)"
              />

              <el-button
                v-if="!scope.row.recovery"
                v-waves
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="fakeDelete(scope.row._id)"
              />

              <el-button
                v-else
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
      <img :src="baseapi + thumb_img" alt="" style="display:block;margin: 0 auto;max-width:100%">
    </el-dialog>
    <el-dialog
      title="子评论"
      :visible.sync="childrenDialogVisible"
      width="80%"
    >
      <el-table
        ref="multipleTable"
        v-loading="loading"
        border
        stripe
        :data="childrenCommentData"
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
          label="文章标题"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.article.title ? scope.row.article.title : '' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.replay_name">回复<b style="margin:0 4px">{{ scope.row.replay_name }}</b>:</span>
            <div v-html="markedhtml(scope.row.content)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="email"
          label="个人邮箱"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="like"
          label="获赞"
          width="80"
          show-overflow-tooltip
        />
        <el-table-column
          label="日期"
          width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.creat_time | formatTime }}
          </template>
        </el-table-column>
      <!-- <el-table-column
        label="操作"
        width="150"
        show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-back"
              circle
              v-if="scope.row.recovery"
              v-waves
              @click="recoveryDelete(scope.row._id)"></el-button>

            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              v-else
              v-waves
              @click="handleEdit(scope.row._id)"></el-button>

              <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              v-waves
              v-if="!scope.row.recovery"
              @click="fakeDelete(scope.row._id)"></el-button>

              <el-button
              size="mini"
              v-waves
              type="danger"
              icon="el-icon-delete"
              circle
              v-else
              @click="handleDelete(scope.row._id)"></el-button>
          </template>
      </el-table-column> -->
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
// import CommentApi from '@/api/comment'
import marked from '@/utils/marked'
export default {
  directives: {
    waves
  },
  data() {
    return {
      baseapi: process.env.BASE_API,
      imgdialogVisible: false,
      childrenDialogVisible: false,
      thumb_img: '',
      loading: true,
      filterobj: {
        condition: '1'
      },
      listQuery: {
        page: 1,
        limit: 8
      },
      tableData: [],
      childrenCommentData: [],
      total: '',
      category: [
        {
          label: '所有分类',
          options: [{
            label: '最新评论',
            value: 'creat_time'
          },
          {
            label: '最热评论',
            value: 'like'
          }
          ]
        }
      ],
      multipleSelection: []
    }
  },
  computed: {
    condition() {
      return this.filterobj.condition
    },
    condition2() {
      return this.filterobj.condition2
    },
    condition3() {
      return this.filterobj.condition3
    }
  },
  watch: {
    'filterobj.condition': {
      handler() {
        this.initCommentList()
      },
      deep: true
    }
  },
  mounted() {
    this.initCommentList()
  },
  methods: {
  // marked 解析
    markedhtml(content) {
      return marked(content, false)
    },
    clear() {
      this.filterobj.condition = '1'
      this.filterobj.condition2 = ''
      this.filterobj.condition3 = ''
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.initCommentList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.initCommentList()
    },
    fakeDelete(id) {
      this.$confirm('确定将该记录移入垃圾评论吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CommentApi.fakeDelComment({ _id: id }).then((res) => {
          if (res.data.code === 0) {
            this.initCommentList()
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
    },
    recoveryDelete(id) {
      this.$confirm('该记录将被恢复？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CommentApi.recoveryComment({ _id: id }).then((res) => {
          if (res.data.code === 0) {
            this.initCommentList()
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
    },
    handleDelete(id) {
      // console.log(id)
      this.$confirm('确定永久删除该记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CommentApi.delComment({ _id: id }).then((res) => {
          /* if (res.data.code === 0) {
            this.initCommentList()
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
          } */
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    compare(prop) {
      return (obj1, obj2) => {
        let val1 = obj1[prop]
        let val2 = obj2[prop]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
          return 1
        } else if (val1 > val2) {
          return -1
        } else {
          return 0
        }
      }
    },
    list(arr) {
      const childarr = arr.concat()
      for (let i = 0; i < childarr.length; i++) {
        if (childarr[i].reply_comment.length !== 0) {
          for (let j = 0; j < childarr[i].reply_comment.length; j++) {
            if (childarr[i].id === parseInt(childarr[i].reply_comment[j].pid)) {
              childarr[i].reply_comment[j].replay_name = childarr[i].name
            }
            childarr.push(childarr[i].reply_comment[j])
          }
        }
      }
      childarr.sort(this.compare('creat_time')) // 数组排序
      return childarr
    },
    handleShowChildren(arr) {
      if (arr.length !== 0) {
        this.childrenCommentData = this.list(arr)
        this.childrenDialogVisible = true
      }
    },
    initCommentList() {
      const obj = {
        condition: this.filterobj.condition
      }
      CommentApi.commentList(this.listQuery, obj).then((res) => {
        if (res.data.code === 0) {
          this.tableData = res.data.commentList
          this.total = res.data.total
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
    margin-bottom :5px;
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
