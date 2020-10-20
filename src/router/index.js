import Vue from 'vue'
import Router from 'vue-router'
//引入一级路由
import Index from '@/components/index'
import List from '@/components/pages/list'
import Play from '@/components/pages/play'
import loginTel from '@/components/pages/loginTel'
import loginName from '@/components/pages/loginName'
//引入二级路由
import Recommend from '@/components/view/Recommend'
import hotSong from '@/components/view/hotSong'
import Search from '@/components/view/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/list',
      component:List
    },
    {
      path:'/play',
      component:Play
    },
    {
      path:'/loginName',
      component:loginName
    },
    {
      path:'/loginTel',
      component:loginTel
    },
    {
      path:'/index',
      component:Index,
      children:[
        {
          path:'/recommend',
          component:Recommend
        },
        {
          path:'/hotSong',
          component:hotSong
        },
        {
          path:'/search',
          component:Search
        },
        {
          path:'',
          redirect:'/recommend'
        }
      ]
    },
    {//重定向
      path:'*',
      redirect:'/recommend'
    }
  ]
})
