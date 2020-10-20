<template>
  <div>
    <!-- <h1>我是index页面</h1> -->
    <div class="topapp">
      <svg class="icon box" aria-hidden="true">
        <use xlink:href="#icon-wangyiyun" />
      </svg>
      <div class="logo">网易云音乐</div>
      <div class="app">
        <h1>下载APP</h1>
      </div>
    </div>
    <div class="topapp2"></div>
    <v-Nav></v-Nav>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </div>
</template>
<script>
import vNav from './common/nav'
export default {
    components:{
        vNav
    }
};
</script>
<style lang="stylus" scoped>
.topapp 
  background: #d43c33;
  width: 100%;
  height: 1.68rem; /* 168/75 */
  position: fixed;
  z-index: 3;
  overflow: hidden;
  .icon 
    height: 0.66rem; /* 66/75 */
    position: relative;
    left: -2.5rem; /* 250/75 */
    top: 0.52rem; /* 52/75 */
  .app 
    width: 2rem; /* 200/75 */
    height: 0.72rem; /* 72/75 */
    color: #d43c33;
    background-color: #ffffff;
    border-radius: 37.5% / 100%;
    font-size: 16px;
    line-height: 0.72rem; /* 72/75 */
    text-align: center;
    position: relative;
    right: -266px; /* 20/75 */
    top: -41px; /* 46/75 */

  .logo
    width: 100px;
    height: 30px;
    overflow: hidden;
    position: relative;
    top: -3px;
    left: 1rem; /* 100/75 */
    font-size: 20px;
    color: #ffffff;
    font-weight: 500;
.topapp2 
  width: 100%;
  height: 1.68rem; /* 168/75 */
</style>