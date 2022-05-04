<template>
  <div class="tools">
    <div class="search">
      <FormKit type="text" name="" label="" />
      <div class="search-button">
        <div class="search-icon"></div>
      </div>
    </div>
    <div class="filter" @click="$emit('close')">
      <div class="filter-icon"></div>
      Filtiraj
    </div>
  </div>
  <div class="info">
    <span>{{ contributionsNo }} prispevkov</span>
    <span v-if="chosenNo != null">Število izbranih: {{ chosenNo }}</span>
  </div>
  <hr />
</template>

<script>
export default {
  emits: ['close'],
  props: {
    contributionsNo: {
      type: Number,
      default: 0,
    },
    chosenNo: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.info {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 20px;
  span {
    font-size: 10px;
    font-style: italic;
    padding-bottom: 4px;
  }
}
hr {
  margin: 0;
  height: 2px !important;
  background-color: #d2c8ee;
  opacity: 1;
}
.tools {
  display: flex;
  box-shadow: 0 0 4px 1px #eeebf7;
  border-radius: 3px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  padding: 7px;
  span {
    font-size: 10px;
    font-style: italic;
    padding-bottom: 4px;
  }
  .filter {
    display: flex;
    align-items: center;
    border-radius: 3px;
    background-color: $color-orange;
    padding: 4px 6px;
    font-size: 10px;
    margin-left: 10px;
    .filter-icon {
      width: 11px;
      height: 13px;
      margin-right: 5px;
    }
  }
  .search {
    flex-grow: 1;
    position: relative;
    .search-button {
      position: absolute;
      top: 5px;
      right: 5px;
      border-radius: 3px;
      background-color: $color-orange;
      padding: 5px;
    }
    .search-icon {
      width: 11px;
      height: 13px;
    }
  }
}
</style>
