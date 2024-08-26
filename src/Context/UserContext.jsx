import axios from "axios";
import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

const [userLogin, setuserLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
)

function forgotPass(email){
    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", email)
    .then((res)=>res)
    .catch((err)=>err)
}

function resetPassCode(resetCode){
    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", resetCode)
    .then((res)=>res)
    .catch((err)=>err)
}
function resetPass(values){
    return axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
    .then((res)=>res)
    .catch((err)=>err)

}
    return <UserContext.Provider value={{userLogin, setuserLogin, forgotPass, resetPassCode, resetPass}}>
        {props.children}
    </UserContext.Provider>
}