"use client"

import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CompanyHeader from '@/components/companyHeader';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';


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

    const route = useRouter()



    // button function 
    const postJob = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveJobsInFireStore();
        setCompanyName("");
        setJobPosition("");
        setQualification("");
        setShortDetail("");
        setJobType("");
        setSalaryRange("");
        setAddress("");
        setOtherReq("");
        setCompanyLogo(null);

        route.push("/");
    }


    // save data in firestore
    const saveJobsInFireStore = async () => {
        const currentUser = auth.currentUser;
        try {
            let logoUrl = null
            if (companyLogo) {
                logoUrl = await uploadImageToCloudinary(companyLogo)
                console.log(logoUrl);
            }
            const jobDetail = {
                companyName, userUid: currentUser?.uid, jobPosition, qualification, shortDetail, jobType, salaryRange, address, otherReq, companyLogo: logoUrl || "", createdAt: new Date()
            };
            const collectionRef = collection(db, "jobs");
            const docRef = await addDoc(collectionRef, jobDetail);
            const docRefToUpdate = doc(db, "jobs", docRef.id);
            await updateDoc(docRefToUpdate, { firebaseID: docRef.id });
            toast.success("Blog Added Successfully!");
        } catch (error) {
            console.log(error);
        }
    }


    // save image in storage and getting url

    const uploadImageToCloudinary = async (imageFile: File) => {
        const cloudName = "needy";
        const uploadPreset = "ml_default";

        if (!imageFile) {
            console.log("No image file provided");

        }
        try {
            const data = new FormData();
            data.append("file", imageFile);
            data.append("upload_preset", uploadPreset);
            data.append("folder", "company_jobs")

            console.log("data sent:", data);


            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: data,
            })
            const result = await response.json();
            console.log(result);

            console.log(result.secure_url);
            return result.secure_url;
        } catch (error) {
            console.log("Cloudinary upload error: ", error);
            throw error;

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
                            required
                            type='file'
                            className='w-[48%] border border-[#C4C4C4] my-auto py-3 pl-2'
                            placeholder='Company Image'
                            id="image"
                            accept="image/*"
                            onChange={e => setCompanyLogo(e.target.files?.[0] ?? null)} />
                        <TextField required className='w-[49%]' id="outlined-basic" label="Job Position" variant="outlined" value={jobPosition} onChange={e => setJobPosition(e.target.value)} />
                        <TextField required className='w-[48%]' id="outlined-basic" label="Qualification" variant="outlined" value={qualification} onChange={e => setQualification(e.target.value)} />
                        <TextField required className='w-full' id="outlined-basic" label="Short Detail" variant="outlined" value={shortDetail} onChange={e => setShortDetail(e.target.value)} />

                        <FormControl variant="outlined" className="w-[49%]">
                            <InputLabel>Job Type</InputLabel>
                            <Select
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                                label="Job Type"
                            >
                                <MenuItem value="full time">Full Time</MenuItem>
                                <MenuItem value="part time">Part Time</MenuItem>
                                <MenuItem value="remote">Remote</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField required className='w-[48%]' id="outlined-basic" label="Salary Range" variant="outlined" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} />
                        <TextField required className='w-full' id="outlined-basic" label="Company Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)} />
                        <textarea
                            style={{ width: '100%' }}
                            rows={4}
                            placeholder='Enter your Full Description..'
                            value={otherReq}
                            onChange={(e) => {
                                setOtherReq(e.target.value);
                                console.log('otherReq:', e.target.value);
                            }}
                        />
                        <button type='submit' className='w-full bg-[#926c00] py-2 rounded-full text-white hover:bg-white hover:border border-[#926c00] hover:text-[#926c00] transition-all'>Post</button>

                    </Grid>
                </form>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between md:w-[60vw] mx-auto border border-gray-200 text-black max-h-[100%] mt-3 overflow-y-scroll">
                <label htmlFor="tag" className="block text-sm font-bold mb-2">
                    <span className="text-neutral">Text Output:</span>
                </label>
                <div className="p-2 h-full ">
                    <ReactMarkdown>
                        {otherReq}
                    </ReactMarkdown>
                </div>
            </div>
            <Footer />
        </>
    )
}
