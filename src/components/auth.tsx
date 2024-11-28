"use client"

import { auth, provider } from '@/firebase/firebaseConfig';
import { TextField } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// Import Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

type AuthProps = {
    signup?: boolean,
    func: (userName: string, email: string, password: string) => void
};

export default function Auth({ signup, func }: AuthProps) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleGoogleSignup = async () => {
        try {
            const res = await signInWithPopup(auth, provider)
            const user = res.user;

            // Save user in Firestore with role set to null if it's a new user
            const userDoc = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userDoc);

            if (!userSnapshot.exists()) {
                await setDoc(userDoc, {
                    userName: user.displayName || "No Name",
                    email: user.email,
                    uid: user.uid,
                    role: null,
                    createdAt: new Date()
                });
            }

            // Redirect to additional-info page
            router.push("/additional-info");
            console.log(res);
        } catch (error) {
            console.log("Error during Google signup:", error);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-[30%] flex flex-col gap-5 border border-black px-14 py-14 relative'>
                {signup ? (
                    <h1 className='text-3xl font-bold text-center bg-white w-fit px-5 py-2 absolute -top-[50px] left-[50%] right-[50%] -translate-x-[50%] text-[#926c00]'>SignUp</h1>
                ) : (
                    <h1 className='text-3xl font-bold text-center bg-white w-fit px-5 py-2 absolute -top-[50px] left-[50%] right-[50%] -translate-x-[50%] text-[#926c00]'>Login</h1>
                )}
                {signup && (
                    <TextField
                        type='text'
                        label='Name'
                        variant='outlined'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        required
                    />
                )}
                <TextField
                    type='email'
                    label='Email'
                    variant='outlined'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <TextField
                    type='password'
                    label='Password'
                    autoComplete='current-password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    className='w-full bg-[#926c00] py-2 rounded-full text-white hover:bg-white hover:border border-[#926c00] hover:text-[#926c00] transition-all'
                    onClick={() => { func(userName, email, password); }}
                >
                    {signup ? 'SignUp' : 'Login'}
                </button>
                <button
                    className='w-full hover:bg-[#926c00] py-2 rounded-full hover:text-white bg-white border border-[#926c00] text-[#926c00] transition-all'
                    onClick={handleGoogleSignup}
                >
                    {signup ? 'SignUp with Google' : 'SignIn with Google'}
                </button>
                {signup ? (
                    <div className='flex gap-2'>
                        <p>Already have an account?</p>
                        <Link className='underline text-[#926c00]' href='./login'>Login</Link>
                    </div>
                ) : (
                    <div className='flex gap-2'>
                        <p>{`Don't have an account?`}</p>
                        <Link className='underline text-[#926c00]' href='./signup'>SignUp</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
