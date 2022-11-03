// /src/hooks/useAuth.tsx
import React, { useState, createContext, useContext, useEffect } from "react";
const AuthContext = createContext({ authed: false, setAuthed: (authed: boolean) => {} , loading : true});

export const AuthProvider = ({ children }:any) => {
const [authed, setAuthed] = useState<boolean>(false);
    // Store new value to indicate the call has not finished. Default to true
const [loading, setLoading] = useState<boolean>(true);

    // Runs once when the component first mounts
    useEffect(() => {
        // Check if the user is logged in
        const fetchData = async () => {
            const response = await fetch(`http://${process.env.REACT_APP_HOST_URI}/api/user/me`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            console.log(json);
            if (json.statusCode) {
                setAuthed(false);
                setLoading(false);
            }
            else {
                setAuthed(true);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Mock call to an authentication endpoint
    const fakeAsyncLogin = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Logged In");
            }, 300);
        });
    };

    return (
        // Expose the new `loading` value so we can consume it in `App.tsx`
        <AuthContext.Provider value={{ authed, setAuthed, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
