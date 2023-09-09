import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const useAuth = () =>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);

    const login =(userData) =>{
        setCurrentUser(userData)
    }

    const logout =() =>{
        setCurrentUser(null)
    }

    const isAuthenticated = () =>{
        return currentUser !==null
    }

    const value ={
        currentUser,
        login,
        logout,
        isAuthenticated
    }

    return(

        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
}