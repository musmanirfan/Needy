import JobSeekerProtectedRoute from "@/HOC/job-seeker-protected-route";
import { ReactNode } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <JobSeekerProtectedRoute>
            {children}
        </JobSeekerProtectedRoute>
    );
}


