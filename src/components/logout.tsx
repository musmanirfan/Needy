// import { auth } from "@/firebase/firebaseConfig";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export const LogOut = () => {
//     const route = useRouter();
//     const logOutFunc = async () => {
//         try {
//             await signOut(auth);
//             toast.success("LogOut Successfully");
//             route.push("/signup");
//         } catch (e) {
//             console.log(e);
//             toast.error("dubara kro")
//         }
//     }
//     return logOutFunc();
// }
