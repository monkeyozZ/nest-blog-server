<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日浏览人数</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="102400" :duration="2600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日留言数</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="81212" :duration="3000" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="article" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日热门文章</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="9280" :duration="3200" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="smile" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">不知道写啥</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="13600" :duration="3600" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group{
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel{
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover{
      .card-panel-icon-wrapper{
        color: #fff;
      }
      .icon-people{
        background: #40c9c6;
      }
      .icon-message{
        background: #36a3f7;
      }
      .icon-money{
        background: #f4516c;
      }
      .icon-shoppingCard{
        background: #34bfa3;
      }
    }
    .icon-people{
      color: #40c9c6;
    }
    .icon-message{
      color: #36a3f7;
    }
    .icon-money{
      color: #f4516c;
    }
    .icon-shoppingCard{
      color: #34bfa3;
    }
    .card-panel-icon-wrapper{
      float: left;
      margin: 20px 0 0 20px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon{
      float: left;
      width: 36px;
      height: 36px;
    }
    .card-panel-description{
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text{
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num{
        font-size: 20px;
      }
    }
  }
}
</style>
