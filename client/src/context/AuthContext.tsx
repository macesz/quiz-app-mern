import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "../interfaces/IUser"; 

interface AuthContextType {
    user: IUser | null;
    updateUser: (user: IUser) => void;
    removeUser: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // The state can either be an IUser object or null
    const [user, setUser] = useState<IUser | null>(null);

    const updateUser = (userData: IUser) => {
        setUser(userData);
    };

    const removeUser = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, updateUser, removeUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook with built-in safety check
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;