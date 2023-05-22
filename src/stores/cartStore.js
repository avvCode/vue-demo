import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {findNewCartListAPI, insertCartAPI} from "@/apis/cart";

export const useCartStore =  defineStore('cart',() => {
    // 1.定义state - cartList
    const cartList = ref([])
    // 2.定义action - addCart
    const addCart = async (goods) => {
        const {skuId,count} = goods
        if(isLogin.value){
            await insertCartAPI({skuId,count})
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }else {
            //已添加 count + 1
            const item = cartList.value.find((item)=>{goods.skuId === item.skuId})
            //未添加 直接push
            if(item){
                item.count ++
            }else {
                cartList.value.push(goods)
            }
        }
    }
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token)

    // 删除购物车
    const delCart = async (skuId) => {
        if(isLogin.value){
            await delCart([skuId])
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }else {
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }
    const allCount = computed(()=>cartList.value.reduce((a,c)=>a + c.count,0))
    const allPrice = computed(()=>cartList.value.reduce((a,c)=>a + c.count * c.price, 0))
    // 单选功能
    const singleCheck = (skuId, selected) => {
        // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    // 全选功能action
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }
    // 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 3. 已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    const clearCart = () =>{
        cartList.value = []
    }

    const updateCartList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    return{
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        allCheck,
        isAll,
        selectedCount,
        selectedPrice,
        clearCart,
        updateCartList
    }
},{
    persist: true
})