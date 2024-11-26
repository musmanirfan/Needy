"use client"

import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { TextField } from '@mui/material';
import CompanyHeader from '@/components/companyHeader';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';


export default function CreateNewJob() {
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState("")
    const [helpLine, setHelpLine] = useState("")
    const [email, setEmail] = useState("")
    const [profilePic, setProfilePic] = useState<File | null>(null)
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null)


    const postJob = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        saveJobsInFireStore();
        console.log(companyName,
            address,
            helpLine,
            email,
            profilePic,
            coverPhoto
        );

        setCompanyName("")
        setAddress("")
        setHelpLine("")
        setEmail("")

    }

    const saveJobsInFireStore = async () => {
        const companyInfo = {
            companyName,
            address,
            helpLine,
            email,
            profilePic,
            coverPhoto
        }
        const docRef = doc(db, "companyInfo")
        await setDoc(docRef, companyInfo)
    }

    return (
        <>
            <CompanyHeader />
            <div className='mx-w-[90vw] w-[60vw]  mx-auto mt-24'>
                <h1 className='text-4xl py-10 text-center font-bold'>Enter Your Company Information</h1>
                <Grid container spacing={3}>
                    <TextField className='w-full' id="outlined-basic" label="company Name" variant="outlined" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                    <TextField className='w-full' id="outlined-basic" label="Company Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)} />
                    <TextField className='w-[49%]' id="outlined-basic" label="HelpLine" variant="outlined" value={helpLine} onChange={e => setHelpLine(e.target.value)} />
                    <TextField className='w-[48%]' id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="profile-image"> Profile Image:</label>
                    <input
                        type="file"
                        placeholder='Profile Image'
                        id="profile-image"
                        accept="image/*"
                        onChange={(e) => {
                            setProfilePic(e.target.files?.[0] ?? null);
                        }}
                        className="w-full file-input bg-white file-input-bordered border border-[#C4C4C4] rounded-sm p-2 input input-primary"
                    />
                    <label htmlFor="cover-image"> Cover Image:</label>
                    <input
                        type="file"
                        placeholder='cover Image'
                        id="cover-image"
                        accept="image/*"
                        onChange={(e) => {
                            setCoverPhoto(e.target.files?.[0] ?? null);
                        }}
                        className="w-full file-input bg-white file-input-bordered border border-[#C4C4C4] rounded-sm p-2 input"
                    />

                    <button onClick={postJob} className='w-full bg-[#926c00] py-2 rounded-full text-white hover:bg-white hover:border border-[#926c00] hover:text-[#926c00] transition-all'>Post</button>

                </Grid>
            </div>
        </>
    )
}
