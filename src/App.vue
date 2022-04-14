<template>
  <div id="page">
    <header id="header">
      <h1>ROLR</h1>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  max-width: 960px;
  margin: 0 auto;
}
</style>

<style lang="scss" scoped>
#header h1 {
  text-align: center;
}
</style>
