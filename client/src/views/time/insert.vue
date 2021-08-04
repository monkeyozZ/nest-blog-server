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
          <el-form-item label="缩略图：" prop="thumb_img" class="thumb_box">
            <el-upload
              class="thumb-uploader"
              :action="upLaodUrl"
              :show-file-list="false"
              :on-success="handleThumbSuccess"
            >
              <div v-if="Form.imageUrl">
                <img :src="Form.imageUrl" class="thumb">
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
        <el-button v-if="!edit" type="primary" class="submit" icon="el-icon-arrow-up" @click="submit">发布一下...Biu</el-button>
        <el-button v-else type="primary" class="submit" icon="el-icon-check" @click="editArticle">保存修改</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deleteImg } from '@/api/image'
import { addTimeLine } from '@/api/time'
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    timeObj: {
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
        imageUrl: ''
      },
      rules: {
        content: [{ required: true, message: '输入想说的吧', trigger: 'blur' }]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      upLaodUrl: process.env.VUE_APP_UPLOAD_API
    }
  },
  watch: {
    timeObj: {
      handler() {
        const { content, imageUrl } = this.timeObj
        this.Form.content = content
        this.Form.imageUrl = imageUrl
      }
    }
  },
  mounted() {
  },
  methods: {
    handleThumbSuccess(res, file) {
      if (res.code === 200) {
        this.Form.imageUrl = res.data
      }
    },
    handleRemove() {
      const params = {
        key: this.Form.imageUrl
      }
      deleteImg(params).then(res => {
        this.Form.imageUrl = ''
      })
    },
    handlePictureCardPreview(e) {
      this.dialogImageUrl = this.Form.imageUrl
      this.dialogVisible = true
    },
    editArticle() {
      this.$refs.dataForm1.validate((valid) => {
        if (valid) {
          const obj = {
            id: this.editId,
            ...this.Form
          }
          addTimeLine(obj).then((res) => {
            if (res.code === 200) {
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
          addTimeLine(this.Form).then((res) => {
            if (res.code === 200) {
              this.$notify({
                type: 'success',
                title: '成功',
                message: res.message
              })
              /* this.$refs.dataForm1.resetFields() // 重置表单
              this.Form.imageUrl = '' */
              this.$router.push('/timeline/index')
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
    .submit{
      display: block;
      width: 80%;
      margin: 30px auto 20px auto;
    }
  }
}
</style>
