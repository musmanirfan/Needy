"use client"

import { useAuthContext } from '@/context/authContext';
import { db } from '@/firebase/firebaseConfig';
import { UserRole } from '@/types/user-role-type';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';




export default function AdditionalInfo() {
    const [role, setRole] = useState('');
    const { user } = useAuthContext()!;
    const router = useRouter();

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleRoleSelection = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) {
            alert("Please select a role.");
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                role: role,
                updatedAt: new Date(),
            });

            // After setting the role, redirect based on role
            switch (role) {
                case "company":
                    router.push("/company");
                    break;
                case "admin":
                    router.push("/admin");
                    break;
                case "job seeker":
                    router.push("/jobSeeker");
                    break;
                default:
                    console.warn("Unknown role selected.");
                    router.push('/signup');
            }
        } catch (error) {
            console.error("Error updating user role:", error);
            // Yahan aap error handling kar sakte hain, jaise ke user ko error message dikhana
        }
    }



    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-[30%] flex flex-col gap-5 border border-black px-14 py-14 relative'>

                <h1 className='text-3xl font-bold text-center bg-white px-5 py-2 absolute top-[-25] left-[110] text-[#926c00]'>Other Info</h1>
                <FormControl variant="outlined">
                    <InputLabel>Signup as?</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        label="Signup as?"
                        required
                    >
                        <MenuItem value="" disabled hidden>-- Select Your Role --</MenuItem>
                        <MenuItem value='company'>Company</MenuItem>
                        <MenuItem value='job seeker'>Job Seeker</MenuItem>
                    </Select>
                </FormControl>
                <Select
                    value={role}
                    required
                    onChange={e => setRole(e.target.value as UserRole)}
                >

                </Select>
                <button
                    className='w-full bg-[#926c00] py-2 rounded-full text-white hover:bg-white hover:border border-[#926c00] hover:text-[#926c00] transition-all'
                    onClick={handleRoleSelection}
                >
                    SignUp
                </button>
            </div>
        </div>
    );
}
