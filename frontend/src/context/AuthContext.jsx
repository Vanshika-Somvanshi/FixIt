import { createContext, useEffect, useReducer } from "react";

const getInitialState = () => {
    let user = null;
    try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            user = JSON.parse(storedUser);
        }
    } catch (err) {
        console.error("Failed to parse user from local storage", err);
    }
    
    return {
        user: user,
        role: localStorage.getItem("role") || null,
        token: localStorage.getItem("token") || null,
    }
}

const initialState = getInitialState();

export const authContext = createContext(initialState);

const authReducer = (state, action) => {

    switch(action.type){
        case 'LOGIN_START':
            return {
                user:null,
                role:null,
                token:null,
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload.user,
                token:action.payload.token,
                role:action.payload.role
            };
        case 'LOGOUT':
            return {
                user:null,
                role:null,
                token:null,
            };        
        default:
            return state;
    }
};


export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('token', state.token)
        localStorage.setItem('role', state.role)
    },[state]);

    return(
        <authContext.Provider 
            value={{
                user:state.user, 
                token:state.token, 
                role:state.role, 
                dispatch
            }}
        >
            {children}
        </authContext.Provider>
    )
}
