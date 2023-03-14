import {myAxios} from "@/axios/index";
import axios from "axios";
const BASE_URL = [process.env.VUE_APP_BASE_API]
export default {
    getList() {
        const promise1 = myAxios({
            method:'get',
            url:'data.json'
        })
        return promise1
    }
}

