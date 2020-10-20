<template>
  <div class="play">
    <div class="play_top">
      <img src="../../assets/images/needle-ip6.png" alt />
    </div>
    <div class="play_img_all" >
      <i ref="playIcon" class="play_icon"></i>
      <div class="play_img_box" ref='playImg' @click="toPlay">
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
          <p :class="rightTime==key?'active':''" v-for="(item,key,i) in lyric" :key="i">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="audio_box">
      <audio autoplay id="audio" ref="audio" v-if="songUrl" :src="songUrl" ></audio>
    </div>
  </div>
</template>

<script>
//强制接口执行顺序 async await
//调取接口api
import url from "../../common/api";
import $ from 'jquery'
export default {
  data() {
    return {
      singer: "",
      songName: "",
      imgUrl: "",
      lyric: "",
      songUrl: "",
      rightTime:'',
      offset:31,
      rNum :0,
      flag:false
    };
  },
  mounted() {
    //挂载 组件一进来就加载接口
    this.getSongDetail();
   // this.getLyric();
    //this.getSongUrl();
    //执行强制的函数
    this.getSelect()
    console.log(this.$refs.audio, "播放器11111");
  },
  methods: {
    //封装一个播放函数
    toPlay(){
      this.flag = !this.flag
      if(this.flag){
        //让音乐暂停
        this.$refs.audio.pause()
        //让图标显示
        this.$refs.playIcon.style.display= 'block'
      }else{
        //让音乐播放
        this.$refs.audio.play()
        //让图标消失
        this.$refs.playIcon.style.display = 'none'
      }
    },
    //封装一个歌词滚动的函数
    lyricMove(){
      //获取含有active的标签
      let active = document.getElementsByClassName('active')[0]
      //寻找含有active的索引
      let index = $('.geci_box').children().index(active)
      //根据是否有active 是否这个向上距离大于等于this.offset(31),发生位移
      if(active){
        if(active.offsetTop>=this.offset){
          //y轴的位移 改变translateY
          $('.geci_box').css('transform',`translateY(-${index*this.offset}px)`)
        }
      }
    },
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
          lyric.replace(reg, (a, b, c) => {
            b = b.slice(0, 5);
            obj[b] = c;
          });
          //console.log(obj,'对象内容')
          //给歌词赋值
          this.lyric = obj;//{00:00 : '你好'}
          console.log( this.lyric,'歌词')
          //监控播放器的播放进度
          let audio = this.$refs.audio;
          audio.ontimeupdate = () => {
            console.log(audio.currentTime,'当前时间以秒')
            let timer = this.transTime(audio.currentTime);
            console.log(timer, "当前播放时间");
            //剔除空时间
            if(timer in this.lyric ){
              this.rightTime = timer
            }
            console.log(this.rightTime,'this.rightTime')
            //让歌词滚动
            this.lyricMove()
            //累加你的旋转角度
            this.rNum += 2
            //让封面旋转
            this.$refs.playImg.style.transform = `rotate(${this.rNum}deg)`
          };
        }
      });
    },
    //获取音乐url
   async getSongUrl() {
    return this.http({
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
    },
   async getSelect(){
     await this.getSongUrl()
     this.getLyric()
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