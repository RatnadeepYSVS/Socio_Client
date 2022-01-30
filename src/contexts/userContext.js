import {createContext,useReducer} from "react"
import { userReducer } from "../reducers/userReducer"
export const UserContext=createContext()
const UserContextProvider=(props)=>{
    const [auth,dispatch]=useReducer(userReducer,{
        isAuth:false,
        user:null
    })
    return( <UserContext.Provider value={{auth,dispatch}}>
        {props.children}
    </UserContext.Provider>)
}
export default UserContextProvider