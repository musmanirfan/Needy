"use client"

import CompanyHeader from '@/components/companyHeader';
import Footer from '@/components/footer';
import { checkDateDifference } from '@/components/timeStamps';
import { db } from '@/firebase/firebaseConfig';
import { Job } from '@/types/company-job';
import { Clear, Search } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'




export default function Company() {

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState('All')
  const [searchValue, setSearchValue] = useState('')


  // Extract unique tags
  const tags = useMemo(() => {
    const uniqueTags = new Set(jobs.map(job => job.jobType));
    return ['All', ...Array.from(uniqueTags)];
  }, [jobs]);


  // Filter cards based on selected tag and search value
  const filteredCards = useMemo(() => {
    let filtered = jobs;
    if (selectedTag !== 'All') {
      filtered = filtered.filter(job => job.jobType === selectedTag);
    }
    if (searchValue.trim() !== '') {
      const lowwerCaseSearch = searchValue.toLowerCase();
      filtered = filtered.filter(job =>
        job.companyName.toLowerCase().includes(lowwerCaseSearch) ||
        job.jobPosition.toLowerCase().includes(lowwerCaseSearch)
      )
    }
    return filtered
  }, [jobs, selectedTag, searchValue]);


  // fetch jobs from firestore
  const fetchJobsFromFireStore = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "jobs"));
      const fetchJobs: Job[] = querySnapShot.docs.map((doc) => {
        const data = doc.data() as Job;
        const createdAt = data.createdAt;
        const status = checkDateDifference(createdAt);
        return { id: doc.id, ...data, status };
        console.log("status", status);
      })
      console.log("fetchJobs", fetchJobs);
      return fetchJobs
    } catch (error) {
      console.log(error);
    }
  }

  // then call it in useEffect
  useEffect(() => {
    console.log();

    (async () => {
      try {
        const fetchedJobs = await fetchJobsFromFireStore();
        setJobs(fetchedJobs!)
      } catch (error) {
        console.log("Error fetching Jobs", error);
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <>
      <CompanyHeader />
      {!loading ? (
        <>
          <div className='flex mt-36 justify-center mb-20'>
            <div className="w-[25%] justify-end">
              <div className="search-bar w-[90%]">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search by Company or Job Title"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      searchValue && (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setSearchValue('')}>
                            <Clear />
                          </IconButton>
                        </InputAdornment>
                      )
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#926c00', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#926c00', // Border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#926c00', // Border color when focused
                      },
                    },
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter by JobType:</h3>
                <div className="flex flex-wrap gap-3">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag!)}
                      className={`px-4 py-2 rounded-full border transition 
                ${selectedTag === tag
                          ? 'bg-[#926c00] text-white border-[#926c00]'
                          : 'bg-white text-[#926c00] border-[#926c00] hover:bg-[#926c00] hover:text-white'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[70%] flex flex-col gap-6 justify-start">{filteredCards?.map(({
              firebaseID,
              companyName,
              companyLogo,
              jobPosition,
              jobType,
              status,
              salaryRange,
              shortDetail }, i) => {
              return (
                <div key={companyName + i} className="group grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg">
                  <Link href={`/company/job/${firebaseID}`} className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
                    <div className="group relative h-16 w-16 overflow-hidden rounded-full border border-gray-300 flex items-center justify-center">
                      <Image src={companyLogo} width={50} height={50} alt={companyName} unoptimized />
                    </div>
                  </Link>
                  <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                    <h3 className="text-sm text-gray-600">{companyName}</h3>
                    <Link href={`/company/job/${firebaseID}`} className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">{jobPosition}</Link>
                    <p className="overflow-hidden pr-7 text-sm">{shortDetail}</p>

                    <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                      <div className="">Job Type<span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{jobType}</span></div>
                      <div className="">Salary<span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{salaryRange}</span></div>
                    </div>
                    <p className='mt-3 text-sm text-gray-500'>Posted: <span className='ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900'>{status}</span></p>
                  </div>
                </div>
              )
            })}
            </div>
          </div >
          <Footer />
        </>
      ) : (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <CircularProgress disableShrink />;
        </div>
      )
      }
    </>

  )
}
