<template>
  <div>
    <div class="box claearfix2">
      <router-link to="/recommend"
                   active-class="select clearfix">推荐音乐</router-link>
      <router-link to="/hotSong"
                   active-class="select clearfix">热歌榜</router-link>
      <router-link to="/search"
                   active-class="select clearfix">搜索</router-link>
    </div>
    <div class="box2"></div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="" scoped>
.box {
  width: 100%;
  height: 0.8rem /* 80/75 */;
  display: flex;
  /* justify-content: ; */
  background-color: #ffffff;
  border-bottom: 1px solid #e0dbdb;
  position: fixed;

  z-index: 20;
  /* overflow: hidden; */
}
.box2 {
  width: 100%;
  height: 0.8rem /* 80/75 */;
}
.box a {
  display: block;
  flex: 1;
  text-align: center;
  line-height: 0.8rem /* 80/75 */;
  font-size: 15px;
  text-decoration: none;
}
.select {
  color: #dd001b;
  position: relative;
}
.clearfix::before {
  content: "";
  display: block;
  width: 1.5rem /* 145/75 */;
  height: 0.06rem /* 6/75 */;
  position: absolute;
  bottom: -0.02rem /* 2/75 */;
  left: 0.5rem /* 50/75 */;
  z-index: 3;
  background-color: #dd001b;
}
</style>