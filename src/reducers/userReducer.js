export const userReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":
            return {...state,
                isAuth:true,
                user:action.user
            }
        case "SIGNUP":
            return {...state,
                isAuth:true,
                user:action.user
            }
        case "LOGOUT":
            return {...state,
                isAuth:false,
                user:null
            }
        default:
            return state
    }
}