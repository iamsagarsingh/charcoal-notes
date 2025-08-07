import { createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const userContext = createContext();

const reducer = (state, action) => {
  if(action.type === "LOGIN"){
        return {
            ...state,
            status: true,
            userData: action.payload
        }
    }
    else if(action.type === "LOGOUT"){
        return {
            ...state,
            status: false,
            userData: null
        }
    }
    return state
};

const defaultState = {
  status: false,
  userData: null,
};

export function UserContextProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, defaultState);
const [state,dispatch] = useLocalStorage('Noteuser',reducer,defaultState)
  return <userContext.Provider value={{state,dispatch}}>{children}</userContext.Provider>;
}

export function useAuth() {
  return useContext(userContext);
}
