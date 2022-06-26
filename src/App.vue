<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
  export default {
    
    data() {
      return {
        isRouterAlive: true
      };
    },
    provide() {
      return {
        reload: this.reload
      };
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
// 自定义进度条颜色
 #nprogress .bar {
      background: #F811B2 !important; //自定义颜色
  }
</style>
