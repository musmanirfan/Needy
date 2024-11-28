import { Timestamp } from "firebase/firestore";

export type Job = {
    firebaseID?: string;
    companyName: string,
    jobPosition: string;
    qualification: string;
    shortDetail: string;
    jobType: string;
    salaryRange: string;
    address: string;
    otherReq: string;
    companyLogo: string;
    createdAt: Timestamp; // Firestore timestamp
    status: string; // Added dynamically based on createdAt
};