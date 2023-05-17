import http from "@/utils/http";

export function getBannerAPI(){
    return http({
        url: '/home/banner'
    })
}

export function findNewAPI(){
    return http({
        url: '/home/new'
    })
}

/**
 * @description: 获取人气推荐
 * @return {*}
 */
export const getHotAPI = () => {
    return  http('home/hot', 'get', {})
}