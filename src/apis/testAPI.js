import http from "@/utils/http";

//获取导航栏
export function getCategory(){
    return http({
        url: 'home/category/head'
    })
}