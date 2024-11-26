"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from '../firebase/firebaseConfig';
import { usePathname, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { UserType } from '@/types/user-type';

type AuthContextProviderType = {
    children: ReactNode
}

type AuthContextType = {
    user: UserType | null
    setUser: (user: UserType | null) => void
}

const AuthContext = createContext<null | AuthContextType>(null)

export default function AuthContextProvider({ children }: AuthContextProviderType) {
    const [user, setUser] = useState<null | UserType>(null);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const auth = getAuth(app);

        const unsubscribe = onAuthStateChanged(auth, async (paramUser) => {
            if (paramUser) {
                const { emailVerified } = paramUser;

                if (emailVerified) {
                    const uid = paramUser.uid;
                    const fetchedUser = await fetchUserData(uid);

                    if (fetchedUser) {
                        setUser(fetchedUser);

                        if (!fetchedUser.role) {
                            // User has no role selected yet
                            if (!path.startsWith("/additional-info")) {
                                router.push('/additional-info');
                            }
                            return;
                        }

                        // Redirect based on user role
                        switch (fetchedUser.role) {
                            case "company":
                                if (!path.startsWith("/company")) {
                                    router.push("/company");
                                }
                                break;
                            case "admin":
                                if (!path.startsWith("/admin")) {
                                    router.push("/admin");
                                }
                                break;
                            case "job seeker":
                                if (!path.startsWith("/jobseeker")) {
                                    router.push("/jobSeeker");
                                }
                                break;
                            default:
                                console.warn("Unknown role. Redirecting to signup.");
                                router.push('/signup');
                        }
                    } else {
                        // User data does not exist in Firestore, redirect to signup
                        router.push('/signup');
                    }
                }
            } else {
                // User is not authenticated
                setUser(null);
                if (!path.startsWith("/signup") && !path.startsWith("/login") && !path.startsWith("/public")) { // Adjust public routes as needed
                    router.push('/signup');
                }
            }
        });

        return () => unsubscribe();
    }, [router, path]);

    const fetchUserData = async (uid: string): Promise<UserType | null> => {
        const docRef = doc(db, "users", uid);
        try {
            const userFound = await getDoc(docRef);
            const userData = userFound.data() as UserType | undefined;
            if (!userData) {
                console.log("No user data found for UID:", uid);
                return null;
            }
    
            return userData;
        } catch (e) {
            console.error("Error fetching user data:", e);
            return null;
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
