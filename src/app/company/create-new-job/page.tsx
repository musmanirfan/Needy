"use client"

import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { TextField } from '@mui/material';
import CompanyHeader from '@/components/companyHeader';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import { Textarea } from '@mui/joy';
import Footer from '@/components/footer';


export default function CreateNewJob() {
    const [companyName, setCompanyName] = useState("")
    const [companyLogo, setCompanyLogo] = useState<File | null>(null);
    const [jobPosition, setJobPosition] = useState('');
    const [qualification, setQualification] = useState("")
    const [shortDetail, setShortDetail] = useState("")
    const [jobType, setJobType] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [address, setAddress] = useState("")
    const [otherReq, setOtherReq] = useState("")




    const postJob = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveJobsInFireStore();
        setJobPosition("")
        setQualification("")
        setShortDetail("")
        setJobType("")
        setSalaryRange("")
        setAddress("")
        setOtherReq("")

    }

    const saveJobsInFireStore = async () => {

        const currentUser = auth.currentUser;
        try {
            const jobDetail = {
                userUid: currentUser?.uid,
                jobPosition,
                qualification,
                shortDetail,
                jobType,
                salaryRange,
                address,
                otherReq
            }
            const docRef = collection(db, "Jobs")
            await addDoc(docRef, jobDetail)
        } catch (error) {
            console.log(error);
            console.log(companyLogo);

        }
    }

    return (
        <>
            <CompanyHeader />
            <div className='mx-w-[90vw] w-[60vw]  mx-auto mt-24'>
                <h1 className='text-4xl py-10 text-center font-bold'>Post a New Job</h1>
                <form onSubmit={postJob}>
                    <Grid container spacing={3}>
                        <TextField className='w-[49%]' id="outlined-basic" label="Company Name" variant="outlined" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                        <input
                            type='file'
                            className='w-[48%] border border-[#C4C4C4] my-auto py-3 pl-2'
                            placeholder='Company Image'
                            id="image"
                            accept="image/*"
                            onChange={e => setCompanyLogo(e.target.files?.[0] ?? null)} />
                        <TextField className='w-[49%]' id="outlined-basic" label="Job Position" variant="outlined" value={jobPosition} onChange={e => setJobPosition(e.target.value)} />
                        <TextField className='w-[48%]' id="outlined-basic" label="Qualification" variant="outlined" value={qualification} onChange={e => setQualification(e.target.value)} />
                        <TextField className='w-full' id="outlined-basic" label="Short Detail" variant="outlined" value={shortDetail} onChange={e => setShortDetail(e.target.value)} />
                        <TextField className='w-[49%]' id="outlined-basic" label="Job Type" variant="outlined" value={jobType} onChange={e => setJobType(e.target.value)} />
                        <TextField className='w-[48%]' id="outlined-basic" label="Salary Range" variant="outlined" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} />
                        <TextField className='w-full' id="outlined-basic" label="Company Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)} />
                        <Textarea style={{ width: '100%' }} minRows={4} placeholder='Enter your Full Description..'
                            value={otherReq}
                            onChange={e => setOtherReq(e.target.value)}
                        />
                        <button type='submit' className='w-full bg-[#926c00] py-2 rounded-full text-white hover:bg-white hover:border border-[#926c00] hover:text-[#926c00] transition-all'>Post</button>

                    </Grid>
                </form>
            </div>
            <Footer />
        </>
    )
}
