import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){

let headers = {
    token : localStorage.getItem("userToken")
}
const [myCartId, setmyCartId] = useState("")

function getCartItems(){
 return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {headers})
.then((res)=>{
    setmyCartId(res.data.data._id)
return res.data})
.catch((err)=>err)
}

function addToCart(id){
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart", 
{
productId : id
},
{ headers })
.then((res)=> res)
.catch((err)=> err)
}

function updateCount(productId, newCount){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count : newCount},
    {headers})
    .then((res)=>res)
    .catch((err)=>err)
}

function deleteCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers})
    .then((res)=>res)
    .catch((err)=>err)
}

function deleteAllCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    .then((res)=>res)
    .catch((err)=>err)
}

function checkOut(cartId, url, FormData) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
{shippingAddress : FormData},
{ headers }
)
    .then((res)=>res)
    .catch((err)=>err)
}

    return <CartContext.Provider value={{addToCart, getCartItems, deleteCart, updateCount, deleteAllCart, checkOut, myCartId}}>
            {props.children}
    </CartContext.Provider>
}