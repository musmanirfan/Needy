"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { JobType } from '@/types/jobType';

type JobContextProviderType = {
    children: ReactNode
}

type JobContext = {
    jobs: JobType[] | null;
}

const JosbContext = createContext<null | JobContext>(null)

export default function JobContextProvider({ children }: JobContextProviderType) {
    const [jobs, setJobs] = useState<JobType[] | null>(null);


    const JobList: JobType[] = [
        {
            companyName: "Tech-Zone360",
            companyImg: "/techzone.png",
            jobPosition: "Senior Developer",
            jobShortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit commodi explicabo, qui velit voluptatibus debitis culpa molestias",
            experienceHeading: "Experience",
            experienceDesc: "2 Years",
            salaryHeading: "salary",
            salaryDesc: "40K"
        },
        {
            companyName: "DesignProLabs",
            companyImg: "/designprolabs.png",
            jobPosition: "Junior Developer",
            jobShortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit commodi explicabo, qui velit voluptatibus debitis culpa molestias",
            experienceHeading: "Experience",
            experienceDesc: "1 Years",
            salaryHeading: "salary",
            salaryDesc: "10K"
        }
    ]

    useEffect(() => {
        setJobs(JobList)
    }, [])



    return (
        <JosbContext.Provider value={{ jobs }}>
            {children}
        </JosbContext.Provider>

    )
}

export const useJobContext = () => useContext(JosbContext);
