import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const updateUser = (user) => {
        setUser(user);
    }

    const removeUser = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, updateUser, removeUser}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};