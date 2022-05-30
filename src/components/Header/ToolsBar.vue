<template>
  <div :class="{ container: !isDesktop.value }">
    <div class="tools">
      <div class="search">
        <FormKit type="text" name="" label="" />
        <div class="search-button">
          <div class="search-icon"></div>
        </div>
      </div>
      <button class="filter" @click="$emit('close')">
        <div class="filter-icon"></div>
        Filtiraj
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  inject: {
    isDesktop: {
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.tools {
  display: flex;
  box-shadow: 0 0 4px 1px #eeebf7;
  border-radius: 3px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  padding: 7px;
  @media (min-width: 992px) {
    box-shadow: none;
    padding: 0;
  }
  span {
    font-size: 10px;
    font-style: italic;
    padding-bottom: 4px;
  }
  .filter {
    display: flex;
    align-items: center;
    border: none;
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
