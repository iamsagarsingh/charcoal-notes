import { createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


const noteContext = createContext()

const reducer = (state,action) => {
    if(action.type === "ADD"){
        return {...state,notes:Array.isArray(action.payload) ? [...action.payload] : []}
    }
    else if(action.type === "GET"){
        return state.notes
    }
    return state
}

const defaultState = {
    notes: [],
    user:null
}

export function NoteContextProvider({children}){
    // const [state,dispatch] = useReducer(reducer,defaultState)
    const [state,dispatch] = useLocalStorage('notes',reducer,defaultState)
    return <noteContext.Provider value={{state,dispatch}}>
        {children}
    </noteContext.Provider>
}

export function useNotes(){
    return useContext(noteContext)
}