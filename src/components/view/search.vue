<template>
  <div class="box">
    <div class="m-hmsrch">
      <div class="m-input">
        <!-- 搜索栏 -->
        <div class="inputcover">
          <i class="u-svg u-svg-srch"></i>
          <input type="search"
                 name="search"
                 class="input"
                 v-model="content"
                 placeholder="搜索歌曲、歌手、专辑">
          <!-- <div>{{content}}</div> -->
          <!-- <label :class="[content===''?'holder':'']">搜索歌曲、歌手、专辑</label> -->
          <figure class="close">
            <i :class="[content===''? '': 'u-svg-empty']"
               @click="Clear"></i>
          </figure>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="m-default"
           v-show="content===''">
        <div class="m-hotlist">
          <h3>热门搜索</h3>
          <ul class="list">
            <li @click='suggestInfo(item.first)'  class="item f-bd f-bd-full"
                v-for="(item,hIdx) in latestSong"
                :key="hIdx">
              <span class="link">{{item.first}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 搜索下拉框 -->
      <section class="m-recom"
               v-show="content!==''&& resultList.length==0">
        <h3 @click='suggestInfo(content)' class="title">搜索“{{content}}”</h3>
        <ul>
          <li @click='suggestInfo(item.name)' class="recomitem"
              v-for="item in searchResults"
              :key="item.id">
            <i class=" u-svg-search"></i>
            <span class="f-bd f-bd-btm f-thide">{{item.name}}</span>
          </li>
        </ul>
      </section>
      <!-- 这是搜索结果列表 -->
      <div @click="goPlay(item.id)" v-if="content!==''&&resultList.length>0" class="resultList" v-for='item in resultList' :key='item.id'>
        {{item.name}}
      </div>
    </div>
  </div>
</template>
<script>
import url from '../../common/api'
export default {
  data() {
    return {
      content: "",
      latestSong: [
        // {
        //   id: "51",
        //   name: "歌手"
        // },
        // {
        //   id: "52",
        //   name: "致敬了不起的她"
        // },
        // {
        //   id: "53",
        //   name: "假偶天成OST"
        // },
        // {
        //   id: "54",
        //   name: "朋友请听好"
        // },
        // {
        //   id: "55",
        //   name: "很久以后"
        // },
        // {
        //   id: "56",
        //   name: "你要相信这不是最后一天"
        // },
        // {
        //   id: "57",
        //   name: "能解答一切的答案"
        // },
        // {
        //   id: "58",
        //   name: "苏打绿合体"
        // },
        // {
        //   id: "59",
        //   name: "刘宇宁当遇见你"
        // },
        // {
        //   id: "60",
        //   name: "防弹新专辑"
        // }
      ],
      searchResults: [
        // {
        //   id: "71",
        //   result: "一直很安静"
        // },
        // {
        //   id: "72",
        //   result: "小镇姑娘"
        // },
        // {
        //   id: "73",
        //   result: "生活因你而火热"
        // },
        // {
        //   id: "74",
        //   result: "庸人自扰"
        // },
        // {
        //   id: "75",
        //   result: "千里行走"
        // }
      ],
      resultList:[]
    }
  },
  mounted() {
    //组件一加载,就调取热门搜索接口
    this.getSearchHot()

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
    Clear() {
      this.content = ""
    },
    //封装一个搜索函数
    getSearch(word){
      this.http({
        url:url.search,
        params:{
          keywords:word
        }
      })
      .then(res=>{
        console.log(res,'搜索结果')
        //当搜索有数据的时候
        if(res.data.code==200){
          this.resultList = res.data.result.songs
        }
      })
      .catch(err=>{})
    },
    //封装一个搜索建议函数
    getSearchSuggest(word){
      this.http({
        url:url.searchSuggest,
        params:{
          keywords:word
        }
      })
      .then(res=>{
        console.log(res,'搜索建议结果')
        //当搜索建议有值的时候，完善搜索建议列表
        if(res.data.code==200){
          this.searchResults= res.data.result.songs
        }
      })
      .catch(err=>{})
    },
    //点击搜索建议，给input框赋值
    suggestInfo(val){
      //给input框赋值
      this.content = val
      //调取搜索函数
      this.getSearch(this.content)
    },
    //封装一个热门搜索
    getSearchHot(){
        this.http({
        url:url.searcHot,
      })
      .then(res=>{
        console.log(res,'热门搜索结果')
        //当搜索建议有值的时候，完善搜索建议列表
        if(res.data.code==200){
          this.latestSong= res.data.result.hots
        }
      })
      .catch(err=>{})
    }
  },
  //利用watch监听 实时调取接口
  watch:{
    content(newVal){
      console.log(newVal,'监听内容')
      //判断搜索框是否有内容
      if(newVal){
      //在这里面实时调取搜索建议接口
      this.getSearchSuggest(newVal)
      }else{
        this.resultList=[]
        return
      }

    }
  }
}
</script>
<style lang="" scoped>
.resultList{
  line-height: 30px;
    height: 30px;
    background: #ccc;
}
.m-hmsrch {
  background: white;
}
.m-input {
  padding: 0.3rem /* 30/75 */ 0.4rem /* 40/75 */;
  border-bottom: 1px solid #e1e3e4;
}
.inputcover {
  position: relative;
  width: 100%;
  height: 0.6rem /* 60/75 */;
  padding: 0 0.6rem /* 60/75 */;
  box-sizing: border-box;
  background: #ebecec;
  border-radius: 0.6rem /* 60/75 */;
}
.u-svg {
  position: absolute;
  left: 0;
  top: 0.18rem /* 18/75 */;
  margin: 0 8px;
  width: 0.26rem /* 26/75 */;
  height: 0.26rem /* 26/75 */;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
}
.input {
  width: 108%;
  height: 0.6rem /* 60/75 */ /* 60/75 */;
  line-height: 0.36rem /* 36/75 */;
  font-size: 0.28rem /* 28/75 */;
  color: #333333;
  /* border: none; */
  background: rgba(0, 0, 0, 0);
}
.holder {
  position: absolute;
  left: 0.6rem /* 60/75 */;
  top: 0.16rem /* 16/75 */;
  font-size: 0.28rem /* 28/75 */;
  color: #c9c9c9;
  background: rgba(0, 0, 0, 0);
}
/* X号 */
.close {
  position: absolute;
  right: 0;
  top: 0;
  width: 0.6rem /* 60/75 */;
  height: 0.6rem /* 60/75 */;
  line-height: 0.56rem /* 56/75 */;
  text-align: center;
}
.u-svg-empty {
  display: inline-block;
  width: 0.28rem /* 28/75 */;
  height: 0.28rem /* 28/75 */;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==");
  position: absolute;
  right: 0.2rem /* 20/75 */;
  top: 0.16rem /* 16/75 */ /* 16/75 */;
}
/* 热门搜索 */
.m-hotlist {
  padding: 15px 10px 0;
}
h3 {
  font-size: 12px;
  line-height: 12px;
  color: #666;
}
.list {
  margin: 10px 0 7px;
}
.item {
  display: inline-block;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #333;
  border-width: 1px;
  border-style: solid;
  border-color: #d3d4da;
  border-radius: 32px;
}
.link {
  color: #333;
}
/* 搜索框 */
.m-recom {
  margin: 0 auto;
}
.title {
  height: 50px;
  margin-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  line-height: 50px;
  color: #507daf;
  border-bottom: 1px solid #f1eeee;
}
.recomitem {
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 10px;
  font: 15px/1.5 Helvetica, sans-serif, STHeiTi;
  color: #333;
  position: relative;
}
.m-recom sapn {
  display: inline-block;
  flex: 1;
  width: 1%;
  padding-right: 10px;
  font-size: 15px;
  line-height: 45px;
  color: #333;
}
.f-thide {
  display: inline-block;
  width: 100%;
  height: 0.9rem /* 90/75 */;
  line-height: 0.9rem /* 90/75 */;
  border-bottom: 1px solid #f1eeee;
}
.m-recom i {
  margin: 0 8px;
  width: 0.3rem /* 30/75 */ /* 26/75 */;
  height: 0.3rem /* 30/75 */ /* 26/75 */;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
  background-repeat: no-repeat;
}
</style>