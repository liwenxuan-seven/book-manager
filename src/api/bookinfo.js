import {myAxios} from "@/axios";

export default {
    getBookInfoList(){
        return myAxios.get('/bookinfo/list')
    },
    searchBookList(page,size,searchWhere){
        if(size === 10){
            return myAxios.post(`/bookinfo/list/search1/${page}/${size}`,{searchWhere})
        }if(size === 15){
            return myAxios.post(`/bookinfo/list/search2/${page}/${size}`,{searchWhere})
        }else return false
    },
    addABooktoList(page,size,aBook){
        if(size ===10){
            return myAxios.post(`/bookinfo/list/add1/${page}/${size}`,{aBook})
        }else if(size === 15){
            return myAxios.post(`/bookinfo/list/add2/${page}/${size}`,{aBook})
        }else return false
    }
}
