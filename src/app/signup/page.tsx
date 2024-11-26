"use client"

import Auth from '@/components/auth'
import { auth, db } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const router = useRouter();

    const signup = async (userName: string, email: string, password: string) => {
        try {
            console.log(email, password, userName);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userData = userCredential.user;

            // Save user in Firestore with role set to null
            await saveUserInFirestore(userName, email, userData.uid);

            console.log("User signed up successfully");
            if (!userData.emailVerified) {
                router.push("/emailVerified")
                await sendEmailVerification(userData);
                console.log("emailVerified");
                return
            }

            console.log("email not Verified");
            // Redirect to additional-info page
            router.push('/additional-info');
        } catch (e) {
            console.log("Error during signup:", e);
            // Yahan aap error handling kar sakte hain, jaise ke user ko error message dikhana
        }
    }

    const saveUserInFirestore = async (userName: string, email: string, uid: string) => {
        const user = { userName, email, uid, role: null, createdAt: new Date() }
        const docRef = doc(db, "users", uid)
        await setDoc(docRef, user)
    }

    return (
        <div><Auth signup={true} func={signup} /></div>
    )
}
