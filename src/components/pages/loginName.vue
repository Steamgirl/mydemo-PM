<template>
  <div>
    <!-- <h1>我是登录用户名页面</h1> -->
    <div>
      请输入用户名：
      <input type="text" v-model="userInfo.phone" placeholder="请输入用户名" />
    </div>
    <div>
      请输入密码：
      <input type="password" v-model="userInfo.password" placeholder="请输入密码" />
    </div>
    <button @click="login">登录</button>
    <router-link to='/loginTel'>通过验证码的方式进行登录</router-link>

  </div>
</template>
<script>
//引入接口模块
import url from "../../common/api";
//console.log(url,'地址')
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    //登录事件
    login() {
      console.log(this, "触发");
      //调取登录接口 this.http 就是axios
      this.http({
        url: url.loginName,
        method: "get", //get方法可以省略
        //    params:{
        //        phone:this.userInfo.phone,
        //        password:this.userInfo.password
        //    }
        params: this.userInfo
      })
        .then(res => {
          console.log(res, "数据响应");
          //如果登录成功 把用户信息和token存储起来,跳转首页
          if (res.data.code == 200) {
            //把个人信息进行存储
            sessionStorage.setItem("profile", JSON.stringify(res.data.profile));
            sessionStorage.setItem("token", JSON.stringify(res.data.token));
            //利用编程式导航
            this.$router.push("/index");
          }
        })
        .catch(err => {
          //拦截非200的状态
          console.log(err, "错误内容");
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';
</style>