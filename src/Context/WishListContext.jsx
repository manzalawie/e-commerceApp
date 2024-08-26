import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props){

let headers = {
    token : localStorage.getItem("userToken")
}

function getWishList(){
 return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {headers})
.then((res)=>res.data)
.catch((err)=>err)
}
function addToWishList(id){
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", 
{
productId : id
},
{ headers })
.then((res)=> res)
.catch((res)=> res)
}

function deleteWishList(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {headers})
    .then((res)=>res)
    .catch((err)=>err)
}
    return <WishListContext.Provider value={{addToWishList, getWishList, deleteWishList}}>
            {props.children}
    </WishListContext.Provider>
}