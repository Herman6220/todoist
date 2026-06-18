import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUserInterface {
    _id: string;
    username: string;
    email: string;
}

export interface AuthContextInterface {
    user: AuthUserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUserInterface | null>>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUserInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/auth/getCurrentUser`, {
                    credentials: "include",
                })

                if (!response.ok) {
                    console.log(`Error fetching user. Status: ${response.status}`);
                    if (response.status === 401) {
                        const res1 = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/auth/refreshAccessToken`, {
                            method: "POST",
                            credentials: "include",
                        })

                        if (!res1.ok) {
                            console.log(`Error refreshing token. Status: ${res1.status}`);
                            return;
                        }

                        const res2 = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/auth/getCurrentUser`, {
                            credentials: "include",
                        })

                        if (!res2.ok) {
                            console.log(`Error refreshing token. Status: ${res1.status}`);
                            return;
                        }

                        const d = await res2.json();

                        setUser(d.user);
                    } else {
                        setUser(null);
                        return;
                    }
                } else {
                    const data = await response.json();
                    console.log(data);
                    setUser(data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        getCurrentUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("No user in auth context.");
    }
    return context;
}