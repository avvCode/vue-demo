import http from '@/utils/http'

export function getCategoryAPI(id){
    return http({
        url: '/category',
        params:{
            id
        }
    })
}

export const getCategoryFilterAPI = (id) =>{
    return http({
        url: '/category/sub/filter',
        params:{
            id
        }
    })
}
/**
 * 获取导航栏数据
 * @data {
 *     categoryId:'',
 *     page: 1,
 *     pageSize:20,
 *     sortFile: 'publicTime' | 'orderNum' | 'evaluateNum'
 * }
 * @returns {*}
 */
export const getSubCategoryAPI = (data) => {
    return http({
        url: '/category/goods/temporary',
        method: 'POST',
        data
    })
}