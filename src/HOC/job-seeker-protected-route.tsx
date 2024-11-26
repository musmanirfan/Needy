"use client"

import { useAuthContext } from '@/context/authContext'
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect} from 'react'


type JobSeekerProtectedRoute = {
    children: ReactNode
}

export default function JobSeekerProtectedRoute({ children }: JobSeekerProtectedRoute) {

    const {user} = useAuthContext()!;
    const route = useRouter()

    useEffect(()=>{
        if (user?.role === "company"){
            route.push("/company")
        }else if (user?.role === "admin"){
            route.push("/admin")
            console.log(children);
            
        }
        if (user && user.role === "job seeker" && !("name" in user)){
            route.push("/Job")
        }
    },[user])
    return (
        <>
        </>
  )
}
