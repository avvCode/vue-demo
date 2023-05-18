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
    return  http({
        url: '/home/hot'
    })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
    return http({
        url: '/home/goods'
    })
}