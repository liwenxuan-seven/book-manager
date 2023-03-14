import {myAxios} from "@/axios";
export function login(username,password){
    return myAxios.post('/user/login',{
        username,
        password
    })
}
export function getUserInfo(token){
    return myAxios.get(`/user/info/${token}`)
}
