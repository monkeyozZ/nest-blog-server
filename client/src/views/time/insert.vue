<template>
  <div class="article_container">
    <el-row>
      <el-col :lg="17" :md="12" :sm="24" :xs="24" class="form-left" :class="{resetBg: edit}">
        <el-form ref="dataForm1" :rules="rules" :model="Form" label-position="left" label-width="120px">
          <el-form-item label="此刻想说的：" prop="content" :inline-message="true">
            <el-input v-model="Form.content" type="textarea" placeholder="说吧，畅所欲言..." style="width:70%" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :lg="5" :md="9" :sm="24" :xs="24" class="form-right" :class="{resetBg: edit}">
        <el-form ref="dataForm2" :rules="rules" :model="Form" label-position="top" label-width="85px">
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
              :action="baseapi + '/time/thumbSave'"
              :data="Form"
              :show-file-list="false"
              :on-success="handleThumbSuccess"
              accept="image/*"
              :before-upload="beforeThumbUpload"
            >
              <div v-if="Form.imageUrl" class="el-upload-list--picture-card">
                <img :src="baseapi + Form.imageUrl" class="thumb">
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-check" />
                </label>
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview">
                    <i class="el-icon-refresh" style="font-size:14px">重选</i>
                  </span>
                </span>
              </div>
              <i v-else class="el-icon-plus thumb-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button v-if="!edit" type="primary" class="submit" icon="el-icon-arrow-up" @click="submit">发布一下...Biu</el-button>
        <el-button v-else type="primary" class="submit" icon="el-icon-check" @click="editArticle">保存修改</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import axios from 'axios'
// import timeApi from '@/api/time'
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    editArr: {
      type: Object,
      default: () => {}
    },
    editId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      baseapi: process.env.BASE_API,
      Form: {
        content: '',
        status: true,
        imageUrl: ''
      },
      rules: {
        content: [{ required: true, message: '输入想说的吧', trigger: 'blur' }]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    editArr: {
      handler() {
        const { title, keywords, des, category, tag, content, origin, status, open, imageUrl } = this.editArr
        this.Form.title = title
        this.Form.keywords = keywords
        this.Form.des = des
        this.Form.category = category
        this.Form.tag = tag
        this.Form.content = content
        this.Form.origin = origin
        this.Form.status = status
        this.Form.open = open
        this.Form.imageUrl = imageUrl
      }
    }
  },
  mounted() {
    // this.refresh()
  },
  methods: {
    refresh() {
      // 页面刷新和关闭提醒事件
      window.onbeforeunload = function() {
        return '请确认信息是否已保存！'
      }
    },
    handleThumbSuccess(res, file) {
      if (res.code === 0) {
        this.Form.imageUrl = res.imageUrl
      }
    },
    beforeThumbUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isLt10M
    },
    editArticle() {
      this.$refs.dataForm1.validate((valid) => {
        if (valid) {
          timeApi.editOneTime(this.editId, this.Form).then((res) => {
            if (res.data.code === 0) {
              this.$emit('changeEditdialogVisible')
              this.$notify({
                type: 'success',
                title: '成功',
                message: '修改成功'
              })
            }
          })
        }
      })
    },
    submit() {
      this.$refs.dataForm1.validate((valid) => {
        if (valid) {
          timeApi.insert(JSON.stringify(this.Form)).then((res) => {
            if (res.data.code === 0) {
              this.$notify({
                type: 'success',
                title: '成功',
                message: '文章添加成功'
              })
              /* this.$refs.dataForm1.resetFields() // 重置表单
              this.Form.imageUrl = '' */
              this.$router.push('/article/index')
            }
          }).catch((err) => {
            this.$notify({
              type: 'error',
              title: '失败',
              message: err
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article_container{
  .form-left{
    padding: 10px 20px;
    box-sizing: border-box;
    margin: 0 15px;
    background-color: #fff;
    &.resetBg{
      border: 1px solid #ddd;
      border-radius: 5px;
    }
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
  }
  .form-right{
    padding: 10px 20px;
    box-sizing: border-box;
    margin: 0 10px;
    background-color: #fff;
    &.resetBg{
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .thumb-uploader{
      .el-upload-list__item-status-label{
        display: block;
        height: 27px;
        top: -10px;
        .el-icon-check{
          color: #fff;
        }
      }
      .thumb-uploader-icon{
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        line-height: 150px;
        text-align: center;
      }
      .thumb{
        display: inline-block;
        max-width: 100%;
        width: 100%;
        height: 150px;
      }
    }
    .submit{
      display: block;
      width: 80%;
      margin: 30px auto 20px auto;
    }
  }
}
</style>
