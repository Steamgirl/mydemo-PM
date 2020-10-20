<template>
  <div>
    <h1>我是登录验证码页面</h1>
    <div>
      请输入手机号：
      <input type="text" v-model="phone" />
    </div>
    <button @click="sent">发送验证码</button>
    <div>
      填写验证码：
      <input type="text" v-model="sendCode" />
    </div>
    <button @click="login">登录</button>
  </div>
</template>
<script>
import url from "../../common/api";
export default {
  data() {
    return {
      phone: "",
      sendCode: ""
    };
  },
  methods: {
    //发送验证码
    sent() {
      //调取发送验证码接口
      this.http({
        url: url.sentCode,
        params: {
          phone: this.phone
        }
      })
        .then(res => {
          console.log(res, "数据响应");
        })
        .catch(err => {
          console.log(err, "错误信息");
        });
    },
    //登录事件
    login() {
      //调取验证验证码接口
      this.http({
        url: url.checkCode,
        params: {
          phone: this.phone,
          captcha:this.sendCode
        }
      })
        .then(res => {
          console.log(res, "数据响应验证码");
           //如果登录成功
          if (res.data.code == 200) {
            //利用编程式导航
            this.$router.push("/index");
          }
        })
        .catch(err => {
          console.log(err, "错误信息");
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';
</style>