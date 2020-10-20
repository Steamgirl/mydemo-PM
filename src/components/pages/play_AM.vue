<template>
  <div class="play">
    <div class="play_top">
      <img src="../../assets/images/needle-ip6.png" alt />
    </div>
    <div class="play_img_all">
      <i class="play_icon"></i>
      <div class="play_img_box">
        <div class="small_img">
          <img :src="imgUrl" alt />
        </div>
      </div>
    </div>
    <div class="play_txt">
      <div class="play_txt_name">
        {{songName}}-
        <span class="singer">{{singer}}</span>
      </div>
      <div class="play_txt_geci">
        <div class="geci_box">
          <p class="active" v-for="(item,key,i) in lyric" :key="i">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="audio_box">
      <audio id="audio" ref="audio" :src="songUrl" controls></audio>
    </div>
  </div>
</template>

<script>
/* 歌词播放的思路：
发现后端返给前端的歌词是字符串（[00:00.000] 作曲 : CMJ [00:01.000] 作词 : 桃玖），内容带着时间和歌词同时发现播放器是有时间，不同的时间播放不同的音乐进度（播放器时间00:00-04:40）
利用正则去拆分我的歌词字符串，拆分成：00:00.000  == 00:00 作曲 : CMJ 
拆分完成之后 要做的就是拿歌词与播放器时间匹配并加高亮
*/
//调取接口api
import url from "../../common/api";
export default {
  data() {
    return {
      singer: "",
      songName: "",
      imgUrl: "",
      lyric: "",
      songUrl: ""
    };
  },
  mounted() {
    console.log(this.$refs.aaa, "新的播放器");
    //获取url地址上的query参数 取值$route
    // console.log(this.$route.query.id)

    //挂载 组件一进来就加载接口
    this.getSongDetail();
    this.getLyric();
    this.getSongUrl();
    console.log(this.$refs.audio, "播放器11111");
  },
  methods: {
    //封装一个时间转化函数
    //4.142687s => 转化成分钟4.142687/60 分钟 4.142687%60 秒 00:00
    transTime(time) {
      //转换分钟
      let minute = Math.floor(time / 60);
      minute < 10 ? (minute = "0" + minute) : minute;
      let second = Math.floor(time % 60);
      second < 10 ? (second = "0" + second) : second;
      return `${minute}:${second}`;
    },
    //获取歌曲详情
    getSongDetail() {
      this.http({
        url: url.songDetail,
        params: {
          ids: this.$route.query.id
        }
      }).then(res => {
        console.log(res, "获取歌曲详情的响应");
        if (res.data.code == 200) {
          //获取歌手
          this.singer = res.data.songs[0].ar[0].name;
          //获取歌名
          this.songName = res.data.songs[0].name;
          //获取歌曲封面
          this.imgUrl = res.data.songs[0].al.picUrl;
        }
      });
    },
    //获取歌词
    getLyric() {
      this.http({
        url: url.lyric,
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        console.log(res, "获取歌词");
        if (res.data.code == 200) {
          //this.lyric = res.data.lrc.lyric
          //把歌词获取字符串赋值给一个变量，去拆分这个变量
          let lyric = res.data.lrc.lyric;
          //设置一个空对象
          let obj = {}; //obj.a obj[a]=当前key值所在的value值

          //设置一个正则 把数组[]去掉
          let reg = /\[(.*?)](.*)/g;
          //把字符串拆分替换成我需要的内容
          //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
          //replace有两种使用，第一种普通字符串 ，第二种匹配正则，回函数
          lyric.replace(reg, (a, b, c) => {
            // [00:38.883]不论风雨 aaaaaa
            // 00:38.883 bbbbbb
            // 不论风雨 ccccccccc
            //a是当前正则匹配的全部内容
            //b是第一次匹配的内容
            //c是我第二次匹配的内容
            //通过需求得知我需要b和c
            // console.log(a, "aaaaaa");
            // console.log(b, "bbbbbb");
            // console.log(c, "ccccccccc");
            //不拆分字符串的时候 对象{00:38.883：不论风雨}
            //对b进行字符串拆分 拆分出00:00
            b = b.slice(0, 5);
            obj[b] = c;
          });
          //console.log(obj,'对象内容')
          //给歌词赋值
          this.lyric = obj;
          //监控播放器的播放进度
           let audio = this.$refs.audio
            audio.ontimeupdate = () => {
              //设置或返回音频中的当前播放位置（以秒计）audio.currentTime  给当前事件进行转化 转化成我想要的格式00:00 以分钟计
              let timer = this.transTime(audio.currentTime);
              console.log(timer, "当前播放时间");
            };
          /*           let str = '在武汉东湖新城社区，和习近平总书记面对面的，有社区工作者、基层民警、卫生服务站医生，还有下沉干部、志愿者。抗疫期间，社区居民缺米少油了、下水道堵了、垃圾箱满了……这些琐碎繁杂的大事小事，他们都得管。一个多月来，像他们这样的社区防控队伍，是武汉这座英雄城市一道独特的风景线。'
          let reg1 = /\武/g
          str.replace(reg1,(a,b,c,d)=>{
            console.log(a, "aaaaaa");
             console.log(b, "bbbbbb");
            console.log(c, "ccccccccc");
            console.log(d, "dddd");
          }) */
        }
      });
    },
    //获取音乐url
    getSongUrl() {
      this.http({
        url: url.songUrl,
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        console.log(res, "获取音乐url");
        if (res.data.code == 200) {
          this.songUrl = res.data.data[0].url;
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
.play {
  left: 0;
  position: fixed;
  background: #464547;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
}
.play .top {
  position: relative;
}
.play .play_top img {
  position: absolute;
  width: 96px;
  height: 137px;
  left: 38%;
  margin-left: 25px;
  z-index: 9;
}

.play_img_box {
  margin: 70px auto 0;
  width: 296px;
  height: 296px;
  background: url("../../assets/images/disc-ip6.png");
  background-size: 296px;
  overflow: hidden;
}
.play_img_all {
  position: relative;
}
.play_img_box .small_img {
  margin: 55px auto 0;
  width: 191px;
  border-radius: 50%;
  overflow: hidden;
}
.play_img_all .play_icon {
  position: absolute;
  display: none;
  left: 37%;
  top: 34%;
  margin-left: 25px;
  margin-top: 25px;
  height: 50px;
  width: 50px;
  background: url("../../assets/images/list_sprite.png") no-repeat;
  z-index: 99;
}
.play_img_box .small_img img {
  width: 191px;
  height: 191px;
}

.play_txt {
  padding: 0 15px 20px;
  margin-top: 25px;
}
.play_txt_name {
  text-align: center;
  font-size: 16px;
  line-height: 25px;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}
.play_txt_name .singer {
  color: hsla(0, 0%, 100%, 0.6);
}

.play_txt_geci {
  position: relative;
  margin-top: 14px;
  height: 130px;
  overflow: auto;
}

.geci_box {
  height: 120px;
  text-align: center;
  width: 100%;
  transition: 0.5s;
}
.geci_box p {
  font-size: 16px;
  color: #fff;
  height: 31px;
  line-height: 31px;
  overflow: hidden;
}

.audio_box {
  padding-bottom: 50px;
  text-align: center;
}

::-webkit-scrollbar {
  display: none;
}
.active {
  color: green !important;
}
</style>