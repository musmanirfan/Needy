"use client"

import { CircularProgress } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/footer';
import { Job } from '@/types/company-job';
import { db } from '@/firebase/firebaseConfig';
import CompanyHeader from '@/components/companyHeader';
import { useParams } from 'next/navigation';



export default function Page() {
    const params = useParams();
    const slug = params.slug;
    const [data, setData] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const currentJobID = slug;

    useEffect(() => {
        if (!currentJobID) return

        if (!slug) return

        (async () => {
            try {
                const q = query(collection(db, "jobs"), where("firebaseID", "==", slug))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const docData = doc.data() as Job;
                    setData(docData);
                    setLoading(false)
                })
            } catch (e) {
                console.log(e);
                setLoading(false)
            }
        })()
    }, [slug])
    return (
        <>
            <CompanyHeader />
            {!loading ? (

                <div className='flex justify-center mt-32'>
                    {
                        data ? (
                            <div className=" !w-[700px] overflow-x-hidden">
                                <div className="bg-white shadow-lg rounded-lg !w-[100%] overflow-x-hidden">
                                    <Image
                                        className="object-cover w-[100%] sm:w-full h-64"
                                        src={data.companyLogo!}
                                        alt={data.companyName!}
                                        width={800}
                                        height={400}
                                        unoptimized
                                    />
                                    <div className="p-6">
                                        <h1 className="text-3xl font-bold mb-4">{data.companyName}</h1>
                                        {/* <p className="text-sm text-gray-500 mb-2">{formatDate(data)}</p> */}
                                        {data.jobType && (
                                            <div className="mb-4">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                                    {data.jobType}
                                                </span>
                                            </div>
                                        )}
                                        <div className="text-gray-700 leading-relaxed prose">
                                            <ReactMarkdown>
                                                {data.otherReq}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <div className='justify-center mt-2'>
                                <CircularProgress color='success' />
                            </div>
                        )
                    }
                </div>
            ) : (
                <div className="w-full h-[100vh] flex items-center justify-center">
                    <CircularProgress disableShrink />;
                </div>
            )}
            <Footer />
        </>
    )
}
