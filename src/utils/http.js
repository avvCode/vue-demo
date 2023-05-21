// 对axios基础封装
import axios from 'axios'
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user";

const http = axios.create({
    // headers:[],
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

//拦截器
// axios请求拦截器
http.interceptors.request.use(config => {
    // 1. 从 pinia获取Token
    const userStore = useUserStore();
    const token = userStore.userInfo.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
    //统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.msg
    })
    return Promise.reject(e)
})
export default http;