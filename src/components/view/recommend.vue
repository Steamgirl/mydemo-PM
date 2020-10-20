<template>
  <div class="recommendApp">
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-if="i<6" v-for="(item,i) in bannerList" :key="item.encodeId" class="swiper-slide">
            <img :src="item.imageUrl" alt />
          </div>
          <!--             <div class="swiper-slide">
                <img src="http://p1.music.126.net/ZC-v8PGpEMKS-nJFQCtniQ==/109951164783955622.jpg" alt="">
            </div>
            <div class="swiper-slide">
                <img src="http://p1.music.126.net/juSrUc5ZUovEyBvmn0olxg==/109951164786324595.jpg" alt="">
          </div>-->
        </div>
        <div class="swiper-pagination"></div>
        <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h2 class="h2one">推荐歌单</h2>
      <div class="recommendMusic" v-for="(item) in songList" :key="item.id">
        <a class="overall" href>
          <div class="recom_img">
            <img v-lazy="item.picUrl" alt />
            <span class="mete">{{item.sont_mete}}</span>
          </div>
          <p class="recom_text">{{item.name}}</p>
        </a>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="latestMusic">
      <h2 class="h2two">最新音乐</h2>
      <div @click='goPlay(item.id)' class="m-sglst" v-for="item in latestSong" :key="item.id">
        <a class="m-sgitem" href>
          <div class="sgchfl">
            <div class="sgtl">
              {{item.name}}
              <span v-if="item.song.alias[0]">({{item.song.alias[0]}})</span>
            </div>
            <i class="sghot"></i>
            {{item.song.artists[0].name}}-{{item.song.album.name}}
          </div>
          <div class="sgchfr">
            <span class="sgchply"></span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
//引入api接口
import url from "../../common/api";
//引入swiper依赖
import Swiper from "swiper";
export default {
  data() {
    return {
      songList: [
        // {
        //   title: "推荐歌单",
        //   song: [
        //     {
        //       id: 1,
        //       song_img:
        //         "http://p2.music.126.net/fN_si915UkR21ubJeS3tKw==/109951164738919827.jpg?imageView=1&type=webp&thumbnail=247x0",
        //       sont_text: "[华语速爆新歌] 最新华语音乐推荐",
        //       sont_mete: "7.4亿"
        //     },
        //     {
        //       id: 2,
        //       song_img:
        //         "http://p2.music.126.net/K4Hj1OptBimNaMamqdGnEQ==/109951164721336487.jpg?imageView=1&type=webp&thumbnail=247x0",
        //       sont_text: "溺 | 在时光中沦溺，紧握最初的憧憬",
        //       sont_mete: "52347"
        //     },
        //     {
        //       id: 3,
        //       song_img:
        //         "http://p2.music.126.net/R1smUJETJBtBq8Aa0F-5CA==/109951164157065747.jpg?imageView=1&type=webp&thumbnail=247x0",
        //       sont_text: "我猜你一定有个爱而不得的人吧",
        //       sont_mete: "1089.7万"
        //     },
        //     {
        //       id: 4,
        //       song_img:
        //         "http://p2.music.126.net/l6fRO4wmsTK333Hvijo1ag==/109951163757016267.jpg?imageView=1&type=webp&thumbnail=247x0",
        //       sont_text: "【睡前必听】温柔宝藏男孩",
        //       sont_mete: "97.7万"
        //     },
        //     {
        //       id: 5,
        //       song_img:
        //         "http://p2.music.126.net/3R1tDUe2fzLQC0RBC1Kzng==/109951164614309528.jpg?imageView=1&type=webp&thumbnail=247x0",
        //       sont_text: "[欧美私人订制] 最懂你的欧美推荐 每日更新35首",
        //       sont_mete: "9245.4万"
        //     },
        //     {
        //       id: 6,
        //       song_img:
        //         "http://p2.music.126.net/KFnzNyrQsOqe3AMDahQItA==/109951164676708078.jpg?imageView=1&type=webp&thumbnail=247x0",
        //       sont_text: "UyGuR ♬ 维吾尔",
        //       sont_mete: "139.8万"
        //     }
        //   ]
        // }
      ],
      latestSong: [
        // {
        //   title: "最新歌曲",
        //   song: [
        //     {
        //       id: 10,
        //       songTitle: "给女孩（单曲）",
        //       singer: "李宇春 - 给女孩（单曲)"
        //     },
        //     {
        //       id: 11,
        //       songTitle: "我们 (Live)",
        //       singer: "华晨宇 - 歌手·当打之年 第5期"
        //     },
        //     {
        //       id: 12,
        //       songTitle: "너에게 가는 이 길 위에서 (너.이.길)",
        //       singer: "伯贤 - 하이에나 OST Part.2"
        //     },
        //     {
        //       id: 13,
        //       songTitle: "当遇见你",
        //       singer: "摩登兄弟刘宇宁 - 当遇见你"
        //     },
        //     {
        //       id: 14,
        //       songTitle: "你要相信这不是最后一天",
        //       singer: "华晨宇 - 你要相信这不是最后一天"
        //     },
        //     {
        //       id: 15,
        //       songTitle: "Tomorrow will be fine.",
        //       singer: "Sodagreen - Tomorrow will be fine."
        //     },
        //     {
        //       id: 16,
        //       songTitle: "误解",
        //       singer: "戴佩妮 - 我在北京等你 电视剧原声带"
        //     },
        //     {
        //       id: 17,
        //       songTitle: "小王日记",
        //       singer: "毛不易 - 小王"
        //     },
        //     {
        //       id: 18,
        //       songTitle: "你要相信这不是最后一天 (Live)",
        //       singer: "华晨宇 - 歌手·当打之年 第3期"
        //     },
        //     {
        //       id: 19,
        //       songTitle: "口罩",
        //       singer: "马思唯 / KnowKnow / Higher Brothers"
        //     }
        //   ]
        // }
      ],
      bannerList: []
    };
  },
  mounted() {
    //页面一加载调取推荐歌单接口
    this.getRecSong();
    //页面一加载调取推荐新音乐的接口
    this.getNewSong();
    //页面一加载就出现轮播
    this.getBanner();
  },
  methods: {
    goPlay(id){
      this.$router.push({
        path:'/play',
        query:{
          id
        }
      })
    },
      //封装一个实例化的swiper函数
      getSwiper(){
              let swiper = new Swiper(".swiper-container", {
                loop: true,
                // autoplay:true
                autoplay: {
                  delay: 1000
                },
                pagination: {
                  el: ".swiper-pagination"
                }
              });
      },
    //封装banner函数
    getBanner() {
      //调取banner接口
      this.http({
        url: url.banner
      })
        .then(res => {
          console.log(res, "res");
          if (res.data.code == 200) {
            this.bannerList = res.data.banners;
            console.log(this, "实例");
            //调用延迟加载 $nextTick 下一次加载dom的时候再执行
            this.$nextTick(() => {
                this.getSwiper()
            });
          }
        })
        .catch(err => {});
    },
    //封装推荐音乐的函数
    getRecSong() {
      //调取推荐歌单接口
      this.http({
        url: url.recSong,
        params: {
          limit: 6 //可选参数，取出数量
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.songList = res.data.result;
          }
        })
        .catch(err => {});
    },
    //封装推荐新音乐的函数
    getNewSong() {
      //调取推荐新音乐的接口
      this.http({
        url: url.recNewSong
      })
        .then(res => {
          if (res.data.code == 200) {
            this.latestSong = res.data.result;
            //   console.log(this.latestSong)
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.banner img {
  width: 100%;
  height: 3rem;
}
.recommendApp {
  padding-top: 0.4rem /* 40/75 */;
  background-color: #ffffff;
}
.recommend {
  overflow: hidden;
  padding-bottom: 0.48rem /* 48/75 */;
}
.h2one {
  font-size: 17px;
  font-weight: 510;
  border-left: 2px solid red;
  padding-left: 9px;
  margin-bottom: 14px;
  height: 0.4rem /* 40/75 */;
}
img {
  width: 2.44rem /* 244/75 */ /* 246/75 */;
  height: 2.44rem /* 244/75 */ /* 246/75 */;
}
.recom_img {
  position: relative;
}
.overall {
  display: block;
  float: left;
  width: 33.3%;
  font-size: 13px;
  text-decoration: none;
  color: black;
  margin-bottom: 0.32rem /* 32/75 */;
}
/* 播放量 */
.mete {
  position: absolute;
  right: 0.1rem /* 10/75 */;
  top: 0.02rem /* 2/75 */;
  color: #ffffff;
}
/* 图片下简介 */
.recom_text {
  margin-top: 0;
  padding: 0.2rem /* 20/75 */ 0.04rem /* 4/75 */ 0 0.12rem /* 12/75 */;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}
/* 最新热歌 */
/* .latestMusic{
  
} */
.h2two {
  font-size: 0.34rem /* 34/75 */;
  font-weight: 510;
  border-left: 2px solid red;
  padding-left: 0.18rem /* 18/75 */;
  margin-bottom: 0.5rem /* 50/75 */;
}
.m-sglst {
  padding-left: 0.2rem /* 20/75 */ /* 20/75 */;
}

.m-sgitem {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 1.08rem /* 108/75 */ /* 108/75 */;
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
</style>