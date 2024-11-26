"use client"

import CompanyHeader from '@/components/companyHeader';
import { checkDateDifference } from '@/components/timeStamps';
import { useJobContext } from '@/context/jobContext';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Company() {

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
      try {
        const fetchedJobs = await fetchJobsFromFireStore();
        setJobs(fetchedJobs)
      } catch (error) {
        console.log("Error fetching Jobs", error);
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const fetchJobsFromFireStore = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "jobs"));
      const fetchJobs = querySnapShot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt;
        const status = checkDateDifference(createdAt);
        return { ...data, status };
      })
      console.log("status", status);
      console.log("fetchJobs", fetchJobs);
      return fetchJobs
    } catch (error) {
      console.log(error);
    }
  }



  if (loading) {
    return <p>Loading</p>
  }
  // const { jobs } = useJobContext()!;
  return (
    <>
      <CompanyHeader />
      <div className="!mt-24">{jobs?.map(({
        address,
        companyName,
        companyLogo,
        jobPosition,
        jobType,
        status,
        salaryRange,
        shortDetail }, i) => {
        return (
          <div key={companyName + i} className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
            <a href="#" className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
              <div className="group relative h-16 w-16 overflow-hidden rounded-full border border-gray-300 flex items-center justify-center">
                <Image src={companyLogo} width={50} height={50} alt={companyName} unoptimized />
              </div>
            </a>
            <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
              <h3 className="text-sm text-gray-600">{companyName}</h3>
              <a href="#" className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">{jobPosition}</a>
              <p className="overflow-hidden pr-7 text-sm">{shortDetail}</p>

              <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div className="">Job Type<span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{jobType}</span></div>
                <div className="">Salary<span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{salaryRange}</span></div>
              </div>
              <p className='mt-3 text-sm'>Posted: {status}</p>
            </div>
          </div>
        )
      })}
      </div>
    </>

  )
}
