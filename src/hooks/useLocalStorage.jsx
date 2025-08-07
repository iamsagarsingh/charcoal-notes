import { useEffect, useReducer } from "react";

export function useLocalStorage(key,reducer,defaultState){
    const [state,dispatch] = useReducer(reducer,defaultState,(initalState)=>{
        const jsonData = localStorage.getItem(key)
        if(jsonData !== null) return JSON.parse(jsonData)
        else{
            return initalState
        }
        
    })
    useEffect(()=>{
            localStorage.setItem(key,JSON.stringify(state))
        },[state])
    return [state,dispatch]
}