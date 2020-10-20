//所有项目的接口管理文件
const baseUrl = 'http://localhost:3000' //www.zhenbang.com
//登录接口（用户名密码）
const loginName= baseUrl + '/login/cellphone'
//发送验证码
const sentCode = baseUrl+'/captcha/sent'
//验证验证码
const checkCode = baseUrl + '/captcha/verify'
//推荐歌单的接口
const recSong = baseUrl +'/personalized' 
//推荐新音乐
const recNewSong = baseUrl + '/personalized/newsong'
//封装banner接口
const banner = baseUrl + '/banner'
//封装排行榜接口
const topList = baseUrl + '/top/list'
//封装搜索接口
const search = baseUrl + '/search'
//封装搜索建议
const searchSuggest = baseUrl + '/search/suggest'
//封装一个热门搜索
const searcHot = baseUrl + '/search/hot'
//封装一个歌曲详情
const songDetail = baseUrl + '/song/detail'
//封装一个歌词接口
const lyric = baseUrl + '/lyric'
//封装一个获取音乐url接口
const songUrl = baseUrl + '/song/url'

export default {
    loginName,
    sentCode,
    checkCode,
    recSong,
    recNewSong,
    banner,
    topList,
    search,
    searchSuggest,
    searcHot,
    songDetail,
    lyric,
    songUrl
}