<template>
  <div class="ListItem">
    <div :class="['tag', item.authType === '2' ? 'meanwhile' : 'before']">预授权</div>
    <div class="bank-name">{{item.orgName}}</div>
    <div class="detail">
      <span class="label">授权时间：</span>
      <span class="value">{{item.authBeginTime}}</span>
    </div>
    <div class="detail">
      <span class="label">有效期：</span>
      <span class="value">{{item.authValidTerm}}天</span>
    </div>
    <div class="item-footer">
      <div class="detail">
        <span class="label">用途：</span>
        <span class="value">{{options.authUses ? options.authUses.find(option => item.bussinessType === option.dictValue).dictLabel : ''}}</span>
      </div>
      <el-button
        type="text"
        class="check-btn"
        @click="() => $emit('check', item.authcode)"
      >查看</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListItem",
    props: ['item', 'options']
  }
</script>

<style scoped lang="scss">
  $blueBack: #4586ed;
  $greenBack: #70b602;
  $gray: #999;
  $borderColor: #d9d9d9;

  .ListItem {
    width: 209px;
    height: 208px;
    border-radius: 5px;
    background: #fff;

    .tag {
      width: 60px;
      height: 20px;
      line-height: 20px;
      border-radius: 20px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      margin: 10px auto 20px;

      &.meanwhile {
        background: $blueBack;
      }

      &.before {
        background: $greenBack;
      }
    }

    .bank-name {
      margin: 0 13px 10px;
      font-size: 20px;
      text-align: center;
      line-height: 24px;
      height: 48px;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .detail {
      font-size: 12px;
      text-align: center;

      .label {
        color: $gray;
      }

      .value {
        font-weight: 700;
      }
    }

    .item-footer {
      border-top: 1px solid $borderColor;
      display: flex;
      justify-content: space-between;
      height: 48px;
      line-height: 48px;
      margin-top: 20px;
      padding: 0 15px;

      .detail {
        font-size: 14px;
      }

      .label {
        text-align: left;
      }
    }

    .check-btn {
      text-decoration: none;
      color: $blueBack;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>