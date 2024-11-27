"use client"

import CompanyHeader from '@/components/companyHeader'
import Footer from '@/components/footer'
import Image from 'next/image'
import React from 'react'

export default function Profile() {
    return (
        <>
            < CompanyHeader />
            <section className="w-full overflow-hidden !mt-18 dark:bg-gray-900">
                <div className="flex flex-col">
                    {/* <!-- Cover Image --> */}
                    <Image src="/company-bg.jpg" alt="User Cover"
                        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]" width={50} height={50} unoptimized />

                    {/* <!-- Profile Image --> */}
                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                        <Image src="/designprolabs.png" alt="User Profile"
                            className="rounded-full lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem] !bg-contain" width={50} height={50} unoptimized />

                        {/* <!-- FullName --> */}
                        <h1
                            className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                            Samuel Abera</h1>

                    </div>

                    <div
                        className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                            <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                                <div className="w-full">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                                            <dd className="text-lg font-semibold">Samuel</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                                            <dd className="text-lg font-semibold">Abera</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date Of Birth</dt>
                                            <dd className="text-lg font-semibold">21/02/1997</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Gender</dt>
                                            <dd className="text-lg font-semibold">Male</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="w-full">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                                            <dd className="text-lg font-semibold">Ethiopia, Addis Ababa</dd>
                                        </div>

                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                                            <dd className="text-lg font-semibold">+251913****30</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                            <dd className="text-lg font-semibold">samuelabera87@gmail.com</dd>
                                        </div>

                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Website</dt>
                                            <dd className="text-lg font-semibold hover:text-blue-500"><a href="https://techakim.com">https://www.teclick.com</a></dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

        // <!-- Photo by '@jessbaileydesigns' & '@von_co' on Unsplash-- >
    )
}
