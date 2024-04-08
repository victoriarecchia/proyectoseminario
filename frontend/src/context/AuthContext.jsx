import { auth } from "../credenciales";
import { createContext, useContext } from "react";

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context){
    console.log("error creating auth context");
  }
  return context
}

export const AuthProvider = ({children}) => {
  return <authContext.Provider>{children}</authContext.Provider>
}