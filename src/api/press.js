import {myAxios} from "@/axios";

export default {
    searchPress(page,size,searchWhere){
        return myAxios.post(`/press/list/search/${page}/${size}`,{searchWhere})
    }
}
