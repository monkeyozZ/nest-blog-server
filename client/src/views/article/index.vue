<template>
  <div class="article_container">
    <div class="data-container">
      <el-row class="filter-box">
        <el-col :xs="9" :sm="7" :md="7" :lg="8">
          <el-radio-group v-model="filterobj.status">
            <el-radio-button label="1">全部</el-radio-button>
            <el-radio-button label="2">已发布</el-radio-button>
            <el-radio-button label="3">草稿箱</el-radio-button>
            <el-radio-button label="4">回收站</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :xs="{span: 16, dffset: 1}" :sm="{span: 15, offset: 2}" :md="{span: 15, offset: 2}" :lg="{span:12, offset: 4}">
          <el-row class="cate-filter-box" :gutter="10">
            <el-col class="hidden-sm-and-down" :xs="6" :sm="4" :md="4" :lg="5">
              <el-button icon="el-icon-delete" @click="clear">清空筛选</el-button>
            </el-col>
            <el-col class="hidden-md-and-down" :xs="6" :sm="6" :md="5" :lg="5">
              <el-select
                v-model="filterobj.category"
                filterable
                clearable
                placeholder="分类筛选"
              >
                <el-option-group
                  v-for="group in category"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
            </el-col>
            <el-col class="hidden-md-and-down" :xs="6" :sm="6" :md="5" :lg="5">
              <el-select
                v-model="filterobj.tag"
                filterable
                clearable
                placeholder="标签筛选"
              >
                <el-option-group
                  label="所有标签"
                >
                  <el-option
                    v-for="(item, index) in tag"
                    :key="index"
                    :label="item.name"
                    :value="item.alias"
                  />
                </el-option-group>
              </el-select>
            </el-col>
            <el-col class="hidden-sm-and-down" :xs="6" :sm="8" :md="7" :lg="8">
              <el-input
                v-model="filterobj.keywords"
                placeholder="请输入关键字搜索"
              >
                <el-button slot="append" icon="el-icon-search" @click="search" />
              </el-input>
            </el-col>
          </el-row>
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
            prop="title"
            label="文章标题"
            width="300"
            show-overflow-tooltip
          />
          <el-table-column
            prop="thumb_img"
            label="缩略图"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="jioinImgUrl(scope.row.thumb)">查看缩略图</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="所属分类"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <p v-for="(item, index) in scope.row.category" :key="index">
                {{ item| catefilter }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
          >
            <template slot-scope="scope">
              <el-tag v-for="(item, index) in scope.row.tag" :key="index">{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="comment_num"
            label="评论"
            width="80"
            show-overflow-tooltip
          />
          <el-table-column
            prop="like"
            label="喜欢"
            width="80"
            show-overflow-tooltip
          />
          <el-table-column
            prop="view"
            label="浏览量"
            width="80"
            show-overflow-tooltip
          />
          <el-table-column
            label="日期"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.creatTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}
            </template>
          </el-table-column>
          <el-table-column
            label="来源"
            width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.source | sourcefilter }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status" type="success">{{ scope.row.status | statusfilter }}</el-tag>
              <el-tag v-else type="info">{{ scope.row.status | statusfilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
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
      <img :src="thumb_img" alt="" style="display:block;margin: 0 auto;max-width:100%">
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getArticle, fakeDelArticle, recoveryDelArticle, reallyDelArticle } from '@/api/article'
import { getList } from '@/api/tag'
export default {
  directives: {
    waves
  },
  data() {
    return {
      imgdialogVisible: false,
      thumb_img: '',
      loading: true,
      filterobj: {
        status: 1, // 1：全部， 2：已发布，3：草稿，4：回收站
        category: '',
        tag: '',
        keywords: ''
      },
      filterSearch: {
        condition: '1',
        condition2: '',
        condition3: '',
        keywords: ''
      },
      count: `(${this.total})`,
      listQuery: {
        pageNum: 1,
        pageSize: 8
      },
      tableData: [],
      editArr: {},
      editId: '',
      total: '',
      category: [
        {
          label: '所有分类',
          options: [{
            label: '学无止境',
            value: 'learn'
          },
          {
            label: '个人归档',
            value: 'note'
          },
          {
            label: '慢生活',
            value: 'life'
          }
          ]
        }
      ],
      tag: [],
      multipleSelection: []
    }
  },
  computed: {
    /* condition() {
      return this.filterobj.condition
    },
    condition2() {
      return this.filterobj.condition2
    },
    condition3() {
      return this.filterobj.condition3
    } */
  },
  watch: {
    filterobj: {
      handler() {
        this.initArticleList()
      },
      deep: true
    }
    /* condition: {
      handler() {
        this.filterSearch.condition = this.condition
      }
    },
    condition2: {
      handler() {
        this.filterSearch.condition2 = this.condition2
      }
    },
    condition3: {
      handler() {
        this.filterSearch.condition2 = this.condition3
      }
    } */
  },
  mounted() {
    this.getTagList()
    this.initArticleList()
  },
  methods: {
    clear() {
      this.filterobj.status = 1
      this.filterobj.category = ''
      this.filterobj.tag = ''
      this.filterobj.keywords = ''
    },
    getTagList() {
      getList().then((res) => {
        if (res.code === 200) {
          this.tag = res.data
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.initArticleList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.initArticleList()
    },
    handleEdit(id) {
      // this.editdialogVisible = true
      this.$router.push({
        path: '/article/edit',
        query: { id }
      })
    },
    fakeDelete(id) {
      this.$confirm('确定将该记录添加到回收站吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fakeDelArticle({ id }).then((res) => {
          if (res.code === 200) {
            this.initArticleList()
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
    recoveryDelete(id) {
      this.$confirm('该记录将被恢复？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recoveryDelArticle({ id }).then((res) => {
          if (res.code === 200) {
            this.initArticleList()
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
    handleDelete(id) {
      // console.log(id)
      this.$confirm('确定永久删除该记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reallyDelArticle({ id }).then((res) => {
          if (res.code === 200) {
            this.initArticleList()
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    jioinImgUrl(url) {
      this.imgdialogVisible = true
      this.thumb_img = url
    },
    initArticleList() {
      const params = {
        ...this.listQuery,
        ...this.filterobj
      }
      getArticle(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.data
          // this.total = res.data.total
          this.loading = false
        }
      })
      /* getArticle(this.listQuery, this.filterobj).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.articleList
          this.total = res.data.total
          this.loading = false
        }
      }) */
    },
    search() {
      getArticle(this.listQuery, this.filterSearch).then((res) => {
        if (res.data.code === 0) {
          this.tableData = res.data.articleList
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
  margin: 0 15px;
  .filter-box{
    padding: 5px;
    background: #fff;
    margin-bottom: 5px;
    /* .el-button{
      padding: 5px 10px;
    } */
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
