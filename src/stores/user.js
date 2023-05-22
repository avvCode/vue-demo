import {defineStore} from "pinia";
import {loginAPI} from "@/apis/user";
import {ref} from "vue";
import {useCartStore} from "@/stores/cartStore";
import {mergeCartAPI} from "@/apis/cart";

export const useUserStore = defineStore('user', () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    const cartStore = useCartStore();
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // 合并购物车
        await mergeCartAPI(cartStore.cartList.map(item => {
            return{
                skuId : item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
       await cartStore.updateCartList()
    }
    //退出时，清楚用户数据
    const clearUserInfo= ()=>{
        userInfo.value = {}
        cartStore.clearCart()
    }
    // 3. 以对象的格式把state和action return
    return {
        getUserInfo,
        userInfo,
        clearUserInfo
    }
}, {
    persist: true,
})