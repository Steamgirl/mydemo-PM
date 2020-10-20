//正则验证模块
//电话号码验证
function checkTel(tel){
    let reg = /{1-10}/g
    if(reg.test(tel)){
        return true
    }else{
        return false 
    }
}
//身份证验证
function peopleNum(num){
    let reg = /{1-10}/g
    if(reg.test(num)){
        return true
    }else{
        return false 
    }
}
//密码验证
//邮箱验证
export default {
    checkTel,
    peopleNum
}