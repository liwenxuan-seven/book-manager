import router from "@/router";
import {getUserInfo} from "@/api/login";

router.beforeEach((to,from,next) => {
    const token = localStorage.getItem('maho-manager-token')
    //如果没有获取到token
    if(!token){
        if(to.path != '/login'){
            next({path : '/login'})
        }else{
            next()
        }
        //获取到token
    }else {
        const res = localStorage.getItem('maho-manager-name')
        if(res){
            next()
        }
        else {
            getUserInfo(token).then(response => {
                const resp = response.data
                if(resp.flag){
                    localStorage.setItem('maho-manager-name',JSON.stringify(resp.data))
                    next()
                }else{
                    next({path: 'login'})
                }
            })
        }
        this.$router.push('/login')
    }
})
