<template>
  <div class="article_container">
    <el-row>
      <el-col class="mk-form">
        <el-form ref="dataForm1" :rules="rules" :model="Form" label-position="left" label-width="120px">
          <el-form-item label="文章标题：" prop="title" :inline-message="true">
            <el-input v-model="Form.title" placeholder="文章标题" style="width:50%" />
          </el-form-item>
          <el-form-item label="文章关键词：" prop="keywords" :inline-message="true">
            <el-input v-model="Form.keywords" placeholder="文章关键词" style="width:60%" />
          </el-form-item>
          <el-form-item label="文章描述：" prop="des" :inline-message="true">
            <el-input v-model="Form.desc" type="textarea" placeholder="文章描述" style="width:70%" />
          </el-form-item>
          <el-form-item label="文章分类：" prop="category" :inline-message="true">
            <div class="tag-box">
              <el-checkbox-group
                v-model="Form.category"
              >
                <el-checkbox v-for="(item, index) in category" :key="index" :label="item.value">{{ item.label }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="文章标签：" prop="tag" :inline-message="true">
            <div class="tag-box">
              <el-checkbox-group
                v-model="Form.tag"
              >
                <el-checkbox v-for="(item, index) in tags" :key="index" :label="item.alias">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="文章来源：" prop="source">
            <el-select v-model="Form.source" placeholder="请选择">
              <el-option
                v-for="item in origin"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="文章状态：" prop="status">
            <el-switch
              v-model="Form.status"
              active-text="直接发布"
              inactive-text="存为草稿"
            />
          </el-form-item>
          <el-form-item label="缩略图：" prop="thumb_img" class="thumb_box">
            <el-upload
              class="thumb-uploader"
              :action="upLaodUrl"
              :show-file-list="false"
              :on-success="handleThumbSuccess"
            >
              <div v-if="Form.thumb">
                <img :src="Form.thumb" class="thumb">
                <p class="pancel">
                  <i class="el-icon-zoom-in" @click.stop="handlePictureCardPreview" />
                  <i class="el-icon-delete" @click.stop="handleRemove" />
                </p>
              </div>
              <i v-else class="el-icon-plus thumb-uploader-icon" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col class="md-box" :lg="23" :md="23" :sm="23" :xs="23">
          <markdown-nice default-title="文章内容" :useImageHosting="useImageHosting" @onTextChange="contentTextChange" />
      </el-col>
      <el-col class="submit-box">
        <el-button type="primary" class="submit" icon="el-icon-arrow-up" @click="submit">发布文章</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MarkdownNice from 'mk-md-nice'
import { save } from '@/api/article'
import { deleteImg } from '@/api/image'
import { getList } from '@/api/tag'
export default {
  name: 'articleSave',
  components: {
    MarkdownNice
  },
  props: {
  },
  data() {
    var validatetag = async(rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('至少选择一项标签'))
      }
    }
    var validatecate = async(rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('至少选择一项分类'))
      }
    }
    return {
      baseapi: process.env.BASE_API,
      category: [
        {
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
      ],
      tags: [],
      origin: [
        {
          label: '原创',
          value: 0
        },
        {
          label: '转载',
          value: 1
        },
        {
          label: '混合',
          value: 2
        }

      ],
      Form: {
        title: '',
        keywords: '',
        desc: '',
        category: [],
        tag: [],
        content: '',
        contentText: '',
        source: 0,
        status: true,
        thumb: ''
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        keywords: [{ required: true, message: '请输入文章关键词', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入文章描述', trigger: 'blur' }],
        category: [{ validator: validatecate, trigger: 'blur' }],
        tag: [{ validator: validatetag, trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      content_img_arr: [],
      antDropdownDom: undefined,
      positionTop: 0,
      upLaodUrl: process.env.VUE_APP_UPLOAD_API,
      useImageHosting: {
        name: 'wowmonkey',
        url: process.env.VUE_APP_UPLOAD_API,
        isSmmsOpen: false,
        isQiniuyunOpen: false,
        isAliyunOpen: false
      }
    }
  },
  mounted() {
    this.getTagList()
    const mdNav = document.querySelector('.nice-left-nav')
    mdNav.addEventListener('click', () => {
      setTimeout(() => {
        const antDropdown = document.getElementsByClassName('ant-dropdown')
        console.log(document.querySelector('.fixed-header').clientHeight)
        if (antDropdown) {
          for (let index = 0; index < antDropdown.length; index++) {
            setTimeout(() => {
              antDropdown[index].parentNode.parentNode.style.top = `${this.positionTop}px`
            }, 0)
          }
        }
      }, 16)
    })
    // console.log(this.$refs.md)
  },
  methods: {
    initMdniceNav() {
      document.querySelector('.nice-app').style.position = 'relative'
      document.querySelector('.nice-footer-container').style.position = 'absolute'
      // const obj = document.querySelector('.nice-app').getBoundingClientRect()
      // console.log(obj)
      const mdOffHeight = document.querySelector('.nice-app').offsetTop
      const headerHeight = document.querySelector('.fixed-header').clientHeight
      this.positionTop = mdOffHeight + headerHeight + 15
      // this.positionTop = obj.top
    },
    handleThumbSuccess(res, file) {
      if (res.code === 200) {
        this.Form.thumb = res.data
      }
    },
    handleRemove() {
      const params = {
        key: this.Form.thumb
      }
      deleteImg(params).then(res => {
        this.Form.thumb = ''
      })
    },
    handlePictureCardPreview(e) {
      this.dialogImageUrl = this.Form.thumb
      this.dialogVisible = true
    },
    getTagList() {
      getList().then((res) => {
        if (res.code === 200) {
          this.tags = res.data
          this.$nextTick(() => {
            this.initMdniceNav()
          })
        }
      })
    },
    contentTextChange(text) {
      this.Form.contentText = text
    },
    saveArticle() {
      this.Form.content = document.querySelector('#nice').innerHTML
      // this.Form.contentText = document.querySelector('.nice-text-container').innerText
      save(this.Form).then((res) => {
        if (res.code === 200) {
          this.$notify({
            type: 'success',
            title: '成功',
            message: '文章添加成功'
          })
          localStorage.setItem('content', '')
          this.$router.push('/article/index')
        }
      }).catch((err) => {
        console.log(err)
        this.$notify({
          type: 'error',
          title: '失败',
          message: err
        })
      })
    },
    submit() {
      this.saveArticle()
    }
  }
}
</script>

<style lang="scss" scoped>
.article_container{
  .mk-form{
    padding: 10px 20px;
    box-sizing: border-box;
    width: calc(100% - 30px);
    margin: 0 15px;
    background-color: #fff;
    .el-form-item{
      margin-bottom: 10px;
    }
    .tag-box{
      width: 50%;
      padding: 0 10px;
      min-height: 60px;
      height: 100%;
      border-radius: 5px;
      border: 1px solid #ddd;
      .el-checkbox{
        margin: 0 15px;
      }
    }
    .content-box{
      width: 98%;
    }
    .v-note-wrapper{
      min-height: 480px;
      max-height: 650px;
    }
    .submit{
      display: block;
      width: 80%;
      margin: 30px auto 20px auto;
    }
    /deep/.thumb-uploader{
      position: relative;
      display: inline-block;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
      .pancel{
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        transition: opacity 0.3s;
        opacity: 0;
        width: 178px;
        height: 178px;
        line-height: 178px;
        &:hover{
          opacity: 1;
          background: rgba(0,0,0,.5);
        }
        i{
          font-size: 28px;
          color: #fff;
          &:first-child{
            margin-right: 8px;
          }
          &:last-child{
            margin-left: 8px;
          }
        }
      }
      .thumb-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .thumb{
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
  .md-box{
    margin: 15px;
    background: #fff;
    box-sizing: border-box;
  }
  .submit-box{
    margin: 50px 0;
    .submit{
      display: block;
      width: 50%;
      margin: 0 auto;
    }
  }
}
</style>
