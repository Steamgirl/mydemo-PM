<template>
  <div class="box">
    <!-- 顶部背景图片 -->
    <div class="hotop">
      <div class="hotopct">
        <div class="u-hmsprt hoticon"></div>
        <div class="hottime">
          更新日期：03月05日
        </div>
      </div>
    </div>
    <!-- 音乐列表 -->
    <div @click='goPlay(item.id)' v-if='index<20' class="m-sglst"
         v-for="(item,index) in latestSong"
         :key="item.id">
      <div class="m-sgitem">
        <div :class="[index<3? 'sgfl-cred':'sgfl-cred2']">{{index>9 ?index+1:"0"+(index+1)}}</div>
        <div class="sgchfl">
          <div class="sgtl">
            {{item.name}} <span v-if="item.alia[0]">({{item.alia[0]}})</span>
          </div>
          <i class="sghot"></i>
          {{item.ar[0].name}}-{{item.name}}
        </div>
        <div class="sgchfr">
          <span class="sgchply"></span>
        </div>
      </div>
    </div>
    <!-- 查看完整榜单 -->
    <div class="hotdn">
      <span class="hotview">查看完整榜单</span>
    </div>
  </div>
</template>
<script>
import url from '../../common/api'
export default {
  data() {
    return {
      latestSong: [
        // {
        //   title: "最新歌曲",
        //   song: [
        //     {
        //       id: 30,
        //       songTitle: "冬眠",
        //       singer: "司南 - 冬眠"
        //     },
        //     {
        //       id: 31,
        //       ranKing: 1,
        //       songTitle: "朋友请听好 (易烊千玺版)",
        //       singer: "易烊千玺 / 朋友请听好 - 朋友请听好 (易烊千玺版)"
        //     },
        //     {
        //       id: 32,
        //       songTitle: "大眠 (完整版)",
        //       singer: "小乐哥 - 大眠 (完整版)"
        //     },
        //     {
        //       id: 33,
        //       songTitle: "世间美好与你环环相扣",
        //       singer: "柏松 - 听闻余生"
        //     },
        //     {
        //       id: 34,
        //       songTitle: "你的答案",
        //       singer: "阿冗 - 你的答案"
        //     },
        //     {
        //       id: 35,
        //       songTitle: "想见你想见你想见你",
        //       singer: "八三夭 - 想见你想见你想见你"
        //     },
        //     {
        //       id: 36,
        //       songTitle: "50 Feet",
        //       singer: "SoMo - 50 Feet"
        //     },
        //     {
        //       id: 37,
        //       songTitle: "麻雀",
        //       singer: "李荣浩 - 麻雀"
        //     },
        //     {
        //       id: 38,
        //       songTitle: "无人之岛",
        //       singer: "任然 - 没有发生的爱情"
        //     },
        //     {
        //       id: 39,
        //       songTitle: "好想爱这个世界啊",
        //       singer: "华晨宇 - 好想爱这个世界啊"
        //     },
        //     {
        //       id: 40,
        //       songTitle: "处处吻",
        //       singer: "杨千嬅 - Simply Me"
        //     },
        //     {
        //       id: 41,
        //       songTitle: "勇气",
        //       singer: "棉子 - 勇气"
        //     },
        //     {
        //       id: 42,
        //       songTitle: "起风了",
        //       singer: "买辣椒也用券 - 起风了"
        //     },
        //     {
        //       id: 43,
        //       songTitle: "处处吻",
        //       singer: "杨千嬅 - Simply Me"
        //     },
        //     {
        //       id: 44,
        //       songTitle: "吹梦到西洲",
        //       singer: "恋恋故人难 / 黄诗扶 / 妖扬 - 吹梦到西洲"
        //     },
        //     {
        //       id: 45,
        //       songTitle: "借",
        //       singer: "毛不易 - 平凡的一天"
        //     },
        //     {
        //       id: 46,
        //       songTitle: "还是分开",
        //       singer: "张叶蕾 - 还是分开"
        //     },
        //     {
        //       id: 47,
        //       songTitle: "多想在平庸的生活拥抱你",
        //       singer: "隔壁老樊 - 我曾"
        //     },
        //     {
        //       id: 48,
        //       songTitle: "零几年听的情歌",
        //       singer: "AY楊佬叁 - 零几年听的情歌"
        //     },
        //     {
        //       id: 49,
        //       songTitle: "飞",
        //       singer: "王恩信Est / 二胖u - 飞"
        //     }
        //     // {
        //     //   id: 50,
        //     //   songTitle: "我要找到你",
        //     //   singer: "Zic子晨 - 我要找到你"
        //     // }
        //   ]
        // }
      ]
    }
  },
  mounted() {
    //组件一就调取热歌榜单函数
    this.getHotTop()
  },
  methods:{
    //跳转播放页面
    goPlay(id){
     // this.$router.push('/play?id='+id)
     this.$router.push({
       path:'/play',
       query:{
         id
       }
     })
    },
    getHotTop(){
      //调取热门排行榜单
      this.http({
        url:url.topList,
        params:{
          idx:1//云音乐热歌榜
        }
      })
      .then(res=>{
        console.log(res,'云音乐热歌榜')
        if(res.data.code==200){
          this.latestSong = res.data.playlist.tracks
        }
      })
      .catch(err=>{})
    }
  }
}
</script>
<style lang="" scoped>
.hotop {
  width: 100%;
  height: 2.9rem /* 290/75 */;
  position: relative;
  /* padding-top: 38.9%; */
  overflow: hidden;
  background: url("../../../static/imgs/hot_music_bg_2x.jpg") no-repeat;
  background-size: contain;
}
.hotopct {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  padding-left: 20px;
  box-sizing: border-box;
}
.u-hmsprt {
  width: 2.82rem /* 282/75 */;
  height: 1.34rem /* 134/75 */;
  background: url("../../../static/imgs/index_icon_2x.png");
  background-position: -24px -30px;
  background-size: 166px 97px;
}
.hottime {
  margin-top: 10px;
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 12px;
}

/* 热歌榜 */
.m-sglst {
  background-color: white;
  padding-left: 0.26667rem /* 20/75 */ /* 20/75 */;
}

.m-sgitem {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 1.44rem /* 108/75 */ /* 108/75 */;
  display: flex;
  border-bottom: 1px solid #cccccc;
  /* padding-left: 0.26667rem; */
  padding: 0.12rem /* 12/75 */ 0 0 /* 12/75 */ 0;
  overflow: hidden;
}
/* 左边 */
.sgchfl {
  width: 6.46rem /* 646/75 */;
  height: 1.08rem /* 108/75 */;
  /* padding: 0.16rem 12/75 0; */
  color: #888888;
}
.sgtl {
  font-size: 0.34rem /* 34/75 */;
  color: black;
  margin-bottom: 0.14rem /* 14/75 */ /* 7/75 */;
}
/* SQ图片 */
.sghot {
  display: inline-block;
  background: url("../../../static/imgs/index_icon_2x.png");
  width: 0.24rem /* 24/75 */;
  height: 0.16rem /* 16/75 */;
  background-size: 166px 97px;
}
.sginfo {
  font-size: 12px;
}
/* 右边播放图标 */
.sgchfr {
  width: 0.84rem /* 84/75 */;
  height: 1.08rem /* 108/75 */;
  position: relative;
}
.sgchply {
  display: inline-block;
  width: 0.44rem /* 44/75 */;
  height: 0.44rem /* 44/75 */;
  background: url("../../../static/imgs/index_icon_2x.png");
  background-size: 166px 97px;
  background-position: -24px 0;
  position: absolute;
  top: 0.1rem /* 10/75 */;
  left: 0;
}
.sgfl-cred {
  color: #df3436;
  justify-content: center;
  width: 0.8rem /* 80/75 */;
  font-size: 0.34rem /* 34/75 */;
  line-height: 0.66rem /* 66/75 */;
}
.sgfl-cred2 {
  color: #999999;
  justify-content: center;
  width: 0.8rem /* 80/75 */;
  font-size: 0.34rem /* 34/75 */;
  line-height: 0.66rem /* 66/75 */;
}
/* 查看完整榜单 */
.hotdn {
  width: 100%;
  height: 1.1rem /* 110/75 */;
  background-color: white;
  text-align: center;
  line-height: 1.1rem /* 110/75 */;
}
.hotview {
  display: inline-block;
  color: #999;
  padding-right: 0.28rem /* 28/75 */;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAyMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEgMWwxMCAxMEwxIDIxIi8+PC9zdmc+)
    100% no-repeat;
  background-size: 7px 12px;
  font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
}
</style>